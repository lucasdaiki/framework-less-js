require('./scss/base.scss');

import Router from './routes/Router';

Router.startup();
Router.go(location.hash);
