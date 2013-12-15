/**
 * Configuration toolkit 
 */
var Configuration = (function () {

    var edition = 'full';
    var gender = 'female';
    var user_name = '';
    var progress = 0;
    var is_sound = "true";
    var last_puzzle = 0;

    // constructor
    var cls = function () {
        gender = localStorage.getItem('baby.gender');
        if (gender == null) {
            gender = "female"
        }
        user_name = localStorage.getItem('baby.user_name');
        if (user_name == null) {
            user_name = "";
        }
        progress = localStorage.getItem('baby.progress');
        if (progress == null) {
            progress = "";
        }
        is_sound = localStorage.getItem('baby.is_sound');
        if (is_sound == null) {
            is_sound = "true";
        }
        last_puzzle = localStorage.getItem('baby.last_puzzle');
        if (last_puzzle == null) {
            last_puzzle = "0";
        }

        return cls;
    };

    cls.storeConfig = function() {
        localStorage.setItem('baby.gender', gender);
        localStorage.setItem('baby.user_name', user_name);
        localStorage.setItem('baby.progress', progress);
        localStorage.setItem('baby.is_sound', is_sound);
        localStorage.setItem('baby.last_puzzle', last_puzzle);
    };
        
    cls.isSound = function() {
        return is_sound == "true";
    };

    cls.toggleSound = function() {
        is_sound = is_sound == "true" ? is_sound = "false" : is_sound = "true";
        cls.storeConfig();
        return cls.isSound();
    }

    cls.isFree = function() {
        return edition == "free";
    };
    
    cls.isFemale = function() {
        return gender == 'female';
    };
    
    cls.setFemale = function() {
        gender = "female";
        cls.storeConfig();
    };
    
    cls.setMale = function() {
        gender = "male";
        cls.storeConfig();
    };
    
    cls.setUserName = function(name) {
        user_name = name;                      
        cls.storeConfig();
    };
    
    cls.getUserName = function() {
        return user_name;
    };

    cls.getLastPuzzle = function() {
        var l = parseInt(last_puzzle);
        if (l < 0 || l > 9) {
            l = 0;
            last_puzzle = "0";
            cls.storeConfig();
        }
        return l;
    };

    cls.nextPuzzle = function() {
        var l = parseInt(last_puzzle);
        last_puzzle = ((l + 1) % 10).toString();
        cls.storeConfig();
        return last_puzzle;
    };

    cls.previousPuzzle = function() {
        var l = parseInt(last_puzzle);
        last_puzzle = ((l + 9) % 10).toString();
        cls.storeConfig();
        return last_puzzle;
    };
    
    cls.getGroup = function() {
        var group = localStorage.getItem('baby.group');
        if (group == null || typeof(group) === "undefined") {
            group = Math.floor(3 * Math.random());
            localStorage.setItem('baby.group', group);
        }
        return group;
    };
    
    cls.getFirstLogin = function() {
        var first_login = localStorage.getItem('baby.first_login');
        if (first_login == null || typeof(first_login) === "undefined") {
            first_login = (new Date()).toString();
            localStorage.setItem('baby.first_login', first_login);
        }
        return first_login;
    };
   
    cls.increment = function() {
        progress++;
        storeConfig();
    };
   
    cls.getProgress = function() {
       return progress;
    }

    return cls;
})();

