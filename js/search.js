document.addEventListener('DOMContentLoaded', function () {

  var SEARCH = {

    init: function() {
      var search = document.querySelector('.js-search');

      search.addEventListener('keyup', function() {
        var item = document.querySelectorAll('.grid-item');
        var filter = search.value.toUpperCase();
        var name;
        var value;

        for (i = 0; i < item.length; i++) {

          name = item[i].querySelector('.js-name');
          value = name.textContent || name.innerText;

          if (value.toUpperCase().indexOf(filter) > -1) {
            item[i].classList.remove('is-hidden');
          }
          else {
            item[i].classList.add('is-hidden');
          }

        }

      });

    }

  }

  SEARCH.init();

  return SEARCH;

});