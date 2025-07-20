import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard'
import NewForm from './components/NewForm'
import ListData from './components/ListData'

function App() {

  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/new-form" element={<NewForm />} />
        <Route path="/list-data" element={<ListData />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  
  )
}

export default App
