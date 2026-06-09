import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import { AuthProvider } from './context/AuthContext';
import Layout from './ui/components/layout/Layout/Layout.tsx';
import HomePage from './ui/pages/HomePage/HomePage.tsx';
import BooksPage from './ui/pages/BooksPage/BooksPage';
import BookDetailsPage from './ui/pages/BookDetailsPage/BookDetailsPage';
import AuthorsPage from './ui/pages/AuthorsPage/AuthorsPage';
import AuthorDetailsPage from './ui/pages/AuthorDetailsPage/AuthorDetailsPage';
import CountriesPage from './ui/pages/CountriesPage/CountriesPage';
import CountryDetailsPage from './ui/pages/CountryDetailsPage/CountryDetailsPage';
import LoginPage from './ui/pages/auth/LoginPage/LoginPage.tsx';
import RegisterPage from './ui/pages/auth/RegisterPage/RegisterPage.tsx';
import ProtectedRoute from './ui/components/routing/ProtectedRoute/ProtectedRoute.tsx';
import AuthLogsPage from "./ui/pages/auth/AuthLogsPage/AuthLogPage.tsx";

function App() {
  return (
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/register' element={<RegisterPage/>}/>
            <Route path='/' element={<Layout/>}>
              <Route index element={<HomePage/>}/>
              <Route element={<ProtectedRoute/>}>
                <Route path='books' element={<BooksPage/>}/>
                <Route path='books/:id' element={<BookDetailsPage/>}/>
                <Route path='authors' element={<AuthorsPage/>}/>
                <Route path='authors/:id' element={<AuthorDetailsPage/>}/>
                <Route path='countries' element={<CountriesPage/>}/>
                <Route path='countries/:id' element={<CountryDetailsPage/>}/>
                <Route path='logs' element={<AuthLogsPage/>}/>
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
  );
}

export default App;
