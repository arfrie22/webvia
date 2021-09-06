<template>
  <div class="controls">
    <div>
      <p>Effect: </p>
      <input type="number" id="effect" name="effect" min="1" max="42" value="1" v-on:input=effect>
      <br>

      <p>Hue: </p>
      <input type="range" min="0" max="255" value="0" class="slider" id="hue" v-on:input=hue>
      <br>

      <p>Saturation: </p>
      <input type="range" min="0" max="255" value="0" class="slider" id="saturation" v-on:input=saturation>
      <br>

      <p>Brightness: </p>
      <input type="range" min="0" max="255" value="0" class="slider" id="brightness" v-on:input=brightness>
    </div>
    <div>
      <button id="save" v-on:click=save>Save Lighting</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Device",
  methods: {
    brightness(e) {
      this.$store.state.keyboard.setRGBLightBrightness(e.target.value);
    },
    effect(e) {
      this.$store.state.keyboard.setRGBLightEffect(e.target.value);
    },
    hue(e) {
      this.$store.state.keyboard.setRGBLightColor(e.target.value, document.getElementById("saturation").value);
    },
    saturation(e) {
      this.$store.state.keyboard.setRGBLightColor(document.getElementById("hue").value, e.target.value);
    },
    save() {
      this.$store.state.keyboard.saveLighting();
    }
  },
  beforeMount() {
    if (this.$store.state.keyboard == null) {
      this.$router.replace('/');
    }
  },
  async mounted() {
    if (this.$store.state.keyboard != null) {
      document.getElementById("effect").value = await this.$store.state.keyboard.getRGBLightEffect();
      let color = await this.$store.state.keyboard.getRGBLightColor();
      document.getElementById("hue").value = color[0];
      document.getElementById("saturation").value = color[1];
      document.getElementById("brightness").value = await this.$store.state.keyboard.getRGBLightBrightness();
    }
  }
}
</script>