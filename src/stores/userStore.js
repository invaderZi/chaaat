import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null, // usuário logado
    users: [
      { id: "sodu-340s", userName: "zi" },
      { id: "x2302-sau", userName: "zaaran" },
    ], // usuários no sistema
    history: [
      {
        id: "x2302-sau",
        userName: "zaaran",
        viewd: true,
        messages: [],
      },
      {
        id: "sodu-340s",
        userName: "zi",
        viewd: true,
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
      return state.history.filter((chat) => chat.id !== state.user.id);
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

      if (index == -1) {
        // se nao encontrar cria
        this.history.push(chat);
      } else {
        // adiciona
        this.history.splice(index, 1, chat);
      }
    },

    createChatNewObj(messageObj) {
      let chatHistory = {
        id: messageObj.id,
        userName: messageObj.userName,
        viewd: false,
        messages: [],
      };
      chatHistory.messages.push(messageObj);
      return chatHistory;
    },

    saveRecievedMessage(messageObj) {
      let index = this.encontrarIndexPorId(messageObj.id, this.history);
      if (index == -1) {
        let newChat = this.createChatNewObj(messageObj);
        this.history.push(newChat);
      } else {
        this.history[index].messages.push(messageObj);
        this.history[index].viewd = false;
      }
    },
  },
});
