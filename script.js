document.addEventListener("DOMContentLoaded", () => {

    /* =================================================
       ELEMENTS
    ================================================= */

    const entrancePage =
        document.getElementById("entrancePage");

    const doorPage =
        document.getElementById("doorPage");

    const museumPage =
        document.getElementById("museumPage");

    const enterMuseum =
        document.getElementById("enterMuseum");

    const previousBtn =
        document.getElementById("previousBtn");

    const nextBtn =
        document.getElementById("nextBtn");

    const soundBtn =
        document.getElementById("soundBtn");

    const exitBtn =
        document.getElementById("exitBtn");

    const music =
        document.getElementById("music");

    const chapterNumber =
        document.getElementById("chapterNumber");

    const chapterTitle =
        document.getElementById("chapterTitle");

    const momentImage =
        document.getElementById("momentImage");

    const storyText =
        document.getElementById("storyText");

    const pageCounter =
        document.getElementById("pageCounter");

    const navCounter =
        document.getElementById("navCounter");

    const storyNumber =
        document.getElementById("storyNumber");


    /* =================================================
       26 MOMENTS

       ALL FILES ARE IN THE SAME FOLDER.
    ================================================= */

    const moments = [

        {
            chapter: "CHAPTER 01",
            title: "WHO ARE YOU?",
            image: "strong.jpeg",
            text:
                "You are someone I keep discovering, even after all these years."
        },

        {
            chapter: "CHAPTER 01",
            title: "WHO ARE YOU?",
            image: "cand.jpeg",
            text:
                "There are so many little things about you that I notice."
        },

        {
            chapter: "CHAPTER 01",
            title: "WHO ARE YOU?",
            image: "us_first.jpeg",
            text:
                "You are my best friend, my safest place, my favourite person, and the person I want beside me."
        },


        /* CHAPTER 02 */

        {
            chapter: "CHAPTER 02",
            title: "THE LITTLE THINGS",
            image: "solo.jpeg",
            text:
                "I don't think you even realise how many little things about you I notice."
        },

        {
            chapter: "CHAPTER 02",
            title: "THE LITTLE THINGS",
            image: "candid.jpeg",
            text:
                "Like the way you eat green chutney."
        },

        {
            chapter: "CHAPTER 02",
            title: "THE LITTLE THINGS",
            image: "cook.jpeg",
            text:
                "You are ridiculously talented, but somehow you keep thinking you're less than everyone else."
        },


        /* CHAPTER 03 */

        {
            chapter: "CHAPTER 03",
            title: "YOUR FACE, YOUR HEART",
            image: "eyelash.jpeg",
            text:
                "I love your eyes. And your eyelashes... I don't think you even know how beautiful they are."
        },

        {
            chapter: "CHAPTER 03",
            title: "YOUR FACE, YOUR HEART",
            image: "fell.jpeg",
            text:
                "As beautiful as you are on the outside, that's not what made me fall in love with you."
        },

        {
            chapter: "CHAPTER 03",
            title: "YOUR FACE, YOUR HEART",
            image: "beautiful.jpeg",
            text:
                "I fell in love with your heart."
        },


        /* CHAPTER 04 */

        {
            chapter: "CHAPTER 04",
            title: "HOW WE BECAME US",
            image: "msc us.jpeg",
            text:
                "We met on the very first day of our online MSc Physics class."
        },

        {
            chapter: "CHAPTER 04",
            title: "HOW WE BECAME US",
            image: "Fest photo.jpeg",
            text:
                "Friends became lovers."
        },

        {
            chapter: "CHAPTER 04",
            title: "HOW WE BECAME US",
            image: "Cuteearly relationship photo.jpeg",
            text:
                "You made me feel safe. You made me feel seen. You made me feel heard."
        },


        /* CHAPTER 05 */

        {
            chapter: "CHAPTER 05",
            title: "YOU, THROUGH MY EYES",
            image: "4.jpeg",
            text:
                "You're one of the most intelligent people I've ever met."
        },

        {
            chapter: "CHAPTER 05",
            title: "YOU, THROUGH MY EYES",
            image: "5.jpeg",
            text:
                "You notice more than people realise."
        },

        {
            chapter: "CHAPTER 05",
            title: "YOU, THROUGH MY EYES",
            image: "6.jpeg",
            text:
                "If I could give you one thing, it would be my eyes for one day."
        },


        /* CHAPTER 06 */

        {
            chapter: "CHAPTER 06",
            title: "DISTANCE",
            image: "7.jpeg",
            text:
                "Almost a year ago, our lives started moving in two different directions."
        },

        {
            chapter: "CHAPTER 06",
            title: "DISTANCE",
            image: "old.jpeg",
            text:
                "The hardest part of being apart isn't actually the distance. It's the goodbye."
        },


        /* CHAPTER 07 */

        {
            chapter: "CHAPTER 07",
            title: "THE ARCHIVE",
            image: "m.jpeg",
            text:
                "There are so many things I remember about us. Not because they were extraordinary. Just because they were ours."
        },

        {
            chapter: "CHAPTER 07",
            title: "THE ARCHIVE",
            image: "n.jpeg",
            text:
                "Funny thing is, I don't think my favourite memories are the big ones."
        },

        {
            chapter: "CHAPTER 07",
            title: "THE ARCHIVE",
            image: "o.jpeg",
            text:
                "They're the tiny moments that nobody else would remember. But I do."
        },


        /* CHAPTER 08 */

        {
            chapter: "CHAPTER 08",
            title: "THE LIFE WE'RE BUILDING",
            image: "i.jpeg",
            text:
                "I don't really know what our life will look like ten years from now. But I know who I want to be there."
        },

        {
            chapter: "CHAPTER 08",
            title: "THE LIFE WE'RE BUILDING",
            image: "i1.jpeg",
            text:
                "I imagine us still being us. Still best friends. Still choosing each other."
        },


        /* CHAPTER 09 */

        {
            chapter: "CHAPTER 09",
            title: "THE THINGS I'LL NEVER LET YOU FORGET",
            image: "c1.jpeg",
            text:
                "Okay. Enough emotional nonsense. Now let me tell you the things I will NEVER let you forget."
        },

        {
            chapter: "CHAPTER 09",
            title: "THE THINGS I'LL NEVER LET YOU FORGET",
            image: "c2.jpeg",
            text:
                "GREEN CHUTNEY CHAMPION."
        },


        /* CHAPTER 10 */

        {
            chapter: "CHAPTER 10",
            title: "FOR YOU",
            image: "e1.jpeg",
            text:
                "If you were sitting directly in front of me right now, the first thing I would say is thank you."
        },

        {
            chapter: "CHAPTER 10",
            title: "FOR YOU",
            image: "e2.jpeg",
            text:
                "You are loved. You are valued. You are enough."
        },

        {
            chapter: "CHAPTER 10",
            title: "FOR YOU",
            image: "e3.jpeg",
            text:
                "I love you."
        }

    ];


    /* =================================================
       STATE
    ================================================= */

    let currentPage = 0;

    let soundOn = false;


    /* =================================================
       SHOW PAGE
    ================================================= */

    function showMoment(index) {

        if (index < 0) {
            index = 0;
        }

        if (index >= moments.length) {
            index = moments.length - 1;
        }

        currentPage = index;

        const moment =
            moments[currentPage];


        chapterNumber.textContent =
            moment.chapter;


        chapterTitle.textContent =
            moment.title;


        momentImage.style.opacity = "0";


        setTimeout(() => {

            momentImage.src =
                moment.image;

            momentImage.onload = () => {

                momentImage.style.opacity = "1";

            };

        }, 200);


        storyText.textContent =
            moment.text;


        storyNumber.textContent =
            String(currentPage + 1).padStart(2, "0");


        const counter =
            String(currentPage + 1)
                .padStart(2, "0")
            + " / 26";


        pageCounter.textContent =
            counter;


        navCounter.textContent =
            counter;

    }


    /* =================================================
       ENTER MUSEUM
    ================================================= */

    enterMuseum.addEventListener("click", () => {

        entrancePage.classList.remove("active");

        doorPage.classList.add("active");


        /*
         * Start music immediately from
         * the user's click.
         */

        music.volume = 0.55;

        music.play()
            .then(() => {

                soundOn = true;

                soundBtn.textContent =
                    "♪ SOUND ON";

            })
            .catch(() => {

                soundOn = false;

                soundBtn.textContent =
                    "♪ SOUND OFF";

            });


        /*
         * Open the museum doors.
         */

        setTimeout(() => {

            doorPage.classList.add("open");

        }, 700);


        /*
         * Reveal museum after doors open.
         */

        setTimeout(() => {

            doorPage.classList.remove("active");

            museumPage.classList.add("active");

            showMoment(0);

        }, 3200);

    });


    /* =================================================
       NEXT
    ================================================= */

    nextBtn.addEventListener("click", () => {

        if (currentPage < moments.length - 1) {

            showMoment(currentPage + 1);

        }

    });


    /* =================================================
       PREVIOUS
    ================================================= */

    previousBtn.addEventListener("click", () => {

        if (currentPage > 0) {

            showMoment(currentPage - 1);

        }

    });


    /* =================================================
       SOUND
    ================================================= */

    soundBtn.addEventListener("click", () => {

        if (soundOn) {

            music.pause();

            soundOn = false;

            soundBtn.textContent =
                "♪ SOUND OFF";

        } else {

            music.play();

            soundOn = true;

            soundBtn.textContent =
                "♪ SOUND ON";

        }

    });


    /* =================================================
       EXIT
    ================================================= */

    exitBtn.addEventListener("click", () => {

        music.pause();

        soundOn = false;

        museumPage.classList.remove("active");

        doorPage.classList.remove("active");

        doorPage.classList.remove("open");

        entrancePage.classList.add("active");

        currentPage = 0;

    });


    /* =================================================
       KEYBOARD
    ================================================= */

    document.addEventListener("keydown", (event) => {

        if (!museumPage.classList.contains("active")) {
            return;
        }

        if (event.key === "ArrowRight") {

            nextBtn.click();

        }

        if (event.key === "ArrowLeft") {

            previousBtn.click();

        }

    });


});
