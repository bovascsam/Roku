import logo from './logo.svg';
import './App.css';


import TabPanel from './components/Tabs/tabs';

// Amplify
import Amplify from '@aws-amplify/core';
import APIconfig from '@aws-amplify/auth';
import awsconfig from './aws-exports';
import { useEffect, useState } from 'react';

Amplify.configure(awsconfig);
APIconfig.configure(awsconfig);


function App() {
  // useEffect(()=>{
  //   callpostAPI();
  // })

  return (
    <div className="App">
      <TabPanel/>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload. {response}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <button type='button' onClick={() =>callpostAPI()}>Click</button> */}
    </div>
  );
}

export default App;
