document.addEventListener('DOMContentLoaded', function () {

  var SEARCH = {

    init: function() {
      var search = document.querySelector('.js-search');
      var result = document.querySelector('.js-filter-result');

      if (!search) return;

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

        SEARCH.searchEmpty(result, item);

      });

    },

    searchEmpty: function(container, ele) {
      var count = 0;

      for (i = 0; i < ele.length; i++) {

        if (ele[i].classList.contains('is-hidden')) {
          count++;
        }

      }

      if (ele.length == count) {
        container.classList.add('is-empty');
      }
      else if (container.classList.contains('is-empty')) {
        container.classList.remove('is-empty');
      }

    }

  }

  SEARCH.init();

  return SEARCH;

});