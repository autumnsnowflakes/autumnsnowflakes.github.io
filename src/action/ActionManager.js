import m from 'mithril';
import KUTE from 'kute.js';
import RAF from './../util/RAF'


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
    if (state === 'landing') {
      store.isSectionOption = false;
    } else {
      store.isSectionOption = true;
    }
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

  const openSection = function (id) {
    if (!store.isSectionOpen) {
      let self = this;
      let parent = self.parentNode;
      let superParent = parent.parentNode;
      let offsetLeft = self.offsetLeft;
      let scrollLeft = superParent.scrollLeft;
      let superParentWidth = superParent.offsetWidth;


      // let to = -1 * offsetLeft + scrollLeft;
      let to = ((id - 1) * self.offsetWidth) - scrollLeft;

      // console.log(to);
      // setting store values
      let {
        section
      } = store;
      store.selectedSection = section.id = parseInt(id);
      section.prevSectionPosition = superParent.scrollLeft;
      section.prevSectionWidth = self.offsetWidth;
      section.superParentWidth = superParentWidth
      KUTE.fromTo(`#section-${id}`, {
        width: section.prevSectionWidth
      }, {
        width: superParentWidth
      }, {
        duration: 300,
        easing: 'easeOutSine',
        complete: () => {

          KUTE.to('#content', {
            translateX: -to
          }, {
            duration: 250,
            easing: 'easeOutSine'
          }).start();
        }
      }).start();


      setTimeout(() => {
        store.isSectionOpen = true;
        m.redraw();
      }, 200);

    }
  }


  const scrollLandingTo = function (mode) {

    if (store.isSectionOpen) {
      document.getElementById(`section-${store.selectedSection}`).style.width = `${store.section.prevSectionWidth}px`;

      [1, 2, 3].map(function (i, v) {
        document.getElementById(`section-${i}`).scrollTop = 0
      });

      if (mode === 'next') {
        store.selectedSection++;
        document.getElementById('content').style.transform = `translateX(${-(store.selectedSection-1)*store.section.prevSectionWidth+document.getElementById('kickstart').scrollLeft}px)`; // Multiplied by 40
      } else {
        store.selectedSection--;
        document.getElementById('content').style.transform = `translateX(${-(store.selectedSection-1)*store.section.prevSectionWidth+document.getElementById('kickstart').scrollLeft}px)`; // Multiplied by 40
      }
      document.getElementById(`section-${store.selectedSection}`).style.width = `${store.section.superParentWidth}px`


      // openSection(store.selectedSection);
    } else {
      if (mode === 'next') {
        RAF.scrollToX('kickstart', document.getElementById('kickstart').scrollLeft + document.getElementById('section-1').offsetWidth, 2000);

        // document.getElementyId('kickstart').scrollLeft += document.getElementById('section-1').offsetWidth;

      } else {
        RAF.scrollToX('kickstart', document.getElementById('kickstart').scrollLeft - document.getElementById('section-1').offsetWidth, 2000);

        // document.getElementById('kickstart').scrollLeft -= document.getElementById('section-1').offsetWidth;
      }
    }
  }

  const closeSection = function () {
    let section = store.section;
    let {
      prevSectionPosition,
      prevSectionWidth,
      id
    } = section;

    KUTE.fromTo('#content', {
      translateX: section.prevSectionPosition
    }, {
      translateX: 0
    }, {
      easing: 'easeInSine',
      duration: 250,
      complete: () => {
        if (store.mode === 'landing') {
          KUTE.fromTo(`#section-${store.selectedSection}`, {
            width: prevSectionPosition
          }, {
            width: prevSectionWidth
          }, {
            easing: 'easeInSine',
            duration: 250,
            complete: function () {

            }
          }).start();
        }

      }
    }).start();

    store.isSectionOpen = false;
  }

  const navAnchor = function (d) {
    let dir = d == 'up' && true;

    // when up && e>1, focus menu item
    // when down && e<1 hide menu item
    return function (e, v) {
      console.log(dir, e[0].target.id);
      console.info(e[0].intersectionRatio);
      let sectionId = parseInt(e[e.length - 1].target.getAttribute('anchorId'));

      if (e[e.length - 1].intersectionRatio) {
        store.section.list[store.selectedSection - 1].menuList = store.section.list[store.selectedSection - 1].menuList.map((value, i) => {
          if (i <= sectionId) {
            value.isAnchored = true;
          } else {
            value.isAnchored = false;
          }
          return value;
        });
      }
      m.redraw();

    }
  }

  const startObserver = function () {

    store.observer = new IntersectionObserver(navAnchor('down'), {
      root: document.querySelector('#kickstart'),
      rootMargin: "60px 0px 0px 0px"
    })
  };

  const removeObserver = function () {
    store.observer.disconnect()
  };

  const startObserving = function (id) {
    console.log(id);
    store.observer.observe(document.querySelector(id))
  }




  return {
    goToState,
    background,
    openSection,
    scrollLandingTo,
    closeSection,
    startObserver,
    removeObserver,
    startObserving,
  };

}

export default init;