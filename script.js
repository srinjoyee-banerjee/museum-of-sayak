document.addEventListener("DOMContentLoaded", () => {

    const entrance =
        document.getElementById("museumEntrance");

    const music =
        document.getElementById("music");


    if (!entrance) return;


    /*
        Give the visitor a short cinematic pause
        before opening the doors.
    */

    setTimeout(() => {

        entrance.classList.add("opening");


        /*
            Start the soundtrack.
            Browsers allow this because the
            previous page click triggered the navigation.
        */

        if (music) {

            music.volume = 0.65;

            music.play().catch(() => {});

        }


    }, 900);


    /*
        After the doors have opened,
        reveal the museum.
    */

    setTimeout(() => {

        entrance.classList.add("finished");

    }, 3000);


});
