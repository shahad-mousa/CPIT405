
const ACCESS_KEY = "yqdEYq65Nmci6Rtl7Slm69cAwZJ1FSxNN_su3lyqI5w";

const searchInput = document.getElementById("searchInput");
const imagesDiv = document.getElementById("images");

const xhrBtn = document.getElementById("xhrBtn");
const fetchBtn = document.getElementById("fetchBtn");
const asyncBtn = document.getElementById("asyncBtn");

function displayImages(data) {

    imagesDiv.innerHTML = "";

    data.results.forEach(function(photo) {

        const img = document.createElement("img");

        img.src = photo.urls.small;
        img.alt = photo.alt_description || "Unsplash photo";

        imagesDiv.appendChild(img);

    });

}

function showError() {
    imagesDiv.innerHTML = "Error loading images";
}


// Method 1: XMLHttpRequest

function searchUsingXHR() {

    const query = searchInput.value;

    const xhr = new XMLHttpRequest();

    xhr.open(
        "GET",
        "https://api.unsplash.com/search/photos?query=" +
        encodeURIComponent(query)
    );

    xhr.setRequestHeader(
        "Authorization",
        "Client-ID " + ACCESS_KEY
    );

    xhr.onload = function() {

        if (xhr.status === 200) {

            const data = JSON.parse(xhr.responseText);

            displayImages(data);

        } else {

            showError();

        }

    };

    xhr.onerror = function() {
        showError();
    };

    xhr.send();

}


// Method 2: Fetch with Promises

function searchUsingFetch() {

    const query = searchInput.value;

    fetch(
        "https://api.unsplash.com/search/photos?query=" +
        encodeURIComponent(query),
        {
            headers: {
                "Authorization": "Client-ID " + ACCESS_KEY
            }
        }
    )

    .then(function(response) {

        if (!response.ok) {
            throw new Error("Request failed");
        }

        return response.json();

    })

    .then(function(data) {

        displayImages(data);

    })

    .catch(function(error) {

        showError();

    });

}


// Method 3: Fetch with Async/Await

async function searchUsingAsync() {

    const query = searchInput.value;

    try {

        const response = await fetch(
            "https://api.unsplash.com/search/photos?query=" +
            encodeURIComponent(query),
            {
                headers: {
                    "Authorization": "Client-ID " + ACCESS_KEY
                }
            }
        );

        if (!response.ok) {
            throw new Error("Request failed");
        }

        const data = await response.json();

        displayImages(data);

    } catch (error) {

        showError();

    }

}


// Mouse Events

xhrBtn.addEventListener("click", searchUsingXHR);

fetchBtn.addEventListener("click", searchUsingFetch);

asyncBtn.addEventListener("click", searchUsingAsync);


// Keyboard Event

searchInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        searchUsingAsync();

    }

});
