// =====================================
// DARK MODE
// =====================================

const themeToggle =
document.getElementById("themeToggle");

if(localStorage.getItem("theme") === "dark")
{
    document.body.classList.add("dark-mode");
}

if(themeToggle){

    themeToggle.addEventListener("click",()=>{

        document.body.classList.toggle(
            "dark-mode"
        );

        if(
            document.body.classList.contains(
                "dark-mode"
            )
        ){

            localStorage.setItem(
                "theme",
                "dark"
            );

        }else{

            localStorage.setItem(
                "theme",
                "light"
            );

        }

    });

}

// =====================================
// UPLOAD AREA
// =====================================

const uploadArea =
document.getElementById(
    "uploadArea"
);

const imageInput =
document.getElementById(
    "imageInput"
);

const previewImage =
document.getElementById(
    "previewImage"
);

// =====================================
// CLICK AREA
// =====================================

if(uploadArea){

    uploadArea.addEventListener(
        "click",
        ()=>{

            imageInput.click();

        }
    );

}

// =====================================
// PREVIEW IMAGE
// =====================================

if(imageInput){

imageInput.addEventListener(
"change",

function(){

    const file =
    this.files[0];

    if(!file) return;

    const allowed =
    [
        "image/jpeg",
        "image/jpg",
        "image/png"
    ];

    if(
        !allowed.includes(
            file.type
        )
    ){

        alert(
            "Format harus JPG atau PNG"
        );

        this.value="";

        return;

    }

    if(
        file.size >
        10 * 1024 * 1024
    ){

        alert(
            "Ukuran maksimal 10 MB"
        );

        this.value="";

        return;

    }

    const reader =
    new FileReader();

    reader.onload =
    function(e){

        previewImage.src =
        e.target.result;

        previewImage.classList.remove(
            "d-none"
        );

    };

    reader.readAsDataURL(
        file
    );

});

}

// =====================================
// DRAG DROP
// =====================================

if(uploadArea){

[
"dragenter",
"dragover"
].forEach(event=>{

uploadArea.addEventListener(
event,
e=>{

e.preventDefault();

uploadArea.classList.add(
"dragover"
);

});

});

[
"dragleave",
"drop"
].forEach(event=>{

uploadArea.addEventListener(
event,
e=>{

e.preventDefault();

uploadArea.classList.remove(
"dragover"
);

});

});

uploadArea.addEventListener(
"drop",

function(e){

const files =
e.dataTransfer.files;

if(files.length){

imageInput.files =
files;

imageInput.dispatchEvent(
new Event("change")
);

}

});

}

// =====================================
// LOADING PROGRESS
// =====================================

const forms =
document.querySelectorAll(
"form"
);

forms.forEach(form=>{

form.addEventListener(
"submit",

function(){

const progress =
document.getElementById(
"progressContainer"
);

if(progress){

progress.classList.remove(
"d-none"
);

}

});

});

// =====================================
// SMOOTH SCROLL
// =====================================

document.querySelectorAll(
'a[href^="#"]'
).forEach(anchor=>{

anchor.addEventListener(
'click',

function(e){

e.preventDefault();

document.querySelector(
this.getAttribute('href')
).scrollIntoView({

behavior:'smooth'

});

});

});

// =====================================
// ANIMATION
// =====================================

window.addEventListener(
"load",

()=>{

document.querySelectorAll(
".card,.hero-section,.upload-area"
)

.forEach(el=>{

el.classList.add(
"fade-up"
);

});

});