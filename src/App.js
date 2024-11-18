import logo from './logo.svg';
import nodejs from './nodejs.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import CompShowBlog from './blog/ShowBlogs';
import CompCreateBlog from './blog/CreatePost';
import CompEditPost from './blog/EditPost';

function App() {
  return (
    <div className="App">
      <header className="App-header d-flex flex-row">
        <img src={logo} className="App-logo" alt="logo-reactjs" />
        <p style={{fontSize:"60px", fontWeight:"bold"}} className='mx-4'>+</p>
        <img src={nodejs} width={250} alt="logo-nodejs" />
      </header>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <CompShowBlog/> }/>
          <Route path='/create' element={ <CompCreateBlog/> }/>
          <Route path='/edit/:id' element={ <CompEditPost/> }/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
