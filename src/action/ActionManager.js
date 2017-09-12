import m from 'mithril';

const init = (store) => {

  const prefix = (function prefix() {
    var regex = /^(Webkit|Khtml|Moz|ms|O)(?=[A-Z])/;
    var styleDeclaration = document.body.style;
    for (var prop in styleDeclaration) {
      if (regex.test(prop)) {
        return '-' + prop.match(regex)[0].toLowerCase() + '-';
      }
    }
    // Nothing found so far? Webkit does not enumerate over the CSS properties of the style object.
    // However (prop in style) returns the correct value, so we'll have to test for
    // the precence of a specific property
    if ('WebkitOpacity' in styleDeclaration) {
      return '-webkit-';
    }
    if ('KhtmlOpacity' in styleDeclaration) {
      return '-khtml-';
    }
    return '';
  }());

  const goToState = function (state) {
    store.mode = state;
  };

  const background = function () {
    switch (store.mode) {
      case 'landing':
        return 'dark-navy';
        break;
      case 'about':
        return 'bg-about';
        break;
      case 'work':
        return 'bg-work';
        break;
      case 'contact':
        return 'bg-contact';
        break;

    }
  }

  return {
    goToState,
    background
  };

}

export default init;