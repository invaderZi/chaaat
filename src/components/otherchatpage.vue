<template>
  <div class="chat-page">
    <div ref="messageContainer" class="message-container">
      <div v-for="message in messages" :key="message.id" class="message">
        {{ message.text }}
      </div>
    </div>

    <div class="input-container">
      <input
        v-model="newMessage"
        @keyup.enter="sendMessage"
        placeholder="Digite sua mensagem"
      />
      <button @click="sendMessage">Enviar</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [],
      newMessage: "",
    };
  },
  methods: {
    sendMessage() {
      const newMessage = {
        id: this.messages.length + 1,
        text: this.newMessage,
      };

      this.messages.push(newMessage);
      this.newMessage = "";

      // Scroll para a última mensagem após a atualização do DOM
      this.$nextTick(() => {
        this.scrollToBottom();
      });
    },
    scrollToBottom() {
      const container = this.$refs.messageContainer;
      container.scrollTop = container.scrollHeight;
    },
  },
};
</script>

<style scoped>
.chat-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.message-container {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
}

.message {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
}

.input-container {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}

input {
  flex: 1;
  padding: 8px;
  margin-right: 10px;
}

button {
  padding: 8px;
}
</style>
