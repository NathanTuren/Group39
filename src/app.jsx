import React from 'react'
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { Login} from './components/login';
import { Register } from './components/register';
import { ProfileForm } from './components/profileForm';
import { EventManagementForm } from './components/eventSearch';
import { Welcome} from './components/welcome';
import {ResetLogin} from './components/forgotPassword';

export const App = () => {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" Component={Welcome}/>
            <Route path="/login" Component={Login}/>
            <Route path="/reset" Component={ResetLogin}/>
            <Route path="/register" Component={Register}/>
            <Route path = "/profileForm" Component = {ProfileForm}/>
            <Route path = "/event" Component = {EventManagementForm}/>
        </Routes>
        </BrowserRouter>
    );
}

export default App;