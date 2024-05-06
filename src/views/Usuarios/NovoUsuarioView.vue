<template>
  <div class="p-0">
    <FormContainer @submit="submited">
      <FormRow>
        <FormCol>
          <InputTextForm v-model="storeUsers.dataUserStore.nome" label="Nome" type="text" placeholder="Nome" required />
          <InputTextForm v-model="storeUsers.dataUserStore.email" label="E-mail" type="email" placeholder="E-mail"
            required />
          <InputTextForm v-model="storeUsers.dataUserStore.contato" label="Categoria" type="text"
            placeholder="Categoria" required />
          <InputTextForm v-model="storeUsers.dataUserStore.horario" label="Preço" type="number" placeholder="Preço"
            required />
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

// stores
import { userStore } from "@/stores/Usuarios/userStore.js";
const storeUsers = userStore();

const emit = defineEmits(["userCreated"]);

const submited = async () => {
  if (storeUsers.userEdit) {
    storeUsers.updateUser(storeUsers.userEdit);
  } else {
    storeUsers.storeUser();
  }
  emit("userCreated");
};
</script>
