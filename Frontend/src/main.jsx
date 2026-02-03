import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import App from './App.jsx'
import { persistor, store } from './redux/store.js'
import { Toaster } from 'react-hot-toast'
import { PersistGate } from 'redux-persist/integration/react'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
      <Toaster position='top-right' reverseOrder={false} />
    </PersistGate>
  </Provider>
)
