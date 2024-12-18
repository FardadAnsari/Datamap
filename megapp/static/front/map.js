 // Initialize the map
    var map = L.map('map', {
        zoomControl: false,
        minZoom: 3,
    }).setView([53.719009658267055, -3.0252257374101705], 7);

    // Load and display the tile layer from OpenStreetMap
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(map);
        // Layer switcher co3ntrol (toggle between layers)
    var streetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
    var satelliteMap = L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });

    var baseMaps = {
        "Street Map": streetMap,
        "Satellite Map": satelliteMap
    };



    // topleft: بالا سمت چپ
    // topright: بالا سمت راست (پیش‌فرض)
    // bottomleft: پایین سمت چپ
    // bottomright: پایین سمت راست
    L.control.layers(baseMaps, null, { position: 'bottomright' }).addTo(map);

    // // Create a layer group for clustering
    // var markers = L.markerClusterGroup();
    // map.addLayer(markers);
  
    
    var foodhub = L.markerClusterGroup();
    var justeat = L.markerClusterGroup();
    var foodhouse = L.markerClusterGroup();
    var ubereats = L.markerClusterGroup();
    var whatthefork = L.markerClusterGroup();
    var flipdish = L.markerClusterGroup();
    var googlebusiness = L.markerClusterGroup();
    var mealzo = L.markerClusterGroup();
    var menulist = L.markerClusterGroup();
    var scoffable = L.markerClusterGroup();
    var deliveroo = L.markerClusterGroup();
    var straightfrom = L.markerClusterGroup();
    var kuick = L.markerClusterGroup();

    var justeat_icon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-black.png',
        // iconSize: [25, 41],  // size of the icon
        //iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
        //popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
        shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
        //shadowSize: [41, 41]  // size of the shadow
    });
    
    var foodhub_icon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
        // iconSize: [25, 41],  // size of the icon
        //iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
        //popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
        shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
        //shadowSize: [41, 41]  // size of the shadow
    });

    var ubereats_icon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
        // iconSize: [25, 41],  // size of the icon
        //iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
        //popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
        shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
        //shadowSize: [41, 41]  // size of the shadow
    });

    var whatthefork_icon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png',
        // iconSize: [25, 41],  // size of the icon
        //iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
        //popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
        shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
        //shadowSize: [41, 41]  // size of the shadow
    });

    var foodhouse_icon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png',
        // iconSize: [25, 41],  // size of the icon
        //iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
        //popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
        shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
        //shadowSize: [41, 41]  // size of the shadow
    });

    var googlebusiness_icon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
        // iconSize: [25, 41],  // size of the icon
        //iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
        //popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
        shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
        //shadowSize: [41, 41]  // size of the shadow
    });
    var mealzo_icon = L.icon({
         iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png',
        // iconSize: [25, 41],  // size of the icon
        //iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
        //popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
        shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
        //shadowSize: [41, 41]  // size of the shadow
    });

    var menulist_icon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-grey.png',
       // iconSize: [25, 41],  // size of the icon
       //iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
       //popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
       shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
       //shadowSize: [41, 41]  // size of the shadow
   });

   var scoffable_icon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    // iconSize: [25, 41],  // size of the icon
    //iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
    //popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    //shadowSize: [41, 41]  // size of the shadow
    });

    var deliveroo_icon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
        // iconSize: [25, 41],  // size of the icon
        //iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
        //popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
        shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
        //shadowSize: [41, 41]  // size of the shadow
    });

    var straightfrom_icon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png',
        // iconSize: [25, 41],  // size of the icon
        //iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
        //popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
        shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
        //shadowSize: [41, 41]  // size of the shadow
    });

    var kuick_icon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png',
        // iconSize: [25, 41],  // size of the icon
        //iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
        //popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
        shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
        //shadowSize: [41, 41]  // size of the shadow
    });