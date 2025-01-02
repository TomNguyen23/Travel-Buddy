import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { Provider } from 'react-redux'
import { store, persistor } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
// import WebSocketProvider from './api/websocketProvider.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* <WebSocketProvider> */}
          <App />
        {/* </WebSocketProvider> */}
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
