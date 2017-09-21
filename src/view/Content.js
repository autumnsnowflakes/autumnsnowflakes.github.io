import m from 'mithril';

import About from './About';
import Work from './Work';
import Contact from './Contact';

export default (function () {


  function page(store) {
    switch (store.selectedSection) {
      case 1:
        return About();
        break;
      case 2:
        return Work();
        break;
      case 3:
        return Contact();
        break;
    }
  }

  const projectDetail = (store, action, section) => {

    if (store.isSectionOpen) {
      return m('.flex.flex-row.w-100.white.animated.fadeInUp', {
        oncreate: action.startObserver,
        onremove: action.removeObserver,
        class: `${store.getCurrentSection()}-ns`
      }, [
        m('.left-side.w-30.pa4.sticky.dn.db-l',
          m('div.sticky',
            m('.f2.pv3.white.fw9', m.trust(section.title1)),
            m('.pt2.mb5.pb5.white', m.trust(section.detailedDesc)),
            section.menuList.reduce((obj, value, index) => {
              obj[index] = m('.pointer.f3.transition-all.up.pv1.white.roboto', {
                class: `${value.isAnchored?'b transform-up':'normal'}`,
                sectionId: index,
                onclick: function () {
                  action.scrollToAnchor(index, value.href);
                },
                oncreate: function () {
                  action.startObserving(value.href);
                }
              }, value.text);
              return obj;
            }, [])),
        ),
        m('.flex.flex-column.ph6-l.ph3.bg-white.right-side.w-70-l.w-100.bg-white.m-auto.pt2.pb6', page(store, action))
      ])
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
                ?store.selectedSection===index
                ?'w-100 active overflow-x-hidden'
                :'w-33-l'
                :'w-33-l flex-l db flex-column justify-end-l pointer pa2' 
              }`,
            sectionId: index + 1,
            id: `section-${index+1}`,
            onclick: m.withAttr("sectionId", action.openSection)
          }, m(`.cover.w-100 flex.flex-column.parallax-child items-center`, {
              class: `${store.isSectionOpen
                ? 'justify-center-l pa4 h-75 justify-end':
                'justify-end-l pointer h-100'}`
            },
            m('.pa3.relative.transition-1.tc.flex.flex-column.justify-center.items-center', {
                class: `${store.isSectionOpen?'w-60':'w-60 h-100-l' }`
              },
              m('img.transition.w-25', {
                src: `/src/asset/icon/${item}.svg`,
                class: `${store.mode!=='landing'?'dn':''}`
              }),
              m('.roboto.white-90.pv2.txt-shadow-2', {
                class: `${store.isSectionOpen
                ?'f1 fw9 '
              :'desc f3 fw7'}`
              }, item),
            )
          ),
          store.isSectionOpen ?
          store.selectedSection === index + 1 ?
          projectDetail(store, action, store.section.list[index]) :
          '' :
          ''
        )


        return obj;
      }, []), )
    )

  }

  const Loader = function () {
    return m('.overlay-loader.absolute.left-0.right-0.top-0.bottom-0.w-100.h-100.flex.flex-column.justify-center.items-center.z-10', [
      m('div.title.ttu.roboto.fw9.white-90.f1', "Hello, I'm kavya gollamudi"),
      m('div.ttu.roboto.fw9.f2-l.f4.white-80', "A writer")
    ])
  }

  const init = (store, action) => {
    return [
      store.isLoading ?
      Loader(store) :
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