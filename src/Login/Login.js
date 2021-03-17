import React from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../firebase';
import { login } from '../features/userSlice';
import './Login.css';
import { useHistory, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  email: yup.string().required('Please enter email').email(),
  password: yup.string().required('Please enter password').min(6),
});

const Login = () => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = async ({ email, password }) => {
    try {
      const { user } = await auth.signInWithEmailAndPassword(email, password);
      dispatch(
        login({
          fullName: user.displayName,
          email: user.email,
          uid: user.uid,
        })
      );
      history.push('/feed');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='login'>
      <img src='/linkedIn.png' alt='' />
      <h2>Sign in</h2>
      <p>Stay updated on your professional world</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type='email'
          name='email'
          placeholder='Email'
          ref={register}
          className={errors.email ? 'input__error' : ''}
        />
        <span className='error'>{errors.email?.message}</span>
        <input
          type='password'
          name='password'
          placeholder='Password'
          autoComplete='on'
          ref={register}
          className={errors.email ? 'input__error' : ''}
        />
        <span className='error'>{errors.password?.message}</span>
        <button type='submit'>Sign In</button>
      </form>
      <p>
        New to LinkedIn?{' '}
        <span>
          <Link className='login__register' to='/register'>
            Join now
          </Link>
        </span>
      </p>
    </div>
  );
};

export default Login;
