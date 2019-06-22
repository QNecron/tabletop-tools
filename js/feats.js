document.addEventListener('DOMContentLoaded', function () {

  var FEATS = {

    init: function () {

      var req = new XMLHttpRequest();
      var url = 'json/feats.min.json';
      req.overrideMimeType('application/json');
      req.open("GET", url, true);
      req.onload = function () {

        if (req.status != 200) {
          return;
        }

        var data = JSON.parse(this.response);
        // console.log(data);
        var feats = document.querySelector('.js-feat-list');
        if (!feats) return;

        FEATS.featList(data);
        FEATS.featTypeFilter();

      };
      req.send(null);

    },

    featList: function (data) {

      var feats = document.querySelector('.js-feat-list');

      Object.values(data).forEach((index) => {

        // fuuuuuu, table included..
        if (index.name == 'Leadership') return;

        var list = document.createElement('li');
        var container = document.createElement('div');
        var name = document.createElement('h3');
        var type = document.createElement('span');
        var more = document.createElement('button');
        var info = document.createElement('div');
        var description = document.createElement('p');
        
        list.setAttribute('class', 'grid-item feat-item ' + index.feat_types.feat_type.replace(/\s+/g, '-').toLowerCase());
        container.classList.add('feat', 'js-feat');
        name.classList.add('feat-name');
        type.classList.add('feat-type');
        more.classList.add('feat-expand', 'js-feat-expand');
        info.classList.add('feat-info', 'js-feat-info');
        description.classList.add('feat-description');

        name.innerHTML = index.name;
        if (index.feat_types.feat_type != 'General') type.innerHTML = '(' + index.feat_types.feat_type + ')';
        more.innerHTML = '<span class="srt">More info</span><i class="material-icons" aria-hidden="true">more</i>';
        description.innerHTML = index.description;

        feats.appendChild(list);
        list.appendChild(container);
        container.appendChild(name);
        // name.appendChild(type); // need to figure out how to display..
        container.appendChild(more);
        container.appendChild(info);
        info.appendChild(description);

        // hmm, what to do with this mess..
        if (index.sections[0]) {
          var descript0 = document.createElement('p');
          descript0.classList.add('feat-section-0');
          var text0 = '';

          if (index.sections[0].body) text0 = ' ' + index.sections[0].body;
          if (index.sections[0].description) text0 = index.sections[0].description;

          descript0.innerHTML = '<strong>' + index.sections[0].name + '</strong>' + text0;
          info.appendChild(descript0);
        }

        if (index.sections[1]) {
          var descript1 = document.createElement('p');
          descript1.classList.add('feat-section-1');
          var text1 = '';

          if (index.sections[1].body) text1 = ' ' + index.sections[1].body;
          if (index.sections[1].description) text1 = index.sections[1].description;

          descript1.innerHTML = '<strong>' + index.sections[1].name + '</strong>' + text1;
          info.appendChild(descript1);
        }

        if (index.sections[2]) {
          var descript2 = document.createElement('p');
          descript2.classList.add('feat-section-2');
          var text2 = '';

          if (index.sections[2].body) text2 = ' ' + index.sections[2].body;
          if (index.sections[2].description) text2 = index.sections[2].description;

          descript2.innerHTML = '<strong>' + index.sections[2].name + '</strong>' + text2;
          info.appendChild(descript2);
        }

        if (index.sections[3]) {
          var descript3 = document.createElement('p');
          descript3.classList.add('feat-section-3');
          var text3 = '';

          if (index.sections[3].body) text3 = ' ' + index.sections[3].body;
          if (index.sections[3].description) text3 = index.sections[3].description;

          descript3.innerHTML = '<strong>' + index.sections[3].name + '</strong>' + text3;
          info.appendChild(descript3);
        }

      });

      FEATS.featInfoSetup();

    },

    featTypeFilter: function () {
      var feats = document.querySelector('.js-feat-list');
      var filter = document.querySelector('.js-filter-type');
      var types = [
        'Combat',
        'Critical',
        'General',
        'Item-Creation',
        'Metamagic'
      ];

      for (var i = 0; i < types.length; i++) {
        FEATS.featTypeFilterTrigger(feats, filter, types[i]);
      }

    },

    featTypeFilterTrigger: function (parent, filter, type) {
      var element = document.createElement('button');
      element.setAttribute('class', 'nav-secondary-link js-' + type.toLowerCase());
      element.innerHTML = '<i class="material-icons" aria-hidden="true">toggle_off</i> ' + type.replace(/-/g, ' ');
      filter.appendChild(element);

      element.addEventListener('click', function () {
        element.classList.toggle('hide-' + type.toLowerCase());
        parent.classList.toggle('hide-' + type.toLowerCase());
      });

    },

    featInfoSetup: function () {
      var expandContainer = document.querySelectorAll('.js-feat');

      for (i = 0; i < expandContainer.length; i++) {
        FEATS.featExpand(expandContainer[i]);
      }

    },

    featExpand: function (parent) {
      var expandTrigger = parent.querySelector('.js-feat-expand');
      var expandInfo = parent.querySelector('.js-feat-info');

      expandTrigger.addEventListener('click', function () {
        expandTrigger.classList.toggle('open');
        expandInfo.classList.toggle('open');
      });

    }

  }

  FEATS.init();

  return FEATS;

});