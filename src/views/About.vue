<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button v-on:click=home> Lol </button>
  </div>
  <keyboard></keyboard>
</template>

<script>
import Keyboard from "@/components/Keyboard";
export default {
  name: 'About',
  components: {
    Keyboard

  },
  methods: {
    home() {
      this.$router.push('/');
    }
  }
}
</script>
