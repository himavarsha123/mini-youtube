var getVideoIndex = (pageNumber) =>  (pageNumber - 1) * window.videosPerPage;

var getTotalPages = (videoCount, videosPerPage) => {
    let totalPages = videoCount/videosPerPage;
    if (videoCount % videosPerPage > 0) {
        totalPages++;
    }
    return parseInt(totalPages);
}

var getVideosPerPageOnScreenWidth = (window) => window.screen.width <= 768 ? 2 : 4;

var numFormatter = (num) => {
    if (num > 999 && num < 1000000){
        return (num/1000).toFixed(1) + 'K views';
    } else if (num > 1000000){
        return (num/1000000).toFixed(1) + 'M views';
    } else if (num < 1000){
        return num + ' views';
    }
}
