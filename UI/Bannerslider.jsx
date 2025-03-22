import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../src/Styles/bannerslider.css";

function Bannerslider() {
  return (
    <div className="banner-slider">
      <Swiper
        spaceBetween={10}
        centeredSlides={true}
        autoplay={{
          delay: 3000, // Auto-slide every 3 seconds
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="banner">
            <img src="/images/ecom1.webp" alt="Banner 1" />
          </div>
        </SwiperSlide> 

        <SwiperSlide>
          <div className="banner">
            <img src="/images/ecom6.webp" alt="Banner 2" />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="banner">
            <img src="/images/ecom-2.webp" alt="Banner 3" />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="banner">
            <img src="/images/ecom7.webp" alt="Banner 7" />
          </div>
        </SwiperSlide>
        
        <SwiperSlide>
          <div className="banner">
            <img src="/images/ecom4.jpg" alt="Banner 4" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="banner">
            <img src="/images/ecom5.webp" alt="Banner 5" />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Bannerslider
