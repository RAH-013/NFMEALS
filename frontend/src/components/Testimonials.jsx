import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from "swiper/modules";
import { useState } from 'react';

import 'swiper/css';
import "swiper/css/navigation";

function Testimonials() {
    const [activeIndex, setActiveIndex] = useState(0);
    const slides = [
        { id: 1, text: "Testimonio 1: ¡Este producto es increíble!" },
        { id: 2, text: "Testimonio 2: Me ha cambiado la vida." },
        { id: 3, text: "Testimonio 3: Servicio excelente y rápido." },
        { id: 4, text: "Testimonio 4: Muy recomendable." },
        { id: 5, text: "Testimonio 5: Superó mis expectativas." },
        { id: 6, text: "Testimonio 6: Calidad insuperable." },
        { id: 7, text: "Testimonio 7: Volveré a comprar seguro." },
        { id: 8, text: "Testimonio 8: Atención al cliente perfecta." },
        { id: 9, text: "Testimonio 9: Lo recomiendo al 100%." },
    ];

    return (
        <div className="h-screen bg-neutral-500 text-white font-sans flex items-center justify-center">
            <Swiper
                modules={[Autoplay, Navigation]}
                spaceBetween={20}
                centeredSlides={true}
                navigation
                loop
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                className="w-full max-w-6xl"
                slidesPerView={1.5}
                breakpoints={{
                    640: { slidesPerView: 2.2 },
                    1024: { slidesPerView: 3 },
                }}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            >
                {slides.map((slide, idx) => (
                    <SwiperSlide
                        key={slide.id}
                        className={`flex flex-col items-center justify-center transition-transform duration-300 ${idx === activeIndex ? 'scale-100' : 'scale-90 opacity-50'
                            }`}
                    >
                        <img
                            src={`https://picsum.photos/seed/${slide.id}/400/300`}
                            alt={`Slide ${slide.id}`}
                            loading='lazy'
                            className="w-full h-64 object-cover rounded-lg shadow-lg mb-4"
                        />
                        <div className="text-center px-2">
                            {slide.text}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default Testimonials;