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

    return m('#content.h-100-l.flex-l.flex-row-l.animated.w-100.w-auto-l', {
        class: `${store.isSectionOpen?'open':''} ${store.isMenuOpen?'slideOutLeft':'fadeIn'}`
      },
      m('div.flex.flex-row.justify-between.w-100.m-auto.transition', {
        class: `${store.mode!=='landing'?'':''}`
      }, ['about', 'work', 'contact'].reduce((obj, item, index) => {
        obj[index] = m(`section.${item}-ns.h-100-l.h-33`, {
            class: `${store.isSectionOpen
                ?store.mode===item
                ?'w-100 active overflow-x-hidden'
                :'w-33-l pa2 w-100'
                :'w-33-l flex-l db flex-column justify-end-l pointer pa2 w-100' 
              }`,
            sectionId: index + 1,
            id: `section-${index+1}`,
            onclick: m.withAttr("sectionId", action.openSection)
          }, m(`.cover.w-100 flex.flex-column.parallax-child items-center`, {
              class: `${store.isSectionOpen
                ? 'justify-center-l pa4 h-50 justify-end':
                'justify-end-l pointer h-100'}`
            },
            m('.pa3.relative.transition-1.tc.flex.flex-column.justify-center.items-center', {
                class: `${store.isSectionOpen?'w-60':'w-60 h-100-l' }`
              },
              m('img.transition.w-25', {
                src: `/src/asset/icon/${item}.svg`,
                class: `${store.mode!=='landing'?'dn':''}`
              }),
              m('.desc.roboto.white-90.pv2.f2.txt-shadow-2', item),
            )
          ),
          store.mode !== 'landing' && m('.w-80.m-auto.animated.fadeInUp.h-75', page(store))
        )


        return obj;
      }, []), )
    )
  }
  const init = (store, action) => {
    return [
      landing(store, action)
    ]
  }
  return init;


})()


// m('div.f4.fw7.w-10.flex.flex-column.justify-center.menu-icon', {
//     onclick: m.withAttr('mode', action.goToState),
//     mode: val,
//     class: `${store.mode!=='landing'?'':'nested-img'}`
//   },
//   m('img.transition', {
//     src: `/src/asset/icon/${val}.svg`,
//     class: `${store.mode!=='landing'?'dn':''}`
//   }),
//   m('span.f4.tc.transition', {
//     class: `${store.mode!=='landing'?'o-1 white fw9':'o-0 color-light-white fw7'}`
//   }, val)
// ));



// return m('.w-100.h-100.flex.flex-column', {
//     class: `${store.mode==='landing'?'active':''}`
//   },
//   m('.f4.fw9.transition.w-60.m-auto.flex.flex-row.justify-center.items-center', {
//       class: `${store.mode!=='landing'?'pb1':'pb7'}`
//     }, m('img.w-10.transition.pv3', {
//       src: '/src/asset/icon/home.svg',
//       alt: 'home',
//       onclick: m.withAttr('name', action.goToState),
//       class: `${store.mode==='landing'?'dn':'o-1'}`,
//       name: 'landing'
//     }),
//     m('span.f2.roboto.fw7.color-light-white', {
//       class: `${store.mode==='landing'?'o-1 pv3':'dn'}`,
//     }, "a writer's block ")),