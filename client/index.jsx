import React from 'react';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';

import MainInfoBar from './components/MainInfoBar.jsx';

ReactModal.setAppElement('#mainbar');

// entry point for webpack
ReactDOM.render(<MainInfoBar />, document.getElementById('mainbar'));
