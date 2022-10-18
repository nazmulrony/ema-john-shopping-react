import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/UserContext';
import './Login.css'

const Login = () => {
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location);
    const from = location.state?.from?.pathname || '/'
    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        signIn(email, password)
            .then(result => {
                const user = result.user;
                form.reset();
                console.log(user);
                navigate(from, { replace: true });
            })
            .catch(error => console.error(error))
    }
    return (
        <div className='form-container'>
            <h2 className='form-title'>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" required />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" required />
                </div>
                <div className="form-control">
                    <button type="submit" className='btn-submit' >Login</button>
                </div>
                <p className='btn-link-container'><small>New to Ema John? <Link to="/signup" className='btn-link '>Create New Account</Link></small></p>
                <div className='line-break-container'>
                    <hr className='line-break' />
                    <p>or</p>
                    <hr className='line-break' />
                </div>
                <div>

                </div>
            </form >
            <button className='btn-google'><i className="fab fa-google fa-2x"></i> Continue with Google</button>

        </div >
    );
};

export default Login;