import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./views/home";
import BookList from "./views/bookList";
import AuthorList from './views/authorList';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/authors" element={<AuthorList />} />
        {/* Chemin si jamais la route n'est pas connue */}
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;