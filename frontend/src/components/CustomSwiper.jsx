import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useEffect, useState, useRef } from 'react';

import 'swiper/css';
import "swiper/css/navigation";

import Images from '../layouts/Images';

function CustomSwiper({
    slides = [],
    setActiveText,
    autoplay = 15000,
    showNavigation = false,
    showPagination = false,
    slidesPerView = 3,
    movilSlidesPerView = 1,
    renderSlideContent
}) {
    const [activeIndex, setActiveIndex] = useState(0);
    const progressRef = useRef(null);

    const onAutoplayTimeLeft = (_, time, progress) => {
        if (progressRef.current) {
            progressRef.current.style.setProperty("--progress", `${progress}`);
        }
    };

    useEffect(() => {
        if (setActiveText && slides[activeIndex]?.text) {
            setActiveText(slides[activeIndex].text);
        }
    }, [activeIndex, setActiveText, slides]);

    return (
        <>
            <Swiper
                modules={[Autoplay, Navigation, Pagination]}
                spaceBetween={30}
                centeredSlides
                loop
                navigation={showNavigation}
                pagination={
                    showPagination
                        ? {
                            clickable: true,
                            el: '.custom-pagination',
                        }
                        : false
                } autoplay={{
                    delay: autoplay,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                slidesPerView={movilSlidesPerView}
                breakpoints={{
                    768: {
                        slidesPerView: slidesPerView,
                    },
                }}
                onAutoplayTimeLeft={onAutoplayTimeLeft}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            >
                {slides.map((slide, idx) => (
                    <SwiperSlide
                        key={slide.id}
                        className={`flex flex-col items-center justify-center transition-transform duration-300 ${idx === activeIndex ? 'scale-100' : 'scale-80 opacity-50'}`}
                    >
                        <div
                            ref={idx === activeIndex ? progressRef : null}
                            className={`aspect-9/16 md:aspect-square ${renderSlideContent ? "overflow-hidden" : ""}  ${idx === activeIndex ? 'border-4' : 'border-0 rounded-lg'} transition-all duration-300`}
                            style={{
                                borderImage: `conic-gradient(transparent calc(var(--progress) * 360deg), rgb(227, 29, 38, 0.8) 0deg) 1`,
                            }}
                        >
                            {renderSlideContent
                                ? renderSlideContent(slide, idx === activeIndex)
                                : (
                                    <Images
                                        src={slide.url}
                                        alt={slide.alt || "slide"}
                                        width="100%"
                                        height="100%"
                                        isRound={idx === activeIndex && ""}
                                    />
                                )
                            }
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {showPagination && (
                <div className="custom-pagination mt-4 flex justify-center gap-2"></div>
            )}
        </>
    );
}

export default CustomSwiper;