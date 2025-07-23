import React from 'react';

import { Svg, Path } from 'react-native-svg';
import { TAMANHOS } from '../../styles/styles';

const IconeVoltar = ({ width = TAMANHOS.tamanhoIcone, height = TAMANHOS.tamanhoIcone, ...props }) => {
    return (
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M7.825 17L13.425 22.6L12 24L4 16L12 8L13.425 9.4L7.825 15H20V17H7.825Z" fill="white" />
        </Svg>


    );
};

export default IconeVoltar;