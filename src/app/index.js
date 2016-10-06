import React from "react";
import {render} from "react-dom";

import App from "./components/App"

import { createStore, combineReducers, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import {Provider} from 'react-redux'

const mathReducer = (state = {
  result: 1,
  lastValues: []
}, action) => {
  switch(action.type) {
    case "ADD":
      state = {
        ...state,
        result: state.result + action.payload,
        lastValues: [...state.lastValues, action.payload]
      }
      break
    case "SUBTRACT":
      state = {
        ...state,
        result: state.result - action.payload,
        lastValues: [...state.lastValues, action.payload]
      }
      break
  }
  return state
}

const userReducer = (state = {
  username: 'john',
  password: 'weaksauce',
  age: 20
}, action) => {
  switch(action.type) {
    case "SET_NAME":
      state = {
        ...state,
        username: action.payload
      }
      break
    case "SET_AGE":
      state = {
        ...state,
        age: action.payload
      }
      break
  }
  return state
}
const myLogger = store => next => action => {
  console.log('Logged action: ', action)
  next(action)
}

const store = createStore(
  combineReducers({mathReducer, userReducer}),
  {},
  applyMiddleware(logger())
)

store.subscribe(() => {
  // console.log('store updated!', store.getState())
})

render(
  <Provider store={store}>
    <App />
  </Provider>
  , window.document.getElementById('app'));
