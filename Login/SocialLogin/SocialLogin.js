import React from 'react';
import google from '../../../images/Google-logo-design-clipart-PNG.png'
import facebook from '../../../images/facebook.png'
import github from '../../../images/GitHub-Mark.png'
import './SocialLogin.css'
import auth from '../../../firebase.init';
import { useSignInWithGithub, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';

const SocialLogin = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const [signInWithGithub, user1, loading1, error1] = useSignInWithGithub(auth);
    const navigate = useNavigate();
    let location = useLocation()
    let from = location.state?.from?.pathname || "/";
    let errorMessage;
    if (user || user1) {
        navigate(from, { replace: true });
    }
    if (error || error1) {
        errorMessage = <p className='text-danger text-center'>Error: {error?.message}{error1?.message}</p>
    }
    if (loading || loading1) {
        return <Loading></Loading>
    }
    return (
        <div className='w-50 mx-auto'>
            {
                errorMessage
            }
            <div className='d-flex align-items-center'>
                <div style={{ height: '1px' }} className='bg-primary w-50'></div>
                <p className='mt-2 px-2'>Or,</p>
                <div style={{ height: '1px' }} className='bg-primary w-50'></div>
            </div >
            <div>
                <button
                    onClick={() => signInWithGoogle()}
                    className='btn btn-light w-25 mt-4 buttons d-block mx-auto'><img style={{ width: '30px' }} src={google} alt="" /> Google Sign In</button>
                <button
                    onClick={() => navigate('/home')}
                    className='btn btn-light w-25 mt-4 buttons d-block mx-auto'><img style={{ width: '30px' }} src={facebook} alt="" /> <span className='ms-1'> Facebook</span></button>
                <button
                    onClick={() => signInWithGithub()}
                    className='btn btn-light w-25 mt-4 buttons d-block mx-auto'><img style={{ width: '30px' }} src={github} alt="" /> Github Sign In</button>
            </div>
        </div>
    );
};

export default SocialLogin;