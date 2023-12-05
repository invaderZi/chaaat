import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null, // usuário logado
    users: [
      { id: "sodu-340s", userName: "zi" },
      { id: "x2302-sau", userName: "zaaran" },
    ], // usuários no sistema
    chats: [
      { id: "x2302-sau", userName: "zaaran", viewd: true },
      { id: "sodu-340s", userName: "zi", viewd: false },
    ],
    history: [
      {
        id: "x2302-sau",
        userName: "zaaran",
        messages: [],
      },
      {
        id: "sodu-340s",
        userName: "zi",
        messages: [],
      },
    ],
  }),
  getters: {
    getUserLogged: (state) => {
      return state.user;
    },
    getAllUsers: (state) => {
      return state.users;
    },
    userExists: (state) => (userFind) => {
      return state.users.find((user) => {
        return user.userName === userFind.userName;
      });
    },
    getLocalChats: (state) => {
      return state.chats.filter(
        (chat) => chat.userName !== state.user.userName
      );
    },
    getLocalHistory: (state) => (chatFind) => {
      return state.history.find((chat) => {
        return chat.id === chatFind.id;
      });
    },
  },
  actions: {
    addUser(user) {
      this.users.push(user); // Usar this.$state para acessar o estado
    },
    setLoggedUser(user) {
      this.user = user; // Usar this.$state para acessar o estado
    },

    encontrarIndexPorId(id, array) {
      return array.findIndex((item) => item.id === id);
    },
    saveChatHistory(chat) {
      let index = this.encontrarIndexPorId(chat.id, this.history);

      if (index !== -1) {
        // Substitui o objeto no array
        this.history.splice(index, 1, chat);
      } else {
        // Se não encontrar, adiciona
        this.history.push(chat);
      }
    },
  },
});
