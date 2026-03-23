import Swal from "sweetalert2"

export const SwalCustom = ({
    icon = "success",
    message = "Mensaje por defecto",
    autoclose = false,
    onConfirmAction = null,
    callback = null
} = {}) => {
    Swal.fire({
        icon,
        html: `<h1 class="text-xl font-bold text-gray-100 text-center">${message}</h1>`,
        timer: autoclose ? 3000 : undefined,
        timerProgressBar: autoclose,
        reverseButtons: true,
        showConfirmButton: !autoclose,
        showCancelButton: !!onConfirmAction,
        confirmButtonText: onConfirmAction ? "Aceptar" : "Continuar",
        cancelButtonText: onConfirmAction ? "Cancelar" : undefined,
        background: "rgba(0, 0, 0, 0.8)",
    }).then((result) => {
        if (result.isConfirmed && onConfirmAction) onConfirmAction()
        if (callback) callback(result)
    })
}