import React from 'react';
import './Widgets.css';
import InfoIcon from '@material-ui/icons/Info';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const articlesData = [
  {
    heading: 'React is awesome',
    subtitle: 'This is a subtitle',
  },
  {
    heading: 'React is awesome',
    subtitle: 'This is a subtitle',
  },
  {
    heading: 'React is awesome',
    subtitle: 'This is a subtitle',
  },
  {
    heading: 'React is awesome',
    subtitle: 'This is a subtitle',
  },
];

const newsArticle = (articles) => {
  return (
    <>
      {articles &&
        articles.map((article, i) => {
          const { heading, subtitle } = article;
          return (
            <div className='widgets__article'>
              <div className='widgets__articleLeft'>
                {' '}
                <FiberManualRecordIcon />
              </div>
              <div className='widgets__articleRight'>
                <h4>{heading}</h4>
                <p>{subtitle}</p>
              </div>
            </div>
          );
        })}
    </>
  );
};

const Widgets = () => {
  return (
    <div className='widgets'>
      <div className='widgets__header'>
        <h2>LinkedIn News</h2>
        <InfoIcon />
      </div>
      {newsArticle(articlesData)}
    </div>
  );
};

export default Widgets;
