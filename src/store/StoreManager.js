const init = function () {
  let store = {};
  store.name = 'mithril';
  store.mode = 'landing'; // landing, project {id:}, resume, contact 

  store.isMobile = function () {
    return window.innerHeight > window.innerWidth;
  };
  store.isTab = function () {
    return window.innerHeight > window.innerWidth;
  };

  return store;
}

export default init;