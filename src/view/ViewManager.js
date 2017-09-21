import m from 'mithril'
import Button from './Button'
import Content from './Content'


const init = () => {
  const vwApp = (store, action) => {

    return {
      view: function () {
        return m('#kickstart.flex.flex-row-l.justify-start.transition', {
            class: action.background()
          },
          Button(store, action),
          Content(store, action),

        )

      }
    }
    return view;
  };
  return vwApp;
}

export default init;