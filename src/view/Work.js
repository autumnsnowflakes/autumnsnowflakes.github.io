import m from 'mithril'

const init = () => {
  return [
    m('.f2.fw9.roboto.mt6.mb3.ttu.roboto#writing.bg-white.pt3', {
      anchorId: 0
    }, 'Writings'),
    m('.f2.fw9.roboto.mt6.mb3.mt4.pt3.ttu.roboto#employment.bg-white', {
      anchorId: 1
    }, 'Employment History'),
    m('.f2.fw9.roboto.mt6.mb3.mt4.pt3.ttu.roboto#social.bg-white', {
      anchorId: 1
    }, 'Social Work'),
  ]
}


export default init