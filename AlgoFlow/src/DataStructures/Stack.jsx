import { useState } from "react";
import { motion , AnimatePresence, color } from "framer-motion";

import './Stack.css';


function Stack(){
    const [arraysize, setArraySize] = useState(0);
    const [array, setArray] = useState([]);
    const [InputValue, setInputValue] = useState('');
    const [showArray, setShowarray] = useState(false);
    const [swap, setSwap] = useState([-1,-1]);
    const [compare, setCompare] = useState([-1,-1]);
    const [top, setTop] = useState(-1);

    const handlechange = (e) =>{
        const num = Number(e.target.value);
        setArraySize(num);
    };

    const handleInputchange = (e) => {
        setInputValue(e.target.value);
    };

    const createArray = () => {
        if (InputValue !== '') {
            const rawin = InputValue.split(',');
            const cleanarr = [];

            for(let i = 0; i < rawin.length; i++){
                const trimmed = rawin[i].trim();
                if(trimmed !== ''){
                    cleanarr.push(trimmed);
                }
            }

            const sizedarr =[]
            let lastindex = -1;
            for(let i=0;i<arraysize;i++){
                if(cleanarr[i]){
                    sizedarr.push(cleanarr[i])
                    lastindex = i
                }else{
                    sizedarr.push("")
                }
            }

            setArray(sizedarr);
            setTop(lastindex);
            setShowarray(true);

            setInputValue('');
        }
    };
    
    const cleararray = () =>{
        setArray([]);
        setShowarray(false);
        setInputValue('');
        setArraySize('');
    }

    return (
        <div className="page">
            <h1 className="stack">Stack</h1>
            <input 
                className="stacksize" 
                type="Number" 
                placeholder="enter array size" 
                value={arraysize} 
                onChange={handlechange}
            />
            <input 
                className="stackin" 
                type="text" 
                placeholder="enter array elements with , between them" 
                value={InputValue} 
                onChange={handleInputchange}
            />
            <motion.button 
            className="createbtn" onClick={createArray}>Create</motion.button>
            <motion.button  
            className="clearbtn" onClick={cleararray}>Clear</motion.button>
            <div className="stackvisualization">
                
            { showArray && (
                <AnimatePresence>
                <motion.div className="stackdis"
                initial={{opacity:0}}
                animate={{opacity:1}}
                exit={{opacity:0}}
                transition={{duration:0.4}}
                >
                    {array.map((item, index) => (
                        <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1,duration : 0.5,delay:3}}
                        exit={{ opacity: 0 }} 
                        className="stackbound" key={index}
                        
                        style={{
                            backgroundColor :swap.includes(index) ? "red" : compare.includes(index) ? "yellow" : "#77BEF0"
                        }}
                        >{item}</motion.div>
                    ))}
                </motion.div>
                </AnimatePresence>
            )}
            </div>
<Options arraysize={arraysize} array={array} setArray={setArray} swap={swap} setSwap={setSwap} compare={compare} setCompare={setCompare} top={top} setTop={setTop}/>
        </div>
    );
}




function Options({arraysize ,array,setArray,setSwap,top,setTop}){

    const[Isertinput , Inputset] = useState(0);
    const[error , seterror] = useState(false);
    

    const handle_Insertion_input = (e) =>{
        Inputset(e.target.value)
    };
    
    
    const handle_push=() =>{
        seterror("");
         if (top >= arraysize-1) {
              seterror("Stack Overflow! Cannot push more elements.");
             return;
          }
           if (Isertinput.trim() === "") {
           seterror("Enter a value before pushing!");
            return;
           }
           const newArray = [...array];
           newArray[top+1] = Isertinput;
            setArray(newArray);
            setTop(top+1); 
            Inputset("");
      }

    const handle_pop=() =>{
         seterror("");
        if (top === -1) {
                 seterror("Stack Underflow! Nothing to pop.");
                  return;
        }
       const newArray = [...array];
        newArray[top]="";
          setArray(newArray);
          setTop(top-1);
    };

    const handle_peek= async() =>{
        seterror("");
         if (top === -1) {
              seterror("Stack is empty! Nothing to peek.");
              return;
         }
        setSwap([top])
        await new Promise((resolve) => setTimeout(resolve, 800));
        setSwap([-1, -1]); 
    }

    const handle_Overflow=() =>{
        if (top >= arraysize-1) {
      seterror("Stack Overflow! Maximum size reached.");
    } else {
      seterror("Stack is not full yet.");
    }
    }

    return (
       <div className="stackoperations">
        <nav className="stackoptions">
            <h3>Operations</h3>
        </nav>
        <div>
            <input style={{border:"1px,solid,white", marginLeft:"30px"}} type="Number" value={Isertinput} onChange={handle_Insertion_input}/>
            <button style={{marginLeft:"20px", backgroundColor:"#77BEF0", border:"1px solid #77BEF0",color:"black"}} onClick={handle_push}>Push</button>
            <button style={{marginLeft:"20px",backgroundColor:"#77BEF0", border:"1px solid #77BEF0",color:"black"}} onClick={handle_pop}>Pop</button>
            <button style={{ marginTop:"50px",marginLeft:"20px",backgroundColor:"#77BEF0", border:"1px solid #77BEF0",color:"black"}} onClick={handle_peek}>Peek</button>
            <button style={{marginLeft:"20px",backgroundColor:"#77BEF0", border:"1px solid #77BEF0",color:"black"}} onClick={handle_Overflow}>Overflow</button>
            {error &&(
                <div style={{marginTop:"60px",marginLeft:"30px", backgroundColor:"#F44336", color:"white", height:"30px",width:"600px",borderRadius:"8px", textAlign:"center"}}>
                    {error}
                    </div>
            )}
           </div>
       </div>
    );
}


const Stackst = {
    Stack,
    Options
}
export default Stackst ;
