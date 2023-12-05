<template>
  <div>
    <div>chats</div>
    <q-list separator padding>
      <ChatListItem
        v-for="chat in chats"
        :key="chat.id"
        :chat="chat"
        @click="openchat(chat)"
      />
    </q-list>
    <q-btn
      to="/chat/new"
      class="fixed-btn"
      round
      icon="add"
      color="black"
    ></q-btn>
  </div>
</template>

<script>
import ChatListItem from "./ChatsListItem.vue";

export default {
  components: { ChatListItem },
  props: {
    chats: {
      type: Array,
      default: [],
    },
  },

  methods: {
    openchat(chat) {
      this.$emit("open-chat", chat);
    },
  },
};
</script>
<style scoped>
.fixed-btn {
  position: fixed;
  bottom: 100px; /* Ajuste conforme necessário para a posição vertical desejada */
  right: 20px; /* Ajuste conforme necessário para a posição horizontal desejada */
}
</style>
