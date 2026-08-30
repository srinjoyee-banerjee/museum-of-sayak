document.addEventListener("DOMContentLoaded", () => {

    const enterBtn = document.getElementById("enterBtn");

    if (!enterBtn) return;

    enterBtn.addEventListener("click", () => {

        // Go directly to the museum experience
        window.location.href = "museum.html";

    });

});
