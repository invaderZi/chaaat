<template>
  <LoginPage
    @do-login="doLogin"
    @do-cadastro="doCadastro"
    @toogle-login="toggleLogin"
    :showLogin="showLogin"
  />
</template>

<script>
import { ref, computed } from "vue";
import LoginPage from "../components/LoginPage.vue";
import { useUserStore } from "../stores/userStore.js";
import { useRouter } from "vue-router";

export default {
  components: {
    LoginPage,
  },
  setup() {
    const router = useRouter();
    const USER_STORE = useUserStore();
    const userIsLogged = ref(false);
    const showLogin = ref(true);
    const usuarioLogado = computed(() => USER_STORE.getUserLogged || null);
    const toggleLogin = () => {
      showLogin.value = !showLogin.value;
    };
    const doLogin = (userName) => {
      const user = { userName: userName };
      let exists = USER_STORE.userExists(user);
      if (exists) {
        USER_STORE.setLoggedUser(exists);
        userIsLogged.value = true;
        console.log("usuario logado:", usuarioLogado.value);
        router.push("/home");
      } else {
        alert("usuario nao cadastrado!");
      }
    };

    const doCadastro = (userName) => {
      const user = { userName: userName };
      USER_STORE.addUser(user);
      alert("usuario cadastrado!");
      toggleLogin();
    };

    return {
      usuarioLogado,
      userIsLogged,
      showLogin,
      toggleLogin,
      doLogin,
      doCadastro,
    };
  },
};
</script>

<style></style>
