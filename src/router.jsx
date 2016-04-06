import React from 'react'
import { render } from 'react-dom'
import {browserHistory, Router, Route, Link} from 'react-router'
import HomePage from './lib/components/views/frontpageIndex.jsx'

const routes = ['formManagement', 'flowTable', 'iframeComponent'];

// const childRoutes = routes.map((name) => {
//     return  require(`./views/${name}`)
// })


const childRoutes = routes.map((name) => {
    var pathname = './views/' + name;
    return {
        path: name,
        getComponent: require(`./views/${name}`)
    }
});

const rootRoute = {
    //onEnter: App.onRouteEntry,
    component: 'div',
    childRoutes: [{
        //onEnter: App.onRouteEntry,
        path: '/router',
        component: HomePage,
        childRoutes: childRoutes
    }]
};

render(
    <Router history={browserHistory} routes={rootRoute} />,
    document.getElementById('react-content')
);

