var displayVideosOnPage = async (videos) => {
    const searchResult = document.getElementById("search-result");
    searchResult.innerHTML = "";
    
    for(let i = 0; i < videos.length; i++) {
        const idSuffix = "-" + (i + 1);
        const video = videos[i];
        const videoTemplate = document.getElementById("video-template");
        const node = document.importNode(videoTemplate.content, true);

        const videoDetails = node.getElementById("video-details");
        videoDetails.id = "video-details" + idSuffix;

        const thumbnail = node.getElementById("thumbnail");
        thumbnail.id = "thumbnail" + idSuffix;
        thumbnail.src = video.snippet.thumbnails.medium.url;

        const videoPreview = node.getElementById("video-preview");
        videoPreview.id = "video-preview" + idSuffix;
        const link = "http://www.youtube.com/embed/" + video.id.videoId;
        videoPreview.src = link + "?autoplay=1&mute=1&controls=0";
        videoPreview.style.display = "none";
        
        const videoLink = node.getElementById("video-link");
        videoLink.id = "video-link" + idSuffix;
        videoLink.href = link;
        videoLink.target = "blank";

        const videoTitle = node.getElementById("video-title");
        videoTitle.id = "video-title" + idSuffix;
        videoTitle.textContent = video.snippet.title;

        const channelTitle = node.getElementById("channel-title");
        channelTitle.id = "channel-title" + idSuffix;
        channelTitle.textContent = video.snippet.channelTitle;

        const publishedDate = node.getElementById("published-date");
        publishedDate.id = "published-date" + idSuffix;
        publishedDate.textContent = video.snippet.publishedAt.slice(0, 10);

        const description = node.getElementById("description");
        description.id = "description" + idSuffix;
        description.textContent = video.snippet.description;

        const viewCount = node.getElementById("view-count");
        viewCount.id = "view-count" + idSuffix;
        viewCount.textContent = numFormatter(await getViewCount(video.id.videoId));

        videoDetails.addEventListener("mouseenter", function() {
            this.children[0].style.display = "none";
            this.children[1].style.display = "block";
        });

        videoDetails.addEventListener("mouseleave", function() {
            this.children[0].style.display = "block";
            this.children[1].style.display = "none";
        });
        
        searchResult.appendChild(node);
    }
}
