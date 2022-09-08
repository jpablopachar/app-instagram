import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import FirebaseContext from './context/firebase-provider'
import './index.css'
import { firebase, firestore } from './libs/firebase'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <FirebaseContext.Provider value={{ firebase, firestore }}>
        <App/>
      </FirebaseContext.Provider>
    </BrowserRouter>
  </React.StrictMode>
)
