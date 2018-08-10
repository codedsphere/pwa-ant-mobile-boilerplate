

import React from 'react';
import PropTypes from 'prop-types';
import {
  Router, Switch, Route
} from 'dva/router';
import Dynamic from 'dva/dynamic';
import registerServiceWorker from './registerServiceWorker';
registerServiceWorker();

function RouterConfig({
  history, app
}) {
  const App = Dynamic({
    app,
    // models: () => [
    //   import('./models/index')
    // ],
    component: () => import('./component/App')
  });

  const ErrorPage = Dynamic({
    app,
    component: () => import('./component/Error')
  });

  return (
    <Router history={history}>
        <Switch>
            <Route exact path="/" component={App} />
            <Route exact path="/index" component={App}/>
            <Route exact path="/error" component={ErrorPage}/>
        </Switch>
    </Router>
  );
}

RouterConfig.propTypes = {
  history: PropTypes.object.isRequired
};

export default RouterConfig;