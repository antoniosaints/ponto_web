import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const defaultOption = {
    position: "topRight",
    timeout: 5000,
    close: true,
    theme: "dark",
    zindex: 999,
    resetOnHover: true,
    progressBar: true,
    closeOnClick: true,
}
const success = (message, title) => {
    iziToast.success({
        ...defaultOption,
        backgroundColor: "#038220",
        titleColor: "#fff",
        iconColor: "#fff",
        messageColor: "#fff",
        progressBarColor: "#fff",
        title,
        message
    });
}

const error = (message, title) => {
    iziToast.error({
        ...defaultOption,
        backgroundColor: "#f00",
        titleColor: "#fff",
        iconColor: "#fff",
        messageColor: "#fff",
        progressBarColor: "#fff",
        title,
        message
    });
}

const info = (message, title) => {
    iziToast.info({
        ...defaultOption,
        backgroundColor: "#037382",
        titleColor: "#fff",
        iconColor: "#fff",
        messageColor: "#fff",
        progressBarColor: "#fff",
        title,
        message
    });
}

const warning = (message, title) => {
    iziToast.warning({
        ...defaultOption,
        backgroundColor: "#9e4a00",
        titleColor: "#fff",
        iconColor: "#fff",
        messageColor: "#fff",
        progressBarColor: "#fff",
        title,
        message
    });
}

export default { success, error, info, warning }