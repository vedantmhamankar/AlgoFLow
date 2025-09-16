//importing all componenets 
import Maincomp from './components/main';
import Algo from './components/Algo';
import Arraycr from './DataStructures/Array';
import Quiz from './components/Quiz'
import Comp from './components/Login';
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import { Element } from 'react-scroll';
import './App.css'
import Stackst from './DataStructures/Stack';
import QueueCr from './DataStructures/queue';
import TreeCr from './DataStructures/binarytree';


// restriction for not login
function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("user"); // check if logged in
  return isLoggedIn ? children : <Navigate to="/Register" replace />;
}


function App() {
  return(
    <div className='Major'>
      <Router>
        <Routes>
          <Route path="/" element={
            <>
            <Maincomp.Mainmenu/>
            <Element name="section1" className='home'>
            <Maincomp.Corsal/>
            <Algo></Algo>
             <Maincomp.Trybtn/>
            <Maincomp.Login/>
             </Element>
             <Element name="section2"className='section'>
            <Maincomp.DsOption/>
            <Maincomp.Quiz/>
            </Element>
            <Element name="section3"className='aboutweb'>
     <Maincomp.About/>
     </Element>
            </>
          }/>
          <Route path="/quiz" element={
            <ProtectedRoute>
            <Quiz/>
            </ProtectedRoute>
            }></Route>
        <Route path="/array" element={<Arraycr/>}/>
        
        <Route path = "/login" element={<Comp.login/>}/>
        <Route path = "/Register" element={<Comp.Registration/>}/>

        <Route path="/stack" element={
          <ProtectedRoute>
          <Stackst.Stack/></ProtectedRoute>
          } />
          <Route path="/queue" element={
          <ProtectedRoute>
          <QueueCr/></ProtectedRoute>
          } />
           <Route path="/queue" element={
          <ProtectedRoute>
          <TreeCr/></ProtectedRoute>
          } />
      </Routes>
    </Router>  
    </div>
  );
}

export default App;