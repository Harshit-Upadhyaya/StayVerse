require("dotenv").config({
  path: require("path").join(__dirname, "..", ".env"),
});

const mongoose = require("mongoose");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");

const initData = require("./data.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/StayVerseDB";
const OWNER_ID = "6a81a5f0720e044803562972";

const geocodingClient = mbxGeocoding({
  accessToken: process.env.MAP_TOKEN,
});

const reviewData = {
  "Cozy Studio Apartment in Central Delhi": [
    {
      author: "Aarav",
      rating: 5,
      comment:
        "The location was really convenient and the studio was clean and comfortable. A good option for a short Delhi stay.",
    },
    {
      author: "Meera",
      rating: 4,
      comment:
        "Nice little apartment in a convenient area. The room was comfortable and check-in was straightforward.",
    },
  ],

  "Sea View Room Near Marine Drive": [
    {
      author: "Rohan",
      rating: 5,
      comment:
        "The sea view was the highlight of the stay. The room was comfortable and Marine Drive was easy to reach.",
    },
    {
      author: "Kavya",
      rating: 4,
      comment:
        "Good location for exploring South Mumbai. The room was clean and the view was even better in the evening.",
    },
  ],

  "Modern Apartment in Central Tokyo": [
    {
      author: "Daniel",
      rating: 5,
      comment:
        "Very comfortable place to come back to after a busy day in Tokyo. The apartment felt clean and well organised.",
    },
    {
      author: "Nisha",
      rating: 4,
      comment:
        "A practical stay with a modern interior. The location made getting around the city much easier.",
    },
  ],

  "Beachfront Villa in North Goa": [
    {
      author: "Ananya",
      rating: 5,
      comment:
        "Loved the relaxed atmosphere and the beach access. It felt like a proper Goa holiday.",
    },
    {
      author: "Vikram",
      rating: 5,
      comment:
        "The location was excellent and the villa was comfortable. Sunset walks nearby were a nice bonus.",
    },
    {
      author: "Ishita",
      rating: 4,
      comment:
        "A peaceful place for a few days in Goa. The surroundings were beautiful and the stay was comfortable.",
    },
  ],

  "Beachfront Bungalow in Bali": [
    {
      author: "Sophie",
      rating: 5,
      comment:
        "Beautiful setting and a very relaxing stay. The beach nearby made the whole experience feel special.",
    },
    {
      author: "Arjun",
      rating: 4,
      comment:
        "Really enjoyed the tropical surroundings. A nice choice if you want a quieter Bali experience.",
    },
  ],

  "Luxury Overwater Villa in the Maldives": [
    {
      author: "Emma",
      rating: 5,
      comment:
        "The views were incredible and the setting was incredibly peaceful. It was exactly the kind of island escape we wanted.",
    },
    {
      author: "Kabir",
      rating: 5,
      comment:
        "Beautiful property and amazing surroundings. Watching the water from the villa was the best part.",
    },
  ],

  "Heritage Haveli in the Pink City": [
    {
      author: "Priya",
      rating: 5,
      comment:
        "The architecture gave the stay so much character. It was also a convenient base for exploring Jaipur.",
    },
    {
      author: "Aditya",
      rating: 4,
      comment:
        "Really liked the traditional feel of the property. The location worked well for our Jaipur trip.",
    },
  ],

  "Modern Loft in Manhattan": [
    {
      author: "Lucas",
      rating: 5,
      comment:
        "Great city stay with a comfortable interior. It was nice having a place to relax after exploring Manhattan.",
    },
    {
      author: "Riya",
      rating: 4,
      comment:
        "Stylish apartment in a useful location. The neighbourhood made it easy to explore different parts of the city.",
    },
  ],

  "Elegant City Apartment in Paris": [
    {
      author: "Claire",
      rating: 5,
      comment:
        "The apartment had a lovely atmosphere and was a comfortable base for exploring Paris.",
    },
    {
      author: "Rahul",
      rating: 4,
      comment:
        "A pleasant stay with a warm interior. We especially enjoyed walking around the neighbourhood in the evenings.",
    },
  ],

  "Cozy Himalayan Cottage in Manali": [
    {
      author: "Sahil",
      rating: 5,
      comment:
        "The mountain surroundings were beautiful and the cottage was a cosy place to relax after sightseeing.",
    },
    {
      author: "Neha",
      rating: 4,
      comment:
        "Peaceful location with lovely views. It was a comfortable stay for our Manali trip.",
    },
  ],

  "Hilltop Retreat in Mussoorie": [
    {
      author: "Varun",
      rating: 5,
      comment:
        "Very peaceful atmosphere and beautiful hill views. Perfect for a short break from the city.",
    },
    {
      author: "Sneha",
      rating: 4,
      comment:
        "The surroundings were quiet and relaxing. We enjoyed the cool weather and the hill-station feel.",
    },
  ],

  "Mountain Cabin in Banff": [
    {
      author: "Oliver",
      rating: 5,
      comment:
        "The mountain scenery around the cabin was fantastic. It was a great place to slow down and enjoy nature.",
    },
    {
      author: "Maya",
      rating: 5,
      comment:
        "Beautiful surroundings and a cosy atmosphere. The cabin made the trip feel much more special.",
    },
  ],

  "Riverside Retreat in Rishikesh": [
    {
      author: "Kunal",
      rating: 5,
      comment:
        "Loved the peaceful riverside setting. It was a relaxing stay and a good base for exploring Rishikesh.",
    },
    {
      author: "Simran",
      rating: 4,
      comment:
        "Nice atmosphere and a convenient location. The river surroundings made the stay very relaxing.",
    },
  ],

  "Forest Treehouse Retreat": [
    {
      author: "Ethan",
      rating: 5,
      comment:
        "Such a peaceful experience surrounded by trees. The treehouse was cosy and felt nicely away from the city.",
    },
    {
      author: "Aditi",
      rating: 4,
      comment:
        "A fun stay for anyone looking for something different. The forest setting was definitely the highlight.",
    },
  ],

  "Safari Lodge Near the Serengeti": [
    {
      author: "James",
      rating: 5,
      comment:
        "The setting made the stay memorable. It was an exciting base for experiencing the landscape around the Serengeti.",
    },
    {
      author: "Anika",
      rating: 5,
      comment:
        "Loved the atmosphere and the feeling of being close to nature. A very different experience from a normal city stay.",
    },
  ],

  "Snowy Mountain Lodge in Gulmarg": [
    {
      author: "Rajat",
      rating: 5,
      comment:
        "The snowy surroundings were beautiful and the lodge was a cosy place to return to after being outside.",
    },
    {
      author: "Tanya",
      rating: 4,
      comment:
        "Really enjoyed the winter atmosphere. Gulmarg looked beautiful and the stay was comfortable.",
    },
  ],

  "Luxury Ski Chalet in Aspen": [
    {
      author: "William",
      rating: 5,
      comment:
        "Beautiful winter setting and a very comfortable chalet. It made a great base for our Aspen trip.",
    },
    {
      author: "Sara",
      rating: 4,
      comment:
        "Lovely mountain surroundings and a relaxing interior. We had a very comfortable stay.",
    },
  ],

  "Alpine Ski Chalet in Verbier": [
    {
      author: "Leo",
      rating: 5,
      comment:
        "The alpine scenery was fantastic. The chalet had a peaceful atmosphere and was perfect for a winter getaway.",
    },
    {
      author: "Elena",
      rating: 5,
      comment:
        "A beautiful setting with plenty of mountain character. We really enjoyed the quiet surroundings.",
    },
  ],

  "Houseboat on Dal Lake": [
    {
      author: "Farhan",
      rating: 5,
      comment:
        "Staying on Dal Lake was the most memorable part of our Srinagar trip. The mountain views were beautiful.",
    },
    {
      author: "Pooja",
      rating: 4,
      comment:
        "A unique experience and a peaceful place to stay. The lake surroundings were lovely in the morning.",
    },
    {
      author: "Naveen",
      rating: 5,
      comment:
        "Really enjoyed the traditional houseboat experience. It made the trip feel much more special.",
    },
  ],

  "Kerala Backwater Houseboat": [
    {
      author: "Diya",
      rating: 5,
      comment:
        "The backwaters were so peaceful. It was a lovely way to experience Kerala at a slower pace.",
    },
    {
      author: "Manish",
      rating: 4,
      comment:
        "Beautiful surroundings and a relaxing experience. The waterways and greenery were the highlight.",
    },
  ],

  "Historic Canal House in Amsterdam": [
    {
      author: "Sophie",
      rating: 5,
      comment:
        "The canal-side setting was beautiful and made exploring Amsterdam feel even more enjoyable.",
    },
    {
      author: "Arjun",
      rating: 4,
      comment:
        "Great atmosphere and a convenient base for exploring the city. We especially liked the historic surroundings.",
    },
  ],

  "Tea Estate Cottage in Munnar": [
    {
      author: "Nikhil",
      rating: 5,
      comment:
        "The tea-covered hills made the stay incredibly peaceful. A great place to disconnect for a few days.",
    },
    {
      author: "Shreya",
      rating: 4,
      comment:
        "Loved the greenery and quiet surroundings. The cottage was a comfortable base for exploring Munnar.",
    },
  ],

  "Countryside Cottage in the Cotswolds": [
    {
      author: "George",
      rating: 5,
      comment:
        "The countryside setting was exactly what we were looking for. Quiet, comfortable and very charming.",
    },
    {
      author: "Emily",
      rating: 4,
      comment:
        "A lovely place for a relaxing weekend. We enjoyed the peaceful surroundings and nearby walks.",
    },
  ],

  "Vineyard Villa in Tuscany": [
    {
      author: "Marco",
      rating: 5,
      comment:
        "The countryside views were beautiful and the villa had a wonderfully relaxed atmosphere.",
    },
    {
      author: "Laura",
      rating: 5,
      comment:
        "A peaceful Tuscan escape with lovely surroundings. It was easy to forget about the busy routine here.",
    },
  ],

  "Private Pool Villa in Goa": [
    {
      author: "Rhea",
      rating: 5,
      comment:
        "The private pool was perfect for relaxing between outings. The villa had a great holiday atmosphere.",
    },
    {
      author: "Akash",
      rating: 4,
      comment:
        "Comfortable stay with plenty of space. We especially enjoyed having the pool to ourselves.",
    },
  ],

  "Tropical Infinity Pool Villa in Phuket": [
    {
      author: "Mia",
      rating: 5,
      comment:
        "The pool and tropical surroundings were beautiful. It was a very relaxing place to spend a few days.",
    },
    {
      author: "Dev",
      rating: 4,
      comment:
        "Great holiday atmosphere and a comfortable stay. The pool was definitely the favourite part.",
    },
  ],

  "Desert Oasis Villa with Private Pool": [
    {
      author: "Omar",
      rating: 5,
      comment:
        "The contrast between the modern villa and the desert surroundings was fantastic. Very comfortable stay.",
    },
    {
      author: "Zara",
      rating: 4,
      comment:
        "A peaceful place away from the busiest parts of Dubai. The private pool was a nice touch.",
    },
  ],

  "Royal Heritage Haveli in Udaipur": [
    {
      author: "Yash",
      rating: 5,
      comment:
        "The heritage atmosphere was beautiful and the location made exploring Udaipur very enjoyable.",
    },
    {
      author: "Ira",
      rating: 4,
      comment:
        "Loved the traditional character of the property. The surroundings around Lake Pichola were beautiful.",
    },
  ],

  "Historic Castle in the Scottish Highlands": [
    {
      author: "Thomas",
      rating: 5,
      comment:
        "The setting felt completely different from an ordinary hotel stay. The Highland scenery was incredible.",
    },
    {
      author: "Alice",
      rating: 5,
      comment:
        "A memorable stay with beautiful landscapes all around. The historic character made it even more interesting.",
    },
  ],
};

async function main() {
  await mongoose.connect(MONGO_URL);
  console.log("Connected to DB");

  // Remove old listings and their reviews before reseeding.
  await Listing.deleteMany({});
  await Review.deleteMany({});

  console.log("Old listings and reviews deleted");

  const listingsWithGeometry = [];

  for (const listing of initData.data) {
    const response = await geocodingClient
      .forwardGeocode({
        query: `${listing.location}, ${listing.country}`,
        limit: 1,
      })
      .send();

    const feature = response.body.features[0];

    if (!feature) {
      throw new Error(
        `Could not find coordinates for ${listing.location}, ${listing.country}`
      );
    }

    listingsWithGeometry.push({
      ...listing,
      owner: OWNER_ID,
      geometry: feature.geometry,
    });

    console.log(`Geocoded: ${listing.location}`);
  }

  const createdListings = await Listing.insertMany(listingsWithGeometry);

  console.log(`${createdListings.length} listings inserted`);

  // Add sample/demo reviews to every listing.
  let totalReviews = 0;

  for (const listing of createdListings) {
    const reviewsForListing = reviewData[listing.title];

    if (!reviewsForListing) {
      console.log(`No reviews found for: ${listing.title}`);
      continue;
    }

    for (const review of reviewsForListing) {
      const newReview = await Review.create({
        comment: review.comment,
        rating: review.rating,
        author: OWNER_ID,
      });

      listing.reviews.push(newReview._id);
      totalReviews++;
    }

    await listing.save();

    console.log(
      `Added ${reviewsForListing.length} reviews to: ${listing.title}`
    );
  }

  console.log(`${totalReviews} sample reviews inserted`);
  console.log("Database initialized successfully");
}

main()
  .catch((error) => {
    console.error("Database initialization failed:", error);
  })
  .finally(async () => {
    await mongoose.connection.close();
    console.log("Database connection closed");
  });