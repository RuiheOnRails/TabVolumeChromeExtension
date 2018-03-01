console.log("js loaded")


document.addEventListener('DOMContentLoaded', () => {
    let volRange = document.getElementById("volRange");
    volRange.oninput = () => {
        console.log(volRange.value);
    }
});
