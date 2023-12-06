<template>
  <div>
    <div>
      <q-btn
        round
        flat
        icon="arrow_back"
        color="white"
        text-color="black"
        size="md"
        class="q-ml-md q-mb-xs"
        @click="closeUserList"
      />
    </div>
    <q-list separator padding>
      <UserListItem
        v-for="user in users"
        :key="user.id"
        :user="user"
        @click="newChat(user)"
      />
    </q-list>
  </div>
</template>

<script>
import UserListItem from "./UserListItem.vue";

export default {
  components: { UserListItem },
  props: {
    users: {
      type: Array,
      default: [],
    },
  },

  methods: {
    newChat(user) {
      this.$emit("newChatUser", user);
    },

    closeUserList() {
      this.$emit("close-user-list");
    },
  },
};
</script>
