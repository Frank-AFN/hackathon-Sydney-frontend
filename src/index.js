import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducer'
import App from './container/App';
import thunk from 'redux-thunk'

const store = createStore(reducer, applyMiddleware(thunk));

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App value={store.getState()}/>
    </Provider>,
    document.getElementById('root')
  );
};

render();
store.subscribe(render);