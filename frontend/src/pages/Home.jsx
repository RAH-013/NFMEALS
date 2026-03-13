import React from "react"

function Home() {
    return (
        <div className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white">

            <section className="max-w-7xl mx-auto px-8 py-16 grid md:grid-cols-2 items-center gap-10">

                <div className="space-y-6">

                    <h1 className="text-4xl md:text-5xl font-bold text-green-500 leading-tight">
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
                    <img
                        src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800"
                        className="rounded-2xl shadow-xl"
                    />
                </div>

            </section>


            <section className="bg-black/30 py-16">

                <h2 className="text-center text-2xl font-bold text-green-500 mb-12">
                    ¿Cómo Funciona?
                </h2>

                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 px-8 text-center">

                    <div className="space-y-4">

                        <div className="text-green-500 text-4xl">
                            🍽
                        </div>

                        <h3 className="font-semibold text-lg">
                            1. Elige
                        </h3>

                        <p className="text-neutral-400 text-sm">
                            Selecciona tus comidas
                        </p>

                    </div>

                    <div className="space-y-4">

                        <div className="text-green-500 text-4xl">
                            👨‍🍳
                        </div>

                        <h3 className="font-semibold text-lg">
                            2. Cocinamos
                        </h3>

                        <p className="text-neutral-400 text-sm">
                            Preparamos tus platos frescos
                        </p>

                    </div>

                    <div className="space-y-4">

                        <div className="text-green-500 text-4xl">
                            🚚
                        </div>

                        <h3 className="font-semibold text-lg">
                            3. Recibe
                        </h3>

                        <p className="text-neutral-400 text-sm">
                            Disfruta de la entrega en casa
                        </p>

                    </div>

                </div>

            </section>


            <section className="py-16 max-w-7xl mx-auto px-8">

                <h2 className="text-center text-2xl font-bold text-green-500 mb-10">
                    Menú Semanal
                </h2>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                    <div className="bg-neutral-800 rounded-xl overflow-hidden shadow-md hover:scale-105 transition">
                        <img
                            src="https://images.unsplash.com/photo-1604908176997-4319c7e2a1e2?q=80&w=500"
                            className="h-40 w-full object-cover"
                        />
                        <div className="p-4">
                            <h3 className="font-semibold">
                                Bowl de Pollo Asado
                            </h3>
                            <p className="text-sm text-neutral-400">
                                Proteína alta · 520 kcal
                            </p>
                        </div>
                    </div>

                    <div className="bg-neutral-800 rounded-xl overflow-hidden shadow-md hover:scale-105 transition">
                        <img
                            src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=500"
                            className="h-40 w-full object-cover"
                        />
                        <div className="p-4">
                            <h3 className="font-semibold">
                                Ensalada Vegana
                            </h3>
                            <p className="text-sm text-neutral-400">
                                Plant-based · 430 kcal
                            </p>
                        </div>
                    </div>

                    <div className="bg-neutral-800 rounded-xl overflow-hidden shadow-md hover:scale-105 transition">
                        <img
                            src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=500"
                            className="h-40 w-full object-cover"
                        />
                        <div className="p-4">
                            <h3 className="font-semibold">
                                Salmón con Vegetales
                            </h3>
                            <p className="text-sm text-neutral-400">
                                Omega 3 · 610 kcal
                            </p>
                        </div>
                    </div>

                    <div className="bg-neutral-800 rounded-xl overflow-hidden shadow-md hover:scale-105 transition">
                        <img
                            src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=500"
                            className="h-40 w-full object-cover"
                        />
                        <div className="p-4">
                            <h3 className="font-semibold">
                                Pasta Integral
                            </h3>
                            <p className="text-sm text-neutral-400">
                                Energía limpia · 540 kcal
                            </p>
                        </div>
                    </div>

                </div>

            </section>

        </div>
    )
}

export default Home