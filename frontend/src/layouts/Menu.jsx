import { useEffect } from "react";

function Menu({ open, onClose, children, className = "" }) {
    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    if (!open) return null;

    return (
        <>
            <div
                className="fixed top-0 left-0 w-full h-screen bg-black/80 backdrop-blur-sm z-40 md:hidden cursor-pointer"
                onClick={onClose}
            />

            <div
                className={`
                    fixed top-0 left-0 w-full h-screen z-50
                    flex flex-col items-center justify-center
                    overflow-y-auto
                  text-white px-6
                    md:absolute md:inset-auto md:right-0 md:top-14 md:w-80 md:h-auto md:rounded-xl md:border md:border-gray-700 md:p-5 md:shadow-2xl
                    ${className}
                `}
            >
                {children}
            </div>
        </>
    );
}

export default Menu;