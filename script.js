document.addEventListener("DOMContentLoaded", () => {

    const button = document.getElementById("enterBtn");
    const intro = document.querySelector(".intro");
    const entrance = document.querySelector(".entrance");

    let clicked = false;

    button.addEventListener("click", () => {

        if (clicked) return;

        clicked = true;

        button.disabled = true;

        intro.classList.add("exit");

        setTimeout(() => {
            entrance.classList.add("leave");
        }, 300);

        setTimeout(() => {
            window.location.href = "museum.html";
        }, 1000);

    });

});
