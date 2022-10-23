import React, { useState } from 'react'
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom'
import Home from "./views/Home";
import BookList from "./views/BookList";
import AuthorList from './views/AuthorList';
import KindList from './views/KindList';
import AuthorShow from './views/AuthorShow'
import BookShow from './views/BookShow'
import NotFound from './views/NotFound'
import Login from './views/Login'
import Register from './views/Register'
import { AuthToken } from './services/AuthToken'


const GetId = () => {
  const { id } = useParams();

  return { id };
}


const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/authors" element={<AuthorList />} />
          <Route path="/kinds" element={<KindList />} />
          <Route path="/author/:id" element={<AuthorShow/>} />
          <Route path="/book/:id" element={<BookShow/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Chemin si jamais la route n'est pas connue */}
          <Route path="*" element={<NotFound />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;