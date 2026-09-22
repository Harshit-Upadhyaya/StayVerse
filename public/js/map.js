const map = new mapboxgl.Map({
    accessToken: mapToken, //mapToken accessed from show.ejs
    container: 'map', // container ID
    center: listing.geometry.coordinates, // starting position [longitude, latitude]. Note that lat must be set between -90 and 90
    zoom: 9 // starting zoom
});

// Create a default Marker and add it to the map.
const marker1 = new mapboxgl.Marker({ color: "red" })
    .setLngLat(listing.geometry.coordinates) //Here longitude and latitude will be those that we stored in our listing.geometry.coordinates
    .setPopup(
        new mapboxgl.Popup({offset: 25})
        .setHTML(`<h4>${listing.location}</h4><p>Exact location will be provided after booking</p>`)
    )
    .addTo(map);
