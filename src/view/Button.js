import m from 'mithril';


function init(store, action) {
  return [
    store.isSectionOpen && m('img.fixed.right-0.z-10.pa3', {
      src: 'src/asset/icon/cancel.png',
      onclick:action.closeSection,
      name: 'landing'
    }),
    store.isSectionOpen && [
      m('img.fixed.bottom-0.left-0.z-10.pa3', {
        src: 'src/asset/icon/Previous.png',
        onclick: store.selectedSection ? (store.selectedSection > 1 && m.withAttr('name', action.scrollLandingTo)) : m.withAttr('name', action.scrollLandingTo),
        name: 'prev'

      }),
      m('img.fixed.bottom-0.right-0.z-10.pa3', {
        src: 'src/asset/icon/Next.png',
        onclick: store.selectedSection < 3 && m.withAttr('name', action.scrollLandingTo),
        name: 'next'
      })
    ]
  ]
}


export default init;