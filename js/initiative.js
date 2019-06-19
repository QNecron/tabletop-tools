document.addEventListener('DOMContentLoaded', function () {
  var submit = document.querySelector('.js-init-submit');

  if (!submit) return; 

  submit.addEventListener('click', function () {
    var inputs = document.querySelectorAll('.js-init');
    var output = document.querySelector('.js-init-list');
    var array = [];

    for (var i = 0; i < inputs.length; i++) {
      var text = inputs[i].querySelector('.js-init-name').value;
      var numb = inputs[i].querySelector('.js-init-order').value;
      // note: need to re-look at this, it's adding blank objects if input is empty
      array = array.concat({ name: text, value: numb });
    }

    array.sort(function (a, b) {
      return b.value - a.value;
    });

    while (output.lastChild) {
      output.removeChild(output.lastChild);
    }

    for (var i = 0; i < array.length; i++) {

      if (array[i].value != '' && array[i].name != '') {
        var li = document.createElement('li');
        li.classList.add('init-list-item');
        li.innerHTML = '<span class="init-roll">' + array[i].value + '</span><span class="init-name">' + array[i].name + '</span>';
        output.appendChild(li);
      }

    }

  });

});