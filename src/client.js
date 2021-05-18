const API_KEY = "AIzaSyDLdEc7T5_yyG9bgbgZv8-OzOma4G4FjQQ";
const maxResults = 15;

var getVideosFromApi = async (query) => {
    const URL = "https://www.googleapis.com/youtube/v3/search?key=" + API_KEY +
        "&type=video&part=snippet&maxResults=" + maxResults + "&q=" + query;
    const data = await getData(URL);
    return data.items;
}

var getViewCount = async (videoId) => {
    const URL = "https://www.googleapis.com/youtube/v3/videos?part=statistics&id=" + videoId + "&key=" + API_KEY;
    const data =  await getData(URL);
    return data.items[0].statistics.viewCount;
}

var getData = async (URL) => await (await fetch(URL)).json();
