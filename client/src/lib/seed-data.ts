import type { Activity } from './types';

export const SEED_ACTIVITIES: Activity[] = [
  // FREE activities
  {
    id: 'torrey-pines-gliderport',
    title: 'Torrey Pines Gliderport',
    description:
      'Watch paragliders and hang gliders launch off 300-foot cliffs above the Pacific. One of the most stunning free spectacles in San Diego — elite vibes, zero cost.',
    estimatedCostPerPerson: 0,
    costBreakdown: 'Free to watch. Tandem flights available for ~$175 if you want to fly.',
    locationName: 'Torrey Pines Gliderport',
    address: '2800 Torrey Pines Scenic Dr, La Jolla, CA 92037',
    distanceFromCampus: '1.2 miles',
    operatingHours: 'Sunrise to sunset daily',
    ageRestriction: 'All ages',
    sourceUrl: 'https://www.flytorrey.com',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
    geminiScoutNotes:
      'Best at sunset — arrive 30 min before for prime viewing spots on the cliff edge.',
    verificationStatus: 'estimated',
    vibes: ['Adventurous', 'Chill'],
    tags: ['outdoor', 'free', 'views', 'coastal'],
  },
  {
    id: 'la-jolla-cove-sunset',
    title: 'La Jolla Cove & Sea Lions',
    description:
      "Iconic sea lion colony at one of California's most beautiful coves. Watch them bark, fight, and nap on the rocks while waves crash below stunning cliffs.",
    estimatedCostPerPerson: 0,
    costBreakdown: 'Completely free. Parking nearby is $2/hr at street meters.',
    locationName: 'La Jolla Cove',
    address: '1100 Coast Blvd, La Jolla, CA 92037',
    distanceFromCampus: '2.5 miles',
    operatingHours: 'Always open',
    ageRestriction: 'All ages',
    sourceUrl: 'https://www.sandiego.gov/lifeguards/beaches/cove',
    imageUrl: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=600&q=80',
    geminiScoutNotes:
      'Go at golden hour (6-7pm) for the most insane lighting. The sea lions are rowdiest in the afternoon.',
    verificationStatus: 'estimated',
    vibes: ['Chill', 'Romantic'],
    tags: ['outdoor', 'free', 'wildlife', 'coastal'],
  },
  {
    id: 'ucsd-loft-events',
    title: 'The Loft at Price Center',
    description:
      "UCSD's on-campus entertainment venue hosts live music, comedy, open mics, and themed events — mostly free or cheap for students. Check what's on tonight.",
    estimatedCostPerPerson: 0,
    costBreakdown: 'Most events free with student ID. Some shows $5–$10.',
    locationName: 'The Loft at Price Center, UCSD',
    address: 'Price Center East, La Jolla, CA 92093',
    distanceFromCampus: 'On campus',
    operatingHours: 'Event-dependent, typically 7pm–midnight',
    ageRestriction: 'All ages (some 21+ events)',
    sourceUrl: 'https://hdh.ucsd.edu/theloft',
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80',
    geminiScoutNotes:
      'Best kept secret on campus. Themed nights like trivia, karaoke, and open mic are legendary.',
    verificationStatus: 'estimated',
    vibes: ['Chill', 'Chaotic'],
    tags: ['campus', 'free', 'social', 'music'],
  },
  // $10 activities
  {
    id: 'taco-stand-la-jolla',
    title: 'The Taco Stand La Jolla',
    description:
      'Legit Mexican street tacos in the heart of La Jolla. Hand-pressed tortillas, charred al pastor, and the best horchata in San Diego. Pure chaos, 100% worth it.',
    estimatedCostPerPerson: 9,
    costBreakdown: '3 tacos ~$7–9, drinks $2–3. Cash preferred.',
    locationName: 'The Taco Stand',
    address: '621 Pearl St, La Jolla, CA 92037',
    distanceFromCampus: '2.8 miles',
    operatingHours: 'Mon–Sat 10am–10pm, Sun 10am–9pm',
    ageRestriction: 'All ages',
    sourceUrl: 'https://www.letstaco.com',
    imageUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80',
    geminiScoutNotes:
      'Get the al pastor and the carne asada. The line moves fast. Sit outside on Pearl St.',
    verificationStatus: 'estimated',
    vibes: ['Chaotic', 'Chill'],
    tags: ['food', 'tacos', 'casual', 'la-jolla'],
  },
  {
    id: 'wahoos-beach-sunset',
    title: "Wahoo's Fish Taco + Pacific Beach Sunset",
    description:
      "Grab Wahoo's fish tacos then walk to PB Boardwalk to watch the sunset and people-watch. The classic broke-but-living-our-best-life San Diego evening.",
    estimatedCostPerPerson: 10,
    costBreakdown: "Wahoo's 2-taco combo ~$8–10. Boardwalk is free.",
    locationName: "Wahoo's Fish Taco → PB Boardwalk",
    address: '4603 Mission Blvd, San Diego, CA 92109',
    distanceFromCampus: '4.5 miles',
    operatingHours: 'Restaurant 11am–10pm daily. Boardwalk always open.',
    ageRestriction: 'All ages',
    sourceUrl: 'https://www.wahoos.com',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80',
    geminiScoutNotes:
      'Get the Baja fish tacos. Walk 2 blocks to the boardwalk after — perfect golden hour combo.',
    verificationStatus: 'estimated',
    vibes: ['Chill', 'Adventurous'],
    tags: ['food', 'beach', 'sunset', 'casual'],
  },
  {
    id: 'bird-rock-coffee',
    title: 'Bird Rock Coffee Roasters Date Night',
    description:
      'Award-winning local coffee roaster in a cozy Bird Rock neighborhood spot. Perfect for a low-key romantic evening — craft lattes, house-baked pastries, and great vibes.',
    estimatedCostPerPerson: 8,
    costBreakdown: 'Specialty latte $6–8, pastry $3–5. Total easily under $12.',
    locationName: 'Bird Rock Coffee Roasters',
    address: '5627 La Jolla Blvd, La Jolla, CA 92037',
    distanceFromCampus: '3.2 miles',
    operatingHours: 'Mon–Fri 6am–6pm, Sat–Sun 7am–6pm',
    ageRestriction: 'All ages',
    sourceUrl: 'https://www.birdrockcoffee.com',
    imageUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&q=80',
    geminiScoutNotes:
      'Order the single-origin pour-over if you want to impress someone. The neighborhood is incredibly walkable.',
    verificationStatus: 'estimated',
    vibes: ['Romantic', 'Chill'],
    tags: ['coffee', 'cafe', 'romantic', 'la-jolla'],
  },
  // $20 activities
  {
    id: 'convoy-kbbq-dinner',
    title: 'Olleh Korean BBQ Group Dinner',
    description:
      'Feast on brisket, bulgogi, and endless banchan side dishes with your crew. Splitting family-style keeps dinner right at budget.',
    estimatedCostPerPerson: 20,
    costBreakdown: 'Family-style dinner share ~$20/person. Endless banchan included.',
    locationName: 'Olleh Korean BBQ — Convoy St',
    address: '4344 Convoy St, San Diego, CA 92111',
    distanceFromCampus: '7 miles',
    operatingHours: 'Daily 11:30am–midnight',
    ageRestriction: 'All ages',
    sourceUrl: 'https://www.convoydistrict.com',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80',
    geminiScoutNotes:
      'Arrive early on weekends to put your name down, or grab boba next door while you wait.',
    verificationStatus: 'estimated',
    vibes: ['Chaotic', 'Adventurous'],
    tags: ['kbbq', 'dinner', 'asian-food', 'convoy'],
  },
  {
    id: 'board-brew',
    title: 'Board & Brew Sandwich Shop',
    description:
      'Legendary San Diego sandwich spot famous for their secret sauce and craft chips. A proper sit-down meal that fuels beach days and game nights alike.',
    estimatedCostPerPerson: 14,
    costBreakdown: 'Full sandwich $12–16, chips $2–3, drinks $3–4. Split a chips basket.',
    locationName: 'Board & Brew — Scripps Ranch area',
    address: '9001 Miramar Rd, San Diego, CA 92126',
    distanceFromCampus: '6 miles',
    operatingHours: 'Daily 10am–9pm',
    ageRestriction: 'All ages',
    sourceUrl: 'https://www.boardandbrew.com',
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80',
    geminiScoutNotes:
      'Get the Turkey Club or The Capistrano. Their chips and dip are a religious experience.',
    verificationStatus: 'estimated',
    vibes: ['Chill', 'Chaotic'],
    tags: ['food', 'sandwiches', 'casual', 'group-friendly'],
  },
  {
    id: 'spot-ktv-convoy',
    title: 'Spot KTV & Lounge Convoy',
    description:
      'Rent a private neon karaoke room with thousands of songs, disco lights, and late-night snacks. Split with friends for an epic, budget-friendly night.',
    estimatedCostPerPerson: 9,
    costBreakdown: 'Private room rate ($45/hr) split 5 ways is ~$9/person for an hour of singing.',
    locationName: 'Spot KTV — Convoy Plaza',
    address: '4344 Convoy St, San Diego, CA 92111',
    distanceFromCampus: '7.2 miles',
    operatingHours: 'Daily 4pm–2am',
    ageRestriction: 'All ages',
    sourceUrl: 'https://findkaraoke.net/san-diego',
    imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&q=80',
    geminiScoutNotes:
      'Best value when going in a group of 4 to 6 people. Great sound system and private rooms.',
    verificationStatus: 'estimated',
    vibes: ['Chaotic', 'Adventurous'],
    tags: ['karaoke', 'nightlife', 'music', 'convoy'],
  },
];

export function getSeedActivities(budget: number, vibe: string): Activity[] {
  const exact = SEED_ACTIVITIES.filter(
    (a) => a.estimatedCostPerPerson <= budget && a.vibes.includes(vibe as any)
  );
  if (exact.length >= 3) {
    return exact.slice(0, 3);
  }
  const others = SEED_ACTIVITIES.filter(
    (a) => a.estimatedCostPerPerson <= budget && !exact.some((e) => e.id === a.id)
  );
  return [...exact, ...others].slice(0, 3);
}
