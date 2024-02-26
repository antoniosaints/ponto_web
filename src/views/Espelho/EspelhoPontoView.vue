<template>
  <div class="p-4">
    <FormContainer @submit="submited">
      <FormRow>
        <FormCol class="sm:grid-cols-3">
          <InputTextForm
            v-model="dataForm.nome"
            label="Nome"
            type="text"
            placeholder="Nome"
            required
          />
          <InputTextForm
            v-model="dataForm.email"
            label="Email"
            type="text"
            placeholder="E-mail"
            required
          />
          <InputTextForm
            v-model="dataForm.email"
            label="Email"
            type="text"
            placeholder="E-mail"
            required
          />
        </FormCol>
      </FormRow>
      <FormRow>
        <FormCol>
          <InputTextForm
            v-model="dataForm.nome"
            label="Nome"
            type="text"
            placeholder="Nome"
            required
          />
          <InputTextForm
            v-model="dataForm.email"
            label="Email"
            type="text"
            placeholder="E-mail"
            required
          />
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

  const dataForm = ref({
    nome: "",
    email: "",
  });

  const submited = () => {
    alert(dataForm.value.nome + " - " + dataForm.value.email);
  };
</script>
