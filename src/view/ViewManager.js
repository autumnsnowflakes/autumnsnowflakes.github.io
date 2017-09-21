import m from 'mithril'
import Button from './Button'
import Content from './Content'


const init = () => {
  const vwApp = (store, action) => {

    return {
      view: function () {
        return m('#kickstart.flex.flex-row-l.justify-start.transition', {
            class: `${store.isSectionOpen?'overflow-x-hidden open':''} ${action.background()}`,
            oncreate: action.loaderTimer
          },
          Button(store, action),
          Content(store, action)
        )
      }
    }
    return view;
  };
  return vwApp;
}

export default init;