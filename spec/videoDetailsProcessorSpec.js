describe("videoDetailsProcessor should", () => {
   const videosData = [
      {
          "kind": "youtube#searchResult",
          "etag": "fa5yjUREguQkcfLYqOybHQa-ZvE",
          "id": {
             "kind": "youtube#video",
             "videoId": "NOmDsYrJ0Ew"
          },
          "snippet": {
             "publishedAt": "2021-04-04T15:58:38Z",
             "channelId": "UCaTsG_3WPBTF2OoKf4SZ4pQ",
             "title": "Tozkoparan İskender 18. Bölüm Fragmanı",
             "description": "#Tozkoparanİskender #Tozkoparan #TRT1 ===================================== #İskender - #ÇağanEfeAk | #Duygu - #ÜlküHilalÇiftçi | #Ece ...",
             "thumbnails": {
                "default": {
                   "url": "https://i.ytimg.com/vi/NOmDsYrJ0Ew/default.jpg",
                   "width": 120,
                   "height": 90
                },
                "medium": {
                   "url": "https://i.ytimg.com/vi/NOmDsYrJ0Ew/mqdefault.jpg",
                   "width": 320,
                   "height": 180
                },
                "high": {
                   "url": "https://i.ytimg.com/vi/NOmDsYrJ0Ew/hqdefault.jpg",
                   "width": 480,
                   "height": 360
                }
             },
             "channelTitle": "Tozkoparan İskender",
             "liveBroadcastContent": "none",
             "publishTime": "2021-04-04T15:58:38Z"
          }
       }
  ];

   beforeEach(() => {
      var parser = new DOMParser();
      let str = __html__['index.html'];
      var doc = parser.parseFromString(str, 'text/html');
      document.body.innerHTML = doc.body.innerHTML;
   });

   afterEach(() => {
      document.body.innerHTML = '';
   });

   it("append videos data correctly to the document", async () => { 
      await displayVideosOnPage(videosData);
        
      expect(document.getElementById('video-details-1')).toBeDefined();
      expect(document.getElementById('video-details-1').children.length).toBe(3);
      expect(document.getElementById('thumbnail-1').src).toBe(videosData[0].snippet.thumbnails.medium.url);
      expect(document.getElementById('video-preview-1').src).toBe(
         'http://www.youtube.com/embed/' + videosData[0].id.videoId + '?autoplay=1&mute=1&controls=0');
      expect(document.getElementById('video-link-1').href).toBe('http://www.youtube.com/embed/' + videosData[0].id.videoId);
      expect(document.getElementById('channel-title-1').innerHTML).toBe(videosData[0].snippet.channelTitle);
      expect(document.getElementById('published-date-1').innerHTML).toBe(videosData[0].snippet.publishTime.slice(0, 10));
      expect(document.getElementById('description-1').innerHTML).toBe(videosData[0].snippet.description);
   });

   it("replace thumbnail with video preview on mouse hover and replace video preview with thumbnail on mouse leave", async () => {
      await displayVideosOnPage(videosData);

      document.getElementById('video-details-1').dispatchEvent(new Event('mouseenter'));
      expect(document.getElementById('thumbnail-1').style.display).toBe('none');
      expect(document.getElementById('video-preview-1').style.display).toBe('block');

      document.getElementById('video-details-1').dispatchEvent(new Event('mouseleave'));
      expect(document.getElementById('thumbnail-1').style.display).toBe('block');
      expect(document.getElementById('video-preview-1').style.display).toBe('none');
   });
});