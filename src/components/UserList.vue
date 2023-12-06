<template>
  <div>
    <div class="text-center">
      <q-btn
        color="white"
        outline
        text-color="black"
        round
        size="sm"
        icon="arrow_back"
        class="q-ml-md q-mb-sm q-mt-sm"
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
