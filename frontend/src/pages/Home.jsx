import { useEffect } from "react"

import Testimonials from "../components/Testimonials"
import Images from "../layouts/Images"

function Home() {
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
            <section id="home" className="max-w-7xl mx-auto px-8 py-16 grid md:grid-cols-2 items-center gap-10">
                <div className="space-y-6">
                    <h1 className="text-4xl md:text-5xl font-bold text-red-500 leading-tight">
                        COMIDA REAL <br /> PARA GENTE REAL
                    </h1>

                    <p className="text-neutral-300 text-lg max-w-md">
                        Planes de comida saludables y deliciosos entregados a tu puerta.
                    </p>

                    <button className="bg-orange-500 hover:bg-orange-600 transition px-6 py-3 rounded-lg font-semibold">
                        ARMAR MI PLAN
                    </button>

                </div>

                <div className="flex justify-center">
                    <Images
                        src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800"
                        alt="Imagen ejemplo"
                    />
                </div>

            </section>

            <section id="how-it-works" className="bg-gray-900 text-white py-20 px-6 md:px-20">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Cómo funciona</h2>
                    <p className="text-gray-300 text-lg md:text-xl">
                        Descubre lo sencillo que es recibir tus comidas frescas y personalizadas
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-10">
                    <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:scale-105 transform transition duration-300 text-center">
                        <div className="text-6xl mb-4">🍽️</div>
                        <h3 className="text-2xl font-semibold mb-2">Pide tu comida</h3>
                        <p className="text-gray-300">
                            Elige tu comida por pieza y recibe tu pedido en 24 horas directamente en tu domicilio.
                        </p>
                    </div>

                    <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:scale-105 transform transition duration-300 text-center">
                        <div className="text-6xl mb-4">🥗</div>
                        <h3 className="text-2xl font-semibold mb-2">Personaliza tu plato</h3>
                        <p className="text-gray-300">
                            Selecciona tus verduras, proteínas y carbohidratos para crear tu comida preparada a tu gusto.
                        </p>
                    </div>

                    <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:scale-105 transform transition duration-300 text-center">
                        <div className="text-6xl mb-4">🚚</div>
                        <h3 className="text-2xl font-semibold mb-2">Creación y entrega</h3>
                        <p className="text-gray-300">
                            El administrador recibe tu orden y coordina la entrega directamente a tu domicilio.
                        </p>
                    </div>
                </div>
            </section>

            <section id="about-us" className="bg-gradient-to-bottom from-black via-gray-900 to-gray-800 text-white min-h-screen px-6 md:px-20 py-16">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">Sobre Nosotros</h1>
                    <p className="text-gray-300 text-lg md:text-xl">
                        Conoce nuestra historia y los valores que nos definen
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
                    <div className="animate-fadeIn">
                        <h2 className="text-3xl font-semibold mb-4">Nuestra Historia</h2>
                        <p className="text-gray-300 leading-relaxed">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada.
                        </p>
                    </div>
                    <div className="rounded-xl shadow-lg overflow-hidden transform transition duration-700 ease-out hover:scale-105 opacity-100">
                        <Images
                            src="/NF.svg"
                            alt="Historia de la marca"
                            objectFit="contain"
                        />
                    </div>
                </div>

                <div className="mb-16">
                    <h2 className="text-3xl font-semibold text-center mb-12">Nuestros Valores</h2>
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div className="bg-gray-900 p-6 rounded-xl shadow-lg hover:scale-105 transform transition duration-300">
                            <div className="text-5xl mb-4">💡</div>
                            <h3 className="text-xl font-semibold mb-2">Innovación</h3>
                            <p className="text-gray-300">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            </p>
                        </div>
                        <div className="bg-gray-900 p-6 rounded-xl shadow-lg hover:scale-105 transform transition duration-300">
                            <div className="text-5xl mb-4">🤝</div>
                            <h3 className="text-xl font-semibold mb-2">Compromiso</h3>
                            <p className="text-gray-300">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            </p>
                        </div>
                        <div className="bg-gray-900 p-6 rounded-xl shadow-lg hover:scale-105 transform transition duration-300">
                            <div className="text-5xl mb-4">🌱</div>
                            <h3 className="text-xl font-semibold mb-2">Sostenibilidad</h3>
                            <p className="text-gray-300">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="testimonials">
                <Testimonials />
            </section>
        </div>
    )
}

export default Home