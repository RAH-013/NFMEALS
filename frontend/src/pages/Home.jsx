import { useEffect } from "react"
import Testimonials from "../components/Testimonials"

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

            <section id="testimonials">
                <Testimonials />
            </section>
        </div>
    )
}

export default Home