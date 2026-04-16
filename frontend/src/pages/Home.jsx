import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";

import CustomSwiper from "../components/CustomSwiper"
import Images from "../layouts/Images"

const FRASES = [
    { p1: "Recetas de", p2: "Chef Profesional" },
    { p1: "Ingredientes", p2: "100% Premium" },
    { p1: "Nutrición", p2: "Superior y Medida" },
    { p1: "Directo", p2: "A tu Mesa" }
];

function Home() {
    const [activeText, setActiveText] = useState("");
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % FRASES.length);
        }, 4000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (window.location.hash) {
            const id = window.location.hash.replace("#", "")

            setTimeout(() => {
                document.getElementById(id)?.scrollIntoView({
                    behavior: "smooth"
                })
            }, 100)
        }
    }, [])

    return (
        <div className="bg-gradient-to-bottom from-neutral-900 via-neutral-800 to-neutral-900 text-white">
            <section id="home" className="relative w-full overflow-hidden">
                <div className="absolute inset-0 bg-[url('/patterns/fake-brick.png')] bg-repeat opacity-30 pointer-events-none"></div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-16 flex flex-col md:flex-row items-center gap-10">

                    <div className="w-full md:w-3/5 space-y-8 py-10">
                        <h1 className="text-4xl md:text-7xl font-extrabold text-red-500 leading-[1.1] flex flex-wrap gap-x-[0.2em] tracking-tighter">
                            {"MAXIMO RENDIMIENTO EN CADA BOCADO".split(" ").map((palabra, i) => (
                                <span
                                    key={i}
                                    className="inline-block opacity-0 animate-reveal"
                                    style={{ animationDelay: `${i * 0.12}s` }}
                                >
                                    {palabra}
                                </span>
                            ))}
                        </h1>

                        <div className="h-24 md:h-32 flex flex-col justify-center opacity-0 animate-reveal" style={{ animationDelay: '1s' }}>
                            <div key={index} className="animate-dynamic">
                                <p className="text-red-500 text-xs md:text-sm uppercase tracking-[0.4em] font-bold mb-2">
                                    {FRASES[index].p1}
                                </p>
                                <p className="text-white text-3xl md:text-5xl font-black italic tracking-tighter leading-none drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                                    {FRASES[index].p2.toUpperCase()}
                                </p>
                            </div>
                        </div>

                        <div className="opacity-0 animate-reveal" style={{ animationDelay: '1.5s' }}>
                            <button className="group relative cursor-pointer overflow-hidden bg-red-700 hover:bg-red-600 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(220,38,38,0.3)]">
                                <span className="relative z-10">ARMAR MI PLAN</span>
                                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                            </button>
                        </div>
                    </div>

                    <div className="w-full md:w-2/5 flex-column justify-center z-20">
                        <CustomSwiper
                            slides={[
                                { id: 1, url: "/main/Main_1.jpg" },
                                { id: 2, url: "/main/Main_2.jpg" },
                                { id: 3, url: "/main/Main_3.jpg" },
                                { id: 4, url: "/main/Main_4.jpg" },
                                { id: 5, url: "/main/Main_5.mp4", type: "video" },
                            ]}
                            showPagination
                            slidesPerView={1}
                            renderSlideContent={(slide) => {
                                if (slide.type === "video") {
                                    return (
                                        <video
                                            src={slide.url}
                                            autoPlay
                                            muted
                                            loop
                                            className="w-full h-full object-cover"
                                        />
                                    );
                                }
                                return (
                                    <Images
                                        src={slide.url}
                                        alt="slide"
                                        width="100%"
                                        height="100%"
                                        isRound=""
                                    />
                                );
                            }}
                        />
                    </div>
                </div>
            </section>

            <section id="how-it-works" className="bg-black text-white">
                <div className="py-24 px-6 md:px-20 max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            Cómo funciona
                        </h2>
                        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
                            Rápido, simple y sin complicaciones. Así debería ser comer bien.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="group bg-white/5 border border-white/10 p-8 rounded-2xl">
                            <div className="mb-6 flex justify-center">
                                <Images className="aspect-square" objectFit="contain" src="/main/Operation_1.png" alt="Pide" />
                            </div>

                            <h3 className="text-center text-xl font-semibold mb-3">
                                Pide tu comida
                            </h3>

                            <p className="text-neutral-400 text-sm text-center leading-relaxed">
                                Elige tu comida por pieza y recíbela en menos de 24h en tu puerta.
                            </p>
                        </div>

                        <div className="group bg-white/5 border border-white/10 p-8 rounded-2xl">
                            <div className="mb-6 flex justify-center">
                                <Images className="aspect-square" objectFit="contain" src="/main/Operation_2.png" alt="Personaliza" />
                            </div>

                            <h3 className="text-center text-xl font-semibold mb-3">
                                Personaliza
                            </h3>

                            <p className="text-neutral-400 text-sm text-center leading-relaxed">
                                Elige proteínas, carbs y vegetales según tu objetivo.
                            </p>
                        </div>

                        <div className="group bg-white/5 border border-white/10 p-8 rounded-2xl">
                            <div className="mb-6 flex justify-center">
                                <Images className="aspect-square" objectFit="contain" src="/main/Operation_3.png" alt="Entrega" />
                            </div>

                            <h3 className="text-center text-xl font-semibold mb-3">
                                Recibe y disfruta
                            </h3>

                            <p className="text-neutral-400 text-sm text-center leading-relaxed">
                                Nosotros cocinamos, tú solo disfrutas.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="py-24 px-6 md:px-20 max-w-7xl mx-auto border-t border-white/10">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            Cómo prepararlo
                        </h2>
                        <p className="text-gray-400 text-lg md:text-xl">
                            3 formas, mismo resultado: Comida brutal.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="space-y-4">
                            <Images
                                src="/main/Operation_Meal_1.png"
                                alt="Meal sartén"
                                className="aspect-square" objectFit="contain"
                            />

                            <div className="flex justify-between items-center">
                                <Images
                                    src="/main/Operation_4.png"
                                    alt="Sartén"
                                    width="60px"
                                    height="60px"
                                    isRound=""
                                    objectFit="contain"
                                />

                                <h3 className="text-red-500 font-bold tracking-wide text-lg">
                                    SARTÉN
                                </h3>
                            </div>

                            <ol className="text-sm text-gray-300 space-y-2 leading-relaxed">
                                <li>
                                    1. Una vez descongelado, transfiere el contenido a un sartén antiadherente.
                                </li>
                                <li>
                                    2. Calienta a fuego medio y mezcla hasta alcanzar la temperatura deseada.
                                </li>
                            </ol>

                        </div>

                        <div className="space-y-4">
                            <Images
                                src="/main/Operation_Meal_2.png"
                                alt="Meal microondas"
                                className="aspect-square" objectFit="contain"
                            />

                            <div className="flex justify-between items-center">
                                <Images
                                    src="/main/Operation_5.png"
                                    alt="Microondas"
                                    width="60px"
                                    height="60px"
                                    isRound=""
                                    objectFit="contain"
                                />

                                <h3 className="text-red-500 font-bold tracking-wide text-lg">
                                    MICROONDAS
                                </h3>
                            </div>

                            <ol className="text-sm text-gray-300 space-y-2 leading-relaxed">
                                <li>
                                    1. Destapa ligeramente el envase o haz una pequeña abertura para permitir la ventilación.
                                </li>
                                <li>
                                    2. Calienta en el microondas durante 90 segundos.
                                </li>
                                <li>
                                    3. Si es necesario, mezcla y calienta 30 segundos adicionales.
                                </li>
                            </ol>
                        </div>

                        <div className="space-y-4">
                            <Images
                                src="/main/Operation_Meal_3.png"
                                alt="Meal horno"
                                className="aspect-square" objectFit="contain"
                            />

                            <div className="flex justify-between items-center">
                                <Images
                                    src="/main/Operation_6.png"
                                    alt="Horno"
                                    width="60px"
                                    height="60px"
                                    isRound=""
                                    objectFit="contain"
                                />

                                <h3 className="text-red-500 font-bold tracking-wide text-lg">
                                    HORNO / AIR FRYER
                                </h3>
                            </div>

                            <ol className="text-sm text-gray-300 space-y-2 leading-relaxed">
                                <li>
                                    1. Precalienta el horno o air fryer a 180°C.
                                </li>
                                <li>
                                    2. Transfiere el contenido a un recipiente apto para horno.
                                </li>
                                <li>
                                    3. Calienta durante 5 a 8 minutos, o hasta alcanzar la temperatura deseada.
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>

            <section id="certificate" className="relative bg-black text-white min-h-screen px-6 md:px-20 py-20 flex items-center overflow-hidden">
                <div className="absolute inset-0 bg-[url('/patterns/cartographer.png')] bg-repeat opacity-40"></div>

                <div className="relative max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-10 items-center">
                    <div className="space-y-6">
                        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
                            MANTÉNTE AL DÍA CON TU DIETA
                        </h1>

                        <p className="text-lg md:text-xl text-neutral-300 max-w-md leading-relaxed">
                            CON NUTRICIÓN DE ALTA CALIDAD HASTA TU PUERTA
                        </p>
                    </div>

                    <div className="flex justify-center md:justify-end">
                        <div className="w-full max-w-md md:max-w-lg">
                            <Images
                                src="/main/certificate.png"
                                alt="Certificación TIF"
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section id="testimonials" className="relative py-20 bg-neutral-900 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                            Nuestra Comunidad
                        </h2>
                        <p className="mt-4 text-neutral-400 max-w-2xl mx-auto">
                            La disciplina y el esfuerzo reflejados en cada momento.
                        </p>
                    </div>

                    <div className="w-full mb-10">
                        <CustomSwiper
                            slides={[
                                { id: 1, url: "/main/Testimonial_1.jpg", text: "Desde el ring, donde la fuerza y la determinación se hacen presentes.\nUna guerrera en pausa, reflejando disciplina, coraje y pasión por el boxeo.\nEntre cuerdas y sueños, demuestra que el espíritu de lucha también se vive en calma" },
                                { id: 2, url: "/main/Testimonial_2.jpg", text: "Foto tomada desde las canchas, donde la comunidad se reúne con pasión por el deporte.\nEntre esfuerzo, compañerismo y grandes momentos, se vive cada entrenamiento al máximo.\nCon nuestra competidora dando lo mejor, inspirando dentro y fuera de la cancha." },
                                { id: 3, url: "/main/Testimonial_3.jpg", text: "Sosteniendo su proteína como símbolo del esfuerzo que se construye día a día.\nEntre pesas y metas, demuestra que el progreso es cuestión de enfoque y dedicación." },
                                { id: 4, url: "/main/Testimonial_4.jpg", text: "Baile aéreo, donde la fuerza y la elegancia se elevan juntas.\nSosteniendo comida alta en proteína, reflejo del cuidado y la disciplina detrás de cada movimiento.\nEntre telas y constancia, demuestra que el equilibrio entre cuerpo y mente lo es todo." },
                            ]}
                            setActiveText={setActiveText}
                            movilSlidesPerView={1.5}
                            showNavigation
                        />
                    </div>

                    <div className="w-full max-w-3xl mx-auto relative mt-8">
                        <div className="relative overflow-hidden rounded-2xl bg-neutral-800/90 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.7)] px-8 py-10">
                            <div className="absolute top-0 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-red-500 to-transparent opacity-80"></div>

                            <FontAwesomeIcon
                                icon={faQuoteLeft}
                                className="absolute top-4 left-6 text-red-500 text-4xl md:text-6xl opacity-60"
                            />

                            <div className="relative z-10 flex items-center justify-center text-justify">
                                <div className="space-y-4 max-w-2xl pl-10 md:pl-14">

                                    {activeText ? (
                                        activeText.split('\n').map((line, i) => (
                                            line.trim() !== "" && (
                                                <p
                                                    key={i}
                                                    className="text-neutral-200 text-base leading-relaxed font-light tracking-wide"
                                                >
                                                    {line}
                                                </p>
                                            )
                                        ))
                                    ) : (
                                        <p className="text-neutral-500 italic">Cargando...</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home