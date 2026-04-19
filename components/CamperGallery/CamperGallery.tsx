'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import styles from './CamperGallery.module.css';

type CamperGalleryProps = {
  images: {
    thumb: string;
    original: string;
  }[];
  title: string;
};

export function CamperGallery({ images, title }: CamperGalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <div className={styles.gallery}>
      <Swiper
        modules={[FreeMode, Navigation, Thumbs]}
        navigation
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        className={styles.mainSwiper}
      >
        {images.map((image, index) => (
          <SwiperSlide key={`${image.original}-${index}`}>
            <div className={styles.mainImageWrap}>
              <Image
                src={image.original}
                alt={`${title} image ${index + 1}`}
                fill
                sizes="(max-width: 1440px) 60vw, 760px"
                className={styles.image}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        modules={[FreeMode, Navigation, Thumbs]}
        onSwiper={setThumbsSwiper}
        spaceBetween={16}
        slidesPerView={Math.min(images.length, 3)}
        freeMode
        watchSlidesProgress
        className={styles.thumbsSwiper}
      >
        {images.map((image, index) => (
          <SwiperSlide key={`${image.thumb}-${index}`}>
            <div className={styles.thumbWrap}>
              <Image
                src={image.thumb}
                alt={`${title} thumbnail ${index + 1}`}
                fill
                sizes="220px"
                className={styles.image}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
