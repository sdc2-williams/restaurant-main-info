import React from 'react';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';

import App from './components/App.jsx';

ReactModal.setAppElement('#app');

// entry point for webpack
ReactDOM.render(<App />, document.getElementById('app'));
