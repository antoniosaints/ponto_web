<template>
  <div class="p-4 bg-blue-900">
    <div class="flex items-center gap-4 mb-4">
      <img class="w-10 h-10 rounded-full" src="../../assets/vue.svg" alt="" />
      <div class="font-medium text-white dark:text-white">
        <div>Antonio Costa dos Santos</div>
        <div class="text-sm text-gray-300 dark:text-gray-400">
          Último login: 23/05/2022
        </div>
      </div>
    </div>

    <span
      href="#"
      class="block mb-4 p-4 bg-blue-800 rounded-lg shadow dark:bg-gray-800 dark:hover:bg-gray-700"
    >
      <h5
        id="relogio_ponto"
        class="mb-2 text-4xl dark:text-white text-white font-bold tracking-tight"
      >
        {{ horario }}
      </h5>
      <p class="font-normal text-gray-300 dark:text-gray-400">Horário atual</p>
    </span>

    <div class="d-flex text-right p-0">
      <div
        class="max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="h-80">
          <div id="mapa" class="p-0 w-full rounded-lg h-full"></div>
        </div>
      </div>

      <button
        @click="verifyLocation"
        type="button"
        class="my-2 text-white bg-gray-900 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-md text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
      >
        Registrar ponto
      </button>
      <button
        @click="centerUserLocation"
        type="button"
        class="my-2 text-white bg-gray-900 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 font-medium rounded-md text-sm px-5 py-2.5 text-center mb-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
      >
        <iconComponent
          color="text-white"
          icon="location-crosshairs"
          size="text-l"
        />
      </button>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, onMounted, ref } from "vue";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import iconComponent from "../../components/Fontawesome/iconComponent.vue";
import MarkerIcon from "../../assets/marker-icon.png";

let map = null;
const geoLocation = navigator.geolocation;

let iconMarker = L.icon({
  iconUrl: MarkerIcon,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const cercasUserAutorized = ref([
  {
    latlon: [-4.030258062270483, -44.46540541962746],
    description: "Cerca de 50 Metros",
    radius: 50,
    color: "blue",
  },
  {
    latlon: [-4.038317661861804, -44.46935476403667],
    description: "Cerca 2",
    radius: 26,
    color: "red",
  },
  {
    latlon: [-4.037639011196118, -44.465870701830674],
    description: "Rua ipanema",
    radius: 20,
    color: "orange",
  },
  {
    latlon: [-4.029238264916777, -44.46241279292012],
    description: "Rua do brejo",
    radius: 20,
    color: "green",
  },
  {
    latlon: [-4.0392746735410725, -44.46849812891654],
    description: "Central CAS",
    radius: 50,
    color: "purple",
  },
]);
const userLocation = ref({});
const horario = ref("...");

const centerUserLocation = () => {
  map.setView([userLocation.value.lat, userLocation.value.lon], 18);
};
const initMap = (lat, lon) => {
  map = L.map("mapa").setView([lat, lon], 18);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '<a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
  }).addTo(map);
};

function getDataLocal() {
  const data = new Date();
  horario.value = data.toLocaleTimeString(); // 10/10/2022, 10:10:35
}

function generateLocationAndMarker() {
  if (geoLocation) {
    geoLocation.getCurrentPosition(
      function (position) {
        userLocation.value = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };

        if (!map) {
          initMap(position.coords.latitude, position.coords.longitude);
          initializeComponents();
        } else {
          removeAllMarkersAndCircles();
          map.setView(
            [position.coords.latitude, position.coords.longitude],
            18
          );
          initializeComponents();
        }
      },
      function (error) {
        console.error("Erro ao obter a localização do usuário:", error);
      }
    );
  } else {
    console.error("Geolocalização não é suportada pelo seu navegador.");
  }
}

function createCircle(latlon, radius, description = "", color) {
  const circle = L.circle(latlon, {
    radius: radius,
    color: color,
  });

  description != "" && circle.bindPopup(description);

  circle.addTo(map);
}

function createMarker(lat, lon, description = "") {
  const ponto = L.marker([lat, lon], { icon: iconMarker });

  description != "" && ponto.bindPopup(description);

  ponto.addTo(map);
}

const updateLocationUser = (position) => {
  userLocation.value = {
    lat: position.coords.latitude,
    lon: position.coords.longitude,
  };

  if (!map) {
    generateLocationAndMarker();
  } else {
    map.eachLayer(function (layer) {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });
    // map.setView([position.coords.latitude, position.coords.longitude], 18);
    createMarker(
      position.coords.latitude,
      position.coords.longitude,
      "Sua Localização"
    );
  }
};

function removeAllMarkersAndCircles() {
  map.eachLayer(function (layer) {
    if (layer instanceof L.Marker || layer instanceof L.Circle) {
      map.removeLayer(layer);
    }
  });
}

function initializeComponents() {
  cercasUserAutorized.value.forEach((cerca) => {
    createCircle(cerca.latlon, cerca.radius, cerca.description, cerca.color);
  });
  createMarker(
    userLocation.value.lat,
    userLocation.value.lon,
    "Sua Localização"
  );
}

function verifyLocation() {
  let isLocationAutorized = [];
  cercasUserAutorized.value.forEach((cerca) => {
    const distance = calculateDistance(
      userLocation.value.lat,
      userLocation.value.lon,
      cerca.latlon[0],
      cerca.latlon[1]
    );

    if (distance <= cerca.radius) {
      isLocationAutorized.push({
        isCheck: true,
        description: cerca.description,
      });
    } else {
      isLocationAutorized.push({
        isCheck: false,
        description: cerca.description,
      });
    }
  });

  if (isLocationAutorized.find((item) => item.isCheck === true)) {
    const valor = isLocationAutorized.find(
      (item) => item.isCheck === true
    ).description;
    alert(`Ponto registrado no local de trabalho: ${valor}`);
  } else {
    alert("Você não está dentro de um local de trabalho cadastrado!");
  }
}

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

onMounted(() => {
  generateLocationAndMarker();
  setInterval(getDataLocal, 1000);
});

onBeforeMount(() => {
  if (map) {
    map.remove();
  }
});
</script>
