import { async } from '@firebase/util';
import React, { useState } from 'react';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading/Loading';
import './Register.css'

const Register = () => {
    const [agree, setAgree] = useState(false);

    const navigate = useNavigate();

    const handleRegisterFromRegister = () => {
        navigate('/login')
    }

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });

    const [updateProfile, updating, updateError] = useUpdateProfile(auth);

    if (loading || updating) {
        return <Loading></Loading>
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        const displayName = e.target.name.value
        const email = e.target.email.value;
        const password = e.target.password.value;
        /* const agree = e.target.terms.checked; */
        /*  if (agree) { */
        await createUserWithEmailAndPassword(email, password);
        await updateProfile({ displayName });
        alert('Updated profile');
        navigate('/home')
        /* } */
    }

    return (
        <div className='register-form'>
            <h1 style={{ textAlign: 'center' }}>The Registration Page</h1>
            <form onSubmit={handleRegister}>
                <input type="text" name="name" id="" placeholder='Your name' />
                <input type="email" name="email" id="" placeholder='Your email address' required />
                <input type="password" name="password" id="" placeholder='password' required />
                <input onClick={() => setAgree(!agree)} type="checkbox" name="terms" id="terms" />
                <label className={`ps-2 ${agree ? 'text-primary' : 'text-danger'}`} htmlFor="terms">I accept terms and conditions</label>
                <input
                    disabled={!agree}
                    className='w-50 mx-auto btn btn-primary mt-2'
                    type="submit"
                    value="Register" />
            </form>
            <p>Already Have an Account? <Link to='/login' className='text-danger text-decoration-none pe-auto' onClick={handleRegisterFromRegister}>Login</Link></p>
        </div>
    );
};

export default Register;