<template>
  <q-page padding class="container">
    <ChatsList v-show="!showChatWindow" :chats="chats" @open-chat="openChat" />
    <ChatPage
      v-show="showChatWindow"
      :userLogado="usuarioLogado"
      :messages="chatOpenHistory.messages ?? []"
      @send-message="sendMessage"
    />
  </q-page>
</template>

<script>
import ChatPage from "src/components/ChatPage.vue";
import ChatsList from "../components/ChatsList.vue";
import { useUserStore } from "../stores/userStore.js";
import { io } from "socket.io-client";

export default {
  name: "IndexPage",
  components: {
    ChatsList,
    ChatPage,
  },
  computed: {
    // computed
    usuarioLogado() {
      return this.USER_STORE.getUserLogged;
    },

    getAllUsers() {
      return this.USER_STORE.getAllUsers;
    },

    chats() {
      if (this.usuarioLogado !== null) {
        return this.USER_STORE.getLocalChats;
      }
      return [];
    },
  },

  data() {
    return {
      chatOpenData: {},
      showChatWindow: false,
      chatOpenHistory: {},
      USER_STORE: null,
      socket: null,
    };
  },

  created() {
    this.USER_STORE = useUserStore();

    if (this.USER_STORE.getUserLogged == null) {
      this.$router.replace("/login");
    }
  },

  mounted() {
    this.setSocket();
  },

  methods: {
    openChat(chat) {
      this.chatOpenData = chat;
      this.chatOpenHistory = this.USER_STORE.getLocalHistory(chat) ?? {};
      this.showChatWindow = true;
    },

    closeChat() {
      this.showChatWindow = false;
      this.chatOpenData = {};
      this.chatOpenHistory = {};
    },

    sendMessage(message) {
      let roomId = this.chatOpenData.id;

      let obj = {
        id: this.usuarioLogado.id,
        userName: this.usuarioLogado.userName,
        text: message,
        time: new Date().getUTCDate(),
      };

      this.chatOpenHistory.messages.push(obj);
      // this.USER_STORE.saveChatHistory(this.chatOpenData, this.chatOpenHistory.messages);
      this.socket.emit("send-message", obj, roomId);
    },

    setSocket() {
      if (this.usuarioLogado !== null) {
        this.socket = io("http://localhost:3000");
        this.socket.on("connect", () => {
          // console.log("you are connected with id", this.socket.id);
          this.socket.emit("join-room", this.usuarioLogado.id);
        });
      }
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
}
</style>
