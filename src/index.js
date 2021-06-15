import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
      <Button variant="contained" color="primary">
          Hello World
      </Button>
  </React.StrictMode>,
  document.getElementById('root')
);
