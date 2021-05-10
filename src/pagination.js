function pagination(videos, window) {
    const videosPerPage = getVideosPerPageOnScreenWidth(window);
    if(window.screen.width <= 768) {
        paginationForMobiles(videos, videosPerPage);
    } else {
        paginationForLaptops(videos, videosPerPage);
    }
}

function paginationForMobiles(videos, videosPerPage) {
    var paginationContainer = document.getElementById("pagination-container");
    paginationContainer.innerHTML = "";

    var leftArrow = document.createElement("i");
    leftArrow.classList.add("fas");
    leftArrow.classList.add("fa-arrow-circle-left");
    leftArrow.classList.add("arrow");
    leftArrow.classList.add("fa-2x");
    leftArrow.id = "left-arrow";
    paginationContainer.appendChild(leftArrow);

    var rightArrow = document.createElement("i");
    rightArrow.classList.add("fas");
    rightArrow.classList.add("fa-arrow-circle-right");
    rightArrow.classList.add("arrow");
    rightArrow.classList.add("fa-2x");
    rightArrow.id = "right-arrow";
    paginationContainer.appendChild(rightArrow);

    addEventListenersToPageArrows(paginationContainer, videos, videosPerPage);
}

function addEventListenersToPageArrows(paginationContainer, videos, videosPerPage) {
    var pageCount = getTotalPages(videos.length, videosPerPage);
    var pageArrows = paginationContainer.children;
    var leftArrow = pageArrows[0];
    var rightArrow = pageArrows[1];

    leftArrow.addEventListener("click", function() {
        if(window.currentPage > 1) {
            window.currentPage--;
            var initialVideoIndex = getVideoIndex(currentPage);
            displayVideosOnPage(videos.slice(initialVideoIndex, initialVideoIndex + videosPerPage));
        }
    });

    rightArrow.addEventListener("click", function() {
        if(window.currentPage != pageCount) {
            window.currentPage++;
            var initialVideoIndex = getVideoIndex(currentPage);
            displayVideosOnPage(videos.slice(initialVideoIndex, initialVideoIndex + videosPerPage));
        }
    });
}

function paginationForLaptops(videos, videosPerPage) {
    var pageCount = getTotalPages(videos.length, videosPerPage);
    var paginationContainer = document.getElementById("pagination-container");
    paginationContainer.innerHTML = "";
    
    for(let i = 0; i < pageCount; i++) {
        var paginationTemplate = document.getElementById("pagination-template");
        var node = document.importNode(paginationTemplate.content, true);
        var page = node.getElementById("page");
        page.id = "page-" + (i+1);
        page.textContent = i+1;
        if(i == 0) {
          page.classList.add("active");
        }
        paginationContainer.appendChild(page);
    }
    addEventListenersToPageNumberButtons(paginationContainer, videos);
}

function addEventListenersToPageNumberButtons(paginationContainer, videos) {
    var pages = paginationContainer.children;
    for(let i in pages) {
        var page = pages[i];
        if(typeof page == "object") {
            page.addEventListener("click", function() {
                var pageNumber = this.id.charAt(5);
                var initialVideoIndex = getVideoIndex(pageNumber);
                displayVideosOnPage(videos.slice(initialVideoIndex, initialVideoIndex + videosPerPage));
                var previousPage = document.getElementById("page-" + currentPage);
                previousPage.classList.remove("active");
                window.currentPage = parseInt(pageNumber);
                document.getElementById("page-"+ pageNumber).classList.add('active'); 
            });
        }
    }
}
