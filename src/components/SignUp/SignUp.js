import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/UserContext';
import './SignUp.css';

const SignUp = () => {
    const { user, createUser } = useContext(AuthContext);
    const [error, setError] = useState(null)
    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;
        if (password.length < 6) {
            setError('Password length should be at lest 6 characters.');
            return;
        } else if (password !== confirm) {
            setError('Password did not matched.');
            return;
        }
        createUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                form.reset();
            })
            .catch(error => console.error(error));
        console.log(email, password, confirm);
    }
    return (
        <div className='form-container'>
            <h2 className='form-title'>Sign Up</h2>
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
                    <label htmlFor="confirm">Confirm Password</label>
                    <input type="password" name="confirm" id="confirm" required />
                </div>
                <p className='text-error'>{error}</p>
                <div className="form-control">
                    <button type="submit" className='btn-submit' >Sign Up</button>
                </div>
                <p className='btn-link-container'><small>Already have an account? <Link to="/login" className='btn-link '>Login</Link></small></p>
                <div className='line-break-container'>
                    <hr className='line-break' />
                    <p>or</p>
                    <hr className='line-break' />
                </div>
            </form>
            <button className='btn-google'><i className="fab fa-google fa-2x"></i> Continue with Google</button>

        </div>
    );
};

export default SignUp;