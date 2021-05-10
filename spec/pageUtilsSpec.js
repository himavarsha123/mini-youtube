describe("Page utils should return correct", () => {
    it("video Index for given page number", () => {
        var videoIndex = getVideoIndex(1);
        expect(videoIndex).toBe(0);
    });

    describe("formatted string", () => {
        it("with M appended for views more than or equal to a million", () => {
            var viewCount = 2000000;
            var viewCountString = numFormatter(viewCount);
            expect(viewCountString).toBe("2.0M views");
        });

        it("with K appended for views more than or equal to thousand", () => {
            var viewCount = 50000;
            var viewCountString = numFormatter(viewCount);
            expect(viewCountString).toBe("50.0K views");
        });

        it("with view count number itself when views less than 1000", () => {
            var viewCount = 999;
            var viewCountString = numFormatter(viewCount);
            expect(viewCountString).toBe('999 views');
        });
    });

    it("page count when given videos count", () => {
        var videoCount = 15;
        var windowMock = {screen: {width: 1000}};
        var pageCount = getTotalPages(videoCount, getVideosPerPageOnScreenWidth(windowMock));
        expect(pageCount).toBe(4);
    });

    describe("video count per page for", () => {
        it("big screen width", () => {
            var windowMock = {screen: {width: 1000}};
            expect(getVideosPerPageOnScreenWidth(windowMock)).toBe(4);
        });

        it("small screen width", () => {
            var windowMock = {screen: {width: 500}};
            expect(getVideosPerPageOnScreenWidth(windowMock)).toBe(2);
        });
    });
});
