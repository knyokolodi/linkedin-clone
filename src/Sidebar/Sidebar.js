import React from 'react';
import { Avatar } from '@material-ui/core';
import './Sidebar.css';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';

const Sidebar = () => {
  const { email, fullName } = useSelector(selectUser);
  const recentItems = (topics) => {
    return (
      <div className='sidebar__recentItem'>
        {topics &&
          topics.map((topic, i) => {
            return (
              <p key={i}>
                <span className='sidebar__hash'>#</span>
                {topic}
              </p>
            );
          })}
      </div>
    );
  };
  return (
    <div className='sidebar'>
      <div className='sidebar__top'>
        <img src={`/splash.jfif`} alt='' />
        <Avatar src='htt' className='sidebar__avatar'>
          {fullName[0]}
        </Avatar>
        <h2>{fullName}</h2>
        <h4>{email}</h4>
      </div>
      <div className='sidebar__stats'>
        <div className='sidebar__stat'>
          <p>Who viewed you</p>
          <p className='sidebar__statNumber'>1,253</p>
        </div>
        <div className='sidebar__stat'>
          <p>Views on post</p>
          <p className='sidebar__statNumber'>1,000</p>
        </div>
      </div>
      <div className='sidebar__bottom'>
        <p>Recent</p>
        {recentItems(['Nodejs', 'Reactjs', 'API Development', 'Software Dev'])}
      </div>
    </div>
  );
};

export default Sidebar;
