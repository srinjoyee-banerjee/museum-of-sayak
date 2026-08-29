document.addEventListener("DOMContentLoaded", () => {

    const enterBtn = document.getElementById("enterBtn");
    const hero = document.querySelector(".hero");
    const entrance = document.querySelector(".entrance");

    if (!enterBtn || !hero || !entrance) {
        console.error("Museum entrance elements not found.");
        return;
    }

    let entering = false;

    enterBtn.addEventListener("click", () => {

        // Prevent double-clicking
        if (entering) return;

        entering = true;

        // Disable button
        enterBtn.disabled = true;

        // Start cinematic exit
        hero.classList.add("exit");

        setTimeout(() => {
            entrance.classList.add("leaving");
        }, 250);

        // Move into the museum
        setTimeout(() => {
            window.location.href = "museum.html";
        }, 1000);
    });

});
