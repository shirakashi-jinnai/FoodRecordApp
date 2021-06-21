import { IconButton } from '@material-ui/core';
import { Favorite, Share } from '@material-ui/icons';
import React from 'react';
import Swiper from 'react-id-swiper';




const ImageSwiper = (props) => {

    const params = {
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
            dynamicBullets: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        loop: true,
        spaceBetween: 30
    }

    return (
        <div className="swiper">
            <Swiper {...params} >
                {props.images.length > 0 && (props.images.map((image) => (
                    <div key={image.path}><img src={image.path} alt="商品画像" /></div>
                )))}
            </Swiper>
            <IconButton>
                <Favorite />
            </IconButton>
            <IconButton>
                <Share />
            </IconButton>
        </div>
    )
}

export default ImageSwiper