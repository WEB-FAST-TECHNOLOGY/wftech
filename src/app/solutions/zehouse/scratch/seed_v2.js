/**
 * Seed v2 — insère 20 annonces réalistes dans user_listings
 * Utilise un user_id statique (le premier profil récupéré en public read)
 * Lance : node seed_v2.js
 */

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://iigudvprhfjpulneisad.supabase.co';
// anon key (lecture publique uniquement selon RLS)
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpZ3VkdnByaGZqcHVsbmVpc2FkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc3NjMwNDAsImV4cCI6MjA5MzMzOTA0MH0.1bFApsaDXz0d8xOD2pmyrs9fHZsR2BHl_z272_0myNA';

const supabase = createClient(supabaseUrl, supabaseKey);

// Coordonnées Yaoundé centre
const baseLat = 3.8480;
const baseLng = 11.5021;

const images = [
  'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg',
  'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg',
  'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg',
  'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg',
  'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg',
  'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg',
  'https://images.pexels.com/photos/53610/large-home-residential-house-architecture-53610.jpeg',
  'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg',
  'https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg',
  'https://images.pexels.com/photos/209296/pexels-photo-209296.jpeg',
  'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg',
  'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
  'https://images.pexels.com/photos/2404949/pexels-photo-2404949.jpeg',
  'https://images.pexels.com/photos/1547358/pexels-photo-1547358.jpeg',
  'https://images.pexels.com/photos/963826/pexels-photo-963826.jpeg',
  'https://images.pexels.com/photos/259962/pexels-photo-259962.jpeg',
  'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
  'https://images.pexels.com/photos/2416472/pexels-photo-2416472.jpeg',
  'https://images.pexels.com/photos/1428348/pexels-photo-1428348.jpeg',
  'https://images.pexels.com/photos/2089698/pexels-photo-2089698.jpeg',
];

const data = [
  { title: 'Appartement de Luxe République',        address: 'Rue 1021, Quartier République, Yaoundé',   property_type:'Appartement', listing_type:'sale',  price:65000000,  surface:120, rooms:4, lat:3.8580, lng:11.5121 },
  { title: 'Villa Prestige Bastos',                 address: 'Avenue des Cocotiers, Bastos, Yaoundé',      property_type:'Villa',       listing_type:'sale',  price:180000000, surface:350, rooms:7, lat:3.8720, lng:11.5250 },
  { title: 'Studio Confortable Omnisports',         address: 'Av. Germaine, Omnisports, Yaoundé',          property_type:'Studio',      listing_type:'rent',  price:180000,    surface:32,  rooms:1, lat:3.8410, lng:11.4980 },
  { title: 'Maison Familiale Emana',                address: 'Quartier Emana, Yaoundé',                   property_type:'Maison',       listing_type:'sale',  price:45000000,  surface:200, rooms:5, lat:3.9200, lng:11.5800 },
  { title: 'Bureau Moderne Centre-ville',           address: 'Bd du 20 Mai, Centre-ville, Yaoundé',        property_type:'Bureau',      listing_type:'rent',  price:350000,    surface:80,  rooms:3, lat:3.8650, lng:11.5150 },
  { title: 'Duplex Standing Odza',                  address: 'Carrefour Odza, Yaoundé',                    property_type:'Appartement', listing_type:'rent',  price:280000,    surface:110, rooms:4, lat:3.8100, lng:11.5600 },
  { title: 'Appartement Cosy Tsinga',               address: 'Quartier Tsinga, Yaoundé',                   property_type:'Appartement', listing_type:'rent',  price:150000,    surface:55,  rooms:2, lat:3.8850, lng:11.5020 },
  { title: 'Villa Oasis Golf',                      address: 'Golf Club de Yaoundé, Yaoundé',              property_type:'Villa',       listing_type:'sale',  price:250000000, surface:600, rooms:10,lat:3.8950, lng:11.4880 },
  { title: 'Studio Équipé Messassi',                address: 'Carrefour Messassi, Yaoundé',                property_type:'Studio',      listing_type:'rent',  price:120000,    surface:28,  rooms:1, lat:3.8300, lng:11.4750 },
  { title: 'Maison de Charme Ngousso',              address: 'Rue Ngousso, Yaoundé',                       property_type:'Maison',       listing_type:'sale',  price:38000000,  surface:180, rooms:4, lat:3.8550, lng:11.5350 },
  { title: 'Bureaux Lumineux Hippodrome',           address: 'Hippodrome, Yaoundé',                        property_type:'Bureau',      listing_type:'rent',  price:420000,    surface:150, rooms:5, lat:3.8780, lng:11.5380 },
  { title: 'Penthouse Vue Panoramique',             address: 'Tour Siantou, Nlongkak, Yaoundé',            property_type:'Appartement', listing_type:'sale',  price:120000000, surface:240, rooms:6, lat:3.8620, lng:11.5080 },
  { title: 'Studio Moderne Chapelle',               address: 'Quartier Chapelle, Yaoundé',                 property_type:'Studio',      listing_type:'rent',  price:95000,     surface:25,  rooms:1, lat:3.8440, lng:11.5200 },
  { title: 'Villa Contemporaine Santa Barbara',     address: 'Résidence Santa Barbara, Yaoundé',           property_type:'Villa',       listing_type:'sale',  price:195000000, surface:450, rooms:8, lat:3.8980, lng:11.5100 },
  { title: 'Appartement Design Nlongkak',           address: 'Rue 1428, Nlongkak, Yaoundé',                property_type:'Appartement', listing_type:'rent',  price:230000,    surface:75,  rooms:3, lat:3.8600, lng:11.5050 },
  { title: 'Maison Spacieuse Mendong',              address: 'Quartier Mendong, Yaoundé',                  property_type:'Maison',       listing_type:'sale',  price:30000000,  surface:160, rooms:4, lat:3.8050, lng:11.4900 },
  { title: 'Studio Pratique Mvan',                  address: 'Carrefour Mvan, Yaoundé',                    property_type:'Studio',      listing_type:'rent',  price:85000,     surface:22,  rooms:1, lat:3.8200, lng:11.5400 },
  { title: 'Bureaux High-Tech Gendarmerie',         address: 'Carrefour Gendarmerie, Yaoundé',             property_type:'Bureau',      listing_type:'rent',  price:500000,    surface:200, rooms:6, lat:3.8680, lng:11.5280 },
  { title: 'Villa avec Piscine Bastos',             address: 'Avenue Bastos, Yaoundé',                     property_type:'Villa',       listing_type:'sale',  price:320000000, surface:800, rooms:12,lat:3.8760, lng:11.5220 },
  { title: 'Appartement Rénové Briqueterie',        address: 'Quartier Briqueterie, Yaoundé',              property_type:'Appartement', listing_type:'rent',  price:175000,    surface:60,  rooms:2, lat:3.8700, lng:11.5170 },
];

const descriptions = [
  "Magnifique propriété idéalement située avec toutes les commodités à proximité. Sécurité 24h/24, parking privé, gardiennage.",
  "Espace moderne avec finitions de qualité supérieure. Idéal pour cadres ou familles ambitieuses, lumineux et spacieux.",
  "Studio cosy entièrement meublé avec parking sécurisé et gardiennage 24/7. Internet inclus, cuisine équipée.",
  "Splendide villa d'architecte avec piscine, grand jardin et vue panoramique sur les collines. Finitions haut de gamme.",
  "Bureaux professionnels équipés et climatisés, prêts à l'emploi dans un quartier d'affaires dynamique.",
  "Duplex lumineux avec terrasse, parking double, et accès aux commodités. Idéal pour famille ou colocation premium.",
  "Appartement bien agencé avec cuisine américaine ouverte. Immeuble sécurisé avec gardien et interphone.",
  "Villa exceptionnelle sur grand terrain arboré. Salon de réception, piscine, terrain de tennis et dépendances.",
  "Studio tout confort, idéal pour étudiant ou jeune professionnel. Meublé avec goût, internet fibre optique inclus.",
  "Maison de charme avec jardin fleuri, salon spacieux et chambres lumineuses. Quartier calme et résidentiel.",
  "Plateaux de bureaux aménagés en open space ou bureaux fermés selon besoin. Salle de conférence équipée.",
  "Penthouse exceptionnel avec vue à 360° sur la ville. Terrasse panoramique, domotique, garage double sécurisé.",
  "Studio compact et fonctionnel, idéalement situé. Transport en commun à 2 minutes. Parfait pour jeune actif.",
  "Villa contemporaine de prestige dans résidence fermée sécurisée. 4 chambres en suite, piscine, home cinéma.",
  "Appartement design avec cuisiniste intégré, parquet en chêne, grande baie vitrée. Copropriété avec ascenseur.",
  "Maison de 4 chambres avec cour, jardin et véranda. Idéal pour grande famille. Quartier calme et bien desservi.",
  "Studio meublé et équipé. Connexion WiFi haut débit, lit double, TV, réfrigérateur. Disponible immédiatement.",
  "Bureaux de prestige avec salle de réunion, coworking, espace détente et accueil intégré. Parking visiteurs.",
  "Villa sompteuse avec piscine à débordement, terrasse panoramique, salon de réception pour 100 personnes.",
  "Appartement entièrement rénové avec matériaux premium. Cuisine moderne, salle de bains design, terrasse.",
];

async function seed() {
  // Récupérer le premier profil pour user_id
  const { data: profiles, error: pErr } = await supabase
    .from('user_profiles')
    .select('id')
    .limit(1);

  let userId;
  if (pErr || !profiles || profiles.length === 0) {
    console.log('Aucun profil trouvé, utilisation d\'un UUID de fallback');
    userId = '00000000-0000-0000-0000-000000000001';
  } else {
    userId = profiles[0].id;
    console.log('User ID récupéré :', userId);
  }

  // Vérifier si des annonces existent déjà
  const { count } = await supabase
    .from('user_listings')
    .select('*', { count: 'exact', head: true });

  if (count && count >= 10) {
    console.log(`Il y a déjà ${count} annonce(s) dans la base. Suppression et re-seed...`);
    await supabase.from('user_listings').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  }

  const listings = data.map((item, i) => ({
    user_id: userId,
    title: item.title,
    description: descriptions[i % descriptions.length],
    listing_type: item.listing_type,
    property_type: item.property_type,
    price: item.price,
    surface: item.surface,
    rooms: item.rooms,
    address: item.address,
    lat: item.lat,
    lng: item.lng,
    image_url: images[i % images.length],
    is_active: true,
  }));

  const { data: inserted, error } = await supabase
    .from('user_listings')
    .insert(listings)
    .select();

  if (error) {
    console.error('Erreur lors du seed :', JSON.stringify(error, null, 2));
  } else {
    console.log(`Seed réussi ! ${inserted.length} annonces insérées.`);
    inserted.forEach((l, i) => console.log(`  [${i+1}] ${l.title} → lat:${l.lat} lng:${l.lng}`));
  }
}

seed().catch(console.error);
