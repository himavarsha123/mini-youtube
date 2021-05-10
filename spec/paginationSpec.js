describe("pagination to be done properly for", () => {
    
    beforeEach(() => {
        var parser = new DOMParser();
        let str = __html__['index.html'];
        var doc = parser.parseFromString(str, 'text/html');
        document.body.innerHTML = doc.body.innerHTML;
    });

    afterEach(() => {
      document.body.innerHTML = '';
    });

    describe("small devices", () => {
        const mockWindow = {screen: {width: 768}};
        window.videosPerPage = getVideosPerPageOnScreenWidth(mockWindow);

        it("by appending data properly", () => {
            pagination([{}, {}, {}], mockWindow);
    
            expect(document.getElementById('pagination-container').children.length).toBe(2);
        });

        it("by moving to previous and next pages when clicked on respective arrows", () => {
            spyOn(window, 'displayVideosOnPage');
            pagination([{}, {}, {}], mockWindow);

            document.getElementById('right-arrow').dispatchEvent(new Event('click'));
            expect(window.currentPage).toBe(2);

            document.getElementById('left-arrow').dispatchEvent(new Event('click'));
            expect(window.currentPage).toBe(1);
        });
    });

    describe("large devices", () => {
        const mockWindow = {screen: {width: 1366}};
        window.videosPerPage = getVideosPerPageOnScreenWidth(mockWindow);

        it("by appending data properly", () => {
            pagination([{}, {}, {}], mockWindow);
    
            expect(document.getElementById('pagination-container').children.length).toBe(1);
        });

        it("by moving to previous and next pages when clicked on respective arrows", () => {
            spyOn(window, 'displayVideosOnPage');
            pagination([{}, {}, {}], mockWindow);

            document.getElementById('page-1').dispatchEvent(new Event('click'));
            expect(window.currentPage).toBe(1);
        });
    });
});