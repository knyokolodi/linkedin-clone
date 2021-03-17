import React, { useState, useEffect } from 'react';
import './Feed.css';
import CreateIcon from '@material-ui/icons/Create';
import ImageIcon from '@material-ui/icons/Image';
import InputOption from './InputOption';
import CalendarViewDayIcon from '@material-ui/icons/CalendarViewDay';
import EventNoteIcon from '@material-ui/icons/EventNote';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import Post from '../Post/Post';
import { db } from '../firebase';
import firebase from 'firebase';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import FlipMove from 'react-flip-move';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import Widgets from '../Widgets/Widgets';

const Feed = () => {
  const { fullName: name } = useSelector(selectUser);

  const [message, setMessage] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection('posts')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);

  // const getPosts = async () => {
  //   try {
  //     const snapshot = await db.collection('posts').orderBy('timestamp', 'desc').onSnapshot();

  //     setPosts(
  //       snapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         data: doc.data(),
  //       }))
  //     );
  //   } catch (error) {}
  // };

  const sendPost = (e) => {
    e.preventDefault();
    db.collection('posts').add({
      name,
      description: `Shared Date: ${new Date()}`,
      message,
      photoUrl: '',
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setMessage('');
  };

  return (
    <div className='app__outerBody'>
      <Header />
      <div className='app__body'>
        <Sidebar />
        <div className='feed'>
          <div className='feed_inputContainer'>
            <div className='feed__input'>
              <CreateIcon />
              <form>
                <input
                  type='text'
                  value={message}
                  name='message'
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button type='submit' onClick={sendPost}>
                  Send
                </button>
              </form>
            </div>
            <div className='feed__inputOptions'>
              <InputOption Icon={ImageIcon} title='Photo' color='#70B5F9' />
              <InputOption Icon={SubscriptionsIcon} title='Video' color='#e7a33e' />
              <InputOption Icon={EventNoteIcon} title='Event' color='#c0cbcd' />
              <InputOption Icon={CalendarViewDayIcon} title='Write article' color='#7fc15e' />
            </div>
          </div>

          <FlipMove>
            {posts &&
              posts.map(({ id, data: { name, description, message, photoUrl } }) => {
                return <Post key={id} name={name} description={description} message={message} />;
              })}
          </FlipMove>
        </div>
        <Widgets />
      </div>
    </div>
  );
};

export default Feed;
