import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import Layout from './ui/components/layout/Layout/Layout.tsx';
import HomePage from './ui/pages/HomePage/HomePage.tsx';
import BooksPage from './ui/pages/BooksPage/BooksPage';
import BookDetailsPage from './ui/pages/BookDetailsPage/BookDetailsPage';
import AuthorsPage from './ui/pages/AuthorsPage/AuthorsPage';
import AuthorDetailsPage from './ui/pages/AuthorDetailsPage/AuthorDetailsPage';
import CountriesPage from './ui/pages/CountriesPage/CountriesPage';
import CountryDetailsPage from './ui/pages/CountryDetailsPage/CountryDetailsPage';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index element={<HomePage/>}/>
            <Route path='books' element={<BooksPage/>}/>
            <Route path='books/:id' element={<BookDetailsPage/>}/>
            <Route path='authors' element={<AuthorsPage/>}/>
            <Route path='authors/:id' element={<AuthorDetailsPage/>}/>
            <Route path='countries' element={<CountriesPage/>}/>
            <Route path='countries/:id' element={<CountryDetailsPage/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
