import React from 'react';
import ReactDOM from 'react-dom';

import SignupForm from './components/SignupForm.js';

import './styles.css';

function App() {
  return (
    <div className="App">
      <h1>Custom Hooks are Magic 🧙‍♂️</h1>
      <SignupForm />
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
