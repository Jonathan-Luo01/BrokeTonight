import { ArrowLeft, Clock, ExternalLink, MapPin, Sparkles } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { decodePlan } from '@/lib/share';

const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80',
  'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
];

export function SharedPlanPage() {
  const [params] = useSearchParams();
  const encoded = params.get('plan');

  if (!encoded) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 text-center px-4">
        <p className="text-xl font-bold">No plan found in URL</p>
        <Link to="/">
          <Button>Find Tonight's Plans</Button>
        </Link>
      </div>
    );
  }

  let plan;
  try {
    plan = decodePlan(encoded);
  } catch {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 text-center px-4">
        <p className="text-xl font-bold">Invalid share link</p>
        <Link to="/">
          <Button>Find Tonight's Plans</Button>
        </Link>
      </div>
    );
  }

  const { selectedActivity: a, filters } = plan;
  const totalCost = a.estimatedCostPerPerson * filters.groupSize;
  const imageUrl = a.imageUrl || FALLBACK_IMAGES[0];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>Shared via BrokeTonight · Gemini Scout</span>
          </div>
        </div>

        {/* Plan card */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <img src={imageUrl} alt={a.title} className="w-full h-64 object-cover" />

          <div className="p-6 space-y-5">
            <div>
              <h1 className="font-black text-3xl mb-2">{a.title}</h1>
              <p className="text-muted-foreground leading-relaxed">{a.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-secondary rounded-xl p-3 space-y-1">
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">
                  Total cost
                </p>
                <p className="font-black text-2xl text-primary">
                  {totalCost === 0 ? 'FREE' : `$${totalCost}`}
                </p>
                <p className="text-xs text-muted-foreground">
                  for {filters.groupSize} {filters.groupSize === 1 ? 'person' : 'friends'}
                </p>
              </div>
              <div className="bg-secondary rounded-xl p-3 space-y-1">
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">
                  Per person
                </p>
                <p className="font-black text-2xl">
                  {a.estimatedCostPerPerson === 0 ? 'FREE' : `$${a.estimatedCostPerPerson}`}
                </p>
                <p className="text-xs text-muted-foreground">{filters.vibe} vibe</p>
              </div>
            </div>

            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <span>{a.address || a.locationName}</span>
              </div>
              {a.operatingHours && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 shrink-0" />
                  <span>{a.operatingHours}</span>
                </div>
              )}
            </div>

            {(a.geminiScoutNotes || a.grokScoutNotes) && (
              <div className="border-l-2 border-primary/30 pl-4 italic text-sm text-muted-foreground">
                {a.geminiScoutNotes || a.grokScoutNotes}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a href={a.sourceUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button className="w-full bg-primary text-primary-foreground rounded-xl font-bold">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Official Source
                </Button>
              </a>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(a.address ? `${a.locationName}, ${a.address}` : a.locationName)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button
                  variant="secondary"
                  className="w-full rounded-xl font-bold border border-border"
                >
                  <MapPin className="w-4 h-4 mr-2 text-primary" />
                  View on Map
                </Button>
              </a>
              <Link to="/">
                <Button variant="outline" className="w-full sm:w-auto rounded-xl border-border">
                  Find More
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Discovered with BrokeTonight · Bored? Broke? Let's go.
        </p>
      </div>
    </div>
  );
}
