import React from 'react'
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { Login} from './components/login';
import { Register } from './components/register';

export const App = () => {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" Component={Login}/>
            <Route path="/register" Component={Register}/>
        </Routes>
        </BrowserRouter>
    );
}

export default App;