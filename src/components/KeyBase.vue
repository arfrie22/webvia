<template>
  <div tabindex="-1" v-on:click=divClick :style=style class="key">
    <pre id="text">{{keyText}}</pre>
  </div>
</template>

<script>
export default {
  name: "KeyBase",
  props: ['size', 'text', 'id'],
  computed: {
    style() {
      return 'width: ' + this.size + 'em;'
    },
    keyText() {
      return this.text.replace("\\n", "\n")
    }
  },
  methods: {
    divClick(e) {
      e.target.focus();
    }
  }
}
</script>

<style scoped>
  .key {
    height: 1em;
    border: 1px solid #000;
    border-radius: 4px;
    margin: 2px;
    padding: 2px;
    display: flex;
    position: relative;
  }

  .key:hover {
    background-color: #568ca3;
  }

  .key:focus {
    background-color: #276da3;
  }

  .key #text {
    font-size: 14px;
    horiz-align: left;
    position: absolute;
    bottom: 0;
  }
</style>