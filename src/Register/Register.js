import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../firebase';
import './Register.css';
import { useHistory, Link } from 'react-router-dom';
import { login } from '../features/userSlice';

const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const register = async (e) => {
    e.preventDefault();

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

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { fullName, email, password } = formData;
  return (
    <div className='login'>
      <img src='/linkedIn.png' alt='' />
      <h2>Sign up</h2>
      <p>Stay updated on your professional world</p>
      <form>
        <input
          type='text'
          value={fullName}
          name='fullName'
          placeholder='Full name'
          onChange={onChange}
        />
        <input type='email' value={email} name='email' placeholder='Email' onChange={onChange} />
        <input
          type='password'
          value={password}
          name='password'
          placeholder='Password'
          onChange={onChange}
          autoComplete='on'
        />
        <button type='submit' onClick={register}>
          Agree & join
        </button>
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
