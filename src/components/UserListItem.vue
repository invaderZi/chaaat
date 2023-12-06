<template>
  <q-item clickable>
    <q-item-section avatar>
      <q-avatar v-if="user.userAvatar !== null">
        <img :src="user.userAvatar ?? ''" alt="" />
      </q-avatar>
      <q-avatar v-else icon="person" color="black" text-color="white" />
    </q-item-section>

    <q-item-section>
      <q-item-label class="text-bold" lines="1">
        {{ user.userName }}
      </q-item-label>

      <q-item-label caption class="text-normal">
        {{ user.status }}
      </q-item-label>
      <q-item-label
        :class="{
          'green-text text-bold': user.online,
          'text-normal': !user.online,
        }"
        caption
        lines="1"
      >
        {{ user.online ? "online" : " offline" }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  props: ["user"],
  data() {
    return {};
  },
};
</script>
<style scoped>
.green-text {
  color: darkgreen;
}
</style>
