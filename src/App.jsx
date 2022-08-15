import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import User from './pages/User';
import { UserProvider } from './contexts/userContext';

export default function App() {
    return (
        <>
            <UserProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/signin' element={<Login />} />
                        <Route path='/signup' element={<SignUp />} />
                        <Route path='/user/:id' element={<User />} />
                    </Routes>
                </BrowserRouter>
            </UserProvider>
        </>
    )
}