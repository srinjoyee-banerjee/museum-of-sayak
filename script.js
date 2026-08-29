/* =====================================================
   MUSEUM PAGE
===================================================== */

.museum {
    position: fixed;
    inset: 0;

    width: 100vw;
    height: 100vh;

    overflow: hidden;

    background: #090807;

    color: #eee8dc;

    font-family:
        "Inter",
        sans-serif;
}


/* BACKGROUND */

.museum-background {
    position: absolute;
    inset: -4%;

    background-image:
        url("sayak_bkgnd.jpeg");

    background-size: cover;

    background-position: center;

    filter:
        brightness(.34)
        contrast(1.05)
        saturate(.65);

    transform: scale(1.08);

    animation:
        museumZoom 25s ease-in-out infinite alternate;

    z-index: 0;
}


.museum-vignette {
    position: absolute;
    inset: 0;

    z-index: 1;

    background:
        linear-gradient(
            90deg,
            rgba(5,4,3,.96),
            rgba(5,4,3,.72) 42%,
            rgba(5,4,3,.28) 72%,
            rgba(5,4,3,.58)
        );
}


.museum-grain {
    position: absolute;
    inset: 0;

    z-index: 2;

    pointer-events: none;

    opacity: .055;

    background-image:
        url("sayak_bkgnd.jpeg");

    background-size: 300px;

    mix-blend-mode: overlay;
}


/* TOP */

.museum-top {
    position: absolute;

    top: 36px;
    left: 6vw;
    right: 6vw;

    display: flex;
    justify-content: space-between;
    align-items: center;

    z-index: 10;
}


.museum-title {
    font-size: 8px;

    letter-spacing: 5px;

    opacity: .55;
}


.counter {
    font-family:
        "Cormorant Garamond",
        serif;

    font-size: 18px;

    display: flex;

    gap: 7px;

    opacity: .65;
}


/* CONTENT */

.museum-content {
    position: absolute;

    inset: 0;

    z-index: 5;

    display: flex;

    align-items: center;

    justify-content: space-between;

    padding:
        90px
        9vw
        110px
        7vw;

    gap: 8vw;
}


/* TEXT */

.text-side {
    width: 45%;

    max-width: 570px;

    transition:
        opacity .5s ease,
        transform .5s ease;
}


.text-side.fade-out {
    opacity: 0;

    transform:
        translateX(-25px);
}


.chapter-number {
    font-size: 8px;

    letter-spacing: 5px;

    opacity: .48;

    margin-bottom: 25px;
}


.text-side h1 {
    margin: 0;

    font-family:
        "Cormorant Garamond",
        serif;

    font-size:
        clamp(
            55px,
            6vw,
            100px
        );

    font-weight: 300;

    line-height: .86;

    letter-spacing: -3px;

    text-transform: uppercase;
}


.little-line {
    width: 48px;

    height: 1px;

    margin:
        30px
        0;

    background:
        rgba(255,255,255,.5);
}


#chapterText {
    max-width: 430px;

    margin: 0;

    font-family:
        "Cormorant Garamond",
        serif;

    font-size: 21px;

    line-height: 1.45;

    font-weight: 300;

    color:
        rgba(238,232,220,.78);
}


/* IMAGE */

.image-side {
    width: 40%;

    max-width: 560px;

    height: 67vh;

    position: relative;

    transition:
        opacity .5s ease,
        transform .5s ease;
}


.image-side.fade-out {
    opacity: 0;

    transform:
        translateX(25px);
}


.image-wrapper {
    width: 100%;
    height: 100%;

    overflow: hidden;

    background: #111;

    box-shadow:
        0 30px 90px
        rgba(0,0,0,.65);
}


#chapterImage {
    width: 100%;
    height: 100%;

    display: block;

    object-fit: cover;

    object-position: center;

    cursor: pointer;

    transition:
        opacity .3s ease,
        transform 1.2s ease;
}


#chapterImage:hover {
    transform: scale(1.025);
}


.image-counter {
    position: absolute;

    left: -35px;
    bottom: 0;

    font-family:
        "Cormorant Garamond",
        serif;

    font-size: 15px;

    opacity: .45;
}


/* BOTTOM */

.bottom-navigation {
    position: absolute;

    bottom: 37px;
    left: 7vw;

    z-index: 10;

    display: flex;

    align-items: center;

    gap: 22px;
}


.bottom-navigation button {
    width: 42px;
    height: 42px;

    border-radius: 50%;

    border:
        1px solid
        rgba(255,255,255,.35);

    background: transparent;

    color: white;

    cursor: pointer;

    font-size: 17px;

    transition:
        background .3s ease,
        color .3s ease,
        opacity .3s ease;
}


.bottom-navigation button:hover:not(:disabled) {
    background: #eee8dc;

    color: #090807;
}


.bottom-navigation button:disabled {
    opacity: .18;

    cursor: default;
}


.progress {
    width: 110px;

    height: 1px;

    background:
        rgba(255,255,255,.2);
}


.progress-fill {
    height: 100%;

    width: 0%;

    background:
        rgba(255,255,255,.8);

    transition:
        width .6s ease;
}


/* SOUND */

.sound-button {
    position: absolute;

    right: 38px;
    bottom: 38px;

    z-index: 10;

    border: 0;

    background: transparent;

    color: white;

    display: flex;

    align-items: center;

    gap: 8px;

    font-size: 8px;

    letter-spacing: 3px;

    opacity: .5;

    cursor: pointer;

    transition: opacity .3s ease;
}


.sound-button:hover {
    opacity: 1;
}


.sound-button:first-letter {
    font-family:
        "Cormorant Garamond",
        serif;
}


/* BACK */

.back-button {
    position: absolute;

    right: 6vw;
    top: 36px;

    transform:
        translateY(30px);

    z-index: 10;

    border: 0;

    background: transparent;

    color: white;

    font-size: 7px;

    letter-spacing: 3px;

    opacity: .3;

    cursor: pointer;

    transition: opacity .3s ease;
}


.back-button:hover {
    opacity: 1;
}


/* ANIMATION */

@keyframes museumZoom {

    from {
        transform: scale(1.08);
    }

    to {
        transform: scale(1.14);
    }

}


/* MOBILE */

@media (max-width: 800px) {

    .museum {
        overflow-y: auto;
    }


    .museum-content {

        position: relative;

        min-height: 100vh;

        flex-direction: column;

        align-items: flex-start;

        justify-content: center;

        padding:
            110px
            25px
            120px;

        gap: 45px;
    }


    .text-side {
        width: 100%;
    }


    .text-side h1 {
        font-size: 52px;
    }


    #chapterText {
        font-size: 18px;
    }


    .image-side {
        width: 100%;

        height: 50vh;
    }


    .museum-top {
        left: 25px;
        right: 25px;
    }


    .museum-title {
        letter-spacing: 3px;
    }


    .bottom-navigation {
        left: 25px;
        bottom: 25px;
    }


    .sound-button {
        right: 25px;
        bottom: 25px;
    }


    .back-button {
        right: 25px;
    }

}
