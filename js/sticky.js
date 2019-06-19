document.addEventListener('DOMContentLoaded', function () {

  var STICKY = {

    init: function () {
      var element = document.querySelectorAll('.js-sticky');

      if (element) {
      
        for (var i = 0; i < element.length; i++) {
          var position = STICKY.stickyPosition(element[i]);
          STICKY.stickyScroll(element[i], position.y);
        }

      }

    },

    stickyPosition: function(ele) {
      var rect = ele.getBoundingClientRect();
      return { x: rect.left, y: rect.top };
    },

    stickyScroll: function(ele, pos) {
      let scrollLast = 0;
      let scrolling = false;

      window.addEventListener('scroll', function(e) {
        scrollLast = window.scrollY;

        if (!scrolling) {

          window.requestAnimationFrame(function() {

            if (scrollLast > pos) {
              ele.classList.add('is-fixed');
            }
            else {
              ele.classList.remove('is-fixed');
            }

            scrolling = false;
          });

          scrolling = true;

        }

      });
    }

  }

  STICKY.init();

  return STICKY;

});