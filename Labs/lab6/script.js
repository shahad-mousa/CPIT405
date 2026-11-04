
let likes = 0;
let dislikes = 0;
let comments = [];

// Get HTML elements
const likeBtn = document.getElementById("like-btn");
const dislikeBtn = document.getElementById("dislike-btn");
const likeCount = document.getElementById("like-count");
const dislikeCount = document.getElementById("dislike-count");
const commentInput = document.getElementById("comment-input");
const submitComment = document.getElementById("submit-comment");
const commentsList = document.getElementById("comments-list");
const resetBtn = document.getElementById("reset-btn");

// Save a cookie
function setCookie(name, value) {
    document.cookie = name + "=" +
        encodeURIComponent(value) +
        "; path=/; SameSite=Lax";
}

// Read a cookie
function getCookie(name) {
    const cookies = document.cookie.split("; ");

    for (const cookie of cookies) {
        const [key, ...value] = cookie.split("=");

        if (key === name) {
            return decodeURIComponent(value.join("="));
        }
    }

    return null;
}

// Delete a cookie
function deleteCookie(name) {
    document.cookie = name +
        "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
}

// Update the page
function updateUI() {
    likeCount.textContent = likes;
    dislikeCount.textContent = dislikes;

    commentsList.innerHTML = "";

    comments.forEach(function(comment) {
        const div = document.createElement("div");
        div.className = "comment";
        div.textContent = comment;
        commentsList.appendChild(div);
    });

    const hasVoted = getCookie("vote") !== null;
    likeBtn.disabled = hasVoted;
    dislikeBtn.disabled = hasVoted;

    submitComment.disabled = getCookie("comment") !== null;
}

// Load saved data
function loadData() {
    const vote = getCookie("vote");
    const savedComment = getCookie("comment");

    if (vote === "like") {
        likes = 1;
    } else if (vote === "dislike") {
        dislikes = 1;
    }

    if (savedComment !== null) {
        comments = [savedComment];
    }

    updateUI();
}

// Like button
likeBtn.addEventListener("click", function() {
    if (getCookie("vote") !== null) {
        return;
    }

    likes++;
    setCookie("vote", "like");
    updateUI();
});

// Dislike button
dislikeBtn.addEventListener("click", function() {
    if (getCookie("vote") !== null) {
        return;
    }

    dislikes++;
    setCookie("vote", "dislike");
    updateUI();
});

// Submit comment
submitComment.addEventListener("click", function() {
    if (getCookie("comment") !== null) {
        return;
    }

    const comment = commentInput.value.trim();

    if (comment === "") {
        alert("Please write a comment.");
        return;
    }

    comments.push(comment);
    setCookie("comment", comment);

    commentInput.value = "";
    updateUI();
});

// Reset button
resetBtn.addEventListener("click", function() {
    deleteCookie("vote");
    deleteCookie("comment");

    likes = 0;
    dislikes = 0;
    comments = [];

    commentInput.value = "";
    updateUI();
});

// Start the application
loadData();
