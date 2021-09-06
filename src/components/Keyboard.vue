<template>
  <div style="display: flex; justify-content: center;">
    <div class="keyboard">
      <div v-html=layout> </div>
      <div style="display: flex;">
        <key-base size="1" text="aa"></key-base>
        <key-spacer size="0.5"></key-spacer>
        <key-base size="1" text="aa"></key-base>
        <key-base size="1" text="!\n1"></key-base>
      </div>
      <div style="display: flex;">
        <key-base size="1" text="aa"></key-base>
        <key-spacer size="0.5"></key-spacer>
        <key-base size="1" text="aa"></key-base>
        <key-base size="1" text="!\n1"></key-base>
      </div>
    </div>
  </div>
</template>

<script>
import KeyBase from "@/components/KeyBase";
import KeySpacer from "@/components/KeySpacer";

export default {
  name: "Keyboard",
  props: ['config'],
  components: {KeySpacer, KeyBase},
  computed: {
    layout() {
      let json = "{\"keymap\": [\n" +
          "\t\t\t[\"0,0\",{\"x\":1},\"0,2\"],\n" +
          "\t\t\t[\"1,0\",\"1,1\",\"1,2\"],\n" +
          "\t\t\t[\"2,0\",\"2,1\",\"2,2\"],\n" +
          "\t\t\t[\"3,0\",\"3,1\",\"3,2\"],\n" +
          "\t\t\t[\"4,0\",\"4,1\",\"4,2\"]\n" +
          "\t\t]}";

      let obj = JSON.parse(json);
      let text = "";
      obj.keymap.forEach(function (rows) {
        let row = document.createElement("div");
        row.style = "display: flex;";
        rows.forEach(function (key) {
          if (typeof(key) == 'string') {
            let key = document.createElement("key-base");
            key.setAttribute("size", "1");
            key.setAttribute("text", "");
            key.setAttribute("id", key);
            row.appendChild(key);
          }
        });
        console.log(row.outerHTML);
        text = text + row.outerHTML;
      });

      return text;
    }
  }
}
</script>

<style scoped>
  .keyboard {
    font-size: 50px;
  }

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

  .spacer {
    height: 1em;
    margin: 2px;
    padding: 2px;
    display: flex;
    position: relative;
  }
</style>