// loading css here

import './style/app.scss';


import FastClick from 'fastclick';
import PassiveEvents from './util/PassiveEvents'
import router from './router';



new FastClick(document.body);

// starting passive event attachments
// PassiveEvents();


// kickstarting the router
router();
