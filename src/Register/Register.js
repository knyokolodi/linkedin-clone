import React from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../firebase';
import './Register.css';
import { useHistory, Link } from 'react-router-dom';
import { login } from '../features/userSlice';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  fullName: yup.string().required('Please enter fullname').min(6),
  email: yup.string().required('Please enter email').email(),
  password: yup.string().required('Please enter password').min(6),
});

const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async ({ email, password, fullName }) => {
    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password);

      await user.updateProfile({ displayName: fullName });

      dispatch(
        login({
          fullName: fullName,
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
      <h2>Sign up</h2>
      <p>Stay updated on your professional world</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type='text'
          name='fullName'
          placeholder='Full name'
          ref={register}
          className={errors.fullName ? 'input__error' : ''}
        />
        <span className='error'>{errors.fullName?.message}</span>
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
        <button type='submit'>Agree & join</button>
      </form>
      <p>
        NAlready on LinkedIn?{' '}
        <span>
          <Link className='login__register' to='/'>
            Sign in
          </Link>
        </span>
      </p>
    </div>
  );
};

export default Register;
