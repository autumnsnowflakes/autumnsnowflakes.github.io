import m from 'mithril';

import StoreManager from './store/StoreManager'
import ActionManager from './action/ActionManager'
import ViewManager from './view/ViewManager'




const router = () => {
    let store = StoreManager(),
        action = ActionManager(store),
        view = ViewManager();

    let root = document.body;
    m.mount(root, view(store, action));

    window.store = store;
    window.m = m;
    window.action = action;

}

export default router;