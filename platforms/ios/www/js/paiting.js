/**
 * Painting toolkit 
 */
var Painting = (function () {
    // private static
    var nextId = 1;

    var pencil_size = 110;

    // constructor
    var cls = function () {

      var buckets = {
        '#blue-bucket': 'Blue',
        '#red-bucket': 'red',
        '#black-bucket': 'black',
        '#white-bucket': 'white',
        '#green-bucket': 'green',
        '#purple-bucket': '#9E1E9E',
        '#pink-bucket': 'Magenta',
        '#yellow-bucket': 'yellow',
      }

      function registerColor(el, color_name) {
        $(el).bind('touchend', function() {
          $(this).transition({ y: '-12px', easing: 'easeOutCirc', duration : 1000 });
          context.strokeStyle = color_name;
          $.each(buckets, function(k,v) {
            if (k != el)
            $(k).transition({ y: '0px', easing: 'easeOutCirc', duration : 1000 });
          });
        });  
      }

      // get references to the canvas element as well as the 2D drawing context
      var sigCanvas = document.getElementById("canvasSignature");
      var context = sigCanvas.getContext("2d");
      context.strokeStyle = '#9E1E9E';
      context.lineWidth = 10;
      context.globalCompositeOperation = 'destination-atop'; 
      context.lineCap = "round";
      context.globalAlpha = 0.7;

      $.each(buckets, function(k,v) {
        registerColor(k, v);
      });

      $('#pencil-size').bind('touchend', function() {
        $('#pencil-size-img').css('width', pencil_size = (pencil_size == 90 ?  110 : 90));
        context.lineWidth = pencil_size == 110 ? 11 : 4;
      });

      // create a drawer which tracks touch movements
      var drawer = {
         isDrawing: false,
         touchstart: function (coors) {
            context.beginPath();
            context.moveTo(coors.x, coors.y);
            this.isDrawing = true;
         },
         touchmove: function (coors) {
            if (this.isDrawing) {
               context.lineTo(coors.x, coors.y);
               context.stroke();
            }
         },
         touchend: function (coors) {
            if (this.isDrawing) {
               this.touchmove(coors);
               this.isDrawing = false;


            }
         }
      };

      // create a function to pass touch events and coordinates to drawer
      function draw(event) {

         // get the touch coordinates.  Using the first touch in case of multi-touch
         var coors = {
            x: event.targetTouches[0].pageX,
            y: event.targetTouches[0].pageY
         };

         // Now we need to get the offset of the canvas location
         var obj = sigCanvas;

         if (obj.offsetParent) {
            // Every time we find a new object, we add its offsetLeft and offsetTop to curleft and curtop.
            do {
               coors.x -= obj.offsetLeft;
               coors.y -= obj.offsetTop;
            }
            // The while loop can be "while (obj = obj.offsetParent)" only, which does return null
            // when null is passed back, but that creates a warning in some editors (i.e. VS2010).
            while ((obj = obj.offsetParent) != null);
         }

         // pass the coordinates to the appropriate handler
         drawer[event.type](coors);
      }

      // attach the touchstart, touchmove, touchend event listeners.
      sigCanvas.addEventListener('touchstart', draw, false);
      sigCanvas.addEventListener('touchmove', draw, false);
      sigCanvas.addEventListener('touchend', draw, false);        


    };

    return cls;
})();


