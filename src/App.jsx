import Login from "./pages/login.jsx";
import {Route, Routes} from "react-router-dom";
import Register from "./pages/register.jsx";
import Dashboard from "./pages/dashboard.jsx";
import Home from "./pages/home.jsx";

export default function App() {
    return (
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/*' element={<p>404</p>}/>
        </Routes>
    )
}
