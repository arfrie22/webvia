<template>
  <div class="spacer" :style=style></div>
</template>

<script>
export default {
  name: "KeySpacer",
  props: ['size'],
  computed: {
    style() {
      return 'width: ' + this.size + 'em;'
    }
  }
}
</script>

<style scoped>
.spacer {
  height: 1em;
  margin: 2px;
  padding: 2px;
  display: flex;
  position: relative;
}
</style>