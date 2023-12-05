<template>
  <q-item clickable>
    <q-item-section avatar>
      <q-avatar v-if="chat.userAvatar">
        <img :src="chat.userAvatar ?? ''" alt="" />
      </q-avatar>
      <q-avatar v-else icon="person" color="black" text-color="white" />
    </q-item-section>

    <q-item-section>
      <q-item-label
        :class="{ 'text-bold': !chat.viewd, 'text-normal': chat.viewd }"
        lines="1"
      >
        {{ chat.userName }}
      </q-item-label>
      <q-item-label
        :class="{
          'text-bold': !chat.viewd,
          'text-black': !chat.viewd,
          'text-normal': chat.viewd,
        }"
        caption
        lines="1"
      >
        {{ chat.lastMessage ?? "" }}
      </q-item-label>
    </q-item-section>

    <q-item-section side top>
      <q-item-label
        caption
        :class="{
          'text-bold': !chat.read,
          'text-black': !chat.read,
          'text-normal': chat.read,
        }"
      >
        {{ chat.lastMessageTime }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  props: ["chat"],
  data() {
    return {};
  },
};
</script>
