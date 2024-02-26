<template>
  <div class="p-0">
    <FormContainer @submit="submited">
      <FormRow>
        <FormCol>
          <InputTextForm v-model="dataForm.name" label="Nome" type="text" placeholder="Nome" required />
          <InputTextForm v-model="dataForm.color" label="Cor" type="text" placeholder="Cor" required />
          <InputTextForm v-model="dataForm.category" label="Categoria" type="text" placeholder="Categoria" required />
          <InputTextForm v-model="dataForm.price" label="Preço" type="number" placeholder="Preço" required />
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

const radonUUID = () => {
  const randomNumber = Math.floor(Math.random() * 10000000);
  return randomNumber;
}

const dataForm = ref({
  id: "",
  name: "",
  color: "",
  category: "",
  price: "",
});

const emit = defineEmits(["newUser"]);

const submited = async () => {
  let relatorio = await JSON.parse(localStorage.getItem("dataForm")) || [];
  dataForm.value.id = radonUUID();
  relatorio.push(dataForm.value);
  localStorage.setItem("dataForm", JSON.stringify(relatorio));
  emit("newUser");
};
</script>
