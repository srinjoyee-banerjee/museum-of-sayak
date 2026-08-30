```javascript
document.addEventListener("DOMContentLoaded", async () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const cover = document.getElementById("cover");
    const doors = document.getElementById("doors");
    const museum = document.getElementById("museum");
    const scene = document.getElementById("scene");

    const enterBtn = document.getElementById("enterBtn");
    const previousBtn = document.getElementById("previousBtn");
    const nextBtn = document.getElementById("nextBtn");

    const currentNumber = document.getElementById("currentNumber");

    const music = document.getElementById("music");
    const soundBtn = document.getElementById("soundBtn");


    /* =====================================================
       STATE
    ===================================================== */

    let data = null;

    let currentPage = 0;

    let musicStarted = false;

    const TOTAL_PAGES = 26;


    /* =====================================================
       LOAD JSON
    ===================================================== */

    try {

        const response = await fetch("sayak_content.json");

        if (!response.ok) {
            throw new Error("Could not load sayak_content.json");
        }

        data = await response.json();

    } catch (error) {

        console.error(error);

        /*
           The website still works even if JSON fails.
        */

        data = null;
    }


    /* =====================================================
       IMAGE PATH FIX
       
       Your JSON says:
       assets/images/strong.jpeg

       But your actual files are in the SAME folder.

       This converts it automatically to:
       strong.jpeg
    ===================================================== */

    function imagePath(path) {

        if (!path) return "";

        return path
            .replace(/^assets\/images\//, "")
            .replace(/^assets\/images\\/, "");
    }


    /* =====================================================
       START MUSIC
    ===================================================== */

    function startMusic() {

        if (musicStarted) return;

        musicStarted = true;

        music.volume = 0.45;

        music.play()
            .then(() => {
                soundBtn.textContent = "♪ SOUND ON";
            })
            .catch(() => {
                soundBtn.textContent = "♪ CLICK FOR SOUND";
                musicStarted = false;
            });
    }


    /* =====================================================
       ENTER MUSEUM
    ===================================================== */

    enterBtn.addEventListener("click", () => {

        startMusic();

        enterBtn.disabled = true;

        cover.style.opacity = "0";

        cover.style.transition = "opacity 1s ease";

        setTimeout(() => {

            cover.classList.add("hidden");

            doors.classList.remove("hidden");

            /*
               Give the door a moment to appear
               before opening it.
            */

            setTimeout(() => {

                doors.classList.add("open");

            }, 250);

        }, 1000);


        /*
           After doors open:
           show the museum.
        */

        setTimeout(() => {

            doors.classList.add("hidden");

            museum.classList.remove("hidden");

            currentPage = 0;

            renderPage();

        }, 2600);

    });


    /* =====================================================
       SOUND BUTTON
    ===================================================== */

    soundBtn.addEventListener("click", () => {

        if (music.paused) {

            music.play();

            soundBtn.textContent = "♪ SOUND ON";

        } else {

            music.pause();

            soundBtn.textContent = "♪ SOUND OFF";
        }

    });


    /* =====================================================
       CHAPTER DATA
       
       26 pages total.

       Each chapter gets:
       - one chapter opening page
       - several memory pages
       
       This gives the feeling of moving through rooms.
    ===================================================== */

    const pagePlan = [

        /* ================= CHAPTER 1 ================= */

        {
            chapter: 1,
            type: "intro",
            title: "WHO ARE YOU?"
        },

        {
            chapter: 1,
            type: "memory",
            images: [
                "strong.jpeg",
                "cand.jpeg",
                "us_first.jpeg"
            ],
            text: [
                "You are someone I keep discovering, even after all these years."
            ]
        },

        {
            chapter: 1,
            type: "text",
            text:
                "You are my best friend, my safest place, my favourite person."
        },


        /* ================= CHAPTER 2 ================= */

        {
            chapter: 2,
            type: "intro",
            title: "THE LITTLE THINGS"
        },

        {
            chapter: 2,
            type: "memory",
            images: [
                "solo.jpeg",
                "candid.jpeg"
            ],
            text: [
                "I don't think you even realise how many little things about you I notice.",
                "Like the way you eat green chutney."
            ]
        },

        {
            chapter: 2,
            type: "memory",
            images: [
                "cook.jpeg",
                "simple.jpeg"
            ],
            text: [
                "You absolutely love sleeping.",
                "And then there's your English."
            ]
        },


        /* ================= CHAPTER 3 ================= */

        {
            chapter: 3,
            type: "intro",
            title: "YOUR FACE, YOUR HEART"
        },

        {
            chapter: 3,
            type: "memory",
            images: [
                "eyelash.jpeg",
                "fell.jpeg",
                "beautiful.jpeg"
            ],
            text: [
                "I love your face.",
                "I love your eyes.",
                "And your eyelashes... I don't think you even know how beautiful they are."
            ]
        },

        {
            chapter: 3,
            type: "memory",
            images: [
                "simple.jpeg",
                "smile.jpeg",
                "soft.jpeg"
            ],
            text: [
                "As beautiful as you are on the outside, that's not what made me fall in love with you.",
                "I fell in love with your heart."
            ]
        },


        /* ================= CHAPTER 4 ================= */

        {
            chapter: 4,
            type: "intro",
            title: "HOW WE BECAME US"
        },

        {
            chapter: 4,
            type: "memory",
            images: [
                "msc us.jpeg",
                "Fest photo.jpeg"
            ],
            text: [
                "We met on the very first day of our online MSc Physics class.",
                "And honestly, I don't think you had the best first impression of me."
            ]
        },

        {
            chapter: 4,
            type: "memory",
            images: [
                "Cuteearly relationship photo.jpeg",
                "Favourite early photo of you two.jpeg"
            ],
            text: [
                "Friends became lovers.",
                "You made me feel safe.",
                "You made me feel seen."
            ]
        },


        /* ================= CHAPTER 5 ================= */

        {
            chapter: 5,
            type: "intro",
            title: "YOU, THROUGH MY EYES"
        },

        {
            chapter: 5,
            type: "memory",
            images: [
                "4.jpeg",
                "5.jpeg"
            ],
            text: [
                "You're one of the most intelligent people I've ever met.",
                "And you're genuinely funny."
            ]
        },

        {
            chapter: 5,
            type: "memory",
            images: [
                "6.jpeg",
                "7.jpeg"
            ],
            text: [
                "Sometimes I feel like you understand me better than I understand myself.",
                "You notice more than people realise."
            ]
        },


        /* ================= CHAPTER 6 ================= */

        {
            chapter: 6,
            type: "intro",
            title: "DISTANCE"
        },

        {
            chapter: 6,
            type: "text",
            text:
                "Two cities became part of our relationship."
        },

        {
            chapter: 6,
            type: "text",
            text:
                "Love doesn't decrease with distance. It increases. Exponentially."
        },


        /* ================= CHAPTER 7 ================= */

        {
            chapter: 7,
            type: "intro",
            title: "THE ARCHIVE"
        },

        {
            chapter: 7,
            type: "memory",
            images: [
                "m.jpeg",
                "n.jpeg",
                "o.jpeg"
            ],
            text: [
                "There are so many things I remember about us.",
                "Not because they were extraordinary.",
                "Just because they were ours."
            ]
        },

        {
            chapter: 7,
            type: "memory",
            images: [
                "p.jpeg",
                "q.jpeg"
            ],
            text: [
                "I don't think my favourite memories are the big ones.",
                "They're the tiny moments that nobody else would remember."
            ]
        },


        /* ================= CHAPTER 8 ================= */

        {
            chapter: 8,
            type: "intro",
            title: "THE LIFE WE'RE BUILDING"
        },

        {
            chapter: 8,
            type: "memory",
            images: [
                "i.jpeg",
                "i1.jpeg"
            ],
            text: [
                "I don't really know what our life will look like ten years from now.",
                "But I know who I want to be there.",
                "You."
            ]
        },

        {
            chapter: 8,
            type: "memory",
            images: [
                "i2.jpeg",
                "i3.jpeg"
            ],
            text: [
                "I want us to be a team.",
                "Our resting place.",
                "Our safe space.",
                "Our home."
            ]
        },


        /* ================= CHAPTER 9 ================= */

        {
            chapter: 9,
            type: "intro",
            title: "THE THINGS I'LL NEVER LET YOU FORGET"
        },

        {
            chapter: 9,
            type: "memory",
            images: [
                "c1.jpeg",
                "c2.jpeg"
            ],
            text: [
                "Okay. Enough emotional nonsense.",
                "Now let me tell you the things I will NEVER let you forget."
            ]
        },

        {
            chapter: 9,
            type: "text",
            text:
                "GREEN CHUTNEY CHAMPION."
        },


        /* ================= CHAPTER 10 ================= */

        {
            chapter: 10,
            type: "intro",
            title: "FOR YOU"
        },

        {
            chapter: 10,
            type: "memory",
            images: [
                "e1.jpeg",
                "e2.jpeg",
                "e3.jpeg"
            ],
            text: [
                "If you were sitting directly in front of me right now, the first thing I would say is thank you.",
                "Thank you for everything."
            ]
        },

        {
            chapter: 10,
            type: "final",
            text:
                "You are loved.\n\nYou are valued.\n\nYou are enough.\n\nI love you."
        }

    ];


    /* =====================================================
       SAFETY
    ===================================================== */

    /*
       We want exactly 26 scenes.

       If something changes later, this prevents
       the counter from breaking.
    */

    const pages = pagePlan.slice(0, TOTAL_PAGES);


    /* =====================================================
       GET CHAPTER CLASS
    ===================================================== */

    function chapterClass(chapter) {

        return `chapter-${chapter}`;

    }


    /* =====================================================
       RENDER PAGE
    ===================================================== */

    function renderPage() {

        const page = pages[currentPage];

        if (!page) return;


        /* ---------------------------------------------
           UPDATE COUNTER
        --------------------------------------------- */

        currentNumber.textContent =
            String(currentPage + 1).padStart(2, "0");


        /* ---------------------------------------------
           RESET CHAPTER DESIGN
        --------------------------------------------- */

        museum.className = "";

        museum.classList.add(
            chapterClass(page.chapter)
        );


        /* ---------------------------------------------
           BUILD SCENE
        --------------------------------------------- */

        let html = "";


        /* =================================================
           CHAPTER INTRO
        ================================================= */

        if (page.type === "intro") {

            html = `

                <div class="chapter-intro scene-enter">

                    <div class="chapter-header">

                        <div class="chapter-number">
                            CHAPTER ${page.chapter}
                        </div>

                        <div class="chapter-title">
                            ${page.title}
                        </div>

                        <div class="chapter-intro-line"></div>

                    </div>

                </div>

            `;

        }


        /* =================================================
           MEMORY PAGE
        ================================================= */

        else if (page.type === "memory") {

            const images = page.images || [];

            let imageClass = "";

            if (images.length === 1) {
                imageClass = "single";
            }

            if (images.length === 3) {
                imageClass = "three";
            }


            const imageHTML = images
                .map(image => {

                    return `
                        <img
                            src="${imagePath(image)}"
                            alt="Memory"
                            onerror="this.style.display='none'"
                        >
                    `;

                })
                .join("");


            const textHTML = (page.text || [])
                .map(text => `<p>${text}</p>`)
                .join("");


            html = `

                <div class="memory-page scene-enter">

                    <div class="memory-images ${imageClass}">
                        ${imageHTML}
                    </div>

                    <div class="memory-text">

                        <div class="memory-small">
                            CHAPTER ${page.chapter}
                        </div>

                        ${textHTML}

                    </div>

                </div>

            `;

        }


        /* =================================================
           TEXT PAGE
        ================================================= */

        else if (page.type === "text") {

            const text = page.text || "";

            html = `

                <div class="text-page scene-enter">

                    <div class="text-page-inner">

                        <div class="tiny">
                            CHAPTER ${page.chapter}
                        </div>

                        <p>
                            ${text}
                        </p>

                    </div>

                </div>

            `;

        }


        /* =================================================
           FINAL PAGE
        ================================================= */

        else if (page.type === "final") {

            html = `

                <div class="text-page scene-enter">

                    <div class="text-page-inner">

                        <div class="tiny">
                            CHAPTER 10 · FOR YOU
                        </div>

                        <p>
                            ${page.text.replace(/\n/g, "<br>")}
                        </p>

                    </div>

                </div>

            `;

        }


        scene.innerHTML = html;


        /* ---------------------------------------------
           NAVIGATION STATES
        --------------------------------------------- */

        previousBtn.style.visibility =
            currentPage === 0
                ? "hidden"
                : "visible";


        nextBtn.style.visibility =
            currentPage === pages.length - 1
                ? "hidden"
                : "visible";

    }


    /* =====================================================
       NEXT
    ===================================================== */

    nextBtn.addEventListener("click", () => {

        if (currentPage >= pages.length - 1) {
            return;
        }

        currentPage++;

        renderPage();

    });


    /* =====================================================
       PREVIOUS
    ===================================================== */

    previousBtn.addEventListener("click", () => {

        if (currentPage <= 0) {
            return;
        }

        currentPage--;

        renderPage();

    });


    /* =====================================================
       KEYBOARD
    ===================================================== */

    document.addEventListener("keydown", event => {

        if (museum.classList.contains("hidden")) {
            return;
        }

        if (event.key === "ArrowRight") {

            nextBtn.click();

        }

        if (event.key === "ArrowLeft") {

            previousBtn.click();

        }

    });


    /* =====================================================
       INITIAL STATE
    ===================================================== */

    museum.classList.add("hidden");

});
```
