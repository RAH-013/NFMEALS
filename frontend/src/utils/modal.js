import Swal from "sweetalert2"

export const SwalCustom = ({
    icon = "success",
    message = "Mensaje por defecto",
    autoclose = false,
    onConfirmAction = null,
    callback = null,
    input = false,
    inputPlaceholder = "",
    inputValidator = null
} = {}) => {
    Swal.fire({
        icon,
        html: `<h1 class="text-xl font-bold text-gray-100 text-center mb-2">${message}</h1>`,
        input: input ? "text" : undefined,
        inputPlaceholder,
        inputValidator,
        timer: autoclose ? 3000 : undefined,
        timerProgressBar: autoclose,
        reverseButtons: true,
        showConfirmButton: !autoclose,
        showCancelButton: !!onConfirmAction || input,
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
        background: "rgba(0, 0, 0, 0.8)",
    }).then((result) => {
        if (result.isConfirmed && onConfirmAction) onConfirmAction(result.value);
        if (callback) callback(result);
    });
};