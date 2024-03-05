<template>
  <div class="p-4">
    <div class="flex items-center gap-4 mb-4">
      <img class="w-10 h-10 rounded-full" src="../../assets/vue.svg" alt="" />
      <div class="font-medium text-gray-800 dark:text-white">
        <div>Antonio Costa dos Santos</div>
        <div class="text-sm text-gray-500 dark:text-gray-400">
          Último login: 23/05/2022
        </div>
      </div>
    </div>

    <span
      href="#"
      class="block mb-4 p-4 bg-gray-300 rounded-lg shadow dark:bg-gray-700"
    >
      <h5
        id="relogio_ponto"
        class="mb-2 text-4xl dark:text-white text-gray-900 font-bold tracking-tight"
      >
        {{ horario }}
      </h5>
      <p class="font-normal text-gray-800 dark:text-gray-300">Horário atual</p>
    </span>

    <div class="d-flex text-right p-0">
      <div
        class="max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="h-80">
          <div
            ref="mapa"
            style="z-index: 5"
            class="p-0 w-full rounded-lg h-full"
          ></div>
        </div>
      </div>

      <button
        @click="verifyLocation"
        type="button"
        class="my-2 text-white bg-green-600 hover:bg-green-900 focus:outline-none focus:ring-gray-300 font-medium rounded-md text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-cyan-600 dark:hover:bg-cyan-700"
      >
        Registrar ponto
      </button>
      <button
        @click="centerUserLocation"
        type="button"
        class="my-2 text-white bg-violet-900 hover:bg-violet-600 focus:ring-gray-300 font-medium rounded-md text-sm px-5 py-2.5 text-center mb-2 dark:bg-emerald-600 dark:hover:bg-emerald-700"
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
  import { onMounted, ref } from "vue";
  import iconComponent from "@/components/Fontawesome/IconComponent.vue";
  import L from "leaflet";
  import "leaflet/dist/leaflet.css";
  import MarkerIcon from "@/assets/marker-icon.png";
  import { LocationStore } from "@/stores/Locais/locationStore.js";

  const storeLocales = LocationStore();

  const horario = ref("...");
  const userLocation = ref({ lat: null, lon: null });
  let mapaContainer = null; //mapa
  const geoLocation = navigator.geolocation; //geolocalização
  const mapa = ref();
  const cercasUserAutorized = ref([]);
  let iconMarker = L.icon({
    iconUrl: MarkerIcon,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  // -------------------------------------------------------------------------//
  function getDataLocal() {
    // Relogio
    const data = new Date();
    horario.value = data.toLocaleTimeString(); // 10/10/2022, 10:10:35
  }

  setInterval(getDataLocal, 1000);

  async function initializeComponents(lat, lon) {
    cercasUserAutorized.value = await storeLocales.getLocations();
    createMarker(lat, lon, "Sua Localização");
    userLocation.value = {
      lat,
      lon,
    };
    cercasUserAutorized.value.forEach((cerca) => {
      createCircle(
        [cerca.latlon.split(",")[0], cerca.latlon.split(",")[1]],
        cerca.radius,
        cerca.description,
        cerca.color
      );
    });
  }
  async function initMap(lat, lon) {
    if (mapaContainer == null) {
      mapaContainer = await L.map(mapa.value).setView([lat, lon], 16);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '<a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
      }).addTo(mapaContainer);

      initializeComponents(lat, lon);
    }
  }
  function createMapLayer() {
    if (geoLocation) {
      geoLocation.getCurrentPosition((position) => {
        initMap(position.coords.latitude, position.coords.longitude);
      });
    }
  }

  const deleteMapa = () => {
    if (mapaContainer != null) {
      mapaContainer.remove();
      mapaContainer = null;
    }
  };

  onMounted(() => {
    deleteMapa();
    createMapLayer();
  });

  function createCircle(latlon, radius, description = "", color) {
    let circle = L.circle(latlon, {
      radius: radius,
      color: color,
    });

    description != "" && circle.bindPopup(description);

    circle.addTo(mapaContainer);
  }

  function createMarker(lat, lon, description = "") {
    let ponto = L.marker([lat, lon], { icon: iconMarker });

    description != "" && ponto.bindPopup(description);

    ponto.addTo(mapaContainer);
  }

  const updateLocationUser = async () => {
    if (geoLocation) {
      geoLocation.getCurrentPosition(async (position) => {
        userLocation.value = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };
        await mapaContainer.eachLayer(function (layer) {
          if (layer instanceof L.Marker) {
            layer.setLatLng([
              position.coords.latitude,
              position.coords.longitude,
            ]);
          }
        });
      });
    } else {
      alert("Geolocalização não é suportada pelo seu navegador.");
    }
  };

  const centerUserLocation = () => {
    if (geoLocation) {
      geoLocation.getCurrentPosition((position) => {
        userLocation.value = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };
        mapaContainer.setView(
          [position.coords.latitude, position.coords.longitude],
          16
        );
      });
    } else {
      alert("Geolocalização não é suportada pelo seu navegador.");
    }
  };

  async function verifyLocation() {
    let isLocationAutorized = [];
    cercasUserAutorized.value.forEach((cerca) => {
      const distance = calculateDistance(
        userLocation.value.lat,
        userLocation.value.lon,
        cerca.latlon.split(",")[0],
        cerca.latlon.split(",")[1]
      );

      if (distance <= cerca.radius) {
        // alert(`Ponto registrado no local de trabalho: ${cerca.description}`);
        isLocationAutorized.push({
          isCheck: true,
          description: cerca.description,
        });
      } else {
        // alert("Você não está dentro de um local de trabalho cadastrado!");
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

  setInterval(updateLocationUser, 3000);
</script>
