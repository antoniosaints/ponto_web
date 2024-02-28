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
import { onUpdated, ref } from "vue";

// stores
import { userStore } from '@/stores/Usuarios/userStore.js'
const storeUsers = userStore();

const dataForm = ref({
  name: "",
  color: "",
  category: "",
  price: "",
});

const props = defineProps({
  editUser: {
    type: String,
    default: null
  }
})

onUpdated(() => {
  if (props.editUser) {
    dataForm.value = storeUsers.users.find((user) => user.id === props.editUser);
  }
})

const emit = defineEmits(["userCreated"]);

const submited = async () => {
  if (props.editUser) {
    storeUsers.updateUser(props.editUser, dataForm.value);
  }else {
    storeUsers.storeUser(dataForm.value);
  }
  emit("userCreated");
};
</script>
