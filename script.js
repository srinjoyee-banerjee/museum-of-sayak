document.addEventListener("DOMContentLoaded", async () => {

    /* =====================================
       ELEMENTS
    ====================================== */

    const enterBtn = document.getElementById("enterBtn");

    const entrance = document.getElementById("entrance");
    const museum = document.getElementById("museum");

    const intro = document.querySelector(".intro");

    const chapterNumber = document.getElementById("chapterNumber");
    const chapterLabel = document.getElementById("chapterLabel");
    const chapterTitle = document.getElementById("chapterTitle");
    const chapterDescription =
        document.getElementById("chapterDescription");

    const chapterImage =
        document.getElementById("chapterImage");

    const progressNumber =
        document.getElementById("progressNumber");

    const nextBtn =
        document.getElementById("nextBtn");

    const prevBtn =
        document.getElementById("prevBtn");

    const backBtn =
        document.getElementById("backBtn");

    const musicBtn =
        document.getElementById("musicBtn");

    const musicText =
        document.getElementById("musicText");

    const music =
        document.getElementById("museumMusic");


    /* =====================================
       STATE
    ====================================== */

    let chapters = [];

    let currentChapter = 0;

    let entered = false;

    let musicPlaying = false;


    /* =====================================
       LOAD CONTENT FROM JSON
    ====================================== */

    async function loadChapters() {

        try {

            const response =
                await fetch("sayak_content.json");

            if (!response.ok) {
                throw new Error(
                    "Could not load sayak_content.json"
                );
            }

            const data = await response.json();


            /*
               Supports either:

               {
                   "chapters": [...]
               }

               OR

               [...]
            */

            chapters =
                Array.isArray(data)
                    ? data
                    : data.chapters;


            if (!chapters || chapters.length === 0) {

                throw new Error(
                    "No chapters found in JSON."
                );

            }


            showChapter(0);

        } catch (error) {

            console.error(error);

            chapterTitle.textContent =
                "The museum is waiting.";

            chapterDescription.textContent =
                "Your collection could not be loaded.";

        }

    }


    /* =====================================
       SHOW CHAPTER
    ====================================== */

    function showChapter(index) {

        if (!chapters.length) return;


        currentChapter =
            (index + chapters.length) %
            chapters.length;


        const chapter =
            chapters[currentChapter];


        /* Number */

        const number =
            String(currentChapter + 1)
                .padStart(2, "0");


        chapterNumber.textContent = number;

        progressNumber.textContent = number;


        /* Label */

        chapterLabel.textContent =
            chapter.label ||
            `CHAPTER ${number}`;


        /* Title */

        chapterTitle.textContent =
            chapter.title ||
            "";


        /* Description */

        chapterDescription.textContent =
            chapter.description ||
            chapter.text ||
            "";


        /* Image */

        const image =
            chapter.image ||
            chapter.photo ||
            chapter.img;


        if (image) {

            chapterImage.src = image;

            chapterImage.alt =
                chapter.title ||
                "Sayak";

        }


        /* Update buttons */

        prevBtn.disabled =
            currentChapter === 0;

        nextBtn.disabled =
            currentChapter === chapters.length - 1;


        /* Chapter animation */

        const content =
            document.querySelector(".chapter-content");

        content.classList.remove("chapter-change");

        void content.offsetWidth;

        content.classList.add("chapter-change");

    }


    /* =====================================
       ENTER MUSEUM
    ====================================== */

    enterBtn.addEventListener("click", async () => {

        if (entered) return;

        entered = true;

        enterBtn.disabled = true;


        /* Fade entrance text */

        intro.classList.add("exit");


        /* Fade entrance */

        setTimeout(() => {

            entrance.classList.add("leave");

        }, 250);


        /* Show museum */

        setTimeout(() => {

            entrance.style.display = "none";

            museum.classList.add("active");

            document.body.style.overflow = "hidden";

        }, 900);


        /* Start music */

        try {

            await music.play();

            musicPlaying = true;

            musicText.textContent =
                "SOUND ON";

        } catch (error) {

            console.log(
                "Music will begin after interaction."
            );

        }

    });


    /* =====================================
       NEXT CHAPTER
    ====================================== */

    nextBtn.addEventListener("click", () => {

        if (
            currentChapter <
            chapters.length - 1
        ) {

            showChapter(
                currentChapter + 1
            );

        }

    });


    /* =====================================
       PREVIOUS CHAPTER
    ====================================== */

    prevBtn.addEventListener("click", () => {

        if (currentChapter > 0) {

            showChapter(
                currentChapter - 1
            );

        }

    });


    /* =====================================
       MUSIC
    ====================================== */

    musicBtn.addEventListener("click", async () => {

        if (musicPlaying) {

            music.pause();

            musicPlaying = false;

            musicText.textContent =
                "SOUND OFF";

        } else {

            try {

                await music.play();

                musicPlaying = true;

                musicText.textContent =
                    "SOUND ON";

            } catch (error) {

                console.error(
                    "Unable to play music.",
                    error
                );

            }

        }

    });


    /* =====================================
       BACK TO ENTRANCE
    ====================================== */

    backBtn.addEventListener("click", () => {

        music.pause();

        musicPlaying = false;

        museum.classList.remove("active");

        setTimeout(() => {

            entrance.style.display = "block";

            entrance.classList.remove("leave");

            intro.classList.remove("exit");

            enterBtn.disabled = false;

            entered = false;

        }, 600);

    });


    /* =====================================
       KEYBOARD NAVIGATION
    ====================================== */

    document.addEventListener("keydown", (event) => {

        if (!museum.classList.contains("active")) {
            return;
        }


        if (event.key === "ArrowRight") {

            if (
                currentChapter <
                chapters.length - 1
            ) {

                showChapter(
                    currentChapter + 1
                );

            }

        }


        if (event.key === "ArrowLeft") {

            if (currentChapter > 0) {

                showChapter(
                    currentChapter - 1
                );

            }

        }

    });


    /* =====================================
       START
    ====================================== */

    await loadChapters();

});
