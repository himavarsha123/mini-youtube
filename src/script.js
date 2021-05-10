window.videosPerPage = 4;
window.currentPage = 1;

document.getElementById("submit-button").addEventListener("click", execute);

async function execute() {
    var query = document.getElementById("search-bar").value;
    var videos = await getVideosFromApi(query);
    console.log(videos);
    window.videosPerPage = getVideosPerPageOnScreenWidth(window);
    pagination(videos, window);
    var initialVideoIndex = getVideoIndex(currentPage);
    displayVideosOnPage(videos.slice(initialVideoIndex, initialVideoIndex + videosPerPage));
}
