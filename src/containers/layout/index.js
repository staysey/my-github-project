import React from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Repo from '../repo'

const routes = (
    <BrowserRouter>
       <div>
        <Route path='/' component = {Repo} exact/>
       </div>
    </BrowserRouter>
)

const Layout = () => (
    <div>{routes}</div>
)

export default Layout