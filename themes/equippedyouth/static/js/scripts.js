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
    // Show message if no content can be shown
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


function copyLink(copyText) {
    navigator.clipboard.writeText(copyText).then(function() {
        console.log('Async: Copying to clipboard was successful!');
      }, function(err) {
        console.error('Async: Could not copy text: ', err);
      });
}


function savePost(title, category, type) {
    var post = [title, category, type];

    if (localStorage.getItem("posts") == null || localStorage.getItem("posts") == "[]") {
        var posts = [];
        localStorage.setItem("posts", JSON.stringify(posts));
    }

    var storedPosts = JSON.parse(localStorage.getItem("posts"));

    for (let index = 0; index < storedPosts.length; index++) {
        var element = storedPosts[index];
        var unsave = false;

        if (element.toString() == post.toString()) {
            unsave = true;
            console.log("Unsaving Post...");
            var postIndex = storedPosts.indexOf(post);
            storedPosts.splice(postIndex, 1);

            UIkit.notification({
                message: 'Post Unsaved!',
                status: 'danger',
                pos: 'top-center',
                timeout: 5000
            });

            if (window.location.pathname == "/saved/" || window.location.pathname == "/saved") {
                window.location.reload(false);
            }
            break;
        }
    }

    if (!unsave && post != "[]") {
        console.log("Saving post '" + title + "'.");
        storedPosts.push(post);
        UIkit.notification({
            message: 'Post Saved!',
            status: 'success',
            pos: 'top-center',
            timeout: 5000
        });
    }

    localStorage.removeItem("posts");
    localStorage.setItem("posts", JSON.stringify(storedPosts));

    if (window.location.pathname == "/saved/" || window.location.pathname == "/saved") {
        loadSavedPosts();
    }
}


function loadSavedPosts() {
    if (localStorage.getItem("posts") == null || localStorage.getItem("posts") == "[]") {
        var posts = [];
        localStorage.setItem("posts", JSON.stringify(posts));
    }
    var storedPosts = JSON.parse(localStorage.getItem("posts"));

    var content = document.getElementById("category-content");

    for (let index = 0; index < storedPosts.length; index++) {
        var element = storedPosts[index];
        var title = element[0];
        var category = element[1];
        var type = element[2];
        
        var savedPost = title.replace(/\W+/g, '-').toLowerCase();

        if (savedPost[savedPost.length - 1] == '-') {
            savedPost = savedPost.substring(0, savedPost.length - 1);
        }

        // Saved Post
        var li = document.createElement("li");
        li.setAttribute("data-type", type);
        li.classList.add("uk-list");
        li.style.marginBottom = "50px";

        // Post Link
        var postLink = document.createElement("a");
        postLink.className += "uk-link-reset";
        postLink.setAttribute("href", "../" + type + "/" + savedPost);

        // Post Container
        var liContainer = document.createElement("div");
        liContainer.textContent = title;
        liContainer.className += "uk-padding border-rounded uk-box-shadow-large";
        postLink.appendChild(liContainer);

        // Type Label
        var typeLabel = document.createElement("div");
        typeLabel.className += "uk-overlay uk-light uk-text-left uk-text-bottom type";
        
        var typeLink = document.createElement("a");
        typeLink.className += "uk-link-reset";

        if (type == "bible_verses") {
            typeLink.textContent = "Bible Verse";
        }
        else {
            typeLink.textContent = type.charAt(0).toUpperCase() + type.slice(1);
        }
        
        typeLink.setAttribute("href", "../" + type + "/" + savedPost);
        typeLabel.appendChild(typeLink);

        // Category Label
        var categoryLabel = document.createElement("div");
        categoryLabel.className += "uk-overlay uk-light uk-text-left uk-text-bottom category";
        var categoryLink = document.createElement("a");
        categoryLink.className += "uk-link-reset";
        categoryLink.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        categoryLink.setAttribute("href", "../categories/" + category);
        categoryLabel.appendChild(categoryLink);

        // Save Button
        var saveLink = document.createElement("a");
        saveLink.setAttribute("onclick", `savePost('${title}', '${category}', '${type}')`);
        var save = document.createElement("div");
        save.className += "uk-overlay uk-light uk-text-left uk-text-bottom save uk-border-circle";
        var saveIcon = document.createElement("img");
        saveIcon.className += "uk-image";
        saveIcon.setAttribute("src", "../img/Save.svg");
        save.appendChild(saveIcon);
        saveLink.appendChild(save);

        // Share Button
        var shareLink = document.createElement("a");
        shareLink.setAttribute("uk-toggle", "target: #share-modal");
        shareLink.setAttribute("onclick", `shareSavedPost('${type}', '${savedPost}')`);
        shareLink.setAttribute("href", "#");
        
        var share = document.createElement("div");
        share.className += "uk-overlay uk-light uk-text-left uk-text-bottom share uk-border-circle";
        
        var shareIcon = document.createElement("img");
        shareIcon.className += "uk-image";
        shareIcon.setAttribute("src", "../img/Share.svg");
        share.appendChild(shareIcon);
        shareLink.appendChild(share);

        li.appendChild(typeLabel);
        li.appendChild(postLink);
        li.appendChild(categoryLabel);
        li.appendChild(saveLink);
        li.appendChild(shareLink);
        
        content.appendChild(li);
    }

    if (content.childElementCount == 0) {
        errorDiv.style.display = "block";
        errorDiv.style.visibility = "visible";
    }
}


function shareSavedPost(type, post) {
    // Share Overlay Links
    var linkShare = document.getElementById("link-share");
    var facebookShare = document.getElementById("facebook-share");
    var twitterShare = document.getElementById("twitter-share");
    var emailShare = document.getElementById("email-share");
    var smsShare = document.getElementById("sms-share");

    linkShare.setAttribute("onclick", `copyLink('${window.location.origin}/${type}/${post}');`);
    facebookShare.setAttribute("href", `${'https://facebook.com/sharer.php?u='}${window.location.origin}/${type}/${post}`);
    twitterShare.setAttribute("href", `${'https://twitter.com/intent/tweet?url='}${window.location.origin}/${type}/${post}`);
    emailShare.setAttribute("href", `${'mailto:?subject={{ .Title }}&amp;body='}${window.location.origin}/${type}/${post}`);
    smsShare.setAttribute("href", `${'sms:?&amp;body='}${window.location.origin}/${type}/${post}`);
}
