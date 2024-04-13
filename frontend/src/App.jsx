import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Feature from "./Feature";
import Home from "./Home";


const App = () => {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/:featureId" element={<Feature/>}/>
        <Route path="/:featureId/comments" element={<Feature/>}/>
      </Routes>
    </>
  )
}
export default App
