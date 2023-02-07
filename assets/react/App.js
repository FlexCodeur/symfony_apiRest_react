import React from 'react'
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom'
import Home from "./pages/Home";
import BookList from "./pages/BookList";
import AuthorList from './pages/AuthorList';
import KindList from './pages/KindList';
import AuthorShow from './pages/AuthorShow'
import BookShow from './pages/BookShow'
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import Register from './pages/Register'
import RequireAuth from './security/RequireAuth'
import BookNew from './pages/BookNew'

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
          {/*<Route element={<RequireAuth rolesGranted={["ROLE_ADMIN"]} /> }>*/}
          <Route path="/kinds" element={<KindList />} />
          {/*</Route>*/}
          <Route path="/author/:id" element={<AuthorShow />} />
          <Route path="/book/:id" element={<BookShow />} />
          <Route path="/book/new" element={<BookNew />} />
          {/*<Route element={<RequireAuth rolesGranted={["ROLE_ADMIN", "ROLE_EDITOR"]} /> } >*/}
          <Route path={"/book/:id/edit"} />
          {/*</Route>*/}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Chemin si jamais la route n'est pas connue */}
          <Route path="*" element={<NotFound />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;