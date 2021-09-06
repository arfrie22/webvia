import { waitUntil } from 'async-wait-until/dist/index.esm.js';
export { viaCommandId, viaLightingValue, viaKeyboardValueId, Keyboard };

const TIMEOUT = 10000;

const viaCommandId = {
    getProtocolVersion                : 0x01,  // always 0x01
    getKeyboardValue                  : 0x02,
    setKeyboardValue                  : 0x03,
    dynamicKeymapGetKeycode           : 0x04,
    dynamicKeymapSetKeycode           : 0x05,
    dynamicKeymapReset                : 0x06,
    setLightingValue                  : 0x07,
    getLightingValue                  : 0x08,
    lightingSave                      : 0x09,
    eepromReset                       : 0x0A,
    bootloaderJump                    : 0x0B,
    dynamicKeymapMacroGetCount        : 0x0C,
    dynamicKeymapMacroGetBufferSize   : 0x0D,
    dynamicKeymapMacroGetBuffer       : 0x0E,
    dynamicKeymapMacroSetBuffer       : 0x0F,
    dynamicKeymapMacroReset           : 0x10,
    dynamicKeymapGetLayerCount        : 0x11,
    dynamicKeymapGetBuffer            : 0x12,
    dynamicKeymapSetBuffer            : 0x13,
    unhandled                         : 0xFF
};

const viaKeyboardValueId = {
    uptime              : 0x01,
    layoutOptions       : 0x02,
    switchMatrixState   : 0x03
};

const viaLightingValue = {
    // QMK Backlight
    qmkBacklightBrightness : 0x09,
    qmkBacklightEffect     : 0x0A,

    // QMK RGB Light
    qmkRGBLightBrightness   : 0x80,
    qmkRGBLightEffect       : 0x81,
    qmkRGBLightEffectSpeed  : 0x82,
    qmkRGBLightColor        : 0x83,
};



/***** rgblight_mode(mode)/rgblight_mode_noeeprom(mode) ****
 old mode number (before 0.6.117) to new mode name table
 |-----------------|-----------------------------------|
 | old mode number | new mode name                     |
 |-----------------|-----------------------------------|
 |        1        | RGBLIGHT_MODE_STATIC_LIGHT        |
 |        2        | RGBLIGHT_MODE_BREATHING           |
 |        3        | RGBLIGHT_MODE_BREATHING + 1       |
 |        4        | RGBLIGHT_MODE_BREATHING + 2       |
 |        5        | RGBLIGHT_MODE_BREATHING + 3       |
 |        6        | RGBLIGHT_MODE_RAINBOW_MOOD        |
 |        7        | RGBLIGHT_MODE_RAINBOW_MOOD + 1    |
 |        8        | RGBLIGHT_MODE_RAINBOW_MOOD + 2    |
 |        9        | RGBLIGHT_MODE_RAINBOW_SWIRL       |
 |       10        | RGBLIGHT_MODE_RAINBOW_SWIRL + 1   |
 |       11        | RGBLIGHT_MODE_RAINBOW_SWIRL + 2   |
 |       12        | RGBLIGHT_MODE_RAINBOW_SWIRL + 3   |
 |       13        | RGBLIGHT_MODE_RAINBOW_SWIRL + 4   |
 |       14        | RGBLIGHT_MODE_RAINBOW_SWIRL + 5   |
 |       15        | RGBLIGHT_MODE_SNAKE               |
 |       16        | RGBLIGHT_MODE_SNAKE + 1           |
 |       17        | RGBLIGHT_MODE_SNAKE + 2           |
 |       18        | RGBLIGHT_MODE_SNAKE + 3           |
 |       19        | RGBLIGHT_MODE_SNAKE + 4           |
 |       20        | RGBLIGHT_MODE_SNAKE + 5           |
 |       21        | RGBLIGHT_MODE_KNIGHT              |
 |       22        | RGBLIGHT_MODE_KNIGHT + 1          |
 |       23        | RGBLIGHT_MODE_KNIGHT + 2          |
 |       24        | RGBLIGHT_MODE_CHRISTMAS           |
 |       25        | RGBLIGHT_MODE_STATIC_GRADIENT     |
 |       26        | RGBLIGHT_MODE_STATIC_GRADIENT + 1 |
 |       27        | RGBLIGHT_MODE_STATIC_GRADIENT + 2 |
 |       28        | RGBLIGHT_MODE_STATIC_GRADIENT + 3 |
 |       29        | RGBLIGHT_MODE_STATIC_GRADIENT + 4 |
 |       30        | RGBLIGHT_MODE_STATIC_GRADIENT + 5 |
 |       31        | RGBLIGHT_MODE_STATIC_GRADIENT + 6 |
 |       32        | RGBLIGHT_MODE_STATIC_GRADIENT + 7 |
 |       33        | RGBLIGHT_MODE_STATIC_GRADIENT + 8 |
 |       34        | RGBLIGHT_MODE_STATIC_GRADIENT + 9 |
 |       35        | RGBLIGHT_MODE_RGB_TEST            |
 |       36        | RGBLIGHT_MODE_ALTERNATING         |
 |       37        | RGBLIGHT_MODE_TWINKLE             |
 |       38        | RGBLIGHT_MODE_TWINKLE + 1         |
 |       39        | RGBLIGHT_MODE_TWINKLE + 2         |
 |       40        | RGBLIGHT_MODE_TWINKLE + 3         |
 |       41        | RGBLIGHT_MODE_TWINKLE + 4         |
 |       42        | RGBLIGHT_MODE_TWINKLE + 5         |
 |-----------------|-----------------------------------|
 *****/



class Keyboard {
    via = null;
    opened = false;
    macroBuffer = null;
    valid = false;

    values = {
        protocolVersion: {
            version: 0,
            timestamp: 0
        },
        keyboardUptime: {
            uptime: 0,
            timestamp: 0
        },
        keyboardLayoutOptions: {
            options: 0,
            timestamp: 0
        },
        keyboardSwitchMatrixState: {
            state: 0,
            timestamp: 0
        },
        currentKeycode: {
            layer: 0,
            row: 0,
            column: 0,
            keycode: 0,
            timestamp: 0
        },
        backlightBrightness: {
            brightness: 0,
            timestamp: 0
        },
        backlightEffect: {
            effect: 0,
            timestamp: 0
        },
        rgbLightBrightness: {
            brightness: 0,
            timestamp: 0
        },
        rgbLightEffect: {
            effect: 0,
            timestamp: 0
        },
        rgbLightEffectSpeed: {
            speed: 0,
            timestamp: 0
        },
        rgbLightColor: {
            hue: 0,
            saturation: 0,
            timestamp: 0
        },
        macroCount: {
            count: 0,
            timestamp: 0
        },
        macroBufferSize: {
            size: 0,
            timestamp: 0
        },
        macroBuffer: {
            offset: 0,
            size: 0,
            buffer: [],
            timestamp: 0
        },
        layerCount: {
            count: 0,
            timestamp: 0
        },
        buffer: {
            offset: 0,
            size: 0,
            buffer: null,
            timestamp: 0
        },
    }

    viaReport(event) {
        let data = event.data;
        switch (data.getUint8(0)) {
            case viaCommandId.getProtocolVersion:
                this.values.protocolVersion.version = data.getUint16(1);
                this.values.protocolVersion.timestamp = Date.now();
                return;
            case viaCommandId.getKeyboardValue:
                switch(data.getUint8(1)) {
                    case viaKeyboardValueId.uptime:
                        this.values.keyboardUptime.uptime = data.getUint32(2);
                        this.values.keyboardUptime.timestamp = Date.now();
                        return;
                    case viaKeyboardValueId.layoutOptions:
                        this.values.keyboardLayoutOptions.options = data.getUint32(2);
                        this.values.keyboardLayoutOptions.timestamp = Date.now();
                        return;
                    case viaKeyboardValueId.switchMatrixState:
                        this.values.keyboardUptime.state = data.getUint32(2);
                        this.values.protocolVersion.timestamp = Date.now();
                        return;
                }
                return;
            case viaCommandId.setKeyboardValue:
                return;
            case viaCommandId.dynamicKeymapGetKeycode:
                this.values.currentKeycode.layer = data.getUint8(1);
                this.values.currentKeycode.row = data.getUint8(2);
                this.values.currentKeycode.column = data.getUint8(3);
                this.values.currentKeycode.keycode = data.getUint16(4);
                this.values.currentKeycode.timestamp = Date.now();
                return;
            case viaCommandId.dynamicKeymapSetKeycode:
                return;
            case viaCommandId.dynamicKeymapReset:
                return;
            case viaCommandId.setLightingValue:
                return;
            case viaCommandId.getLightingValue:
                switch (data.getUint8(1)) {
                    case viaLightingValue.qmkBacklightBrightness:
                        this.values.backlightBrightness.brightness = data.getUint8(2);
                        this.values.backlightBrightness.timestamp = Date.now();
                        return;
                    case viaLightingValue.qmkBacklightEffect:
                        this.values.backlightEffect.effect = data.getUint8(2);
                        this.values.backlightEffect.timestamp = Date.now();
                        return;
                    case viaLightingValue.qmkRGBLightBrightness:
                        this.values.rgbLightBrightness.brightness = data.getUint8(2);
                        this.values.rgbLightBrightness.timestamp = Date.now();
                        return;
                    case viaLightingValue.qmkRGBLightEffect:
                        this.values.rgbLightEffect.effect = data.getUint8(2);
                        this.values.rgbLightEffect.timestamp = Date.now();
                        return;
                    case viaLightingValue.qmkRGBLightEffectSpeed:
                        this.values.rgbLightEffectSpeed.speed = data.getUint8(2);
                        this.values.rgbLightEffectSpeed.timestamp = Date.now();
                        return;
                    case viaLightingValue.qmkRGBLightColor:
                        this.values.rgbLightColor.hue = data.getUint8(2);
                        this.values.rgbLightColor.saturation = data.getUint8(3);
                        this.values.rgbLightColor.timestamp = Date.now();
                        return;
                }
                return;
            case viaCommandId.lightingSave:
                return;
            case viaCommandId.eepromReset:
                return;
            case viaCommandId.bootloaderJump:
                return;
            case viaCommandId.dynamicKeymapMacroGetCount:
                this.values.macroCount.count = data.getUint8(1);
                this.values.macroCount.timestamp = Date.now();
                return;
            case viaCommandId.dynamicKeymapMacroGetBufferSize:
                this.values.macroBufferSize.size = data.getUint16(1);
                this.values.macroBufferSize.timestamp = Date.now();
                return;
            case viaCommandId.dynamicKeymapMacroGetBuffer:
                this.values.macroBuffer.offset = data.getUint16(1);
                this.values.macroBuffer.size = data.getUint8(3);
                this.values.macroBuffer.buffer = [];
                for (let i = 0; i < this.values.macroBuffer.size; i++) {
                    this.values.macroBuffer.buffer[i] = data.getUint8(4 + i);
                }
                this.values.macroBuffer.timestamp = Date.now();
                return;
            case viaCommandId.dynamicKeymapMacroSetBuffer:
                return;
            case viaCommandId.dynamicKeymapMacroReset:
                return;
            case viaCommandId.dynamicKeymapGetLayerCount:
                this.values.layerCount.count = data.getUint8(1);
                this.values.layerCount.timestamp = Date.now();
                return;
            case viaCommandId.dynamicKeymapGetBuffer:
                this.values.buffer.offset = data.getUint16(1);
                this.values.buffer.size = data.getUint8(3);
                this.values.buffer.buffer = [];
                for (let i = 0; i < this.values.macroBuffer.size; i++) {
                    this.values.macrobuffer[i] = data.getUint8(4 + i);
                }
                this.values.buffer.timestamp = Date.now();
                return;
            case viaCommandId.dynamicKeymapSetBuffer:
                return;
            default:
            case viaCommandId.unhandled:
                return;
        }
    }

    constructor(devices) {
        for (let device of devices) {
            for (let collection of device.collections) {
                if (collection.usage === 97) {
                    this.via = device;
                    this.valid = true;
                }
            }
        }

        if (this.valid) {
            this.via.addEventListener("inputreport", event => {this.viaReport(event);});
        }
    }

    async isValid() {
        if (this.valid) {
            return (await this.getProtocolVersion() > 0);
        }

        return false;
    }

    async init() {
        await this.open();
    }

    async open() {
        await this.via.open();
        this.opened = true;
    }

    async close() {
        await this.via.close();
        this.opened = false;
    }

    async getProtocolVersion() {
        if (this.opened) {
            let timestamp = Date.now();
            await this.via.sendReport(0x00, new Uint8Array([
                viaCommandId.getProtocolVersion]));
            await waitUntil(() => this.values.protocolVersion.timestamp >= timestamp, {timeout: TIMEOUT});
        }
        return this.values.protocolVersion.version;
    }

    async getUptime() {
        if (this.opened) {
            let timestamp = Date.now();
            await this.via.sendReport(0x00, new Uint8Array([
                viaCommandId.getKeyboardValue,
                viaKeyboardValueId.uptime]));
            await waitUntil(() => this.values.keyboardUptime.timestamp >= timestamp, {timeout: TIMEOUT});
        }
        return this.values.keyboardUptime.uptime;
    }

    async getLayoutOptions() {
        if (this.opened) {
            let timestamp = Date.now();
            await this.via.sendReport(0x00, new Uint8Array([
                viaCommandId.getKeyboardValue,
                viaKeyboardValueId.layoutOptions]));
            await waitUntil(() => this.values.keyboardLayoutOptions.timestamp >= timestamp, {timeout: TIMEOUT});
        }
        return this.values.keyboardLayoutOptions.options;
    }

    async setLayoutOptions(option) {
        if (this.opened) {
            await this.via.sendReport(0x00, new Uint8Array([
                viaCommandId.setKeyboardValue,
                viaKeyboardValueId.layoutOptions,
                Math.min(Math.max(option, 0), 255)]));
        }
    }

    //TODO: Implement Function
    async getSwitchMatrixState() {
        if (this.opened) {
            let timestamp = Date.now();
            await this.via.sendReport(0x00, new Uint8Array([
                viaCommandId.getKeyboardValue,
                viaKeyboardValueId.switchMatrixState]));
            await waitUntil(() => this.values.keyboardSwitchMatrixState.timestamp >= timestamp, {timeout: TIMEOUT});
        }
        return this.values.keyboardSwitchMatrixState.state;
    }

    async getKeycode(layer, row, column) {
        if (this.opened) {
            let timestamp = Date.now();
            await this.via.sendReport(0x00, new Uint8Array([
                viaCommandId.dynamicKeymapGetKeycode,
                Math.min(Math.max(layer, 0), 255),
                Math.min(Math.max(row, 0), 255),
                Math.min(Math.max(column, 0), 255)]));
            await waitUntil(() => this.values.currentKeycode.timestamp >= timestamp, {timeout: 10000});
        }
        return this.values.currentKeycode.keycode;
    }

    async setKeycode(layer, row, column, keycode) {
        if (this.opened) {
            let keycode1 = keycode >> 8;
            let keycode2 = keycode & 0xFF;
            await this.via.sendReport(0x00, new Uint8Array([
                viaCommandId.dynamicKeymapSetKeycode,
                Math.min(Math.max(layer, 0), 255),
                Math.min(Math.max(row, 0), 255),
                Math.min(Math.max(column, 0), 255),
                keycode1,
                keycode2]));
        }
    }

    async resetKeymap() {
        if (this.opened) {
            await this.via.sendReport(0x00, new Uint8Array([
                viaCommandId.dynamicKeymapReset]));
        }
    }

    async getBacklightBrightness() {
        if (this.opened) {
            let timestamp = Date.now();
            await this.via.sendReport(0x00, new Uint8Array([
                viaCommandId.getLightingValue,
                viaLightingValue.qmkBacklightBrightness]));
            await waitUntil(() => this.values.backlightBrightness.timestamp >= timestamp, {timeout: 10000});
        }
        return this.values.backlightBrightness.brightness;
    }

    async setBacklightBrightness(brightness) {
        if (this.opened) {
            await this.via.sendReport(0x00, new Uint8Array([
                viaCommandId.setLightingValue,
                viaLightingValue.qmkBacklightBrightness,
                Math.min(Math.max(brightness, 0), 255)]));
        }
    }

    async getBacklightEffect() {
        if (this.opened) {
            let timestamp = Date.now();
            await this.via.sendReport(0x00, new Uint8Array([
                viaCommandId.getLightingValue,
                viaLightingValue.qmkBacklightEffect]));
            await waitUntil(() => this.values.backlightEffect.timestamp >= timestamp, {timeout: TIMEOUT});
        }
        return this.values.backlightEffect.effect;
    }

    async setBacklightEffect(effect) {
        if (this.opened) {
            await this.via.sendReport(0x00, new Uint8Array([
                viaCommandId.setLightingValue,
                viaLightingValue.qmkBacklightEffect,
                Math.min(Math.max(effect, 0), 255)]));
        }
    }

    async getRGBLightBrightness() {
        if (this.opened) {
            let timestamp = Date.now();
            await this.via.sendReport(0x00, new Uint8Array([
                viaCommandId.getLightingValue,
                viaLightingValue.qmkRGBLightBrightness]));
            await waitUntil(() => this.values.rgbLightBrightness.timestamp >= timestamp, {timeout: TIMEOUT});
        }
        return this.values.rgbLightBrightness.brightness;
    }

    async setRGBLightBrightness(brightness) {
        if (this.opened) {
            await this.via.sendReport(0x00, new Uint8Array([
                viaCommandId.setLightingValue,
                viaLightingValue.qmkRGBLightBrightness,
                Math.min(Math.max(brightness, 0), 255)]));
        }
    }

    async getRGBLightEffect() {
        if (this.opened) {
            let timestamp = Date.now();
            await this.via.sendReport(0x00, new Uint8Array([
                viaCommandId.getLightingValue,
                viaLightingValue.qmkRGBLightEffect]));
            await waitUntil(() => this.values.rgbLightEffect.timestamp >= timestamp, {timeout: TIMEOUT});
        }
        return this.values.rgbLightEffect.effect;
    }

    async setRGBLightEffect(effect) {
        if (this.opened) {
            await this.via.sendReport(0x00, new Uint8Array([
                viaCommandId.setLightingValue,
                viaLightingValue.qmkRGBLightEffect,
                Math.min(Math.max(effect, 0), 255)]));
        }
    }

    async getRGBLightEffectSpeed() {
        if (this.opened) {
            let timestamp = Date.now();
            await this.via.sendReport(0x00, new Uint8Array([
                viaCommandId.getLightingValue,
                viaLightingValue.qmkRGBLightEffectSpeed]));
            await waitUntil(() => this.values.rgbLightEffectSpeed.timestamp >= timestamp, {timeout: TIMEOUT});
        }
        return this.values.rgbLightEffectSpeed.speed;
    }

    async setRGBLightEffectSpeed(speed) {
        if (this.opened) {
            await this.via.sendReport(0x00, new Uint8Array([
                viaCommandId.setLightingValue,
                viaLightingValue.qmkRGBLightEffectSpeed,
                Math.min(Math.max(speed, 0), 255)]));
        }
    }

    async getRGBLightColor() {
        if (this.opened) {
            let timestamp = Date.now();
            await this.via.sendReport(0x00, new Uint8Array([
                viaCommandId.getLightingValue,
                viaLightingValue.qmkRGBLightColor]));
            await waitUntil(() => this.values.rgbLightColor.timestamp >= timestamp, {timeout: TIMEOUT});
        }
        return [this.values.rgbLightColor.hue, this.values.rgbLightColor.saturation];
    }

    async setRGBLightColor(hue, saturation) {
        if (this.opened) {
            await this.via.sendReport(0x00, new Uint8Array([
                viaCommandId.setLightingValue,
                viaLightingValue.qmkRGBLightColor,
                Math.min(Math.max(hue, 0), 255),
                Math.min(Math.max(saturation, 0), 255)]));
        }
    }

    async saveLighting() {
        if (this.opened) {
            await this.via.sendReport(0x00, new Uint8Array([
                viaCommandId.lightingSave]));
        }
    }

    async enterBootloader() {
        if (this.opened) {
            await this.via.sendReport(0x00, new Uint8Array([
                viaCommandId.bootloaderJump]));
        }
    }
    
    async getMacroCount() {
        if (this.opened) {
            let timestamp = Date.now();
            await this.via.sendReport(0x00, new Uint8Array([
                viaCommandId.dynamicKeymapMacroGetCount]));
            await waitUntil(() => this.values.macroCount.timestamp >= timestamp, {timeout: TIMEOUT});
        }
        return this.values.macroCount.count;
    }

    async getMacroBufferSize() {
        if (this.opened) {
            let timestamp = Date.now();
            await this.via.sendReport(0x00, new Uint8Array([
                viaCommandId.dynamicKeymapMacroGetBufferSize]));
            await waitUntil(() => this.values.macroBufferSize.timestamp >= timestamp, {timeout: TIMEOUT});
        }
        return this.values.macroBufferSize.size;
    }

    async getMacroBuffer(offset, size) {
        if (this.opened) {
            let timestamp = Date.now();
            let offset1 = offset >> 8;
            let offset2 = offset & 0xFF;
            await this.via.sendReport(0x00, new Uint8Array([
                viaCommandId.dynamicKeymapMacroGetBuffer,
                offset1,
                offset2,
                Math.min(Math.max(size, 0), 28)]));
            await waitUntil(() => this.values.macroBuffer.timestamp >= timestamp, {timeout: TIMEOUT});
        }
        return this.values.macroBuffer.buffer;
    }

    async setMacroBuffer(offset, size, buffer) {
        if (this.opened) {
            let offset1 = offset >> 8;
            let offset2 = offset & 0xFF;
            await this.via.sendReport(0x00, new Uint8Array([
                viaCommandId.dynamicKeymapMacroSetBuffer,
                offset1,
                offset2,
                Math.min(Math.max(size, 0), 28),
                ].concat(Array.from(buffer))));
        }
    }

    async resetMacros() {
        if (this.opened) {
            await this.via.sendReport(0x00, new Uint8Array([
                viaCommandId.dynamicKeymapMacroReset]));
        }
    }

    async getLayerCount() {
        if (this.opened) {
            let timestamp = Date.now();
            await this.via.sendReport(0x00, new Uint8Array([
                viaCommandId.dynamicKeymapGetLayerCount]));
            await waitUntil(() => this.values.layerCount.timestamp >= timestamp, {timeout: TIMEOUT});
        }
        return this.values.layerCount.count;
    }

    async getBuffer(offset, size) {
        if (this.opened) {
            let timestamp = Date.now();
            let offset1 = offset >> 8;
            let offset2 = offset & 0xFF;
            await this.via.sendReport(0x00, new Uint8Array([
                viaCommandId.dynamicKeymapGetBuffer,
                offset1,
                offset2,
                Math.min(Math.max(size, 0), 28)]));
            await waitUntil(() => this.values.macroBuffer.timestamp >= timestamp, {timeout: TIMEOUT});
        }
        return this.values.macroBuffer.buffer;
    }

    async setBuffer(offset, size, buffer) {
        if (this.opened) {
            let offset1 = offset >> 8;
            let offset2 = offset & 0xFF;
            await this.via.sendReport(0x00, new Uint8Array([
                viaCommandId.dynamicKeymapSetBuffer,
                offset1,
                offset2,
                Math.min(Math.max(size, 0), 28),
            ].concat(Array.from(buffer))));
        }
    }

    async readMacroBuffer() {
        let size = await this.getMacroBufferSize();
        this.macroBuffer = new ArrayBuffer(size);
        let macroBufferArray = new Uint8Array(this.macroBuffer);
        for (let i = 0; i < size; i += 28) {
            macroBufferArray.set(await this.getMacroBuffer(i, Math.min(28, size - i)), i);
        }

        return macroBufferArray;
    }

    async updateMacroBuffer() {
        let maxSize = this.getMacroBufferSize();
        let bufferSize = this.macroBuffer.byteLength;
        let macroBufferArray = new Uint8Array(this.macroBuffer);

        if (bufferSize > maxSize) {
            throw Error("Buffer size larger than allocated for EEPROM");
        }

        for (let i = 0; i < bufferSize; i += 28) {
            await this.setMacroBuffer(i, Math.min(28, bufferSize - i), macroBufferArray.subarray(i, i + Math.min(28, bufferSize - i)));
        }
    }
}