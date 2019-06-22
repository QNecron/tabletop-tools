document.addEventListener('DOMContentLoaded', function () {

  var COMBAT = {

    init: function() {
      var attribute = document.querySelector('.js-magic-attribute');
      var spell = document.querySelector('.js-magic-spell-level');
      var feat = 0;
      var feat1 = document.querySelector('.js-magic-focus');
      var feat2 = document.querySelector('.js-magic-greater-focus');
      var calc = document.querySelector('.js-magic-calc');

      if (!calc) return;

      calc.addEventListener('click', function () {

        var mod = COMBAT.casterModifier(parseInt(attribute.value));
        var lvl = parseInt(spell.value);
        var bonus = COMBAT.casterBonus(mod);

        if (feat2.checked) feat = 2;
        else if (feat1.checked) feat = 1;
        else feat = 0;

        var dc = COMBAT.casterDC(mod, lvl, feat);

        COMBAT.casterSetup(mod, dc, lvl, bonus);

      });

    },

    casterModifier: function (int) {

      var mod = 0;

      if (int >= 12 && int <= 13) mod = 1;
      if (int >= 14 && int <= 15) mod = 2;
      if (int >= 16 && int <= 17) mod = 3;
      if (int >= 18 && int <= 19) mod = 4;
      if (int >= 20 && int <= 21) mod = 5;
      if (int >= 22 && int <= 23) mod = 6;
      if (int >= 24 && int <= 25) mod = 7;
      if (int >= 26 && int <= 27) mod = 8;
      if (int >= 28 && int <= 29) mod = 9;
      if (int >= 30 && int <= 31) mod = 10;

      return mod;

    },

    casterBonus: function (int) {

      var spells = {
        one: 0, two: 0, three: 0, four: 0, five: 0, six: 0, seven: 0, eigth: 0, nine: 0,
      }

      // probably a better way..
      switch (int) {
        case 1:
          spells.one = 1;
          break;

        case 2:
          spells.one = 1;
          spells.two = 1;
          break;

        case 3:
          spells.one = 1;
          spells.two = 1;
          spells.three = 1;
          break;

        case 4:
           spells.one = 1;
           spells.two = 1;
           spells.three = 1;
           spells.four = 1;
          break;

        case 5:
          spells.one = 2;
          spells.two = 1;
          spells.three = 1;
          spells.four = 1;
          spells.five = 1;
          break;

        case 6:
          spells.one = 2;
          spells.two = 2;
          spells.three = 1;
          spells.four = 1;
          spells.five = 1;
          spells.six = 1;
          break;

        case 7:
          spells.one = 2;
          spells.two = 2;
          spells.three = 2;
          spells.four = 1;
          spells.five = 1;
          spells.six = 1;
          spells.seven = 1;
          break;

        case 8:
          spells.one = 2;
          spells.two = 2;
          spells.three = 2;
          spells.four = 2;
          spells.five = 1;
          spells.six = 1;
          spells.seven = 1;
          spells.eight = 1;
          break;

        case 9:
          spells.one = 3;
          spells.two = 2;
          spells.three = 2;
          spells.four = 2;
          spells.five = 2;
          spells.six = 1;
          spells.seven = 1;
          spells.eight = 1;
          spells.nine = 1;
          break;
      }

      return spells;

    },

    casterDC: function(mod, lvl, feat) {
      var sdc = 10;

      sdc = sdc + mod;
      sdc = sdc + lvl;
      sdc = sdc + feat;

      return sdc;
    },

    casterSetup: function(mod, dc, lvl, bonus) {
      var modifier = document.querySelector('.js-magical-calc-modifier');
      var difficulty = document.querySelector('.js-magical-calc-spell-dc');
      var spell = document.querySelector('.js-magical-calc-spell-lvl');
      var levels = document.querySelector('.js-magical-calc-bonuses');
      var count = 1;

      // clear list
      while (levels.lastChild) {
        levels.removeChild(levels.lastChild);
      }

      modifier.innerHTML = mod;
      difficulty.innerHTML = dc;
      spell.innerHTML = lvl;
      
      Object.keys(bonus).forEach((spells) => {

        var list = document.createElement('li');

        list.classList.add('magical-bonus-spell-item');

        list.innerHTML = '<span class="magical-bonus-spell-lvl">' + parseInt(count++) + '</span> +' + bonus[spells];

        levels.appendChild(list);

      });

    }

  }

  COMBAT.init();

  return COMBAT;

});