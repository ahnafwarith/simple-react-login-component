import React, { useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import SocialLogin from '../SocialLogin/SocialLogin';
import Loading from '../../Shared/Loading/Loading';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const emailRef = useRef('');
    const passwordRef = useRef('');
    let location = useLocation()
    let from = location.state?.from?.pathname || "/";
    const navigate = useNavigate();
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    const handleSubmit = (e) => {
        e.preventDefault()
        const email = emailRef.current.value;
        const password = passwordRef.current.value
        signInWithEmailAndPassword(email, password)
    }
    let errorMessage;
    if (error) {
        errorMessage = <p className='text-danger text-center'>Error: {error?.message}</p>
    }
    const [sendPasswordResetEmail] = useSendPasswordResetEmail(
        auth
    );
    const resetPassword = async () => {
        const email = emailRef.current.value;
        await sendPasswordResetEmail(email);
        toast('Sent email');
    }

    if (user) {
        navigate(from, { replace: true });
    }

    if (loading) {
        return <Loading></Loading>
    }

    const handleRegisterFromLogin = () => {
        navigate('/register')
    };
    return (
        <div>
            <h1 className='text-center'>The Login Page</h1>
            <Form onSubmit={handleSubmit} className='container w-50 mx-auto'>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control ref={emailRef} type="email" placeholder="Enter email" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control ref={passwordRef} type="password" placeholder="Password" required />
                </Form.Group>
                <Button className='w-50 mx-auto d-block' variant="primary" type="submit">
                    Login
                </Button>
            </Form>
            <p className='text-center'>New to Genius Car Services? <Link to='/register' className='text-danger text-decoration-none pe-auto' onClick={handleRegisterFromLogin}>Register</Link></p>
            <p className='text-center'>Did you forget your password? <button className='btn btn-link text-danger text-decoration-none pe-auto' onClick={resetPassword}>Reset Password</button></p>
            {errorMessage}
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Login;