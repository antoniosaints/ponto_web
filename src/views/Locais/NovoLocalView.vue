<template>
  <div class="p-0">
    <FormContainer @submit="submited">
      <FormRow>
        <FormCol>
          <InputTextForm v-model="locationForm.description" label="Nome" type="text" placeholder="Nome" required />
          <InputTextForm v-model="locationForm.color" label="Cor" type="text" placeholder="Cor" required />
          <InputTextForm v-model="locationForm.latlon" label="Lat / Lon" type="text" placeholder="-0.000000, -0.000000" required />
          <InputTextForm v-model="locationForm.radius" label="Raio" type="number" placeholder="Raio" required />
        </FormCol>
      </FormRow>

    </FormContainer>
  </div>
</template>

<script setup>
import FormContainer from "@/components/Flowbite/Form/FormContainer.vue";
import InputTextForm from "@/components/Flowbite/Form/InputTextForm.vue";
import FormCol from "@/components/Flowbite/Form/FormCol.vue";
import FormRow from "@/components/Flowbite/Form/FormRow.vue";
import { ref } from "vue";

// stores
import { LocationStore } from "@/stores/Locais/locationStore"; 
const localStore = LocationStore();

const locationForm = ref({
  description: "",
  color: "",
  latlon: "",
  radius: "",
});

const submited = async () => {
    localStore.storeLocation(locationForm.value);
};
</script>
