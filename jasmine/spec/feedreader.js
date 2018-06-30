/* some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    describe('RSS Feeds', function() {
        it('alllFeeds variables are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        //url defined and not empty
        it('URL defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe("");
            });
        });
        //name defined and not empty
        it('are named', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe("");
            });
        });
    });

    describe('The Menu', function() {
        //menu element is hidden by default
        it('menu hidden', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
        //visibility of menu icon when is clicked
        it('menu visible by click', function() {
            $('a.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).not.toBe(true);
            $('a.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    /*loadFeed function is called and completes its work*/
    describe('Initial Entries', function() {
        //initialize 
        beforeEach(function(done) {
            loadFeed(0, done);
        });
        //loadFeed is called when complete
        it('loadFeed complete', function(done) {
            /*there is at least a single .entry element 
            within the .feed container.*/
            expect($('.feed .entry').length).toBeGreaterThan(0);
            done();
        });
    });

    /*a new feed is loaded by the loadFeed 
    function that the content actually changes */
    describe('New Feed Selection', function() {
        beforeEach(function(done) {
            loadFeed(0, function() {
                //feed 1 done loading
                feed1 = $('.feed').html();
                loadFeed(1, function() {
                    //feed 2 done loading
                    feed2 = $('.feed').html();
                    //all variables initialised, can begin tests
                    done();
                });
            });
        });
        it('feeds are not the same', function() {
            expect(feed1).not.toBe(feed2);
        });
    });
}());