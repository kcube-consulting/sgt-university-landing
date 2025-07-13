// HeroSlider.jsx
import React, { useEffect, useRef } from 'react';
import 'swiper/swiper-bundle.css';
import { Swiper } from 'swiper';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';

export default function HeroSlider() {
  const sliderRef = useRef(null);

  useEffect(() => {
    new Swiper(sliderRef.current, {
      loop: true,
      autoplay: { delay: 4000 },
      effect: 'fade'
    });
  }, []);

  useEffect(() => {
    new Swiper(sliderRef.current, {
	  modules: [Autoplay, EffectFade],
	  loop: true,
	  autoplay: { delay: 4000 },
	  effect: 'fade'
    });
  }, []);

  return (
    <div ref={sliderRef} className="swiper-container h-[60vh] relative">
      <div className="swiper-wrapper">
        <div className="swiper-slide bg-cover bg-center" style={{ backgroundImage: "url('/img1.jpg')" }} />
        <div className="swiper-slide bg-cover bg-center" style={{ backgroundImage: "url('/img2.jpg')" }} />
        <div className="swiper-slide bg-cover bg-center" style={{ backgroundImage: "url('/img3.jpg')" }} />
      </div>
      <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/40 text-white text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-2">Welcome to SGT University</h1>
        <p className="text-lg md:text-2xl">Empowering Minds, Building Futures</p>
      </div>
    </div>
  );
}
