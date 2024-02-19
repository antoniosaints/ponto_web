let map = null;
let userLocation = null;
const LocationCerca = { lat: -4.039247753979446, lon: -44.4684690662039 };
const geoLocation = navigator.geolocation;
const radius = 50;

function calculateDistance(lat1, lon1, lat2, lon2) {

    generateLocationAndMarker();

    var R = 6371000; // Raio médio da Terra em metros
    var dLat = ((lat2 - lat1) * Math.PI) / 180;
    var dLon = ((lon2 - lon1) * Math.PI) / 180;
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distância em metros
    return d;
}
function createCircle(lat, lon, description = "") {
    const circle = L.circle([lat, lon], {
        radius: radius,
    })

    description != "" && circle.bindPopup(description)

    circle.addTo(map)
}

function createMarker(lat, lon, description = "") {
    const ponto = L.marker([lat, lon])
    
    description != "" && ponto.bindPopup(description)

    ponto.addTo(map)
}

function initMap(lat, lon) {
    map = L.map("map").setView([lat, lon], 16);

    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          attribution: '<a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
        }
      ).addTo(map);
}

function removeAllMarkersAndCircles() {
    map.eachLayer(function(layer) {
        if (layer instanceof L.Marker || layer instanceof L.Circle) {
            map.removeLayer(layer);
        }
    });
}
async function generateLocationAndMarker() {
     if (geoLocation) {
        geoLocation.getCurrentPosition(function(position) {

            userLocation = {
                lat: position.coords.latitude,
                lon: position.coords.longitude,
            }

            console.log(userLocation);

            if (!map) {
                initMap(userLocation.lat, userLocation.lon);
                createCircle(LocationCerca.lat, LocationCerca.lon, "Cerca de 50 Metros");
                createMarker(userLocation.lat, userLocation.lon, "Sua Localização");
            } else {
                removeAllMarkersAndCircles();
                map.setView([userLocation.lat, userLocation.lon], 16);
                createCircle(LocationCerca.lat, LocationCerca.lon, "Cerca de 50 Metros");
                createMarker(userLocation.lat, userLocation.lon, "Sua Localização");
            }

        }, function(error) {
            console.error("Erro ao obter a localização do usuário:", error);
        });
    } else {
        console.error("Geolocalização não é suportada pelo seu navegador.");
    }
}

generateLocationAndMarker();

async function checkIsPoint() {
    if (geoLocation) {
        geoLocation.getCurrentPosition(function (position) {
            var userLat = position.coords.latitude;
            var userLon = position.coords.longitude;

            var distance = calculateDistance(
                LocationCerca.lat,
                LocationCerca.lon,
                userLat,
                userLon
            );

            if (distance <= radius) {
                  alert("Você está dentro do raio permitido.");
            } else {
                  alert("Você está fora do raio permitido.");
            }

            generateLocationAndMarker();

        });
    } else {
        alert("Geolocalização não é suportada pelo seu navegador.");
    }
}