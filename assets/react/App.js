import React from "react";
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom'
import Home from "./views/Home";
import BookList from "./views/BookList";
import AuthorList from './views/AuthorList';
import KindList from './views/KindList';
import AuthorShow from './views/AuthorShow'
import BookShow from './views/BookShow'

function GetId() {
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
        <Route path="/author/">
          <Route path=":id" element={<AuthorShow/>} />
        </Route>
        <Route path="/book/">
          <Route path=":id" element={<BookShow/>} />
        </Route>

        {/* Chemin si jamais la route n'est pas connue */}
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;