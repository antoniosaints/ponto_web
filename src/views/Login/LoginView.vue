<template>
  <div class="bg-gray-100 flex-col dark:bg-gray-900 w-screen p-4 h-screen flex justify-center items-center">
    <div class="max-w-lg text-center">
      <h1
        class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Gestão de equipe unificado,
        <span class="text-blue-600 dark:text-blue-500">Ponto ideal</span>
      </h1>
      <p class="text-lg font-normal mb-10 text-gray-500 lg:text-xl dark:text-gray-400">
        Faça login no sistema com suas credenciais!
      </p>
    </div>

    <form class="w-full max-w-lg bg-slate-100 dark:bg-gray-900" @submit.prevent="auth">

      <div class="mb-5">
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">E-mail</label>
        <input type="email" id="email" v-model="user.email"
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          placeholder="usuario@dominio" required />
      </div>
      <div class="mb-5">
        <label for="senha" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Senha</label>
        <input type="senha" id="senha" placeholder="•••••••••" v-model="user.senha"
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          required />
      </div>
      <div class="flex items-start mb-5">
        <div class="flex items-center h-5">
          <input id="terms" type="checkbox" value=""
            class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
            required />
        </div>
        <label for="terms" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Lembrar de mim</label>
      </div>
      <button type="submit"
        class="text-white w-full lg:w-auto md:w-auto bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Entrar
      </button>
    </form>
  </div>
</template>

<script setup>
import router from '@/routes/Router';
import toast from '@/services/toast';
import { useLoginStore } from '@/stores/login';
import { reactive } from 'vue';

const user = reactive({
  email: '',
  senha: ''
})


const auth = async () => {
  const logged = await useLoginStore().login(user);
  console.log(logged);
  if (logged.success == true) {
    router.push({ path: '/' });
    toast.success(logged.message, 'Logado!');
  } else {
    toast.error(logged.message, 'Ops..');
  }
}
</script>