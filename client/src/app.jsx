import React from 'react'
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { Login} from './components/login/login';
import { Register } from './components/login/register';
import { ProfileForm } from './components/profileForm';
import { Navbar } from './components/ui/navBar';
import { EventManagementForm } from './components/eventSearch';
import { Welcome} from './components/welcome';
import {ResetLogin} from './components/login/forgotPassword';
import {VolunteerMatchingForm} from './components/volunteerMatchingForm'
import UserDashboard from './components/userDashboard';
import EventsCatalog from './components/eventsCatalog';
import { VolunteerHistory } from './components/volunteerHistory';
import { VolunteerHistoryAdmin} from './components/volunteerHistoryAdmin';
import { Outlet } from 'react-router-dom';

const Layout = () => (
    <>
      <Navbar />
      <Outlet /> 
    </>
  );

export const App = () => {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" Component={Welcome}/>
            <Route path="/login" Component={Login}/>
            <Route path="/reset" Component={ResetLogin}/>
            <Route path="/register" Component={Register}/>
            <Route path = "/" Component = {Layout}>
                <Route path = "/profileForm" Component = {ProfileForm}/>
                <Route path = "/eventManagement" Component = {EventManagementForm}/>
                <Route path="/volunteerMatchingForm" Component={VolunteerMatchingForm}/>
                <Route path="/userDashboard" Component={UserDashboard}/>
                <Route path="/events" Component={EventsCatalog}/>
                <Route path = "/volunteerHistory/:id" Component = {VolunteerHistory}/>
                <Route path = "/volunteerHistoryAdmin" Component = {VolunteerHistoryAdmin}/>
            </Route>
        </Routes>
        </BrowserRouter>
    );
}

export default App;