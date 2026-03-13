import React from "react"

function Carrito() {
    return (
        <div className="min-h-screen px-10 py-8">

            <h1 className="text-3xl font-bold text-green-500 mb-8">
                Tu Carrito
            </h1>

            <div className="grid lg:grid-cols-3 gap-8">

                <div className="lg:col-span-2 space-y-6">

                    <div className="grid grid-cols-4 text-sm text-neutral-400 border-b border-neutral-700 pb-2">
                        <span> </span>
                        <span>precio</span>
                        <span className="text-center">qty</span>
                        <span className="text-right">total</span>
                    </div>

                    <div className="flex items-center justify-between border-b border-neutral-800 pb-6">

                        <div className="flex items-center gap-4 w-1/2">
                            <img
                                src="https://plus.unsplash.com/premium_photo-1698867576608-f8dbde8ecbe8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fHw%3D"
                                className="w-20 h-20 rounded-lg object-cover"
                            />
                            <span className="font-medium">
                                Tazón de Pollo Asado
                            </span>
                        </div>

                        <span className="w-20 text-center">$12.99</span>

                        <div className="flex items-center gap-3">
                            <button className="w-8 h-8 rounded-md border border-neutral-600 hover:border-green-500">
                                -
                            </button>

                            <span>1</span>

                            <button className="w-8 h-8 rounded-md border border-neutral-600 hover:border-green-500">
                                +
                            </button>
                        </div>

                        <span className="w-20 text-right">$12.99</span>

                    </div>

                    <div className="flex items-center justify-between border-b border-neutral-800 pb-6">

                        <div className="flex items-center gap-4 w-1/2">
                            <img
                                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=200"
                                className="w-20 h-20 rounded-lg object-cover"
                            />
                            <span className="font-medium">
                                Ensalada Vegana
                            </span>
                        </div>

                        <span className="w-20 text-center">$10.99</span>

                        <div className="flex items-center gap-3">
                            <button className="w-8 h-8 rounded-md border border-neutral-600 hover:border-green-500">
                                -
                            </button>

                            <span>2</span>

                            <button className="w-8 h-8 rounded-md border border-neutral-600 hover:border-green-500">
                                +
                            </button>
                        </div>

                        <span className="w-20 text-right">$21.98</span>

                    </div>

                </div>

                <div className="bg-neutral-800/70 backdrop-blur rounded-xl p-6 h-fit shadow-lg border border-neutral-700">

                    <h2 className="font-semibold mb-6 text-neutral-200">
                        RESUMEN DEL PEDIDO
                    </h2>

                    <div className="space-y-3 text-sm">

                        <div className="flex justify-between">
                            <span>Subtotal:</span>
                            <span>$34.97</span>
                        </div>

                        <div className="flex justify-between">
                            <span>Envío:</span>
                            <span className="text-green-400">GRATIS</span>
                        </div>

                        <div className="flex justify-between text-green-400">
                            <span>Descuento:</span>
                            <span>-$5.00</span>
                        </div>

                        <div className="text-xs text-neutral-400">
                            Promo "FRESHSTART"
                        </div>

                        <div className="border-t border-neutral-700 pt-4 flex justify-between font-semibold text-lg">
                            <span>Total:</span>
                            <span>$29.97</span>
                        </div>

                    </div>

                    <button className="mt-6 w-full bg-orange-500 hover:bg-orange-600 transition py-3 rounded-lg font-semibold">
                        FINALIZAR COMPRA
                    </button>

                </div>

            </div>

        </div>
    )
}

export default Carrito