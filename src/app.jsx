import React from 'react'
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { Login} from './components/login';
import { Register } from './components/register';
import { ProfileForm } from './components/profileForm';
import { EventManagementForm } from './components/eventSearch';

export const App = () => {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" Component={Login}/>
            <Route path="/register" Component={Register}/>
            <Route path = "/profileForm" Component = {ProfileForm}/>
            <Route path = "/event" Component = {EventManagementForm}/>
        </Routes>
        </BrowserRouter>
    );
}

export default App;