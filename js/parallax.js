document.addEventListener('DOMContentLoaded', function () {

  var PARALLAX = {

    init: function () {
      var hero = document.querySelector('.js-hero');
      var random = Math.floor(Math.random() * 6) + 1;
      var img = [
        'images/hero/hero-01',
        'images/hero/hero-02',
        'images/hero/hero-03',
        'images/hero/hero-04',
        'images/hero/hero-05',
        'images/hero/hero-06'
      ];

      var src = img[random - 1].toString();

      if (!hero) return;

      hero.querySelector('source').setAttribute('srcset', src + '-mobile.jpg');
      hero.querySelector('img').setAttribute('src', src + '.jpg');

      if (window.innerWidth >= 768) {
        PARALLAX.parallaxScroll(hero.querySelector('img'));
      }

    },

    parallaxScroll: function(ele) {
      let scrollLast = 0;
      let scrolling = false;

      window.addEventListener('scroll', function(e) {
        scrollLast = window.scrollY;

        if (!scrolling) {

          window.requestAnimationFrame(function() {
            PARALLAX.parallaxCalc(ele, scrollLast);
            scrolling = false;
          });

          scrolling = true;

        }

      });

    },

    parallaxCalc: function(ele, position) {
      var updated = Math.floor(position);
      ele.setAttribute('style', 'transform: translateY(' + parseInt(updated / 50) + 'px)');
    }

  }

  PARALLAX.init();

  return PARALLAX;

});
