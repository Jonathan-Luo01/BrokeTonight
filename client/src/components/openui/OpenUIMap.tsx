import L from 'leaflet';
import { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { Info, Maximize2, Minimize2, Navigation } from 'lucide-react';

export interface RouteStop {
  id: string;
  name: string;
  lat: number;
  lng: number;
  time?: string;
  duration?: string;
  category?: string;
  cost?: string;
  costBreakdown?: string;
  description: string;
  transitNote?: string;
  imageUrl?: string;
  sourceUrl?: string;
  visited?: boolean;
}

interface OpenUIMapProps {
  stops: RouteStop[];
  selectedStopId?: string;
  onSelectStop?: (id: string) => void;
  height?: number;
}

export function OpenUIMap({ stops, selectedStopId, onSelectStop, height = 360 }: OpenUIMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const polylineRef = useRef<L.Polyline | null>(null);

  const [expanded, setExpanded] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const initialLat = stops[0]?.lat ?? 37.802;
      const initialLng = stops[0]?.lng ?? -122.435;

      const map = L.map(mapContainerRef.current, {
        center: [initialLat, initialLng],
        zoom: 13,
        zoomControl: false,
        attributionControl: false,
      });

      // Attribution control without the Leaflet Ukraine flag prefix
      L.control.attribution({ prefix: false }).addTo(map);

      // Esri World Topo Map (Matches OpenUI screenshot tile attribution)
      L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
        {
          attribution: 'Tiles &copy; Esri &middot; OpenStreetMap contributors',
          maxZoom: 18,
        }
      ).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Clear existing markers & lines
    for (const m of markersRef.current) {
      m.remove();
    }
    markersRef.current = [];
    if (polylineRef.current) {
      polylineRef.current.remove();
      polylineRef.current = null;
    }

    if (stops.length === 0) return;

    const latLngs: L.LatLngExpression[] = [];

    stops.forEach((stop, index) => {
      latLngs.push([stop.lat, stop.lng]);

      const isSelected = stop.id === selectedStopId;
      const isVisited = !!stop.visited;

      // Pin styling matching OpenUI screenshot:
      // Black circle with white number, or green when visited, with text label underneath
      const pinColor = isVisited ? '#10b981' : isSelected ? '#ea580c' : '#0f172a';
      const labelText = stop.name.length > 26 ? `${stop.name.slice(0, 24)}...` : stop.name;

      const icon = L.divIcon({
        className: 'openui-map-pin',
        html: `
          <div style="display: flex; flex-direction: column; align-items: center; cursor: pointer; user-select: none;">
            <div style="
              width: 28px; height: 28px; border-radius: 50%;
              background: ${pinColor};
              color: white; font-weight: 700; font-size: 13px;
              display: flex; align-items: center; justify-content: center;
              box-shadow: 0 2px 6px rgba(0,0,0,0.35); border: 2.5px solid white;
              transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
              transform: ${isSelected ? 'scale(1.2)' : 'scale(1)'};
            ">
              ${isVisited ? '✓' : index + 1}
            </div>
            <div style="
              margin-top: 2px;
              font-size: 12px; font-weight: 700; color: #111827;
              text-shadow: 0 1px 3px rgba(255, 255, 255, 0.95), 0 0 8px rgba(255, 255, 255, 0.9);
              white-space: nowrap; text-align: center;
              letter-spacing: -0.01em;
            ">
              ${labelText}
            </div>
          </div>
        `,
        iconSize: [120, 56],
        iconAnchor: [60, 14],
      });

      const marker = L.marker([stop.lat, stop.lng], { icon }).addTo(map);
      marker.on('click', () => onSelectStop?.(stop.id));
      markersRef.current.push(marker);
    });

    // Draw route line connecting the stops (Orange route line matching screenshot)
    if (latLngs.length > 1) {
      const line = L.polyline(latLngs, {
        color: '#f97316',
        weight: 3.5,
        opacity: 0.85,
        dashArray: '6, 8',
      }).addTo(map);
      polylineRef.current = line;
    }

    // Fit bounds with generous padding
    try {
      const bounds = L.latLngBounds(latLngs);
      map.fitBounds(bounds, {
        paddingTopLeft: [60, 60],
        paddingBottomRight: [60, 60],
        maxZoom: 14,
      });
    } catch {
      // Fallback
    }

    const timer = setTimeout(() => map.invalidateSize(), 200);
    return () => clearTimeout(timer);
  }, [stops, selectedStopId, onSelectStop]);

  const handleRecenter = () => {
    if (!mapInstanceRef.current || stops.length === 0) return;
    const latLngs: L.LatLngExpression[] = stops.map((s) => [s.lat, s.lng]);
    const bounds = L.latLngBounds(latLngs);
    mapInstanceRef.current.fitBounds(bounds, {
      paddingTopLeft: [60, 60],
      paddingBottomRight: [60, 60],
      maxZoom: 14,
    });
  };

  const handleToggleExpand = () => {
    setExpanded((prev) => !prev);
    setTimeout(() => {
      mapInstanceRef.current?.invalidateSize();
    }, 250);
  };

  return (
    <div
      className={`relative w-full rounded-2xl overflow-hidden border border-neutral-200/80 shadow-xs transition-all duration-300 bg-neutral-100 ${
        expanded ? 'h-[560px]' : ''
      }`}
      style={{ height: expanded ? 560 : height }}
    >
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* Top Left Floating Pills (Recenter & Info) */}
      <div className="absolute top-3 left-3 z-[1000] flex items-center gap-2">
        <button
          type="button"
          onClick={handleRecenter}
          className="w-8 h-8 rounded-full bg-white/95 backdrop-blur shadow-sm border border-neutral-200/90 flex items-center justify-center text-neutral-800 hover:bg-neutral-100 transition-colors"
          title="Recenter route"
        >
          <Navigation className="w-4 h-4 fill-neutral-800 text-neutral-800 rotate-45" />
        </button>

        <button
          type="button"
          onClick={() => setShowInfo((prev) => !prev)}
          className="w-8 h-8 rounded-full bg-white/95 backdrop-blur shadow-sm border border-neutral-200/90 flex items-center justify-center text-neutral-800 hover:bg-neutral-100 transition-colors"
          title="Route Info"
        >
          <Info className="w-4 h-4" />
        </button>
      </div>

      {/* Top Right Floating Pill (Expand) */}
      <div className="absolute top-3 right-3 z-[1000]">
        <button
          type="button"
          onClick={handleToggleExpand}
          className="px-3 py-1.5 rounded-full bg-white/95 backdrop-blur shadow-sm border border-neutral-200/90 text-xs font-semibold text-neutral-800 flex items-center gap-1.5 hover:bg-neutral-100 transition-colors"
        >
          <span>{expanded ? 'Collapse' : 'Expand'}</span>
          {expanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Info Popover */}
      {showInfo && (
        <div className="absolute top-12 left-3 z-[1000] max-w-xs bg-white/95 backdrop-blur-md border border-neutral-200 rounded-xl p-3 shadow-lg text-xs text-neutral-700 animate-in fade-in">
          <p className="font-semibold text-neutral-900 mb-1">Interactive Route Overview</p>
          <p>
            Numbered pins show the stops in order. Tap any pin to jump to that stop. The orange
            dashed line links the stops chronologically.
          </p>
        </div>
      )}
    </div>
  );
}
