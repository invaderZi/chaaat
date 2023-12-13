<template>
  <div>
    <div>
      <q-btn
        @click="closeChat"
        roud
        flat
        icon="arrow_back"
        color="white"
        text-color="black"
        size="md"
        class="q-ml-lg"
      />
    </div>
    <div ref="messageContainer" class="centered-container">
      <q-chat-message
        v-for="message in messages"
        :key="message.text"
        :text="[message.text]"
        :sent="message.userName === userLogado.userName"
        :name="message.userName"
        :bg-color="message.userName === userLogado.userName ? 'dark' : 'grey-4'"
        :text-color="
          message.userName === userLogado.userName ? 'grey-4' : 'black'
        "
      />
    </div>

    <div class="input-container">
      <q-input
        v-model="newMessage"
        @keyup.enter="sendMessage"
        placeholder="Digite sua mensagem"
        outlined
        class="q-mr-sm input"
      />
      <q-btn flat size="sm" color="black" icon="send" @click="sendMessage" />
    </div>
  </div>
</template>

<script>
export default {
  props: ["messages", "userLogado"],
  computed: {
    isMessagesDisplayOnLimit() {
      return this.messages && this.messages.length > 3;
    },
  },
  data() {
    return {
      newMessage: "",
    };
  },
  mounted() {
    if (this.isMessagesDisplayOnLimit) {
      this.scrollToBottom();
    }
  },
  methods: {
    sendMessage() {
      if (this.newMessage.trim().length > 0) {
        this.$emit("send-message", this.newMessage.trim());
        this.newMessage = "";
        this.$nextTick(() => {
          if (this.isMessagesDisplayOnLimit) {
            this.scrollToBottom();
          }
        });
      }
    },
    scrollToBottom() {
      const container = this.$refs.messageContainer;
      container.scrollTop = container.scrollHeight;
    },
    closeChat() {
      this.$emit("close-chat");
      this.newMessage = "";
    },
  },
};
</script>

<style scoped>
.centered-container {
  border: 1px solid whitesmoke;
  border-radius: 2vw;
  height: 65vh;
  width: 80vw;
  overflow: auto;
  margin: 1vh auto;
  padding: 3vw;
}

.input-container {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin: 2vh auto;
  padding: 1vh;
  width: 80vw;
}

.input {
  width: 85vw;
}
</style>
