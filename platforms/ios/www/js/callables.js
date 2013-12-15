/**
 * Callables toolkit 
 */
var Callables = (function () {
    // private static
    var nextId = 1;
                 
    // constructor
    var cls = function () {  
        return cls;
    };

    cls.trigger_sound = function() {
        var config = new Configuration();
        var s = config.toggleSound() ? "1-mute.png" : "1-mutes.png";
        $('.mute_img').attr("src", "img/1/" + s);
        app.playBackground();
        return 0;
    };

    cls.trigger_giraph = function() {
        $('#giraph').transition({ y: '-70px', easing: 'easeOutCirc', duration : 2234 }).transition({ y: '0px', easing: 'easeInCirc', duration : 2234 });
    }

    cls.trigger_title = function() {
        $('#title').css({ transformOrigin: '800px 800px'}).transition({ rotate: '-23deg', duration : 2000}).transition({ rotate: '-29deg', duration : 2000}).transition({ rotate: '-27deg', duration : 2000});
    }

    cls.trigger_sun = function() {
        $('#cloud2').transition({ x: '-100px', easing: 'easeOutCirc', duration : 2234 }).transition({ x: '0px', easing: 'easeOutCirc', duration : 2234 })
        $('#cloud3').transition({ x: '60px', easing: 'easeOutCirc', duration : 2234 }).transition({ x: '0px', easing: 'easeOutCirc', duration : 2234 })
    }

    // public static
    cls.get_nextId = function () {
        return nextId;
    };

    return cls;
})();


