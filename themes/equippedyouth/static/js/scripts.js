function hideSavedPostsButton() {
    var button = document.getElementById("savedPostsButton");
    if (button.style.display === "none") {
        button.style.display = "block";
    }
    else {
        button.style.display = "none";
    }
}

var errorDiv = document.getElementById("no-filter-content");
var filter = document.getElementById("filter");
var filterContainer = document.getElementById("filter-container");

function setFilter(filterName) {
    var setFilter = document.getElementById("set-filter").children[0];
    if (filterName == 'all') {
        errorDiv.textContent = "No content found for this category!";
    }
    else {
        errorDiv.textContent = "No " + filterName + " found for this category.";
    }
    // Capitalise first letter of filter
    setFilter.textContent = filterName.charAt(0).toUpperCase() + filterName.slice(1);
}


UIkit.util.on("#filter", 'afterFilter', function() {
    var content = document.getElementById("category-content");

    if (content.style.height == 0 || content.style.height == "") {
        errorDiv.style.visibility = "visible";
        errorDiv.style.display = "block";
    }
    else {
        errorDiv.style.visibility = "hidden";
        errorDiv.style.display = "none";
    }
});

window.addEventListener('click', function(e) {
    // Outside element click filter exit
    if (e.target === filterContainer) {
        filterContainer.setAttribute("hidden", "");
    }
});

document.addEventListener('keyup', function(e) {
    // Escape key filter exit
    if (e.keyCode == 27) {
        filterContainer.setAttribute("hidden", "");
    }
});
