document.addEventListener('DOMContentLoaded', function () {

  var COMBAT = {

    init: function() {

      COMBAT.casterSetup();
      COMBAT.attackSetup();

    },

    modifier: function (int) {

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

    casterSetup: function() {
      var attribute = document.querySelector('.js-magic-attribute');
      var spell = document.querySelector('.js-magic-spell-level');
      var feat = 0;
      var feat1 = document.querySelector('.js-magic-focus');
      var feat2 = document.querySelector('.js-magic-greater-focus');
      var feat3 = document.querySelector('.js-magic-elemental');
      var feat4 = document.querySelector('.js-magic-greater-elemental');
      var gnome = document.querySelector('.js-magic-gnome');
      var calc = document.querySelector('.js-magic-calc');

      if (!calc) return;

      calc.addEventListener('click', function () {

        var mod = COMBAT.modifier(parseInt(attribute.value));
        var lvl = parseInt(spell.value);
        var bonus = COMBAT.casterBonus(mod);

        feat = 0;
        if (gnome.checked) feat = feat + 1;
        if (feat1.checked && !feat2.checked) feat = feat + 1;
        if (feat1.checked && feat2.checked) feat = feat + 2;
        if (feat3.checked && !feat4.checked) feat = feat + 1;
        if (feat3.checked && feat4.checked) feat = feat + 2;

        var dc = COMBAT.casterDC(mod, lvl, feat);

        COMBAT.casterCalc(mod, dc, lvl, bonus);

      });

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

    casterCalc: function(mod, dc, lvl, bonus) {
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

    },

    // clean this all up... 4am :s
    attackSetup: function() {
      var attribute = document.querySelector('.js-attack-attribute');
      var bab = document.querySelector('.js-attack-bab');
      var wpn = document.querySelector('.js-attack-weapon');
      var spl = document.querySelector('.js-attack-spells');
      var calc = document.querySelector('.js-attack-calc');

      if (!calc) return;

      calc.addEventListener('click', function () {

        var attacks;
        var atks0;
        var atks1;
        var atks2;
        var atks3;
        var mod = COMBAT.modifier(parseInt(attribute.value));
        var base = parseInt(bab.value);
        var weapon = parseInt(wpn.value);
        var spells = parseInt(spl.value);
        var focus1 = document.querySelector('.js-weapon-focus');
        var focus2 = document.querySelector('.js-greater-weapon-focus');
        if (focus1.checked && !focus2.checked) weapon = weapon + 1;
        if (focus1.checked && focus2.checked) weapon = weapon + 2;

        switch(base) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            atks0 = mod + base + weapon + spells;
            attacks = atks0;
            break;

          case 6:
          case 7:
          case 8:
          case 9:
          case 10:
            atks0 = mod + base + weapon + spells;
            atks1 = (base - 5) + mod + weapon + spells;
            attacks = atks0 + ' / ' + atks1;
            break;

          case 11:
          case 12:
          case 13:
          case 14:
          case 15:
            atks0 = mod + base + weapon + spells;
            atks1 = (base - 5) + mod + weapon + spells;
            atks2 = (base - 10) + mod + weapon + spells;
            attacks = atks0 + ' / ' + atks1 + ' / ' + atks2;
            break;
          
          case 16:
          case 17:
          case 18:
          case 19:
          case 20:
            atks0 = mod + base + weapon + spells;
            atks1 = (base - 5) + mod + weapon + spells;
            atks2 = (base - 10) + mod + weapon + spells;
            atks3 = (base - 15) + mod + weapon + spells;
            attacks = atks0 + ' / ' + atks1 + ' / ' + atks2 + ' / ' + atks3;
            break;

        }

        //
        var modifier = document.querySelector('.js-attack-calc-modifier');
        var attack = document.querySelector('.js-attack-calc-attack');

        modifier.innerHTML = mod;
        attack.innerHTML = attacks;

        var bonus = 0;
        var maneuver = document.querySelector('.js-attack-calc-maneuvers');

        var focus = document.querySelector('.js-weapon-focus');

        var feat1 = document.querySelector('.js-maneuver-bull');
        var feat2 = document.querySelector('.js-maneuver-greater-bull');
        var feat3 = document.querySelector('.js-maneuver-grapple');
        var feat4 = document.querySelector('.js-maneuver-greater-grapple');
        var feat5 = document.querySelector('.js-maneuver-trip');
        var feat6 = document.querySelector('.js-maneuver-greater-trip');

        bonus = 0;
        if (feat1.checked && !feat2.checked) bonus = 2;
        if (feat1.checked && feat2.checked) bonus = 4;
        if (feat3.checked && !feat4.checked) bonus = 2;
        if (feat3.checked && feat4.checked) bonus = 4;
        if (feat5.checked && !feat6.checked) bonus = 2;
        if (feat5.checked && feat6.checked) bonus = 4;

        maneuver.innerHTML = mod + base + weapon + bonus + spells;

      });

    }

  }

  COMBAT.init();

  return COMBAT;

});