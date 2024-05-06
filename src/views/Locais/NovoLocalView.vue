<template>
  <div class="p-0">
    <FormContainer @submit="submited">
      <FormRow>
        <FormCol>
          <InputTextForm v-model="locationForm.nome" label="Nome" type="text" placeholder="Nome" required />
          <InputColor v-model="locationForm.cor" label="Cor" required />
          <InputTextForm v-model="locationForm.latlon" label="Lat / Lon" type="text" placeholder="-0.000000, -0.000000"
            required />
          <InputTextForm v-model="locationForm.raio" label="Raio" type="number" placeholder="Raio" required />
        </FormCol>
      </FormRow>

    </FormContainer>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import FormContainer from "@/components/Flowbite/Form/FormContainer.vue";
import InputTextForm from "@/components/Flowbite/Form/InputTextForm.vue";
import InputColor from "@/components/Flowbite/Form/InputColor.vue";
import FormCol from "@/components/Flowbite/Form/FormCol.vue";
import FormRow from "@/components/Flowbite/Form/FormRow.vue";

// stores
import { LocationStore } from "@/stores/Locais/locationStore";
const localStore = LocationStore();

const locationForm = reactive(
  {
    nome: "",
    raio: 50,
    latlon: "",
    cor: "#00a1e6",
  }
);

const submited = async () => {
  localStore.storeLocation(locationForm);
};
</script>
