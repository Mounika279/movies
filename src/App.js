import React from 'react';
import Main from './Components/main';
import "./Components/style.css"
import Card from './Components/card';
import SigninPage from './config/signin';

const App = () => {
  return (
    <div>
       <Main/>
       <SigninPage/>
    </div>
  );
};

export default App;
