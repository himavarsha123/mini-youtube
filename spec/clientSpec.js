describe("Client must return expected JSON object when made call to Youtube Data API to", () => {
    it("get videos related to a search term", async () => {
        var dataMockObject = {
            items: [
                {
                    etag: "DINwFoGKKHb_r3gZhK80E6ld7dI",
                    id: {},
                    snippet: {}
                }
            ]
        }
        var query = "Javascript";
        spyOn(window, "getData").and.returnValue(dataMockObject);
        var data = await getVideosFromApi(query);
        expect(data).toEqual(dataMockObject.items);
    });

    it("get statistics of a video when given videoId", async () => {
        var dataMockObject = {
            items: [
                {
                    etag: "DINwFoGKKHb_r3gZhK80E6ld7dI",
                    id: {},
                    statistics: {
                        viewCount: 1000
                    }
                }
            ]
        }
        var query = "Javascript";
        spyOn(window, "getData").and.returnValue(dataMockObject);
        var viewCount = await getViewCount(query);
        expect(viewCount).toBe(1000);
    })
});
