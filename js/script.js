const carouselImages = [
    "images/banner.png",
    "images/plane-engine.jpg",
    "images/srt-engine.jpg",
    "images/bmw-engine.jpg",
    "images/camshaft-full.jpg"
];

let imageIndex = 0;

const carouselImage = document.querySelector("#carousel-image");

carouselImage.addEventListener("click", function () {
    carouselImage.classList.add("fade");

    setTimeout(function () {
        imageIndex++;

        if (imageIndex >= carouselImages.length) {
            imageIndex = 0;
        }

        carouselImage.src = carouselImages[imageIndex];
        carouselImage.classList.remove("fade");
    }, 300);
});

fetch("data/profile.json")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        showProfileData(data);
    })
    .catch(function (error) {
        console.log("JSON faili lugemisel tekkis viga:", error);
    });


function showProfileData(profile) {
    const fullName = profile.nimi + " " + profile.perekonnanimi;

    document.querySelector("#first-name").textContent = profile.nimi;
    document.querySelector("#last-name").textContent = profile.perekonnanimi;
    document.querySelector("#job-title").textContent = profile.ametikirjeldus;

    document.querySelector("#contact-name").textContent = fullName;
    document.querySelector("#age").textContent = profile.vanus;
    document.querySelector("#email").textContent = profile.kontaktEmail;
    document.querySelector("#phone").textContent = profile.telefon;
    document.querySelector("#location").textContent = profile.asukoht;
    document.querySelector("#intro-text").textContent = profile.luhitutvustus;
    document.querySelector("#footer-name").textContent = fullName;

    document.querySelector("#email-link").href = "mailto:" + profile.kontaktEmail;
    document.querySelector("#phone-link").href = "tel:" + profile.telefon.replaceAll(" ", "");

    addListItems("#education-list", profile.haridus);
    addListItems("#experience-list", profile.tookogemus);
    addListItems("#skills-list", profile.oskused);
    addListItems("#languages-list", profile.keeled);
}


function addListItems(selector, items) {
    const list = document.querySelector(selector);

    list.innerHTML = "";

    items.forEach(function (item) {
        const li = document.createElement("li");
        li.textContent = item;
        list.appendChild(li);
    });
}
