import m from 'mithril';

export default (function () {

  const about = (store) => {
    console.log('about');
    return m('div', 'abour');
  }

  const work = (store) => {
    return m('div', 'work');
  }

  const contact = (store) => {
    return m('div', 'contact');
  }

  function page(store) {
    switch (store.mode) {
      case 'about':
        return about(store);
        break;
      case 'work':
        return work(store);
        break;
      case 'contact':
        return contact(store);
        break;
    }
  }
  const landing = function (store, action) {
    return m('.w-100.h-100.flex.flex-column', {
        class: `${store.mode==='landing'?'active':''}`
      },
      m('.f4.fw9.transition.w-60.m-auto.flex.flex-row.justify-center.items-center', {
          class: `${store.mode!=='landing'?'pb1':'pb7'}`
        }, m('img.w-10.transition.pv3', {
          src: '/src/asset/icons/home.svg',
          alt: 'home',
          onclick: m.withAttr('name', action.goToState),
          class: `${store.mode==='landing'?'dn':'o-1'}`,
          name: 'landing'
        }),
        m('span.f2.roboto.fw7.color-light-white', {
          class: `${store.mode==='landing'?'o-1 pv3':'dn'}`,
        }, "a writer's block ")),
      m('div.flex.flex-row.justify-between.w-60.m-auto.transition', {
        class: `${store.mode!=='landing'?'pb3':'pb5 pt3'}`
      }, [

        ['about', 'work', 'contact'].reduce((obj, val) => {
          obj.push(m('div.f4.fw7.w-10.flex.flex-column.justify-center.menu-icon', {
              onclick: m.withAttr('mode', action.goToState),
              mode: val,
              class: `${store.mode!=='landing'?'':'nested-img'}`
            },
            m('img.transition', {
              src: `/src/asset/icons/${val}.svg`,
              class: `${store.mode!=='landing'?'dn':''}`
            }),
            m('span.f4.tc.transition', {
              class: `${store.mode!=='landing'?'o-1 white fw9':'o-0 color-light-white fw7'}`
            }, val)
          ));
          return obj;
        }, []),
      ]),
      store.mode !== 'landing' && m('.w-80.m-auto.animated.fadeInUp.h-75.shadow-1', page(store))
    );
  }
  const init = (store, action) => {
    return [
      landing(store, action)
    ]
  }
  return init;

})()