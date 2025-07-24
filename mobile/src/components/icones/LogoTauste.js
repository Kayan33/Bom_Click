import React from 'react';
import { Image } from 'react-native';

const base64ImageUri = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAMAAABrrFhUAAAAFVBMVEVHcEwjSHojSHojSHojSHojSHojSHoVpQAjAAAABnRSTlMAGD98veraIXmCAAADnklEQVR42u3a3Y6bMBCG4czv/V9yVSVlFhuvDdukqnifQwLY/jCDQXkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADg/yT54o+bsnzRxz1J5FM8bkrzxR435fkUUtvk5lNA/B8lICr/sg5KbfF9v3xEKsdmc/GNtXtW5mIe+RRuUnsN2vRD9rM66LUhtZkkA9rdSX09yY23Z7MtvdzRaZt5KH76KKyxeLPDgB1nFKcCEM+GTtvMY/LDOlgdTDsXQHcJ1wMQz78WgC6Od8Tq55CFA+quabevByCeHZ22OR7AnOZQSEVvKwHEaA9dDsDyLwbgazWvV3VQoj9X5FBNgD1fDUAGMznH+gDKUsnrWdVBO6gnOaajc8pSAO2hbmYeqU0u/anzchGQ45nv+eTR3wFiL5Ebe5HRpLLTAdRBKtVmHreZm/Cv9FIFtL4whHx/7HRSxYUA4tHLMnq2nqKjvnqXyXoAUb3JjV0IQD4QgG08M/Q3ef7yW1XAEwFYdUZy42sBaGZxvRCA/nFlBWzjNeF6AFED+rqLLgTQPmLCTgdQriz/QkZvBesB6NcpbLnxtQA0d1w/FIAeDNVqICcCqK2+v6AyD6COL/aZALyf7BLVhfUAdD9iy40tBdAn4O8JYH63Sz0VTgTg+45LU9RnAVRnin0ggMjxLaBnApBvrqdd/R4gbwlgXu4lqpurAXh7wS03sRZA/0ro7wlgfrdbxb8YgPS9jtzoUgB9IYg3B1CtHSyEXMs8AMsyfXON9hDb35RF37sQ0tzx0Uh8GoBElvmLm4wD0LwawOVPYMWORxIyDcDy0Ghl4PLnkBqnaRWByzOgyJkKGM0KrmHzGhA5Uhl6DulzKO6eezINYMROVECXfDHJXsyLoOWMfbdTdEO5XgQruinrr3t49nQegGcZjlFWa2SxywH4Y86aO3/A549BzTkdxxQyGIrL5QBsfREQ8v0clnkAnnNeBa5lgzIS+rgcgKwvA3U3htDWfCGkw4Yti4wS0Dppe/0vB+Drj0Gf/T1gHoCPG47mJ4tsuNZJ208i1wOw9YVQ237I2QDkm4Jp7eQQ8yzhdcBg+7UAZHkl5OPXgjEr+8+L3bFiRdvvkbrrpqrV9kmbxY49FknIzf8mJYNPA7ekt5kC878H3JTc/p9y9XbAn4cBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwKb8ACLxmCzT2XjoAAAAASUVORK5CYII='

const LogoTauste = ({ width = 70, height = 60, ...props }) => {
    return (
        <Image
            source={{ uri: base64ImageUri }}
            style={{ width, height }}
            resizeMode="contain" 
            {...props}
        />
    );
};

export default LogoTauste;