import m from 'mithril'

const init = () => {
  return [
    m('.f2.fw9.roboto.mt6.mb3.ttu.roboto#basic.bg-white.pt3', {
      anchorId: 0
    }, 'Basic'),
    m('.f2.fw9.roboto.mt6.mb3.mt4.pt3.ttu.roboto#education.bg-white', {
      anchorId: 1
    }, 'Education'),
    m('.f2.fw9.roboto.mt6.mb3.mt4.pt3.ttu.roboto#skills.bg-white', {
      anchorId: 2
    }, 'Skills'),
    m('.f2.fw9.roboto.mt6.mb3.mt4.pt3.ttu.roboto#research.bg-white', {
      anchorId: 3
    }, 'Research'),
  ]
}


export default init