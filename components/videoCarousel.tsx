"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

const VideoCarousel = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}  
      pagination={{ clickable: true }}
      loop={true}
      autoplay={{
        delay: 5000, 
        disableOnInteraction: false,
      }}
      className="mySwiper"
    >
      <SwiperSlide>
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{ width: "100%", height: "auto", objectFit: "cover" }}
        >
          <source src="/videos/video2.mp4" type="video/mp4" />
        </video>
      </SwiperSlide>
  
      <SwiperSlide>
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{ width: "100%", height: "auto", objectFit: "cover" }}
        >
          <source src="/videos/video3.mp4" type="video/mp4" />
        </video>
      </SwiperSlide>

      <SwiperSlide>
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{ width: "100%", height: "auto", objectFit: "cover" }}
        >
          <source src="/videos/video4.mp4" type="video/mp4" />
        </video>
      </SwiperSlide>
    </Swiper>
  )
}

export default VideoCarousel;  
   