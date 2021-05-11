function getVideoIndex(pageNumber) {
    return (pageNumber - 1) * window.videosPerPage;
}

function getTotalPages(videoCount, videosPerPage) {
    var totalPages = videoCount/videosPerPage;
    if(videoCount % videosPerPage > 0) {
        totalPages++;
    }
    return parseInt(totalPages);
}

function getVideosPerPageOnScreenWidth(window) {
    if(window.screen.width <= 768) {
        return 2;
    } else {
        return 4;
    }
}

function numFormatter(num) {
    if(num > 999 && num < 1000000){
        return (num/1000).toFixed(1) + 'K views';
    }else if(num > 1000000){
        return (num/1000000).toFixed(1) + 'M views';
    }else if(num < 1000){
        return num + ' views';
    }
}
