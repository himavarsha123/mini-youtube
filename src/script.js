window.videosPerPage = 4;
window.currentPage = 1;

window.onload = () => {
    const query = "javascript";
    appendData(query);
}

document.getElementById("submit-button").addEventListener("click", () => {
    const query = document.getElementById("search-bar").value;
    window.currentPage = 1;
    appendData(query);
});

var appendData = async (query) => {
    const videos = await getVideosFromApi(query);
    window.videosPerPage = getVideosPerPageOnScreenWidth(window);
    pagination(videos, window);
    const initialVideoIndex = getVideoIndex(currentPage);
    displayVideosOnPage(videos.slice(initialVideoIndex, initialVideoIndex + videosPerPage));
}
