document.addEventListener("DOMContentLoaded", () => {

    const enterBtn = document.getElementById("enterBtn");
    const entrance = document.getElementById("entrance");
    const museum = document.getElementById("museum");
    const intro = document.querySelector(".intro");

    const chapterNumber =
        document.getElementById("chapterNumber");

    const chapterLabel =
        document.getElementById("chapterLabel");

    const chapterTitle =
        document.getElementById("chapterTitle");

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


    let museumData = null;
    let chapters = [];
    let currentChapter = 0;
    let currentPhoto = 0;
    let entered = false;
    let musicPlaying = false;


    /* =====================================
       FIX IMAGE PATHS
    ===================================== */

    function fixImagePath(path) {

        if (!path) return "";

        /*
         Your JSON contains:

         assets/images/strong.jpeg

         But your actual files are beside
         index.html.

         So we only need the filename.
        */

        return path
            .replace(/^assets\/images\//, "")
            .replace(/^assets\\images\\/, "");

    }


    /* =====================================
       LOAD JSON
    ===================================== */

    async function loadMuseum() {

        try {

            const response =
                await fetch("sayak_content.json");

            if (!response.ok) {
                throw new Error(
                    "Could not load sayak_content.json"
                );
            }

            museumData =
                await response.json();

            chapters =
                museumData.film.chapters;

            showChapter(0);

        } catch (error) {

            console.error(error);

            chapterTitle.textContent =
                "THE COLLECTION";

            chapterDescription.textContent =
                "The museum could not be loaded.";

        }

    }


    /* =====================================
       GET CHAPTER
    ===================================== */

    function getChapterData(index) {

        const chapter =
            chapters[index];

        if (!chapter) return null;

        return museumData[
            `chapter_${chapter.number}`
        ];

    }


    /* =====================================
       GET PHOTOS
    ===================================== */

    function getPhotos(number) {

        const chapter =
            museumData[`chapter_${number}`];

        if (!chapter) return [];


        /* Normal photo sequence */

        if (
            Array.isArray(
                chapter.photo_sequence
            )
        ) {

            if (
                chapter.photo_sequence.length === 0
            ) {
                return [];
            }


            /*
             Chapter 1 has objects:

             {
                 image: "...",
                 text_index: 0
             }
            */

            if (
                typeof chapter.photo_sequence[0]
                === "object"
            ) {

                return chapter.photo_sequence
                    .map(photo =>
                        fixImagePath(photo.image)
                    )
                    .filter(Boolean);

            }


            return chapter.photo_sequence
                .map(photo =>
                    fixImagePath(photo)
                )
                .filter(Boolean);

        }


        /* Chapter 2 */

        if (
            museumData.photo_map &&
            museumData.photo_map[
                `chapter_${number}`
            ]
        ) {

            return museumData.photo_map[
                `chapter_${number}`
            ]
            .map(photo =>
                fixImagePath(photo)
            )
            .filter(Boolean);

        }


        return [];

    }


    /* =====================================
       SHOW CHAPTER
    ===================================== */

    function showChapter(index) {

        if (!chapters.length) return;


        currentChapter =
            Math.max(
                0,
                Math.min(
                    index,
                    chapters.length - 1
                )
            );


        currentPhoto = 0;


        const chapter =
            chapters[currentChapter];

        const data =
            getChapterData(currentChapter);


        if (!data) return;


        const number =
            String(chapter.number)
                .padStart(2, "0");


        chapterNumber.textContent =
            number;

        progressNumber.textContent =
            number;

        chapterLabel.textContent =
            `CHAPTER ${number}`;

        chapterTitle.textContent =
            data.title ||
            chapter.title;


        /*
         Show first paragraph.
        */

        if (
            Array.isArray(data.content) &&
            data.content.length
        ) {

            chapterDescription.textContent =
                data.content[0];

        } else {

            chapterDescription.textContent =
                "";

        }


        /*
         Load first photo.
        */

        const photos =
            getPhotos(chapter.number);


        if (photos.length) {

            chapterImage.src =
                photos[0];

            chapterImage.alt =
                data.title ||
                "Sayak";

            chapterImage.style.display =
                "block";

        } else {

            chapterImage.removeAttribute("src");

            chapterImage.style.display =
                "none";

        }


        prevBtn.disabled =
            currentChapter === 0;

        nextBtn.disabled =
            currentChapter ===
            chapters.length - 1;


        animateChapter();

    }


    /* =====================================
       ANIMATION
    ===================================== */

    function animateChapter() {

        const content =
            document.querySelector(
                ".chapter-content"
            );

        if (!content) return;

        content.classList.remove(
            "chapter-change"
        );

        void content.offsetWidth;

        content.classList.add(
            "chapter-change"
        );

    }


    /* =====================================
       ENTER
    ===================================== */

    enterBtn.addEventListener(
        "click",
        async () => {

            if (entered) return;

            entered = true;

            enterBtn.disabled = true;

            intro.classList.add("exit");

            setTimeout(() => {

                entrance.classList.add("leave");

            }, 250);


            setTimeout(() => {

                entrance.style.display =
                    "none";

                museum.classList.add("active");

            }, 900);


            /*
             Start music after ENTER.
            */

            try {

                await music.play();

                musicPlaying = true;

                musicText.textContent =
                    "SOUND ON";

            } catch (error) {

                console.log(
                    "Music playback blocked."
                );

            }

        }
    );


    /* =====================================
       NEXT
    ===================================== */

    nextBtn.addEventListener(
        "click",
        () => {

            if (
                currentChapter <
                chapters.length - 1
            ) {

                showChapter(
                    currentChapter + 1
                );

            }

        }
    );


    /* =====================================
       PREVIOUS
    ===================================== */

    prevBtn.addEventListener(
        "click",
        () => {

            if (currentChapter > 0) {

                showChapter(
                    currentChapter - 1
                );

            }

        }
    );


    /* =====================================
       MUSIC
    ===================================== */

    musicBtn.addEventListener(
        "click",
        async () => {

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

                    console.error(error);

                }

            }

        }
    );


    /* =====================================
       BACK
    ===================================== */

    backBtn.addEventListener(
        "click",
        () => {

            music.pause();

            musicPlaying = false;

            museum.classList.remove(
                "active"
            );

            setTimeout(() => {

                entrance.style.display =
                    "block";

                entrance.classList.remove(
                    "leave"
                );

                intro.classList.remove(
                    "exit"
                );

                enterBtn.disabled = false;

                entered = false;

            }, 700);

        }
    );


    /* =====================================
       CLICK PHOTO → NEXT PHOTO
    ===================================== */

    chapterImage.addEventListener(
        "click",
        () => {

            const chapter =
                chapters[currentChapter];

            const photos =
                getPhotos(chapter.number);


            if (photos.length <= 1) {
                return;
            }


            currentPhoto =
                (currentPhoto + 1)
                % photos.length;


            chapterImage.style.opacity =
                "0";


            setTimeout(() => {

                chapterImage.src =
                    photos[currentPhoto];

                chapterImage.style.opacity =
                    "1";

            }, 300);

        }
    );


    /* =====================================
       KEYBOARD
    ===================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                !museum.classList.contains(
                    "active"
                )
            ) {
                return;
            }


            if (
                event.key === "ArrowRight"
            ) {

                if (
                    currentChapter <
                    chapters.length - 1
                ) {

                    showChapter(
                        currentChapter + 1
                    );

                }

            }


            if (
                event.key === "ArrowLeft"
            ) {

                if (currentChapter > 0) {

                    showChapter(
                        currentChapter - 1
                    );

                }

            }

        }
    );


    /* =====================================
       START
    ===================================== */

    loadMuseum();

});
