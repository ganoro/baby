/**
 * Puzzle toolkit 
 */
var Puzzle = (function () {
    // private static
    var completed = 1;
    var images = [ 
        { 
            size: [50, 300, 647, 470],
            img: 'p1/background.png', 
            pieces : ['p1/1.png', 'p1/2.png', 'p1/3.png', 'p1/4.png', 'p1/5.png', 'p1/6.png'], 
            offset : [[52, 500] , [56, 361], [272, 303], [446, 303], [442, 538], [271, 520]]
        },
        {
            size: [80, 300, 490, 740],
            img: 'p2/background.png', 
            pieces : ['p2/1.png', 'p2/2.png', 'p2/3.png', 'p2/4.png', 'p2/5.png'],
            offset : [[332, 502] , [338, 640], [86, 311], [108, 423], [352, 306]] 
        },
        {
            size: [75, 200, 584, 668],
            img: 'p3/background.png',
            pieces : ['p3/1.png', 'p3/2.png', 'p3/3.png', 'p3/4.png', 'p3/5.png', 'p3/6.png', 'p3/7.png'], 
            offset : [[81, 601] , [96, 393], [212, 398], [112, 206], [215, 209], [348, 216], [354, 405]] 
        },
        { 
            size: [55, 200, 681, 591],
            img: 'p4/background.png', 
            pieces : ['p4/1.png', 'p4/2.png', 'p4/3.png', 'p4/4.png', 'p4/5.png', 'p4/6.png'], 
            offset : [[59, 637] , [159, 505], [332, 222], [436, 205], [436, 468], [332, 366]] 
        },
        { 
            size: [30, 340, 743, 446],
            img: 'p5/background.png', 
            pieces : ['p5/1.png', 'p5/2.png', 'p5/3.png', 'p5/4.png', 'p5/5.png', 'p5/6.png'], 
            offset : [[35, 353] , [45, 488], [278, 536], [278, 346], [521, 378], [521, 502]] 
        },
        { 
            size: [75, 200, 722, 709],
            img: 'p6/background.png', 
            pieces : ['p6/1.png', 'p6/2.png', 'p6/3.png', 'p6/4.png', 'p6/5.png', 'p6/6.png', 'p6/7.png'], 
            offset : [[275, 308] , [518, 204], [382, 217], [344, 332], [498, 340], [193, 451], [79, 675]] 
        },
        { 
            size: [55, 150, 635, 750],
            img: 'p7/background.png', 
            pieces : ['p7/1.png', 'p7/2.png', 'p7/3.png', 'p7/4.png'], 
            offset : [[396, 531] , [61, 478], [61, 360], [439, 157]] 
        },        
        { 
            size: [55, 200, 596, 741],
            img: 'p8/background.png', 
            pieces : ['p8/1.png', 'p8/2.png', 'p8/3.png', 'p8/4.png', 'p8/5.png', 'p8/6.png', 'p8/7.png'], 
            offset : [[495, 621] , [493, 394], [549, 208], [325, 423], [63, 422], [62, 564], [369, 623]] 
        },

        { 
            size: [45, 100, 609, 835],
            img: 'p9/background.png', 
            pieces : ['p9/1.png', 'p9/2.png', 'p9/3.png', 'p9/4.png', 'p9/5.png', 'p9/6.png'], 
            offset : [[154, 183] , [379, 543], [233, 560], [50, 394], [540, 129], [393, 105]] 
        },
        { 
            size: [75, 100, 614, 819],
            img: 'p10/background.png', 
            pieces : ['p10/1.png', 'p10/2.png', 'p10/3.png', 'p10/4.png', 'p10/5.png'], 
            offset : [[309, 356], [336, 622], [153, 598], [158, 480], [332, 124]]
        },
    ];

    // constructor
    var cls = function (e) {
        var config  = new Configuration();
        cls.render(config.getLastPuzzle(), e);
    };

    cls.render = function(id, e) {
        cls.completed = 0;
        var b = "<div id=\"pzzl_bkg\" style=\"left:{0}px;top:{1}px;height:{2}px;width:{3}px;z-index:-9999;position:absolute;background-image:url('img/{4}')\"></div>";
        b = b.format(images[id].size[1],images[id].size[0],images[id].size[2],images[id].size[3], images[id].img);
        $(e).append(b);
        for (var i = images[id].pieces.length - 1; i >= 0; i--) {
            var p = images[id].pieces[i];
            var randomTop = Math.ceil(Math.random()*70); /* Pick random number between 1 and 2 */
            var randomLeft = Math.ceil(Math.random()*70); /* Pick random number between 1 and 2 */

            $(e).append('<div class="targetpiece' + i +'" style="position:absolute;top:'+ images[id].offset[i][0] +'px;left:'+ images[id].offset[i][1] +'px"><img src="img/' + p + '"></div>');
            $(e).append('<div class="piece' + i +'" style="position:absolute;top: ' + randomTop + '%;left:'+ randomLeft + '%"><img src="img/' + p + '"></div>');

            $('.targetpiece'+ i).fadeTo(0, 0.0);
            $('.piece' + i ).draggable();
            $('.targetpiece' + i).droppable({tolerance: "intersect" , accept : '.piece' + i,
                drop: function( event, ui ) {
                    cls.completed += 1;
                    var draggable = $(ui.draggable);
                    var droppable = $(event.target);
                    var y = draggable.position().top - droppable.position().top;
                    var x = draggable.position().left - droppable.position().left;
                    draggable.transition({  x: -x + 'px', y: -y + 'px'})
                    draggable.draggable( 'disable' );
                    draggable.css('z-index', -3000);
                    droppable.css('z-index', -3000);
                    if (cls.completed == images[id].pieces.length) {
                        setTimeout(function() {
                            var config  = new Configuration();
                            config.nextPuzzle();
                            page('#/screen/1');
                            page('#/screen/2');
                        }, 2000);    
                    }
                }   
            });
            $('.targetpiece' + i).css('z-index', -2000)
            // $('.piece' + i).click(function() {
            //     alert(JSON.stringify($(this).position()));
            // });
        };
    };

    cls.fillEdge = function(data, width) {
        for(var i = 0; i < data.length; i += 4) {
          if ( !data[i + 3] && (data[i + 7] || data[i + width*4 + 3] )) { // heighlight image
            data[i] = 255;            // red
            data[i + 1] = 0;          // green
            data[i + 2] = 0;          // blue  
            data[i + 3] = 255;
          }
        }
        for(var i = data.length - 4; i > 0; i -= 4) {
          if ( !data[i + 3] && data[i - 1] ) { // heighlight image
            data[i] = 255;            // red
            data[i + 1] = 0;          // green
            data[i + 2] = 0;          // blue  
            data[i + 3] = 255;
          }
        }
        return data;
    };

    // public static
    cls.get_nextId = function () {
        return nextId;
    };

    return cls;
})();


