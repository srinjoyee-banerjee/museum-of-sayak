document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       ELEMENTS
    ========================================= */

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


    /* =========================================
       STATE
    ========================================= */

    let museumData = null;

    let chapters = [];

    let currentChapter = 0;

    let currentPhoto = 0;

    let entered = false;

    let musicPlaying = false;


    /* =========================================
       LOAD JSON
    ========================================= */

    async function loadMuseum() {

        try {

            const response =
                await fetch("sayak_content.json");

            if (!response.ok) {
                throw new Error(
                    "sayak_content.json could not be loaded."
                );
            }

            museumData = await response.json();

            chapters =
                museumData.film.chapters;

            console.log(
                "Museum loaded:",
                chapters
            );

            showChapter(0);

        } catch (error) {

            console.error(error);

            chapterTitle.textContent =
                "THE COLLECTION";

            chapterDescription.textContent =
                "Unable to load the museum.";

        }

    }


    /* =========================================
       GET CHAPTER DATA
    ========================================= */

    function getChapterData(index) {

        const chapter =
            chapters[index];

        if (!chapter) return null;

        return museumData[
            `chapter_${chapter.number}`
        ];

    }


    /* =========================================
       GET PHOTOS
    ========================================= */

    function getPhotos(chapterNumber) {

        const chapter =
            museumData[
                `chapter_${chapterNumber}`
            ];

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
                Chapter 1 contains objects
                with an image property.
            */

            if (
                typeof chapter.photo_sequence[0]
                === "object"
            ) {

                return chapter.photo_sequence
                    .map(photo => photo.image)
                    .filter(Boolean);

            }


            /* Chapters 3–10 */

            return chapter.photo_sequence;

        }


        /* Chapter 2 uses photo_map */

        if (
            museumData.photo_map &&
            museumData.photo_map[
                `chapter_${chapterNumber}`
            ]
        ) {

            return museumData.photo_map[
                `chapter_${chapterNumber}`
            ];

        }


        return [];

    }


    /* =========================================
       SHOW CHAPTER
    ========================================= */

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

        const chapterData =
            getChapterData(currentChapter);


        if (!chapterData) return;


        const number =
            String(chapter.number)
                .padStart(2, "0");


        /* Number */

        chapterNumber.textContent =
            number;

        progressNumber.textContent =
            number;


        /* Label */

        chapterLabel.textContent =
            `CHAPTER ${number}`;


        /* Title */

        chapterTitle.textContent =
            chapterData.title ||
            chapter.title ||
            "";


        /* First paragraph */

        if (
            chapterData.content &&
            chapterData.content.length
        ) {

            chapterDescription.textContent =
                chapterData.content[0];

        } else {

            chapterDescription.textContent =
                "";

        }


        /* Photos */

        const photos =
            getPhotos(chapter.number);


        if (photos.length > 0) {

            chapterImage.src =
                photos[0];

            chapterImage.alt =
                chapterData.title ||
                "Sayak";

        } else {

            chapterImage.removeAttribute("src");

        }


        /* Navigation */

        prevBtn.disabled =
            currentChapter === 0;

        nextBtn.disabled =
            currentChapter ===
            chapters.length - 1;


        /* Animation */

        animateChapter();

    }


    /* =========================================
       CHAPTER ANIMATION
    ========================================= */

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


    /* =========================================
       ENTER
    ========================================= */

    enterBtn.addEventListener(
        "click",
        async () => {

            if (entered) return;

            entered = true;

            enterBtn.disabled = true;


            /*
                Fade entrance text
            */

            intro.classList.add("exit");


            /*
                Fade entire entrance
            */

            setTimeout(() => {

                entrance.classList.add(
                    "leave"
                );

            }, 250);


            /*
                Reveal museum
            */

            setTimeout(() => {

                entrance.style.display =
                    "none";

                museum.classList.add(
                    "active"
                );

                document.body.style.overflow =
                    "hidden";

            }, 900);


            /*
                Start music
            */

            try {

                await music.play();

                musicPlaying = true;

                musicText.textContent =
                    "SOUND ON";

            } catch (error) {

                console.log(
                    "Music playback waiting for permission."
                );

            }

        }
    );


    /* =========================================
       NEXT
    ========================================= */

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


    /* =========================================
       PREVIOUS
    ========================================= */

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


    /* =========================================
       MUSIC
    ========================================= */

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


    /* =========================================
       BACK
    ========================================= */

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

                showChapter(0);

            }, 700);

        }
    );


    /* =========================================
       KEYBOARD
    ========================================= */

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


    /* =========================================
       PHOTO CLICK
       Cycle through chapter photos
    ========================================= */

    chapterImage.addEventListener(
        "click",
        () => {

            const photos =
                getPhotos(
                    chapters[
                        currentChapter
                    ].number
                );


            if (photos.length <= 1) {
                return;
            }


            currentPhoto =
                (currentPhoto + 1) %
                photos.length;


            chapterImage.style.opacity =
                "0";


            setTimeout(() => {

                chapterImage.src =
                    photos[currentPhoto];

                chapterImage.style.opacity =
                    "1";

            }, 250);

        }
    );


    /* =========================================
       INITIALIZE
    ========================================= */

    loadMuseum();

});
