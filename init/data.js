// Sample data to initialize DB
const sampleListings = [
  
  {
    title: "Cozy Studio Apartment in Central Delhi",
    description:
      "A bright and comfortable studio apartment in a convenient part of New Delhi, offering a practical space for both short city breaks and longer stays. The compact layout combines a cosy living area with a simple kitchenette, while the central setting makes it convenient to explore Delhi's markets, historic landmarks, restaurants and other major attractions.",
    image: {
      filename: "listingimage",
      url: "https://images.pexels.com/photos/6186815/pexels-photo-6186815.jpeg?auto=compress&cs=tinysrgb&w=2400&q=90",
    },
    price: 4500,
    location: "New Delhi",
    country: "India",
    category: "Rooms",
  },

  {
    title: "Sea View Room Near Marine Drive",
    description:
      "A comfortable sea-facing room designed for travellers looking to experience Mumbai from a convenient South Mumbai location. The relaxed interior provides a pleasant place to unwind after exploring the city, while the location offers easy access to Marine Drive, the waterfront and some of Mumbai's popular neighbourhoods and attractions.",
    image: {
      filename: "listingimage",
      url: "https://images.pexels.com/photos/14746032/pexels-photo-14746032.jpeg?auto=compress&cs=tinysrgb&w=2400&q=90",
    },
    price: 5500,
    location: "Mumbai",
    country: "India",
    category: "Rooms",
  },

  {
    title: "Modern Apartment in Central Tokyo",
    description:
      "A clean and contemporary apartment offering a comfortable base for discovering Tokyo. Its modern interior and practical layout make it suitable for travellers who want to spend their days exploring the city's neighbourhoods, shopping areas, restaurants and cultural attractions before returning to a calm place to relax.",
    image: {
      filename: "listingimage",
      url: "https://images.pexels.com/photos/32389433/pexels-photo-32389433.jpeg?auto=compress&cs=tinysrgb&w=2400&q=90",
    },
    price: 8000,
    location: "Tokyo",
    country: "Japan",
    category: "Rooms",
  },

  // BEACHES
  {
    title: "Beachfront Villa in North Goa",
    description:
      "A relaxed coastal villa for travellers looking to enjoy the easy-going atmosphere of North Goa. Its beachside setting makes it suitable for slow mornings, sunset walks and peaceful evenings, while the surrounding area provides plenty of opportunities to explore Goa's beaches, cafés, local markets and coastal attractions.",
    image: {
      filename: "listingimage",
      url: "https://images.pexels.com/photos/19757179/pexels-photo-19757179.jpeg?auto=compress&cs=tinysrgb&w=2400&q=90",
    },
    price: 7500,
    location: "Goa",
    country: "India",
    category: "Beaches",
  },

  {
    title: "Beachfront Bungalow in Bali",
    description:
      "A laid-back beachfront bungalow surrounded by a tropical coastal atmosphere, offering a peaceful setting for a Bali getaway. The property is suited to travellers who want to slow down, enjoy the shoreline and experience Bali's relaxed island lifestyle while still having the opportunity to explore nearby beaches, cafés and local attractions.",
    image: {
      filename: "listingimage",
      url: "https://images.pexels.com/photos/36496673/pexels-photo-36496673.jpeg?auto=compress&cs=tinysrgb&w=2400&q=90",
    },
    price: 9000,
    location: "Bali",
    country: "Indonesia",
    category: "Beaches",
  },

  {
    title: "Luxury Overwater Villa in the Maldives",
    description:
      "A luxurious overwater-style retreat surrounded by the clear blue waters of the Maldives, created for travellers seeking a peaceful island escape. The setting offers the distinctive tropical experience the Maldives is known for, making it an appealing choice for relaxing days, beautiful ocean views and an unhurried holiday atmosphere.",
    image: {
      filename: "listingimage",
      url: "https://images.pexels.com/photos/28843944/pexels-photo-28843944.jpeg?auto=compress&cs=tinysrgb&w=2400&q=90",
    },
    price: 25000,
    location: "Maldives",
    country: "Maldives",
    category: "Beaches",
  },

  // POPULAR CITIES
  {
    title: "Heritage Haveli in the Pink City",
    description:
      "A character-filled heritage stay inspired by the traditional architecture and rich cultural identity of Jaipur. With its historic atmosphere and distinctive details, the property provides a memorable base for discovering the Pink City's forts, palaces, colourful markets, local cuisine and vibrant streets.",
    image: {
      filename: "listingimage",
      url: "https://images.pexels.com/photos/36562003/pexels-photo-36562003.jpeg?auto=compress&cs=tinysrgb&w=2400&q=90",
    },
    price: 6500,
    location: "Jaipur",
    country: "India",
    category: "Popular cities",
  },

  {
    title: "Modern Loft in Manhattan",
    description:
      "A stylish city loft with a contemporary feel, offering a comfortable base for experiencing the energy of Manhattan. The open character of the space suits travellers who want to explore the city's neighbourhoods, restaurants, shopping districts, cultural landmarks and famous skyline before returning to a relaxed urban setting.",
    image: {
      filename: "listingimage",
      url: "https://images.pexels.com/photos/5411781/pexels-photo-5411781.jpeg?auto=compress&cs=tinysrgb&w=2400&q=90",
    },
    price: 12000,
    location: "New York City",
    country: "United States",
    category: "Popular cities",
  },

  {
    title: "Elegant City Apartment in Paris",
    description:
      "An elegant city apartment with a warm and refined atmosphere, designed for travellers who want to experience Paris at a comfortable pace. Its urban setting makes it a convenient starting point for discovering Parisian cafés, charming streets, cultural landmarks, museums, shopping areas and the city's iconic architecture.",
    image: {
      filename: "listingimage",
      url: "https://images.pexels.com/photos/31543031/pexels-photo-31543031.jpeg?auto=compress&cs=tinysrgb&w=2400&q=90",
    },
    price: 14000,
    location: "Paris",
    country: "France",
    category: "Popular cities",
  },


  // MOUNTAIN CITIES
  {
    title: "Cozy Himalayan Cottage in Manali",
    description:
      "A peaceful cottage surrounded by the natural beauty of the Himalayas, offering a cosy retreat away from busy city life. It is well suited for travellers who want to enjoy Manali's mountain scenery, nearby valleys and outdoor experiences before returning to a quiet and comfortable place in the evening.",
    image: {
      filename: "listingimage",
      url: "https://images.pexels.com/photos/939715/pexels-photo-939715.jpeg?auto=compress&cs=tinysrgb&w=2400&q=90",
    },
    price: 5500,
    location: "Manali",
    country: "India",
    category: "Mountain cities",
  },

  {
    title: "Hilltop Retreat in Mussoorie",
    description:
      "A peaceful hill-station retreat surrounded by the scenic landscape of Mussoorie, offering a refreshing break from the pace of city life. The setting is ideal for travellers who enjoy cool mountain air, misty views, quiet walks and relaxed weekends surrounded by the natural charm of the hills.",
    image: {
      filename: "listingimage",
      url: "https://images.pexels.com/photos/30495320/pexels-photo-30495320.jpeg",
    },
    price: 5000,
    location: "Mussoorie",
    country: "India",
    category: "Mountain cities",
  },

  {
    title: "Mountain Cabin in Banff",
    description:
      "A rustic cabin-style retreat surrounded by the dramatic scenery of the Canadian Rockies. The property offers a peaceful mountain atmosphere for travellers who want to spend their time enjoying nature, scenic landscapes and outdoor experiences while having a cosy place to return to after a day of exploring Banff.",
    image: {
      filename: "listingimage",
      url: "https://images.pexels.com/photos/30274795/pexels-photo-30274795.jpeg?auto=compress&cs=tinysrgb&w=2400&q=90",
    },
    price: 11000,
    location: "Banff",
    country: "Canada",
    category: "Mountain cities",
  },

  // CAMPING
  {
    title: "Riverside Retreat in Rishikesh",
    description:
      "A peaceful riverside retreat inspired by the natural surroundings of Rishikesh and the Ganges. It provides a relaxed base for travellers interested in river views, nature, local experiences and the adventurous side of the region, while keeping the atmosphere calm and close to the outdoors.",
    image: {
      filename: "listingimage",
      url: "https://images.pexels.com/photos/19511794/pexels-photo-19511794.jpeg?auto=compress&cs=tinysrgb&w=2400&q=90",
    },
    price: 4500,
    location: "Rishikesh",
    country: "India",
    category: "Camping",
  },

  {
    title: "Forest Treehouse Retreat",
    description:
      "A cosy treehouse-style retreat surrounded by greenery, offering a peaceful escape for travellers who want to spend more time close to nature. The forest setting creates a quiet atmosphere away from busy urban surroundings and makes the stay especially appealing for a relaxing outdoor-focused getaway.",
    image: {
      filename: "listingimage",
      url: "https://images.pexels.com/photos/34659092/pexels-photo-34659092.jpeg?auto=compress&cs=tinysrgb&w=2400&q=90",
    },
    price: 6500,
    location: "Portland",
    country: "United States",
    category: "Camping",
  },

  {
    title: "Safari Lodge Near the Serengeti",
    description:
      "A nature-focused lodge-style retreat near the Serengeti, offering an atmospheric setting for travellers interested in Tanzania's famous landscapes and wildlife regions. The surrounding environment provides a memorable alternative to a conventional city stay and makes the property well suited to an adventure-oriented holiday.",
    image: {
      filename: "listingimage",
      url: "https://images.pexels.com/photos/18611231/pexels-photo-18611231.jpeg?auto=compress&cs=tinysrgb&w=2400&q=90",
    },
    price: 18000,
    location: "Serengeti National Park",
    country: "Tanzania",
    category: "Camping",
  },

  // SNOW
  {
    title: "Snowy Mountain Lodge in Gulmarg",
    description:
      "A warm and inviting mountain lodge surrounded by the snowy landscape of Gulmarg. The winter setting makes it an excellent base for travellers who want to experience Kashmir during the colder months, enjoy the mountain scenery and spend peaceful evenings surrounded by snow-covered landscapes.",
    image: {
      filename: "listingimage",
      url: "https://images.pexels.com/photos/10797247/pexels-photo-10797247.jpeg?auto=compress&cs=tinysrgb&w=2400&q=90",
    },
    price: 7000,
    location: "Gulmarg",
    country: "India",
    category: "Snow",
  },

  {
    title: "Luxury Ski Chalet in Aspen",
    description:
      "A comfortable winter retreat surrounded by the mountain scenery associated with Aspen. The property is suited to travellers planning a snow-filled getaway who want to experience the area's winter atmosphere, scenic landscapes and outdoor activities while returning to a warm and relaxing setting.",
    image: {
      filename: "listingimage",
      url: "https://images.pexels.com/photos/19835172/pexels-photo-19835172.jpeg?auto=compress&cs=tinysrgb&w=2400&q=90",
    },
    price: 22000,
    location: "Aspen",
    country: "United States",
    category: "Snow",
  },

  {
    title: "Alpine Ski Chalet in Verbier",
    description:
      "A classic alpine-style chalet surrounded by the snowy mountain landscape of Verbier, offering a peaceful setting for a Swiss winter escape. The property suits travellers looking to enjoy the atmosphere of the Alps, scenic mountain surroundings and the outdoor experiences that make Verbier a popular winter destination.",
    image: {
      filename: "listingimage",
      url: "https://images.pexels.com/photos/32795206/pexels-photo-32795206.jpeg?auto=compress&cs=tinysrgb&w=2400&q=90",
    },
    price: 24000,
    location: "Verbier",
    country: "Switzerland",
    category: "Snow",
  },

  // HOUSEBOAT
  {
    title: "Houseboat on Dal Lake",
    description:
      "A traditional houseboat-style stay set against the beautiful scenery of Dal Lake, with the surrounding mountains adding to the atmosphere. It offers travellers a distinctive way to experience Srinagar, combining peaceful waterside surroundings with the cultural character and natural beauty of Kashmir.",
    image: {
      filename: "listingimage",
      url: "https://images.pexels.com/photos/13827306/pexels-photo-13827306.jpeg?auto=compress&cs=tinysrgb&w=2400&q=90",
    },
    price: 7000,
    location: "Srinagar",
    country: "India",
    category: "Houseboat",
  },

  {
    title: "Kerala Backwater Houseboat",
    description:
      "A relaxed houseboat experience surrounded by Kerala's peaceful backwaters, waterways and tropical greenery. The slow-moving surroundings make it well suited to travellers who want to step away from busy schedules, enjoy the scenery and experience a quieter side of Kerala from the water.",
    image: {
      filename: "listingimage",
      url: "https://images.pexels.com/photos/33249971/pexels-photo-33249971.jpeg?auto=compress&cs=tinysrgb&w=2400&q=90",
    },
    price: 8500,
    location: "Alleppey",
    country: "India",
    category: "Houseboat",
  },

  {
    title: "Historic Canal House in Amsterdam",
    description:
      "A characterful canal-side stay inspired by Amsterdam's distinctive historic architecture and waterways. The setting offers a memorable city experience for travellers who want to explore Amsterdam's canals, narrow streets, museums, cafés and historic neighbourhoods while staying close to the city's unique atmosphere.",
    image: {
      filename: "listingimage",
      url: "https://images.pexels.com/photos/31173361/pexels-photo-31173361.jpeg?auto=compress&cs=tinysrgb&w=2400&q=90",
    },
    price: 14000,
    location: "Amsterdam",
    country: "Netherlands",
    category: "Houseboat",
  },

  // FARMS
  {
    title: "Tea Estate Cottage in Munnar",
    description:
      "A peaceful cottage surrounded by the rolling tea landscapes that make Munnar one of Kerala's most scenic hill destinations. The setting is ideal for travellers looking for a slower getaway filled with greenery, cool mountain surroundings and the distinctive beauty of the Western Ghats.",
    image: {
      filename: "listingimage",
      url: "https://images.pexels.com/photos/34863701/pexels-photo-34863701.jpeg?auto=compress&cs=tinysrgb&w=2400&q=90",
    },
    price: 5000,
    location: "Munnar",
    country: "India",
    category: "Farms",
  },

  {
    title: "Countryside Cottage in the Cotswolds",
    description:
      "A charming countryside cottage with the traditional character associated with the Cotswolds. Surrounded by a peaceful rural atmosphere, it is suited to travellers looking for quiet weekends, scenic walks, village experiences and a slower pace away from busy city destinations.",
    image: {
      filename: "listingimage",
      url: "https://images.pexels.com/photos/31147896/pexels-photo-31147896.jpeg?auto=compress&cs=tinysrgb&w=2400&q=90",
    },
    price: 9000,
    location: "Cotswolds",
    country: "United Kingdom",
    category: "Farms",
  },

  {
    title: "Vineyard Villa in Tuscany",
    description:
      "A countryside villa surrounded by the rolling landscapes and rural charm of Tuscany, offering a peaceful setting for an Italian escape. The property is suited to travellers who want to slow down, enjoy scenic countryside views and experience the relaxed character of Tuscany away from crowded city centres.",
    image: {
      filename: "listingimage",
      url: "https://images.pexels.com/photos/15508429/pexels-photo-15508429.jpeg?auto=compress&cs=tinysrgb&w=2400&q=90",
    },
    price: 16000,
    location: "Tuscany",
    country: "Italy",
    category: "Farms",
  },

  // AMAZING POOLS
  {
    title: "Private Pool Villa in Goa",
    description:
      "A spacious tropical-style villa centred around a private pool, offering a relaxed setting for a comfortable Goa holiday. It is suited to travellers who want to balance time spent exploring the beaches and coastal attractions with slower days spent enjoying a private and peaceful retreat.",
    image: {
      filename: "listingimage",
      url: "https://images.pexels.com/photos/35808145/pexels-photo-35808145.jpeg?auto=compress&cs=tinysrgb&w=2400&q=90",
    },
    price: 9000,
    location: "Goa",
    country: "India",
    category: "Amazing Pools",
  },

  {
    title: "Tropical Infinity Pool Villa in Phuket",
    description:
      "A tropical villa with an inviting pool and a relaxed holiday atmosphere, designed for travellers looking for a comfortable stay in Phuket. The combination of a resort-like setting and tropical surroundings makes it suitable for peaceful days by the water as well as exploring Phuket's beaches and local attractions.",
    image: {
      filename: "listingimage",
      url: "https://images.pexels.com/photos/36765626/pexels-photo-36765626.jpeg?auto=compress&cs=tinysrgb&w=2400&q=90",
    },
    price: 15000,
    location: "Phuket",
    country: "Thailand",
    category: "Amazing Pools",
  },

  {
    title: "Desert Oasis Villa with Private Pool",
    description:
      "A modern villa retreat that combines a private pool with the distinctive atmosphere of Dubai's desert surroundings. The property offers a peaceful contrast to the city's busy energy and is suited to travellers looking for a comfortable private escape while still being able to explore Dubai's attractions.",
    image: {
      filename: "listingimage",
      url: "https://images.pexels.com/photos/10647349/pexels-photo-10647349.jpeg?auto=compress&cs=tinysrgb&w=2400&q=90",
    },
    price: 20000,
    location: "Dubai",
    country: "United Arab Emirates",
    category: "Amazing Pools",
  },

  // CASTLES
  {
    title: "Royal Heritage Haveli in Udaipur",
    description:
      "A heritage-inspired stay that reflects the royal architectural character of Udaipur and its historic surroundings. Its setting near Lake Pichola makes it a memorable choice for travellers who want to experience the city's palaces, lakeside views, old-world streets and rich cultural atmosphere.",
    image: {
      filename: "listingimage",
      url: "https://images.pexels.com/photos/35455626/pexels-photo-35455626.jpeg?auto=compress&cs=tinysrgb&w=2400&q=90",
    },
    price: 7500,
    location: "Udaipur",
    country: "India",
    category: "Castles",
  },

  {
    title: "Historic Castle in the Scottish Highlands",
    description:
      "A dramatic heritage-style stay surrounded by the rugged landscapes of the Scottish Highlands. The historic character of the setting makes it especially appealing to travellers interested in Scotland's scenery, historic architecture, quiet countryside and memorable experiences away from major cities.",
    image: {
      filename: "listingimage",
      url: "https://images.pexels.com/photos/37177740/pexels-photo-37177740.jpeg?auto=compress&cs=tinysrgb&w=2400&q=90",
    },
    price: 22000,
    location: "Scottish Highlands",
    country: "United Kingdom",
    category: "Castles",
  },
];

//exporting the sampleListings array in the form of an object
module.exports = { data: sampleListings };