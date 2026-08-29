document.addEventListener("DOMContentLoaded", () => {

    const enterButton = document.getElementById("enterBtn");
    const intro = document.querySelector(".intro");
    const entrance = document.querySelector(".entrance");

    let isEntering = false;

    enterButton.addEventListener("click", () => {

        if (isEntering) return;

        isEntering = true;

        enterButton.disabled = true;

        // Fade the title away
        intro.classList.add("exit");

        // Begin cinematic image transition
        setTimeout(() => {
            entrance.classList.add("leave");
        }, 250);

        // Open the museum
        setTimeout(() => {
            window.location.href = "museum.html";
        }, 1000);

    });

});
