// import Swiper from 'react-id-swiper'
const ImageSwiper = (props: { images: Image[] }) => {
  const params = {
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    loop: true,
    spaceBetween: 30,
  }

  return (
    <div className="swiper">
      {/* <Swiper {...params}>
        {props.images.length > 0 &&
          props.images.map((image: any) => (
            <div key={image.path}>
              <img src={image.path} alt="商品画像" />
            </div>
          ))}
      </Swiper> */}
    </div>
  )
}

export default ImageSwiper
