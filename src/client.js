const API_KEY = "AIzaSyBdSIvoomJKa0ezWwA2Ic7e3uyXi4lU7cg";
const maxResults = 15;

async function getVideosFromApi(query) {
    var URL = "https://www.googleapis.com/youtube/v3/search?key=" + API_KEY +
        "&type=video&part=snippet&maxResults=" + maxResults + "&q=" + query;
    var data = await getData(URL);
    return data.items;
}

async function getViewCount(videoId) {
    var URL = "https://www.googleapis.com/youtube/v3/videos?part=statistics&id=" + videoId + "&key=" + API_KEY;
    var data =  await getData(URL);
    console.log("Data: ", data);
    return data.items[0].statistics.viewCount;
}

async function getData(URL) {
    return await (await fetch(URL)).json();
}
