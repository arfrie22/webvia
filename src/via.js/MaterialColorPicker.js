import React from 'react'
import PropTypes from 'prop-types'
import reactCSS from 'reactcss'
import merge from 'lodash/merge'

import { ColorWrap, Hue, Saturation } from 'react-color/lib/components/common'
import SliderPointer from 'react-color/lib/components/slider/SliderPointer'
import PhotoshopPointerCircle from 'react-color/lib/components/photoshop/PhotoshopPointerCircle'

export const Slider = ({ hsl, onChange, pointer,
                           styles: passedStyles = {}, className = '' }) => {
    const styles = reactCSS(merge({
        'default': {
            hue: {
                height: '12px',
                position: 'relative',
            },
            Hue: {
                radius: '2px',
            },
            sat: {
                height: '12px',
                position: 'relative',
            },
            Sat: {
                radius: '2px',
            },
        },
    }, passedStyles))

    return (
        <div style={ styles.wrap || {} } className={ `slider-picker ${ className }` }>
            <div style={ styles.hue }>
                <Hue
                    style={ styles.Hue }
                    hsl={ hsl }
                    pointer={ pointer }
                    onChange={ onChange }
                />
            </div>
            <br />
            <div style={ styles.sat }>
                <Saturation
                    style={ styles.Sat }
                    hsl={ hsl }
                    hsv={ hsl }
                    pointer={ PhotoshopPointerCircle }
                    onChange={ onChange }
                />
            </div>
        </div>
    )
}

Slider.propTypes = {
    styles: PropTypes.object,
}
Slider.defaultProps = {
    pointer: SliderPointer,
    styles: {},
}

export default ColorWrap(Slider)