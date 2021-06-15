import { Keyboard } from './via.js/via.js';
// import { Chroma } from '../node_modules/chroma-js/index.js';

let keyboard = null;

document.getElementById("connect").addEventListener('click', async function () {
    let d = await navigator.hid.requestDevice({ 'filters': [] });
    // console.log(d)
    keyboard = new Keyboard(d);
    console.log(keyboard);
    // await keyboard.via.addEventListener("inputreport", event => {console.log(event);});
    let brightness = document.getElementById("brightness");
    let effect = document.getElementById("effect");
    let underglow = document.getElementById("underglow");

    setTimeout(async function() {
        brightness.value = await keyboard.getRGBLightBrightness();
        effect.value = await keyboard.getRGBLightEffect();
        let color = await keyboard.getRGBLightColor();
        underglow.value = chroma((color[0]/255)*360, color[1]/255, brightness.value/255, 'hsv').hex();
    }, 500);

    brightness.addEventListener('input', async function () {
        keyboard.setRGBLightBrightness(brightness.value);
        let color = await keyboard.getRGBLightColor();
        underglow.value = chroma((color[0]/255)*360, color[1]/255, brightness.value/255, 'hsv').hex();;
    }, false);

    effect.addEventListener('input', function () {
        keyboard.setRGBLightEffect(Number(effect.value));
    }, false);

    underglow.addEventListener('input', function () {
        let color = chroma(underglow.value).hsv();
        keyboard.setRGBLightColor(Math.floor((color[0]/360)*255), Math.floor(color[1]*255));
        keyboard.setRGBLightBrightness(Math.floor(color[2]*255));
        brightness.value = Math.floor(color[2]*255);
    }, false);

    document.getElementById("save").addEventListener('click', async function () {
        await keyboard.saveLighting();
    }, false);
}, false);