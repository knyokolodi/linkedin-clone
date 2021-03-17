import { Avatar } from '@material-ui/core';
import React from 'react';
import './HeaderOption.css';

const HeaderOption = ({ Icon, title, avatar, onClick }) => {
  return (
    <div className='headerOption' onClick={onClick}>
      {Icon && <Icon className='headerOption__icon' />}
      <h3 className='headerOption__title'>{title}</h3>
      {avatar && (
        <Avatar src={avatar} className='headerOption__icon'>
          {avatar[0]}
        </Avatar>
      )}
    </div>
  );
};

export default HeaderOption;
