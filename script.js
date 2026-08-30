document.addEventListener("DOMContentLoaded", () => {

```
/* =====================================================
   ELEMENTS
===================================================== */

const entrance = document.getElementById("entrance");
const museum = document.getElementById("museum");

const enterBtn = document.getElementById("enterBtn");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

const exhibit = document.getElementById("exhibit");

const roomBackground =
    document.querySelector(".room-background");

const chapterCounter =
    document.getElementById("roomNumber");

const chapterTitle =
    document.getElementById("chapterTitle");

const doorChapter =
    document.getElementById("doorChapter");

const doors =
    document.getElementById("doors");

const momentCurrent =
    document.getElementById("momentCurrent");

const soundBtn =
    document.getElementById("soundBtn");

const music =
    document.getElementById("music");


/* =====================================================
   IMAGE PATHS
   ALL FILES ARE IN THE SAME FOLDER AS INDEX.HTML
===================================================== */

const img = name => name;


/* =====================================================
   10 CHAPTERS
===================================================== */

const chapters = [

    {
        number: 1,
        title: "WHO ARE YOU?",
        theme: "theme-1",

        moments: [

            {
                type: "intro",
                text:
                    "You are someone I keep discovering, even after all these years."
            },

            {
                type: "gallery",

                images: [
                    img("strong.jpeg"),
                    img("cand.jpeg"),
                    img("us_first.jpeg")
                ],

                text:
                    "There are so many little things about you that I notice."
            },

            {
                type: "text",

                text:
                    "Some of them are funny. Some of them drive me crazy. And some of them make me wonder how I got so lucky."
            }

        ]
    },


    {
        number: 2,
        title: "THE LITTLE THINGS",
        theme: "theme-2",

        moments: [

            {
                type: "intro",

                text:
                    "I don't think you even realise how many little things about you I notice."
            },

            {
                type: "gallery",

                images: [
                    img("solo.jpeg"),
                    img("candid.jpeg"),
                    img("cook.jpeg")
                ],

                text:
                    "Like the way you eat green chutney. You don't even need food sometimes."
            },

            {
                type: "gallery",

                images: [
                    img("simple.jpeg"),
                    img("old.jpeg"),
                    img("now.jpeg")
                ],

                text:
                    "You probably don't even notice the little things you do. I do."
            }

        ]
    },


    {
        number: 3,
        title: "YOUR FACE, YOUR HEART",
        theme: "theme-3",

        moments: [

            {
                type: "intro",

                text:
                    "I love your face. I love your eyes."
            },

            {
                type: "gallery",

                images: [
                    img("eyelash.jpeg"),
                    img("fell.jpeg"),
                    img("beautiful.jpeg")
                ],

                text:
                    "And your eyelashes... I don't think you even know how beautiful they are."
            },

            {
                type: "gallery",

                images: [
                    img("simple.jpeg"),
                    img("smile.jpeg"),
                    img("soft.jpeg")
                ],

                text:
                    "As beautiful as you are on the outside, that's not what made me fall in love with you."
            },

            {
                type: "text",

                text:
                    "I fell in love with your heart. Your soul. You yourself."
            }

        ]
    },


    {
        number: 4,
        title: "HOW WE BECAME US",
        theme: "theme-4",

        moments: [

            {
                type: "intro",

                text:
                    "We met on the very first day of our online MSc Physics class."
            },

            {
                type: "gallery",

                images: [
                    img("msc us.jpeg"),
                    img("Fest photo.jpeg"),
                    img("Cuteearly relationship photo.jpeg")
                ],

                text:
                    "Friends became lovers."
            },

            {
                type: "gallery",

                images: [
                    img("Favourite early photo of you two.jpeg"),
                    img("us_first.jpeg")
                ],

                text:
                    "You made me feel safe. You made me feel seen. You made me feel heard."
            }

        ]
    },


    {
        number: 5,
        title: "YOU, THROUGH MY EYES",
        theme: "theme-5",

        moments: [

            {
                type: "intro",

                text:
                    "There are things about you that I don't think you realise."
            },

            {
                type: "gallery",

                images: [
                    img("4.jpeg"),
                    img("5.jpeg"),
                    img("6.jpeg")
                ],

                text:
                    "You're one of the most intelligent people I've ever met. And you're genuinely funny."
            },

            {
                type: "gallery",

                images: [
                    img("7.jpeg"),
                    img("beautiful.jpeg")
                ],

                text:
                    "If I could give you one thing, it would be my eyes for one day."
            }

        ]
    },


    {
        number: 6,
        title: "DISTANCE",
        theme: "theme-6",

        moments: [

            {
                type: "intro",

                text:
                    "Almost a year ago, our lives started moving in two different directions."
            },

            {
                type: "gallery",

                images: [
                    img("i.jpeg"),
                    img("i1.jpeg"),
                    img("i2.jpeg")
                ],

                text:
                    "Two cities became part of our relationship."
            },

            {
                type: "gallery",

                images: [
                    img("i3.jpeg"),
                    img("sayak_bkgnd.jpeg")
                ],

                text:
                    "Love doesn't decrease with distance. It increases. Exponentially."
            }

        ]
    },


    {
        number: 7,
        title: "THE ARCHIVE",
        theme: "theme-7",

        moments: [

            {
                type: "intro",

                text:
                    "There are so many things I remember about us. Not because they were extraordinary. Just because they were ours."
            },

            {
                type: "gallery",

                images: [
                    img("m.jpeg"),
                    img("n.jpeg"),
                    img("o.jpeg")
                ],

                text:
                    "Some memories are about places."
            },

            {
                type: "gallery",

                images: [
                    img("p.jpeg"),
                    img("q.jpeg"),
                    img("candid.jpeg")
                ],

                text:
                    "But my favourite memories are the tiny moments that nobody else would remember."
            }

        ]
    },


    {
        number: 8,
        title: "THE LIFE WE'RE BUILDING",
        theme: "theme-8",

        moments: [

            {
                type: "intro",

                text:
                    "I don't really know what our life will look like ten years from now. But I know who I want to be there."
            },

            {
                type: "gallery",

                images: [
                    img("e1.jpeg"),
                    img("e2.jpeg"),
                    img("e3.jpeg")
                ],

                text:
                    "You."
            },

            {
                type: "text",

                text:
                    "I want us to be a team. Our resting place. Our safe space. Our home."
            }

        ]
    },


    {
        number: 9,
        title: "THE THINGS I'LL NEVER LET YOU FORGET",
        theme: "theme-9",

        moments: [

            {
                type: "intro",

                text:
                    "Okay. Enough emotional nonsense."
            },

            {
                type: "gallery",

                images: [
                    img("c1.jpeg"),
                    img("c2.jpeg"),
                    img("cook.jpeg")
                ],

                text:
                    "Now let me tell you the things I will NEVER let you forget."
            },

            {
                type: "text",

                text:
                    "GREEN CHUTNEY CHAMPION. Babu. Babai. Whatever I call you, you're still the same person I somehow chose to love."
            }

        ]
    },


    {
        number: 10,
        title: "FOR YOU",
        theme: "theme-10",

        moments: [

            {
                type: "intro",

                text:
                    "If you were sitting directly in front of me right now, the first thing I would say is thank you."
            },

            {
                type: "gallery",

                images: [
                    img("e1.jpeg"),
                    img("e2.jpeg"),
                    img("e3.jpeg")
                ],

                text:
                    "Thank you for loving me unconditionally. Thank you for everything."
            },

            {
                type: "text",

                text:
                    "You are loved. You are valued. You are enough."
            },

            {
                type: "final",

                text:
                    "I love you."
            }

        ]
    }

];


/* =====================================================
   FLATTEN ALL MOMENTS
===================================================== */

const moments = [];

chapters.forEach((chapter, chapterIndex) => {

    chapter.moments.forEach((moment, momentIndex) => {

        moments.push({
            ...moment,
            chapterIndex,
            momentIndex
        });

    });

});


let current = 0;
let insideMuseum = false;
let changing = false;


/* =====================================================
   ENTER MUSEUM
===================================================== */

enterBtn.addEventListener("click", async () => {

    if (insideMuseum) return;

    insideMuseum = true;

    entrance.classList.add("hidden");

    museum.classList.add("active");

    /*
     * Browser allows audio after a click.
     */

    try {
        music.volume = 0.45;
        await music.play();

        soundBtn.textContent = "♪ SOUND ON";

    } catch (error) {

        soundBtn.textContent = "♪ SOUND OFF";

    }


    /*
     * First museum room.
     */

    current = 0;

    setTimeout(() => {

        updateMuseum();

        doors.classList.add("closed");

        setTimeout(() => {

            doors.classList.remove("closed");

        }, 900);

    }, 700);

});


/* =====================================================
   RENDER
===================================================== */

function updateMuseum() {

    const item = moments[current];

    const chapter = chapters[item.chapterIndex];

    const chapterChanged =
        !exhibit.dataset.chapter ||
        exhibit.dataset.chapter !== String(item.chapterIndex);


    /*
     * Chapter theme
     */

    museum.className =
        `screen active ${chapter.theme}`;


    roomBackground.style.background =
        getComputedStyle(museum)
            .getPropertyValue("--bg");


    /*
     * Header
     */

    chapterCounter.textContent =
        `CHAPTER ${chapter.number}`;


    chapterTitle.textContent =
        chapter.title;


    momentCurrent.textContent =
        String(current + 1).padStart(2, "0");


    /*
     * Chapter transition
     */

    if (chapterChanged && current !== 0) {

        playDoors(chapter);

    }


    exhibit.dataset.chapter =
        item.chapterIndex;


    renderMoment(item);

}


/* =====================================================
   RENDER MOMENT
===================================================== */

function renderMoment(item) {

    exhibit.classList.add("fade");

    setTimeout(() => {

        exhibit.innerHTML = "";

        const chapter =
            chapters[item.chapterIndex];


        /* =========================
           INTRO
        ========================== */

        if (item.type === "intro") {

            exhibit.innerHTML = `

                <div class="chapter-intro exhibit-in">

                    <div class="chapter-small">
                        CHAPTER ${chapter.number}
                    </div>

                    <h2>
                        ${chapter.title}
                    </h2>

                    <div class="chapter-line"></div>

                    <div class="intro-moment-text">
                        ${item.text}
                    </div>

                </div>

            `;

        }


        /* =========================
           GALLERY
        ========================== */

        else if (item.type === "gallery") {

            const photos =
                item.images
                .map(image => `
                    <img
                        class="gallery-photo"
                        src="${image}"
                        alt="Sayak"
                    >
                `)
                .join("");


            exhibit.innerHTML = `

                <div class="photo-gallery exhibit-in">

                    ${photos}

                </div>

                <div class="gallery-caption exhibit-in">

                    ${item.text}

                </div>

            `;

        }


        /* =========================
           TEXT
        ========================== */

        else if (item.type === "text") {

            exhibit.innerHTML = `

                <div class="text-exhibit exhibit-in">

                    <div class="text-number">
                        ${String(current + 1).padStart(2, "0")}
                    </div>

                    <p>
                        ${item.text}
                    </p>

                </div>

            `;

        }


        /* =========================
           FINAL
        ========================== */

        else if (item.type === "final") {

            exhibit.innerHTML = `

                <div class="final-exhibit exhibit-in">

                    <div>
                        ${item.text}
                    </div>

                </div>

            `;

        }


        exhibit.classList.remove("fade");

    }, 450);

}


/* =====================================================
   DOOR TRANSITION
===================================================== */

function playDoors(chapter) {

    if (changing) return;

    changing = true;

    doorChapter.textContent =
        `CHAPTER ${chapter.number}`;


    /*
     * Close doors.
     */

    doors.classList.add("closed");


    setTimeout(() => {

        changing = false;

    }, 1500);

}


/* =====================================================
   NEXT
===================================================== */

nextBtn.addEventListener("click", () => {

    if (changing) return;

    if (current >= moments.length - 1) {

        finishMuseum();

        return;
    }

    const oldChapter =
        moments[current].chapterIndex;

    current++;

    const newChapter =
        moments[current].chapterIndex;


    /*
     * Chapter change.
     */

    if (oldChapter !== newChapter) {

        changing = true;

        const chapter =
            chapters[newChapter];

        doorChapter.textContent =
            `CHAPTER ${chapter.number}`;

        doors.classList.add("closed");

        setTimeout(() => {

            updateMuseum();

            doors.classList.remove("closed");

        }, 1150);

        setTimeout(() => {

            changing = false;

        }, 1550);

    } else {

        updateMuseum();

    }

});


/* =====================================================
   PREVIOUS
===================================================== */

prevBtn.addEventListener("click", () => {

    if (changing) return;

    if (current <= 0) {

        return;

    }

    const oldChapter =
        moments[current].chapterIndex;

    current--;

    const newChapter =
        moments[current].chapterIndex;


    if (oldChapter !== newChapter) {

        changing = true;

        const chapter =
            chapters[newChapter];

        doorChapter.textContent =
            `CHAPTER ${chapter.number}`;

        doors.classList.add("closed");

        setTimeout(() => {

            updateMuseum();

            doors.classList.remove("closed");

        }, 1150);

        setTimeout(() => {

            changing = false;

        }, 1550);

    } else {

        updateMuseum();

    }

});


/* =====================================================
   SOUND
===================================================== */

soundBtn.addEventListener("click", () => {

    if (music.paused) {

        music.play();

        soundBtn.textContent =
            "♪ SOUND ON";

    } else {

        music.pause();

        soundBtn.textContent =
            "♪ SOUND OFF";

    }

});


/* =====================================================
   KEYBOARD
===================================================== */

document.addEventListener("keydown", event => {

    if (!insideMuseum) return;

    if (event.key === "ArrowRight") {

        nextBtn.click();

    }

    if (event.key === "ArrowLeft") {

        prevBtn.click();

    }

});


/* =====================================================
   FINISH
===================================================== */

function finishMuseum() {

    exhibit.classList.add("fade");

    setTimeout(() => {

        exhibit.innerHTML = `

            <div class="final-exhibit exhibit-in">

                <div class="final-small">
                    THE END
                </div>

                <div class="final-title">
                    I LOVE YOU.
                </div>

                <div class="final-small">
                    THANK YOU FOR BEING YOU.
                </div>

            </div>

        `;

        exhibit.classList.remove("fade");

    }, 500);

}
```

});
