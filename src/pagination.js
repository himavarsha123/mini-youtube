var pagination = (videos, window) => {
    const videosPerPage = getVideosPerPageOnScreenWidth(window);
    window.screen.width <= 768 ? paginationForMobiles(videos, videosPerPage) :
     paginationForLaptops(videos, videosPerPage);
}

var paginationForMobiles = (videos, videosPerPage) => {
    const paginationContainer = document.getElementById("pagination-container");
    paginationContainer.innerHTML = "";

    const leftArrow = document.createElement("i");
    leftArrow.classList.add("fas");
    leftArrow.classList.add("fa-arrow-circle-left");
    leftArrow.classList.add("arrow");
    leftArrow.classList.add("fa-2x");
    leftArrow.id = "left-arrow";
    paginationContainer.appendChild(leftArrow);

    const rightArrow = document.createElement("i");
    rightArrow.classList.add("fas");
    rightArrow.classList.add("fa-arrow-circle-right");
    rightArrow.classList.add("arrow");
    rightArrow.classList.add("fa-2x");
    rightArrow.id = "right-arrow";
    paginationContainer.appendChild(rightArrow);

    addEventListenersToPageArrows(paginationContainer, videos, videosPerPage);
}

var addEventListenersToPageArrows = (paginationContainer, videos, videosPerPage) => {
    const pageCount = getTotalPages(videos.length, videosPerPage);
    const pageArrows = paginationContainer.children;
    const leftArrow = pageArrows[0];
    const rightArrow = pageArrows[1];

    leftArrow.addEventListener("click", function() {
        if (window.currentPage > 1) {
            window.currentPage--;
            const initialVideoIndex = getVideoIndex(currentPage);
            displayVideosOnPage(videos.slice(initialVideoIndex, initialVideoIndex + videosPerPage));
        }
    });

    rightArrow.addEventListener("click", function() {
        if (window.currentPage != pageCount) {
            window.currentPage++;
            const initialVideoIndex = getVideoIndex(currentPage);
            displayVideosOnPage(videos.slice(initialVideoIndex, initialVideoIndex + videosPerPage));
        }
    });
}

var paginationForLaptops = (videos, videosPerPage) => {
    const pageCount = getTotalPages(videos.length, videosPerPage);
    const paginationContainer = document.getElementById("pagination-container");
    paginationContainer.innerHTML = "";
    
    for(let i = 0; i < pageCount; i++) {
        const paginationTemplate = document.getElementById("pagination-template");
        const node = document.importNode(paginationTemplate.content, true);
        const page = node.getElementById("page");
        page.id = "page-" + (i+1);
        page.textContent = i+1;
        if (i == 0) {
          page.classList.add("active");
        }
        paginationContainer.appendChild(page);
    }
    addEventListenersToPageNumberButtons(paginationContainer, videos);
}

var addEventListenersToPageNumberButtons = (paginationContainer, videos) => {
    const pages = paginationContainer.children;
    for(let page of pages) {
        if(typeof page == "object") {
            page.addEventListener("click", function() {
                const pageNumber = this.id.charAt(5);
                const initialVideoIndex = getVideoIndex(pageNumber);
                displayVideosOnPage(videos.slice(initialVideoIndex, initialVideoIndex + videosPerPage));
                const previousPage = document.getElementById("page-" + currentPage);
                previousPage.classList.remove("active");
                window.currentPage = parseInt(pageNumber);
                document.getElementById("page-"+ pageNumber).classList.add('active'); 
            });
        }
    }
}
