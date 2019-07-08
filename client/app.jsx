import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

//entry point for webpack
console.log('loaded');

ReactDOM.render(<App />, document.getElementById('app'));