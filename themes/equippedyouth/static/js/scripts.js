function hideSavedPostsButton() {
    var button = document.getElementById("savedPostsButton");
    if (button.style.display === "none") {
        button.style.display = "block";
    }
    else {
        button.style.display = "none";
    }
}