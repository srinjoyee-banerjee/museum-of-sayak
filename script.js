
let movie = null;
let chapters = [];
let currentChapter = 0;
let currentScene = 0;
let playing = false;
let timer = null;

async function loadMovie() {

    const response = await fetch("sayak_content.json");
    movie = await response.json();

    chapters = movie.film.chapters;

    showChapter();

}

function getContent() {

    const key = chapters[currentChapter].id;

    return movie[key]?.content || [];

}

function showChapter() {

    const chapter = chapters[currentChapter];

    document.getElementById("chapter-number").textContent =
        "CHAPTER " + String(chapter.number).padStart(2, "0");

    document.getElementById("chapter-title").textContent =
        chapter.title;

    currentScene = 0;

    showScene();

}

function showScene() {

    const content = getContent();

    if (!content.length) return;

    const text = document.getElementById("text");

    text.style.animation = "none";
    void text.offsetWidth;
    text.style.animation = "textIn 1.2s ease";

    text.textContent = content[currentScene];

    updateBackground();

}

function updateBackground() {

    const key = chapters[currentChapter].id;
    const photos = movie.photo_map?.[key] || [];

    if (!photos.length) return;

    const photo =
        photos[currentScene % photos.length];

    document.getElementById("background").style.backgroundImage =
        `url("${photo}")`;

}

function startMovie() {

    document.getElementById("opening")
        .classList.add("hide");

    playMovie();

}

function nextScene() {

    const content = getContent();

    if (currentScene < content.length - 1) {

        currentScene++;
        showScene();

    } else if (currentChapter < chapters.length - 1) {

        currentChapter++;
        showChapter();

    } else {

        stopMovie();

    }

}

function previousScene() {

    if (currentScene > 0) {

        currentScene--;
        showScene();

    } else if (currentChapter > 0) {

        currentChapter--;
        showChapter();

    }

}

function playMovie() {

    if (playing) return;

    playing = true;

    document.getElementById("play").textContent = "❚❚";

    timer = setInterval(nextScene, 7000);

}

function stopMovie() {

    playing = false;

    clearInterval(timer);

    document.getElementById("play").textContent = "▶";

}

function togglePlay() {

    if (playing) {
        stopMovie();
    } else {
        playMovie();
    }

}

document.addEventListener("keydown", event => {

    if (event.key === "ArrowRight") nextScene();

    if (event.key === "ArrowLeft") previousScene();

    if (event.key === " ") {

        event.preventDefault();
        togglePlay();

    }

});

loadMovie();
