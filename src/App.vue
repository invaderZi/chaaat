<template>
  <router-view />
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
});
</script>
<style>
:root {
  --real-black: #191919;
}
body {
  background-color: darkgray;
}
</style>
