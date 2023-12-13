<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <q-page padding class="container">
        <div v-if="showLogin">
          <p>login</p>
          <q-input
            class="q-ma-md"
            v-model="userName"
            outlined
            color="grey-10"
          ></q-input>
          <q-btn class="q-ma-sm" @click="doLogin" flat> login </q-btn>
          <q-btn class="q-ma-sm" @click="toggleLogin" flat
            >fazer cadastro</q-btn
          >
        </div>
        <div v-else>
          <p>cadastro</p>
          <q-input
            class="q-ma-md"
            v-model="userName"
            outlined
            color="grey-10"
          ></q-input>
          <q-btn class="q-ma-md" @click="doCadastro" flat> cadastro </q-btn>
          <q-btn class="q-ma-md" @click="toggleLogin" flat>voltar </q-btn>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  props: {
    showLogin: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      userName: null,
    };
  },

  methods: {
    toggleLogin() {
      this.$emit("toogle-login");
    },
    doLogin() {
      this.$emit("do-login", this.userName);
    },
    doCadastro() {
      this.$emit("do-cadastro", this.userName);
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100%;
}
</style>
