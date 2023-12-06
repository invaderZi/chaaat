<template>
  <div>
    <q-btn
      @click="closeChat"
      round
      flat
      icon="arrow_back"
      color="white"
      text-color="black"
      size="md"
      class="q-ml-lg"
    ></q-btn>
  </div>

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
    closeChat() {
      this.$emit("close-chat");
      this.newMessage = "";
    },
  },
};
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
  max-height: 60vh;
  width: 80vw;
  overflow: auto;
  margin: 10px auto;
  padding: 30px;
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
