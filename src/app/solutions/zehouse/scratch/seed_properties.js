const { createClient } = require('@supabase/supabase-js');

// Config
const supabaseUrl = 'https://iigudvprhfjpulneisad.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpZ3VkdnByaGZqcHVsbmVpc2FkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc3NjMwNDAsImV4cCI6MjA5MzMzOTA0MH0.1bFApsaDXz0d8xOD2pmyrs9fHZsR2BHl_z272_0myNA';

const supabase = createClient(supabaseUrl, supabaseKey);

// Yaoundé center coordinates: lat = 3.8480, lng = 11.5021
const baseLat = 3.8480;
const baseLng = 11.5021;

const PROP_TYPES = ['Appartement', 'Maison', 'Studio', 'Villa', 'Bureau'];
const LISTING_TYPES = ['sale', 'rent'];

const descriptions = [
  "Magnifique propriété idéalement située avec toutes les commodités à proximité.",
  "Espace moderne avec finitions de qualité supérieure, idéal pour cadres ou familles.",
  "Studio cosy entièrement meublé avec parking sécurisé et gardiennage 24/7.",
  "Splendide villa d'architecte avec piscine, grand jardin et vue panoramique sur les collines.",
  "Bureaux professionnels équipés et climatisés, prêts à l'emploi dans quartier d'affaires."
];

const titles = [
  "Appartement de Luxe République", "Villa Prestige Bastos", "Studio Confortable Omnisports",
  "Maison Familiale Emana", "Bureau Moderne Centre-ville", "Duplex Standing Odza",
  "Appartement Cosy Tsinga", "Villa Oasis Golf", "Studio Équipé Messassi",
  "Maison de Charme Ngousso", "Bureaux Lumineux Hippodrome", "Penthouse Vue Panoramique",
  "Studio Moderne Chapelle", "Villa Contemporaine Santa Barbara", "Appartement Design Nlongkak",
  "Maison Spacieuse Mendong", "Studio Pratique Mvan", "Bureaux High-Tech Gendarmerie",
  "Villa avec Piscine Bastos", "Appartement Rénové Briqueterie"
];

const neighborhoods = [
  "Bastos", "Omnisports", "Emana", "Centre-ville", "Odza", "Tsinga", "Golf", 
  "Messassi", "Ngousso", "Hippodrome", "Mendong", "Mvan", "Nlongkak"
];

async function seedFakeProperties() {
  // Let's get a valid user ID from auth schema first
  const { data: usersData, error: err } = await supabase.auth.admin.listUsers();
  let userId;
  if (usersData && usersData.users && usersData.users.length > 0) {
    userId = usersData.users[0].id;
  } else {
    // Try profiles again or fallback to standard system ID
    const { data: profiles } = await supabase.from('user_profiles').select('*').limit(1);
    if (profiles && profiles.length > 0) {
      userId = profiles[0].id;
    } else {
      userId = 'd0c9f802-5e3e-4fb8-bb65-cb6bb2cf0912'; // Fallback uuid
    }
  }

  const listings = [];

  for (let i = 0; i < 20; i++) {
    const type = PROP_TYPES[i % PROP_TYPES.length];
    const op = LISTING_TYPES[i % LISTING_TYPES.length];
    const price = op === 'sale' 
      ? (35000000 + (i * 2500000)) 
      : (150000 + (i * 15000));
    
    const latOffset = (Math.random() - 0.5) * 0.08;
    const lngOffset = (Math.random() - 0.5) * 0.08;

    listings.push({
      user_id: userId,
      title: titles[i],
      description: descriptions[i % descriptions.length],
      listing_type: op,
      property_type: type,
      price: price,
      surface: 45 + (i * 12),
      rooms: 1 + (i % 5),
      address: `Rue ${100 + i}, ${neighborhoods[i % neighborhoods.length]}, Yaoundé`,
      lat: baseLat + latOffset,
      lng: baseLng + lngOffset,
      image_url: `https://images.pexels.com/photos/${1000000 + (i * 150000)}/pexels-photo-${1000000 + (i * 150000)}.jpeg`,
      is_active: true
    });
  }

  const { data, error } = await supabase.from('user_listings').insert(listings).select();
  if (error) {
    console.error("Error seeding listings:", error);
  } else {
    console.log(`Successfully seeded ${data.length} listings !`);
  }
}

seedFakeProperties();
