<template>
  <div class="container">
    <q-page-container class="centered-container">
      <q-page padding>
        <q-chat-message
          v-for="message in messages"
          :key="message.text"
          :text="[message.text]"
          :sent="message.userName === userLogado.userName"
          :name="message.userName"
        />
      </q-page>
    </q-page-container>

    <div class="input-container">
      <q-input
        v-model="newMessage"
        @keyup.enter="sendMessage"
        placeholder="Digite sua mensagem"
        outlined
        class="q-mr-md input"
      />
      <q-btn
        round
        flat
        size="sm"
        color="black"
        icon="send"
        @click="sendMessage"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ["messages", "userLogado"],
  data() {
    return {
      newMessage: "",
    };
  },
  methods: {
    sendMessage() {
      this.$emit("send-message", this.newMessage);
      this.newMessage = "";
    },
  },
};
// import io from "socket.io-client";
// import { useUserStore } from "../stores/userStore.js";

// export default {
//   computed: {
//     chatId() {
//       return this.$route.params.idChat;
//     },
//   },
//   data() {
//     return {
//       messages: [],
//       newMessage: "",
//       socket: null,
//       userStore: null,
//       userLogado: {
//         id: null,
//         userName: null,
//       },
//       room: null,
//     };
//   },

//   created() {
//     this.userStore = useUserStore();
//     if (this.userStore.getUser() == null) {
//       this.$router.push("/");
//       return;
//     }
//     console.log("usuario logado", this.userStore.getUser().userName);
//     this.userLogado = this.userStore.getUser();

//     // Initialize Socket.io here
//     this.socket = io("http://localhost:3000", {
//       reconnection: true,
//       reconnectionAttempts: Infinity, // Número máximo de tentativas de reconexão
//       reconnectionDelay: 1000, // Atraso entre tentativas de reconexão em milissegundos
//       timeout: 5000,
//     });

//     // Logic to listen for events and perform other initializations, if needed
//     // For example, you may want to listen for the 'connect' event to confirm the connection
//     this.socket.on("connection", () => {
//       console.log("Connected to server");
//     });
//   },

//   beforeMount() {
//     // this.fetchMessages();
//     this.openChat(this.chatId);
//   },

//   beforeDestroy() {
//     if (this.socket) {
//       this.socket.disconnect();
//     }
//   },

//   methods: {
//     openChat(chatId) {
//       this.socket.emit("joinRoom", chatId);

//       this.socket.on("chatHistory", (history) => {
//         this.messages = history;
//       });

//       this.room = chatId;

//       this.socket.on("message", (message) => {
//         // this.$nextTick(() => {
//         this.messages.push(message);
//         // });
//         console.log(message);
//       });

//       this.socket.on("error", (error) => {
//         console.error("Erro de Socket.IO:", error);
//       });

//       this.socket.on("disconnect", (reason) => {
//         console.log("Desconectado:", reason);
//       });
//     },

//     sendMessage() {
//       const message = {
//         // id: this.userLogado.id,
//         username: this.userLogado.userName,
//         text: this.newMessage,
//       };

//       this.socket.emit("sendMessage", { roomId: this.room, message });
//       this.newMessage = "";
//     },
//   },
// };
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  overflow: hidden; /* Removendo overflow desnecessário na página */
}

.centered-container {
  border: 1px solid whitesmoke;
  border-radius: 20px;
  max-height: 70vh;
  overflow: auto;
  margin: 0 auto;
  padding: 30px;
  width: 90%; /* Adicionando largura total ao container interno */
}
.input-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 10px 30px;
  padding: 10px;
}

.input {
  width: 70%;
}
</style>
