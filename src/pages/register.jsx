import {useNavigate} from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();

    const login = () => {
        navigate('/login');
    };

    return (
        <>
            <div className="container">
                <div className="row justify-content-center mt-5">
                    <div className="col-md-6">
                        <h2 className="text-center mb-4">Register</h2>
                        <form id="registerForm">
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input type="email" className="form-control" id="email" name="email" required/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="password" name="password" required/>
                            </div>
                            <button type="submit" className="btn btn-primary">Register</button>
                        </form>
                        <p className="mt-3">Already have an account? <a onClick={login}>Login</a></p>
                    </div>
                </div>
            </div>
        </>
    )
}
