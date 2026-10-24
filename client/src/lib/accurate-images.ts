// BrokeTonight curated verified Unsplash photography
export const ACCURATE_IMAGES = {
  cove: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=600&q=80', // Real La Jolla Cove & sea lions
  stargazing: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=600&q=80', // Dark starry night sky over ocean cliffs
  gliderport: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80', // Torrey Pines gliderport cliffs
  beach: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80', // Ocean sunset beach
  balboa: 'https://images.unsplash.com/photo-1541464522988-31b420f688b9?w=600&q=80', // Balboa Park illuminated plaza
  campus: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&q=80', // UCSD campus student hangout
  artTrail: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&q=80', // Art installation / campus stroll
  kbbq: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80', // Authentic Korean BBQ meat grill
  boba: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?w=600&q=80', // Boba tea & shaved ice dessert
  gelato: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=600&q=80', // Artisan gelato & ice cream
  tacos: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80', // San Diego street tacos
  sandwich: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80', // Board & Brew style gourmet sandwiches
  ramen: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&q=80', // Hot noodles & ramen
  coffee: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&q=80', // Local artisan coffee / latte
  speakeasy: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&q=80', // Cozy cocktail bar & speakeasy lounge
  karaoke: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80', // KTV / Karaoke room
  arcade: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&q=80', // Arcade games & Round 1
  comedy: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=600&q=80', // Live comedy club / stage
  trail: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80', // Coastal trail & bluffs
  social: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80', // Friends dining & social gathering
};

export function getAccurateImageForActivity(title: string, desc = ''): string {
  const text = `${title} ${desc}`.toLowerCase();

  // 1. Specific Landmarks & Nature FIRST (Prevent rave/club photo false matches!)
  if (
    text.includes('stargazing') ||
    text.includes('stars') ||
    text.includes('night sky') ||
    text.includes('astronomy')
  ) {
    return ACCURATE_IMAGES.stargazing;
  }
  if (
    text.includes('la jolla cove') ||
    text.includes('coast walk') ||
    text.includes('seal') ||
    text.includes('sea lion') ||
    text.includes('cove')
  ) {
    return ACCURATE_IMAGES.cove;
  }
  if (text.includes('gliderport') || text.includes('torrey pines')) {
    return ACCURATE_IMAGES.gliderport;
  }
  if (
    text.includes('balboa park') ||
    text.includes('plaza de panama') ||
    text.includes('el prado')
  ) {
    return ACCURATE_IMAGES.balboa;
  }
  if (
    text.includes('scripps pier') ||
    text.includes('la jolla shores') ||
    text.includes('windansea')
  ) {
    return ACCURATE_IMAGES.beach;
  }
  if (
    text.includes('the loft') ||
    text.includes('price center') ||
    text.includes('mandeville') ||
    text.includes('geisel')
  ) {
    return ACCURATE_IMAGES.campus;
  }
  if (text.includes('stuart collection') || text.includes('campus art')) {
    return ACCURATE_IMAGES.artTrail;
  }

  // 2. Specific Food & Desserts
  if (
    text.includes('boba') ||
    text.includes('shaved ice') ||
    text.includes('taro') ||
    text.includes('meet fresh')
  ) {
    return ACCURATE_IMAGES.boba;
  }
  if (text.includes('gelato') || text.includes('ice cream') || text.includes('bobboi')) {
    return ACCURATE_IMAGES.gelato;
  }
  if (
    text.includes('korean bbq') ||
    text.includes('kbbq') ||
    text.includes('olleh') ||
    text.includes('bbq grill') ||
    text.includes('bulgogi')
  ) {
    return ACCURATE_IMAGES.kbbq;
  }
  if (text.includes('taco') || text.includes('mexican') || text.includes('carne asada')) {
    return ACCURATE_IMAGES.tacos;
  }
  if (
    text.includes('sandwich') ||
    text.includes('board & brew') ||
    text.includes('board and brew')
  ) {
    return ACCURATE_IMAGES.sandwich;
  }
  if (
    text.includes('ramen') ||
    text.includes('noodle') ||
    text.includes('hot pot') ||
    text.includes('hotpot') ||
    text.includes('sichuan')
  ) {
    return ACCURATE_IMAGES.ramen;
  }
  if (
    text.includes('coffee') ||
    text.includes('cafe') ||
    text.includes('latte') ||
    text.includes('espresso')
  ) {
    return ACCURATE_IMAGES.coffee;
  }
  if (
    text.includes('speakeasy') ||
    text.includes('cocktail') ||
    text.includes('realm of the 52 remedies')
  ) {
    return ACCURATE_IMAGES.speakeasy;
  }

  // 3. Entertainment
  if (text.includes('karaoke') || text.includes('ktv') || text.includes('spot ktv')) {
    return ACCURATE_IMAGES.karaoke;
  }
  if (
    text.includes('arcade') ||
    text.includes('round 1') ||
    text.includes('round1') ||
    text.includes('bowling') ||
    text.includes('claw machine')
  ) {
    return ACCURATE_IMAGES.arcade;
  }
  if (
    text.includes('comedy') ||
    text.includes('standup') ||
    text.includes('stand-up') ||
    text.includes('improv')
  ) {
    return ACCURATE_IMAGES.comedy;
  }

  // 4. General Outdoor & Nature
  if (
    text.includes('beach') ||
    text.includes('sunset') ||
    text.includes('ocean') ||
    text.includes('pier') ||
    text.includes('boardwalk')
  ) {
    return ACCURATE_IMAGES.beach;
  }
  if (
    text.includes('hike') ||
    text.includes('trail') ||
    text.includes('park') ||
    text.includes('canyon')
  ) {
    return ACCURATE_IMAGES.trail;
  }

  return ACCURATE_IMAGES.social;
}
