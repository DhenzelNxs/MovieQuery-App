import React from 'react';
import { Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const { width } = Dimensions.get('window');

export function WaveBackground() {
    return (
        <Svg
            width={width}
            height={width / 4.5}
            viewBox="0 0 1440 320"
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
            }}
        >
            <Path
                fill="#784831"
                fillOpacity="1"
                d="M0,64L80,101.3C160,139,320,213,480,224C640,235,800,181,960,176C1120,171,1280,213,1360,234.7L1440,256V0H1360C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0H0Z"
            />
        </Svg>
    );
}
