// Author : vedant Mhamankar 
// PRoject : AlgoFlow 
// TYBsc.IT Rollno. : 855 

import './menu.css'
import img1 from '../assets/array.jpg'
import img2 from '../assets/linkedlist.jpg'
import img3 from '../assets/stack.jpg'
import img4 from '../assets/trees.jpg'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { Link } from 'react-router-dom'
import { Link as ScrollLink } from 'react-scroll'

// navbar
function Mainmenu() {
    return (
        <div className="Mainmenu">
            <h3>
  <ScrollLink to="section1" smooth={true} duration={500} offset={-700}className="home" style={{color:'black'}}>
    Home
  </ScrollLink>
</h3>

<h3>
  <ScrollLink to="section2" smooth={true} duration={500} className="feature" style={{color:'black'}}>
    Visualization
  </ScrollLink>
</h3>

<h3>
  <ScrollLink to="section3" smooth={true} duration={500} className="info" style={{color:'black'}}>
    About
  </ScrollLink>
</h3>
        </div>
    );
}

// login and register 
function Login(){
    return(
        <div className='login'>
            <motion.button className='logbtn'
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            ><Link to="/login" style={{ textDecoration: "none", color: "inherit" }}>
                Log in</Link></motion.button>
            <motion.button className='signbtn'
            whileHover={{ scale: 1.1 }}
           whileTap = {{scale : 0.95}}
            ><Link to="/Register" style={{ textDecoration: "none", color: "inherit" }}>
                Register</Link></motion.button></div>
    )}
function Quiz(){
    return(
        <div className='quiz'>
            <p>Attempt quiz based on dsa topics like Array , Linked List, Queue, Binary Tree, Heap etc.</p>
            <Link to="/quiz">
            <button > Attempt Quiz</button>
            </Link></div>
    );}

//image Corsal
function Corsal(){
    const images = [img1,img2,img3,img4]
    const bg = ['#A3DC9A','#9929EA','#77BEF0','#fe7743']
    const [slider , setslider] = useState(0);
    useEffect ((slider) => {
        const interval = setInterval(()=>{
            setslider((prev) => (prev === images.length -1 ? 0 : prev +1))
        },3000)
        return () => clearInterval(interval)
    },[images.length])
    return (
        <div className='corsal'>
            <AnimatePresence mode="wait">
        <motion.img
          key={slider} 
          src={images[slider]}
          className="absolute w-full h-full object-cover rounded-xl"
          style={{
            boxShadow: `0px 4px 30px ${bg[slider]}`,}}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        /></AnimatePresence></div>
    );}

function Trybtn(){
    return(
        <div className='trybtn'>
           <motion.button
    className='start'
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
>
    <ScrollLink 
        to="section2" 
        smooth={true} 
        duration={500}
        offset={-70}
        style={{ color: 'black', textDecoration: 'none', cursor: 'pointer' }}
    >
        Start Learning
    </ScrollLink>
</motion.button>
            <motion.button
            className='try'
            whileHover={{scale:1.1}}
            whileTap={{scale:0.95}}
            style={{
              border:"1px solid white"
            }}
            ><Link to="/array" color='white' textDecoration="none">Try Without Login</Link></motion.button>
            </div>
    )
}

function DsOption(){
    return(
        <motion.div className='DsOptions'>
            <motion.h2>Data Structure</motion.h2>
            <ul>
                 <li><Link to="/array">Array</Link></li>
               <li><Link to="/stack">Stack</Link></li>
                <li><Link to="/queue">Queue</Link></li>
             <li><Link to="/tree">Tree</Link></li>
          </ul>
        </motion.div>
    );
}
function About(){
    return(
        <div className='about'>
        <h2>About us</h2>
        <p>DSA Visualizer is a third-year project created with the goal of making the learning of 
        Data Structures and Algorithms (DSA) easier and more interactive for students. Many learners find it 
        difficult to understand DSA concepts through theory alone, so our project provides a platform where 
        students can visualize the working of various algorithms and data structures step by step. By combining
        interactive visualizations, quizzes, and practical examples, we aim to bridge the gap between theory and
        practice, helping students build stronger problem-solving skills and a deeper understanding of core 
        computer science concepts. Our motive is to make DSA learning simple, engaging, and effective
        , ensuring that students gain both clarity and confidence in this important subject.</p>
        </div>
    )
}



const Maincomp = {
    Mainmenu,
    Corsal,
    Login,
    Trybtn,
    About,
    DsOption,
    Quiz
}
export default Maincomp ;