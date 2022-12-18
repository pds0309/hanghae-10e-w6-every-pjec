import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Post from '../pages/Post';
import PostDetail from '../pages/PostDetail';
import PostUpload from '../pages/PostUpload';
import Profile from '../pages/Profile';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import BookMark from '../pages/BookMark';
import Header from './Header';

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="post" element={<Post />} />
        <Route path="postdetail" element={<PostDetail />} />
        <Route path="postupload" element={<PostUpload />} />
        <Route path="profile" element={<Profile />} />
        <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
        <Route path="bookmark" element={<BookMark />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
