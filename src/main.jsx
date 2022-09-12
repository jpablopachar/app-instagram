import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { FirebaseContext } from './context'
import './index.css'
import { firestore } from './libs'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FirebaseContext.Provider value={{ firestore }}>
      <App/>
    </FirebaseContext.Provider>
  </React.StrictMode>
)
