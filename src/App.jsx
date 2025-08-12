import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./NavBar"
import Body from "./Body"
import Login from "./Login"
import Profile from "./Profile"

function App() {
  return (
    <>
     {/* <Navbar/> */}
     <BrowserRouter>
     <Routes basename="/">
     <Route path="/" element={<Body/>} >
      <Route path="/login" element={<Login/>} />
      <Route path="/profile" element={<Profile/>} />
     </Route>
     </Routes>
     </BrowserRouter>
      {/* <h1 class="text-3xl font-bold">Hello World</h1> */}
    </>
  )
}

export default App
