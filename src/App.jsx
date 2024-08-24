
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Home'
import CreatePin from './CreatePin'
import EditPins from './EditPins'


function App() {


  return (
    <>
    <Routes>
      <Route path='/' element = {<Home/>}/>
      <Route path='/create' element = {<CreatePin/>}/>
      <Route path='/edit' element = {<EditPins/>}/>
    
    </Routes>
    </>
  )
}

export default App
