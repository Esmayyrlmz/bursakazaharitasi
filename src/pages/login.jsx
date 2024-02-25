import {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('esma@bkh.com');
    const [password, setPassword] = useState('123456');

    const login = () => {
        localStorage.setItem('token', '123456');
        navigate('/');
    };

    const register = () => {
        navigate('/register');
    };

    return (
        <>
            <div className="container">
                <div className="row justify-content-center mt-5">
                    <div className="col-md-6">
                        <h2 className="text-center mb-4">Login</h2>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input
                                value={email}
                                onChange={(val) => setEmail(val.target.value)}
                                type="email" className="form-control" id="email"
                                name="email" required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input value={password}
                                   onChange={(val) => setPassword(val.target.value)}
                                   type="password" className="form-control" id="password"
                                   name="password" required/>
                        </div>
                        <button type="button" onClick={login} className="btn btn-primary">Login</button>
                        <p className="mt-3">Don't have an account? <a onClick={register}>Register</a></p>
                    </div>
                </div>
            </div>
        </>
    )
}
