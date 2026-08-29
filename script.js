```javascript
let movie = null;
let chapters = [];
let currentChapter = 0;
let currentScene = 0;
let playing = false;
let timer = null;

const MUSIC_INTERVAL = 7000;


// ===============================
// LOAD MOVIE
// ===============================

async function loadMovie() {

    const response = await fetch("sayak_content.json");

    movie = await response.json();

    chapters = movie.film.chapters;

    showChapter();
}


// ===============================
// GET CHAPTER TEXT
// ===============================

function getContent() {

    const key = chapters[currentChapter].id;

    return movie[key]?.content || [];
}


// ===============================
// SHOW CHAPTER
// ===============================

function showChapter() {

    const chapter = chapters[currentChapter];

    document.getElementById("chapter-number").textContent =
        "CHAPTER " + String(chapter.number).padStart(2, "0");

    document.getElementById("chapter-title").textContent =
        chapter.title;

    currentScene = 0;

    showScene();
}


// ===============================
// SHOW SCENE
// ===============================

function showScene() {

    const content = getContent();

    if (!content.length) return;

    const text = document.getElementById("text");

    text.style.animation = "none";

    void text.offsetWidth;

    text.style.animation =
        "textIn 1.2s ease";

    text.textContent =
        content[currentScene];

    updateBackground();
}


// ===============================
// CHANGE PHOTO
// ===============================

function updateBackground() {

    const key =
        chapters[currentChapter].id;

    const photos =
        movie.photo_map?.[key] || [];

    if (!photos.length) return;

    const photo =
        photos[currentScene % photos.length];

    document.getElementById("background")
        .style.backgroundImage =
        `url("${photo}")`;
}


// ===============================
// START MOVIE
// ===============================

function startMovie() {

    document.getElementById("opening")
        .classList.add("hide");

    // Start background music
    const music =
        document.getElementById("bgMusic");

    if (music) {

        music.volume = 0.45;

        music.play().catch(error => {

            console.log(
                "Music could not start:",
                error
            );

        });

    }

    playMovie();
}


// ===============================
// NEXT SCENE
// ===============================

function nextScene() {

    const content = getContent();

    if (
        currentScene <
        content.length - 1
    ) {

        currentScene++;

        showScene();

    }

    else if (
        currentChapter <
        chapters.length - 1
    ) {

        currentChapter++;

        showChapter();

    }

    else {

        stopMovie();

    }
}


// ===============================
// PREVIOUS SCENE
// ===============================

function previousScene() {

    if (currentScene > 0) {

        currentScene--;

        showScene();

    }

    else if (currentChapter > 0) {

        currentChapter--;

        showChapter();

    }
}


// ===============================
// PLAY MOVIE
// ===============================

function playMovie() {

    if (playing) return;

    playing = true;

    document.getElementById("play")
        .textContent = "❚❚";

    timer =
        setInterval(
            nextScene,
            MUSIC_INTERVAL
        );
}


// ===============================
// STOP MOVIE
// ===============================

function stopMovie() {

    playing = false;

    clearInterval(timer);

    timer = null;

    document.getElementById("play")
        .textContent = "▶";

    // IMPORTANT:
    // Music keeps playing.
    // It should continue underneath the movie.
}


// ===============================
// PLAY / PAUSE
// ===============================

function togglePlay() {

    const music =
        document.getElementById("bgMusic");

    if (playing) {

        stopMovie();

        if (music) {
            music.pause();
        }

    }

    else {

        if (music) {

            music.volume = 0.45;

            music.play().catch(error => {

                console.log(
                    "Music could not start:",
                    error
                );

            });

        }

        playMovie();
    }
}


// ===============================
// KEYBOARD CONTROLS
// ===============================

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "ArrowRight") {

            nextScene();

        }

        if (event.key === "ArrowLeft") {

            previousScene();

        }

        if (event.key === " ") {

            event.preventDefault();

            togglePlay();

        }

    }
);


// ===============================
// START
// ===============================

loadMovie();
```
