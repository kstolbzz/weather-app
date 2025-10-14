import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import Home from './pages/Home/Home';

import './App.css'

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <Home></Home>
      </div>
    </LocalizationProvider>
  )
}

export default App
