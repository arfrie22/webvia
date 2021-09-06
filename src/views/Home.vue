<template>
  <div class="home">
    <h1>VIA.JS</h1>
    <button v-on:click=connect>Connect</button>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

import {Keyboard} from "@/via.js/via";

export default {
  name: 'Home',
  methods: {
    async connect() {
      let d = await navigator.hid.requestDevice({ 'filters': [] });
      if (d.length > 0) {
        let keyboard = new Keyboard(d);
        await keyboard.init();
        if (await keyboard.isValid()) {
          navigator.hid.addEventListener("connect", event => {
            if (event.device.productId == keyboard.via.productId && event.device.vendorId == keyboard.via.vendorId && event.device.collections[0].usage == keyboard.via.collections[0].usage) {
              if (this.$router.currentRoute.value.path == "/disconnected") this.$router.replace("device");
            }
          });
          navigator.hid.addEventListener("disconnect", event => {
            if (event.device.productId == keyboard.via.productId && event.device.vendorId == keyboard.via.vendorId && event.device.collections[0].usage == keyboard.via.collections[0].usage) {
              if (this.$router.currentRoute.value.path == "/device") this.$router.replace("disconnected");
            }
          });
          this.$store.state.keyboard = keyboard;
          this.$router.replace('/device');
        }
      }
    }
  }
}
</script>
