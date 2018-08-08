

import React from 'react';
import './style/index.css';
import './utils/util';
import MyTabBar from './layout/tabBar';
import PropTypes from 'prop-types';
import {
  Router, Switch, Route, Redirect, HashRouter
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
  const Vistied = Dynamic({
    app,
    component: () => import('./component/Vistied')
  });
  const Money = Dynamic({
    app,
    component: () => import('./component/Money')
  });
  const Product = Dynamic({
    app,
    component: () => import('./component/Product')
  });

  return (
    <HashRouter history={history}>>
        <div>
        <Switch>
            <Route  exact path="/index" component={App}/>
            <Route  exact path="/product" component={Product}/>
            <Route  exact path="/vistied" component={Vistied}/>
            <Route  exact path="/Money" component={Money}/>
            <Route path="/" render={() => {
                return <Redirect to="/index" />
            }} />
        </Switch>
        <MyTabBar></MyTabBar>
        </div>
    </HashRouter>
  );
}

RouterConfig.propTypes = {
  history: PropTypes.object.isRequired
};

export default RouterConfig;