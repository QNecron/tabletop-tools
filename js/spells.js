document.addEventListener('DOMContentLoaded', function () {

  var SPELLS = {

    init: function () {

      var req = new XMLHttpRequest();
      var url = 'json/spells.min.json';
      req.overrideMimeType('application/json');
      req.open("GET", url, true);
      req.onload = function () {

        if (req.status != 200) {
          return;
        }

        var data = JSON.parse(this.response);
        // console.log(data);
        var spells = document.querySelector('.js-spell-list');
        if (!spells) return;

        SPELLS.spellAlphabetFiltersSetup(data);
        SPELLS.spellList(data, 'A');
        SPELLS.spellSchoolFilters();
        SPELLS.spellDescriptorFilters();
        SPELLS.spellClassFilters();

      };
      req.send(null);

    },

    spellList: function (data, filter) {

      var spells = document.querySelector('.js-spell-list');

      Object.values(data).forEach((index) => {

        if (filter == 'all') {
          // all
        }
        else if (index.name.substring(0, 1) != filter) {
          return;
        }

        var list = document.createElement('li');
        var container = document.createElement('div');
        var name = document.createElement('h3');
        var more = document.createElement('button');
        var expand = document.createElement('button');
        var info = document.createElement('div');
        var school = document.createElement('div');
        var subschool = document.createElement('span');
        var descriptor = document.createElement('span');
        var level = document.createElement('div');
        var casting = document.createElement('div');
        var components = document.createElement('div');
        var range = document.createElement('div');
        var effect = document.createElement('div');
        var duration = document.createElement('div');
        var saving = document.createElement('div');
        var resistance = document.createElement('div');
        var descriptionShort = document.createElement('div');
        var descriptionLong = document.createElement('div');

        var filters = '';
        if (Array.isArray(index.descriptor)) filters = ' ' + index.descriptor.join().replace(/[, ]+/g, " ").trim();

        var classes = '';
        for (var i = 0; i < index.levels.length; i++) {
          classes = classes + ' ' + index.levels[i].class.toLowerCase();
        }

        list.setAttribute('class', 'grid-item spell-item ' + index.school + filters + classes);
        container.classList.add('spell', 'js-spell');
        name.classList.add('spell-name', 'js-name');
        more.classList.add('spell-more', 'js-spell-more');
        expand.classList.add('spell-expand', 'js-spell-expand');
        info.classList.add('spell-info', 'js-spell-info');
        school.classList.add('spell-school');
        level.classList.add('spell-level');
        casting.classList.add('spell-casting-time');
        components.classList.add('spell-components');
        range.classList.add('spell-range');
        effect.classList.add('spell-effect');
        duration.classList.add('spell-duration');
        saving.classList.add('spell-saving-throw');
        resistance.classList.add('spell-resistance');
        descriptionShort.classList.add('spell-description-short');
        descriptionLong.classList.add('spell-description-long', 'js-spell-description-long');

        var textSubschool = '';
        var textDescriptor = '';
        if (index.subschool_text) textSubschool = ' (' + index.subschool_text + ')';
        if (index.descriptor_text) textDescriptor = ' [' + index.descriptor_text + ']';

        name.innerHTML = index.name;
        more.innerHTML = '<span class="srt">More info</span><i class="material-icons" aria-hidden="true">more</i>';
        expand.innerHTML = '<span class="srt">Expand</span><i class="material-icons" aria-hidden="true">keyboard_arrow_down</i>';
        school.innerHTML = '<strong>School</strong> ' + index.school + textSubschool + textDescriptor;
        if (index.level_text) level.innerHTML = '<strong>Level</strong> ' + index.level_text;
        if (index.casting_time) casting.innerHTML = '<strong>Casting Time</strong> ' + index.casting_time;
        if (index.component_text) components.innerHTML = '<strong>Components</strong> ' + index.component_text;
        if (index.range) range.innerHTML = '<strong>Range</strong> ' + index.range;
        if (index.effects) effect.innerHTML = '<strong>Effect</strong> ' + index.effects[0].text;
        if (index.duration) duration.innerHTML = '<strong>Duration</strong> ' + index.duration;
        if (index.saving_throw) saving.innerHTML = '<strong>Saving Throw</strong> ' + index.saving_throw;
        if (index.spell_resistance) resistance.innerHTML = '<strong>Spell Resistance</strong> ' + index.spell_resistance;
        if (index.description) descriptionShort.innerHTML = '<p>' + index.description + '</p>';
        descriptionLong.innerHTML = index.body;

        spells.appendChild(list);
        list.appendChild(container);
        container.appendChild(name);
        container.appendChild(more);
        container.appendChild(expand);
        container.appendChild(info);
        info.appendChild(school);
        school.appendChild(subschool);
        school.appendChild(descriptor);
        info.appendChild(level);
        info.appendChild(casting);
        info.appendChild(components);
        info.appendChild(range);
        info.appendChild(effect);
        info.appendChild(duration);
        info.appendChild(saving);
        info.appendChild(resistance);
        info.appendChild(descriptionShort);
        info.appendChild(descriptionLong);
      });

      var empty = document.createElement('li');
      empty.setAttribute('role', 'alert');
      empty.classList.add('grid-item-empty', 'search-empty');
      empty.innerHTML = 'No results found.';

      spells.appendChild(empty);

      SPELLS.spellInfoSetup();

    },

    spellAlphabetFiltersSetup: function (data) {
      var spells = document.querySelector('.js-spell-list');
      var filterAlphabet = document.querySelector('.js-filter-alphabet');
      var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'Y', 'Z'];

      for (var i = 0; i < alphabet.length; i++) {
        SPELLS.spellAlphabetFiltersTrigger(data, spells, filterAlphabet, alphabet[i]);
      }

    },

    spellAlphabetFiltersTrigger: function (data, spells, parent, filter) {
      var element = document.createElement('button');
      element.setAttribute('class', 'nav-secondary-link js-filter-' + filter.toLowerCase());
      element.innerHTML = filter;
      parent.appendChild(element);

      element.addEventListener('click', function () {
        SPELLS.spellAlphabetFiltersClear(spells);
        SPELLS.spellList(data, filter);
      });

      if (filter == 'Z') {

        var all = document.createElement('button');
        all.setAttribute('class', 'nav-secondary-link js-filter-all');
        // all.setAttribute('disabled', '');
        all.innerHTML = 'Show All';
        parent.appendChild(all);

        all.addEventListener('click', function () {
          SPELLS.spellAlphabetFiltersClear(spells);
          SPELLS.spellList(data, 'all');
        });

      }

    },

    spellAlphabetFiltersClear: function (spells) {

      while (spells.lastChild) {
        spells.removeChild(spells.lastChild);
      }

    },

    spellInfoSetup: function () {
      var expandContainer = document.querySelectorAll('.js-spell');

      for (i = 0; i < expandContainer.length; i++) {
        SPELLS.spellExpand(expandContainer[i]);
        SPELLS.spellMore(expandContainer[i]);
      }

    },

    spellExpand: function (parent) {
      var expandTrigger = parent.querySelector('.js-spell-expand');
      var expandInfo = parent.querySelector('.js-spell-info');

      expandTrigger.addEventListener('click', function () {
        expandTrigger.classList.toggle('open');
        expandInfo.classList.toggle('open');
      });

    },

    spellMore: function (parent) {
      var moreName = parent.querySelector('.js-name');
      var moreTrigger = parent.querySelector('.js-spell-more');
      var moreInfo = parent.querySelector('.js-spell-description-long');
      var moreTitle = document.querySelector('.js-modal-title');
      var moreDialog = document.querySelector('.js-modal-content');

      moreTrigger.addEventListener('click', function () {
        moreTitle.innerHTML = moreName.innerHTML;
        moreDialog.innerHTML = moreInfo.innerHTML;
        MicroModal.show('modal', {
          disableScroll: true
        });
      });

    },

    spellSchoolFilters: function () {
      var spells = document.querySelector('.js-spell-list');
      var filter = document.querySelector('.js-filter-school');
      var schools = [
        'Abjuration',
        'Conjuration',
        'Divination',
        'Enchantment',
        'Evocation',
        'Illusion',
        'Necromancy',
        'Transmutation',
        'Universal'
      ];

      for (var i = 0; i < schools.length; i++) {
        SPELLS.spellSchoolFiltersTrigger(spells, filter, schools[i]);
      }

    },

    spellSchoolFiltersTrigger: function (parent, filter, school) {
      var element = document.createElement('button');
      element.setAttribute('class', 'nav-secondary-link js-' + school.toLowerCase());
      element.innerHTML = '<i class="material-icons" aria-hidden="true">toggle_off</i> ' + school;
      filter.appendChild(element);

      element.addEventListener('click', function () {
        element.classList.toggle('hide-' + school.toLowerCase());
        parent.classList.toggle('hide-' + school.toLowerCase());
      });

    },

    spellDescriptorFilters: function () {
      var spells = document.querySelector('.js-spell-list');
      var filter = document.querySelector('.js-filter-descriptor');
      var descriptor = [
        'Acid',
        'Cold',
        'Electricity',
        'Fire',
        'Sonic',
        'Force',
        'Air',
        'Earth',
        'Water',
        'Good',
        'Evil',
        'Lawful',
        'Chaotic',
        'Light',
        'Shadow',
        'Death',
        'Disease',
        'Poison',
        'Curse',
        'Pain',
        'Emotion',
        'Fear',
        'Mind-affecting'
      ];

      for (var i = 0; i < descriptor.length; i++) {
        SPELLS.spellDescriptorFiltersTrigger(spells, filter, descriptor[i]);
      }

    },

    spellDescriptorFiltersTrigger: function (parent, filter, descriptor) {
      var element = document.createElement('button');
      element.setAttribute('class', 'nav-secondary-link js-' + descriptor.toLowerCase());
      element.innerHTML = '<i class="material-icons" aria-hidden="true">toggle_off</i> ' + descriptor;
      filter.appendChild(element);

      element.addEventListener('click', function () {
        element.classList.toggle('hide-' + descriptor.toLowerCase());
        parent.classList.toggle('hide-' + descriptor.toLowerCase());
      });

    },

    spellClassFilters: function () {
      var spells = document.querySelector('.js-spell-list');
      var filter = document.querySelector('.js-filter-class');
      var classes = [
        'Bard',
        'Cleric',
        'Druid',
        'Paladin',
        'Ranger',
        'Sorcerer',
        'Wizard'
      ];

      for (var i = 0; i < classes.length; i++) {
        SPELLS.spellClassFiltersTrigger(spells, filter, classes[i]);
      }

    },

    spellClassFiltersTrigger: function (parent, filter, classes) {
      var element = document.createElement('button');
      element.setAttribute('class', 'nav-secondary-link js-' + classes.toLowerCase() + ' hide-' + classes.toLowerCase());
      element.innerHTML = '<i class="material-icons" aria-hidden="true">toggle_off</i> ' + classes;
      filter.appendChild(element);

      element.addEventListener('click', function () {
        element.classList.toggle('hide-' + classes.toLowerCase());
        parent.classList.toggle('hide-' + classes.toLowerCase());
      });

    }

  }

  SPELLS.init();

  return SPELLS;

});
