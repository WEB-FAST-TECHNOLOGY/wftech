-- ══════════════════════════════════════════════════════════════════════
-- Script SQL : Seed de 20 annonces immobilières pour Zehouse
-- À exécuter dans : Supabase Dashboard → SQL Editor
-- ══════════════════════════════════════════════════════════════════════

-- 1. Récupérer un user_id valide depuis user_profiles
DO $$
DECLARE
  v_user_id UUID;
BEGIN
  -- Tenter de récupérer un utilisateur existant
  SELECT id INTO v_user_id FROM user_profiles LIMIT 1;
  
  -- Si aucun utilisateur n'existe, utiliser un UUID fixe de démo
  IF v_user_id IS NULL THEN
    -- D'abord créer un profil de démo si besoin
    RAISE NOTICE 'Aucun profil trouvé - les annonces seront orphelines. Créez un compte d''abord.';
    RETURN;
  END IF;

  RAISE NOTICE 'Insertion avec user_id = %', v_user_id;

  -- 2. Supprimer les vieilles annonces de démo (optionnel)
  -- DELETE FROM user_listings WHERE user_id = v_user_id;

  -- 3. Insérer les 20 annonces
  INSERT INTO user_listings (user_id, title, description, listing_type, property_type, price, surface, rooms, address, lat, lng, image_url, is_active) VALUES
  (v_user_id, 'Appartement de Luxe République', 'Magnifique propriété idéalement située avec toutes les commodités à proximité. Sécurité 24h/24, parking privé, gardiennage.', 'sale', 'Appartement', 65000000, 120, 4, 'Rue 1021, Quartier République, Yaoundé', 3.8580, 11.5121, 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg', true),
  (v_user_id, 'Villa Prestige Bastos', 'Espace moderne avec finitions de qualité supérieure. Idéal pour cadres ou familles ambitieuses, lumineux et spacieux.', 'sale', 'Villa', 180000000, 350, 7, 'Avenue des Cocotiers, Bastos, Yaoundé', 3.8720, 11.5250, 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg', true),
  (v_user_id, 'Studio Confortable Omnisports', 'Studio cosy entièrement meublé avec parking sécurisé et gardiennage 24/7. Internet inclus, cuisine équipée.', 'rent', 'Studio', 180000, 32, 1, 'Av. Germaine, Omnisports, Yaoundé', 3.8410, 11.4980, 'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg', true),
  (v_user_id, 'Maison Familiale Emana', 'Splendide villa d''architecte avec piscine, grand jardin et vue panoramique sur les collines. Finitions haut de gamme.', 'sale', 'Maison', 45000000, 200, 5, 'Quartier Emana, Yaoundé', 3.9200, 11.5800, 'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg', true),
  (v_user_id, 'Bureau Moderne Centre-ville', 'Bureaux professionnels équipés et climatisés, prêts à l''emploi dans un quartier d''affaires dynamique.', 'rent', 'Bureau', 350000, 80, 3, 'Bd du 20 Mai, Centre-ville, Yaoundé', 3.8650, 11.5150, 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg', true),
  (v_user_id, 'Duplex Standing Odza', 'Duplex lumineux avec terrasse, parking double, et accès aux commodités. Idéal pour famille ou colocation premium.', 'rent', 'Appartement', 280000, 110, 4, 'Carrefour Odza, Yaoundé', 3.8100, 11.5600, 'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg', true),
  (v_user_id, 'Appartement Cosy Tsinga', 'Appartement bien agencé avec cuisine américaine ouverte. Immeuble sécurisé avec gardien et interphone.', 'rent', 'Appartement', 150000, 55, 2, 'Quartier Tsinga, Yaoundé', 3.8850, 11.5020, 'https://images.pexels.com/photos/53610/large-home-residential-house-architecture-53610.jpeg', true),
  (v_user_id, 'Villa Oasis Golf', 'Villa exceptionnelle sur grand terrain arboré. Salon de réception, piscine, terrain de tennis et dépendances.', 'sale', 'Villa', 250000000, 600, 10, 'Golf Club de Yaoundé, Yaoundé', 3.8950, 11.4880, 'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg', true),
  (v_user_id, 'Studio Équipé Messassi', 'Studio tout confort, idéal pour étudiant ou jeune professionnel. Meublé avec goût, internet fibre optique inclus.', 'rent', 'Studio', 120000, 28, 1, 'Carrefour Messassi, Yaoundé', 3.8300, 11.4750, 'https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg', true),
  (v_user_id, 'Maison de Charme Ngousso', 'Maison de charme avec jardin fleuri, salon spacieux et chambres lumineuses. Quartier calme et résidentiel.', 'sale', 'Maison', 38000000, 180, 4, 'Rue Ngousso, Yaoundé', 3.8550, 11.5350, 'https://images.pexels.com/photos/209296/pexels-photo-209296.jpeg', true),
  (v_user_id, 'Bureaux Lumineux Hippodrome', 'Plateaux de bureaux aménagés en open space ou bureaux fermés selon besoin. Salle de conférence équipée.', 'rent', 'Bureau', 420000, 150, 5, 'Hippodrome, Yaoundé', 3.8780, 11.5380, 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg', true),
  (v_user_id, 'Penthouse Vue Panoramique', 'Penthouse exceptionnel avec vue à 360° sur la ville. Terrasse panoramique, domotique, garage double sécurisé.', 'sale', 'Appartement', 120000000, 240, 6, 'Tour Siantou, Nlongkak, Yaoundé', 3.8620, 11.5080, 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg', true),
  (v_user_id, 'Studio Moderne Chapelle', 'Studio compact et fonctionnel, idéalement situé. Transport en commun à 2 minutes. Parfait pour jeune actif.', 'rent', 'Studio', 95000, 25, 1, 'Quartier Chapelle, Yaoundé', 3.8440, 11.5200, 'https://images.pexels.com/photos/2404949/pexels-photo-2404949.jpeg', true),
  (v_user_id, 'Villa Contemporaine Santa Barbara', 'Villa contemporaine de prestige dans résidence fermée sécurisée. 4 chambres en suite, piscine, home cinéma.', 'sale', 'Villa', 195000000, 450, 8, 'Résidence Santa Barbara, Yaoundé', 3.8980, 11.5100, 'https://images.pexels.com/photos/1547358/pexels-photo-1547358.jpeg', true),
  (v_user_id, 'Appartement Design Nlongkak', 'Appartement design avec cuisiniste intégré, parquet en chêne, grande baie vitrée. Copropriété avec ascenseur.', 'rent', 'Appartement', 230000, 75, 3, 'Rue 1428, Nlongkak, Yaoundé', 3.8600, 11.5050, 'https://images.pexels.com/photos/963826/pexels-photo-963826.jpeg', true),
  (v_user_id, 'Maison Spacieuse Mendong', 'Maison de 4 chambres avec cour, jardin et véranda. Idéal pour grande famille. Quartier calme et bien desservi.', 'sale', 'Maison', 30000000, 160, 4, 'Quartier Mendong, Yaoundé', 3.8050, 11.4900, 'https://images.pexels.com/photos/259962/pexels-photo-259962.jpeg', true),
  (v_user_id, 'Studio Pratique Mvan', 'Studio meublé et équipé. Connexion WiFi haut débit, lit double, TV, réfrigérateur. Disponible immédiatement.', 'rent', 'Studio', 85000, 22, 1, 'Carrefour Mvan, Yaoundé', 3.8200, 11.5400, 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg', true),
  (v_user_id, 'Bureaux High-Tech Gendarmerie', 'Bureaux de prestige avec salle de réunion, coworking, espace détente et accueil intégré. Parking visiteurs.', 'rent', 'Bureau', 500000, 200, 6, 'Carrefour Gendarmerie, Yaoundé', 3.8680, 11.5280, 'https://images.pexels.com/photos/2416472/pexels-photo-2416472.jpeg', true),
  (v_user_id, 'Villa avec Piscine Bastos', 'Villa sompteuse avec piscine à débordement, terrasse panoramique, salon de réception pour 100 personnes.', 'sale', 'Villa', 320000000, 800, 12, 'Avenue Bastos, Yaoundé', 3.8760, 11.5220, 'https://images.pexels.com/photos/1428348/pexels-photo-1428348.jpeg', true),
  (v_user_id, 'Appartement Rénové Briqueterie', 'Appartement entièrement rénové avec matériaux premium. Cuisine moderne, salle de bains design, terrasse.', 'rent', 'Appartement', 175000, 60, 2, 'Quartier Briqueterie, Yaoundé', 3.8700, 11.5170, 'https://images.pexels.com/photos/2089698/pexels-photo-2089698.jpeg', true);

  RAISE NOTICE '20 annonces insérées avec succès !';
END $$;
