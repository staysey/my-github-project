import './main.css'
import './adaptive.css'
import './pagination.css'
import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, applyMiddleware} from 'redux'
import {createBrowserHistory} from 'history'
import thunk from 'redux-thunk'  //для асинхронных функций
import {routerMiddleware, ConnectedRouter} from 'connected-react-router'
import {composeWithDevTools} from 'redux-devtools-extension'
import {Provider} from 'react-redux'

import createRootReducer from './reducers/index'
import Layout from './containers/layout'

const history = createBrowserHistory()
const middlewares = [thunk, routerMiddleware(history)] //все функции между экшеном и редьюсером
const store = createStore(
    createRootReducer(history),
    composeWithDevTools(applyMiddleware(...middlewares)) //применить все middlewares по очереди
)
//ConnectedRouter обновляет историю при изменении маршрута
ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history = {history}>
            <Layout />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
)