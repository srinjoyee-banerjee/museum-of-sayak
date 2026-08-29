document.addEventListener("DOMContentLoaded", async () => {


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const chapter =
        document.querySelector(".chapter");

    const chapterSmall =
        document.getElementById("chapterSmall");

    const chapterTitle =
        document.getElementById("chapterTitle");

    const chapterText =
        document.getElementById("chapterText");

    const chapterImage =
        document.getElementById("chapterImage");

    const currentNumber =
        document.getElementById("currentNumber");

    const photoCurrent =
        document.getElementById("photoCurrent");

    const chapterDots =
        document.getElementById("chapterDots");

    const prevBtn =
        document.getElementById("prevBtn");

    const nextBtn =
        document.getElementById("nextBtn");

    const musicBtn =
        document.getElementById("musicBtn");

    const soundText =
        document.getElementById("soundText");

    const music =
        document.getElementById("museumMusic");

    const backBtn =
        document.getElementById("backBtn");


    /* =====================================================
       DATA
    ===================================================== */

    let data = null;

    let chapters = [];

    let currentChapter = 0;

    let currentParagraph = 0;

    let currentPhoto = 0;

    let changing = false;


    /* =====================================================
       IMAGE PATH FIX
    ===================================================== */

    function imagePath(path) {

        if (!path) return null;

        /*
           Your files are in the same location
           as museum.html.

           Therefore:

           assets/images/strong.jpeg

           becomes:

           strong.jpeg
        */

        return path
            .replace(/^assets\/images\//, "")
            .replace(/^assets\\images\\/, "");

    }


    /* =====================================================
       GET PHOTOS
    ===================================================== */

    function getPhotos(chapterNumber) {

        const chapterData =
            data[`chapter_${chapterNumber}`];

        if (!chapterData) return [];


        if (
            Array.isArray(
                chapterData.photo_sequence
            )
        ) {

            return chapterData.photo_sequence
                .map(photo => {

                    if (
                        typeof photo === "object"
                    ) {
                        return imagePath(
                            photo.image
                        );
                    }

                    return imagePath(photo);

                })
                .filter(Boolean);

        }


        if (
            data.photo_map &&
            data.photo_map[
                `chapter_${chapterNumber}`
            ]
        ) {

            return data.photo_map[
                `chapter_${chapterNumber}`
            ]
            .map(imagePath)
            .filter(Boolean);

        }


        return [];

    }


    /* =====================================================
       CREATE DOTS
    ===================================================== */

    function createDots() {

        chapterDots.innerHTML = "";

        chapters.forEach(
            (_, index) => {

                const dot =
                    document.createElement("span");

                dot.className =
                    "chapter-dot";

                if (
                    index === currentChapter
                ) {
                    dot.classList.add("active");
                }

                dot.addEventListener(
                    "click",
                    () => {

                        showChapter(index);

                    }
                );

                chapterDots.appendChild(dot);

            }
        );

    }


    /* =====================================================
       UPDATE DOTS
    ===================================================== */

    function updateDots() {

        const dots =
            document.querySelectorAll(
                ".chapter-dot"
            );

        dots.forEach(
            (dot, index) => {

                dot.classList.toggle(
                    "active",
                    index === currentChapter
                );

            }
        );

    }


    /* =====================================================
       SHOW CHAPTER
    ===================================================== */

    function showChapter(index) {

        if (
            changing ||
            !chapters[index]
        ) {
            return;
        }


        changing = true;


        chapter.classList.add(
            "changing"
        );


        setTimeout(() => {

            currentChapter = index;

            currentParagraph = 0;

            currentPhoto = 0;


            const chapterInfo =
                chapters[currentChapter];

            const number =
                chapterInfo.number;


            const chapterData =
                data[
                    `chapter_${number}`
                ];


            /* ---------------------------------------------
               NUMBER
            --------------------------------------------- */

            const formattedNumber =
                String(number)
                    .padStart(2, "0");


            currentNumber.textContent =
                formattedNumber;


            chapterSmall.textContent =
                `CHAPTER ${formattedNumber}`;


            /* ---------------------------------------------
               TITLE
            --------------------------------------------- */

            chapterTitle.textContent =
                chapterData.title ||
                chapterInfo.title;


            /* ---------------------------------------------
               TEXT
            --------------------------------------------- */

            if (
                Array.isArray(
                    chapterData.content
                ) &&
                chapterData.content.length
            ) {

                chapterText.textContent =
                    chapterData.content[0];

            } else {

                chapterText.textContent =
                    "";

            }


            /* ---------------------------------------------
               PHOTOS
            --------------------------------------------- */

            const photos =
                getPhotos(number);


            if (photos.length > 0) {

                chapterImage.src =
                    photos[0];

                chapterImage.style.display =
                    "block";

                photoCurrent.textContent =
                    "01";

            } else {

                chapterImage.style.display =
                    "none";

            }


            /* ---------------------------------------------
               BUTTONS
            --------------------------------------------- */

            prevBtn.disabled =
                currentChapter === 0;

            nextBtn.disabled =
                currentChapter ===
                chapters.length - 1;


            updateDots();


            chapter.classList.remove(
                "changing"
            );


            changing = false;


        }, 500);

    }


    /* =====================================================
       NEXT CHAPTER
    ===================================================== */

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


    /* =====================================================
       PREVIOUS CHAPTER
    ===================================================== */

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


    /* =====================================================
       PHOTO CLICK
    ===================================================== */

    chapterImage.addEventListener(
        "click",
        () => {

            const number =
                chapters[currentChapter].number;

            const photos =
                getPhotos(number);


            if (photos.length <= 1) {
                return;
            }


            currentPhoto++;

            if (
                currentPhoto >= photos.length
            ) {

                currentPhoto = 0;

            }


            chapterImage.style.opacity = "0";


            setTimeout(() => {

                chapterImage.src =
                    photos[currentPhoto];

                chapterImage.style.opacity =
                    "1";


                photoCurrent.textContent =
                    String(
                        currentPhoto + 1
                    ).padStart(2, "0");


            }, 350);

        }
    );


    /* =====================================================
       MUSIC
    ===================================================== */

    musicBtn.addEventListener(
        "click",
        async () => {

            if (
                music.paused
            ) {

                try {

                    await music.play();

                    soundText.textContent =
                        "SOUND ON";

                } catch (error) {

                    console.log(error);

                }

            } else {

                music.pause();

                soundText.textContent =
                    "SOUND OFF";

            }

        }
    );


    /* =====================================================
       BACK
    ===================================================== */

    backBtn.addEventListener(
        "click",
        () => {

            window.location.href =
                "index.html";

        }
    );


    /* =====================================================
       KEYBOARD
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "ArrowRight"
            ) {

                nextBtn.click();

            }

            if (
                event.key === "ArrowLeft"
            ) {

                prevBtn.click();

            }

        }
    );


    /* =====================================================
       LOAD JSON
    ===================================================== */

    try {

        const response =
            await fetch(
                "sayak_content.json"
            );


        if (!response.ok) {

            throw new Error(
                "Could not load museum data."
            );

        }


        data =
            await response.json();


        chapters =
            data.film.chapters;


        createDots();

        showChapter(0);


    } catch (error) {

        console.error(error);

        chapterTitle.textContent =
            "THE MUSEUM";

        chapterText.textContent =
            "The collection could not be opened.";

    }

});
