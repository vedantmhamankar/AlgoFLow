import { useState } from "react";
import { motion , AnimatePresence } from "framer-motion";

import './queue.css';


function QueueCr() {
    const [arraysize, setArraySize] = useState(0);
    const [array, setArray] = useState([]);
    const [InputValue, setInputValue] = useState("");
    const [showArray, setShowarray] = useState(false);
    const [swap, setSwap] = useState([-1, -1]);
    const [compare, setCompare] = useState([-1, -1]);

    // input size change
    const handlechange = (e) => {
        const num = Number(e.target.value);
        setArraySize(num);
    };

    // input array change
    const handleInputchange = (e) => {
        setInputValue(e.target.value);
    };

    // create queue
    const createArray = () => {
        if (InputValue.trim() !== "") {
            const rawin = InputValue.split(",");
            const cleanarr = [];

            for (let i = 0; i < rawin.length; i++) {
                const trimmed = rawin[i].trim();
                if (trimmed !== "") {
                    cleanarr.push(trimmed);
                }
            }

            const sizedarr = [];
            for (let i = 0; i < arraysize; i++) {
                if (cleanarr[i]) {
                    sizedarr.push(cleanarr[i]);
                } else {
                    sizedarr.push("");
                }
            }

            setArray(sizedarr);
            setShowarray(true);
            setInputValue("");
        }
    };

    // clear queue
    const cleararray = () => {
        setArray([]);
        setShowarray(false);
        setInputValue("");
        setArraySize("");
    };

    return (
        <div className="page">
            <h1 className="queue">Queue</h1>
            <input
                className="queuesize"
                type="text"
                placeholder="enter queue size"
                value={arraysize}
                onChange={handlechange}
            />
            <input
                className="queuein"
                type="Number"
                placeholder="enter initial elements with , between them"
                value={InputValue}
                onChange={handleInputchange}
            />
            <motion.button className="createbtn" onClick={createArray}>
                Create
            </motion.button>
            <motion.button className="clearbtn" onClick={cleararray}>
                Clear
            </motion.button>

            <div className="queuevisualization">
                {showArray && (
                    <AnimatePresence>
                        <motion.div
                            className="queuedis"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            {array.map((item, index) => (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1, duration: 0.5, delay: 3 }}
                                    exit={{ opacity: 0 }}
                                    className="queuebound"
                                    key={index}
                                    style={{
                                        backgroundColor: swap.includes(index)
                                            ? "red"
                                            : compare.includes(index)
                                            ? "yellow"
                                            : "#fe7743",
                                    }}
                                >
                                    {item}
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                )}
            </div>

            {/* pass queue props */}
            <Options arraysize={arraysize} array={array} setArray={setArray} />
        </div>
    );
}



function Options({arraysize ,array,setArray}){

    const[selecttab , selectingtab] = useState("Enqueue");
    const operation = ["Enqueue","Dequeue","Front","Rear","isFull","isEmpty"];
    const[Isertinput , Inputset] = useState("");
    const[message , setMessage] = useState("");

    const handleInput = (e) =>{
        Inputset(e.target.value);
    };

    const EnqueueOp = () =>{
        const newArray = [...array];
        const index = newArray.findIndex(v => v === "");
        if(index === -1){
            setMessage("Queue is Full");
        }else{
            newArray[index] = Isertinput;
            setArray(newArray);
            setMessage(`Enqueued: ${Isertinput}`);
        }
        Inputset("");
    };

    const DequeueOp = () =>{
        const newArray = [...array];
        if(newArray.every(v => v === "")){
            setMessage("Queue is Empty");
        }else{
            const removed = newArray[0];
            for(let i=0;i<arraysize-1;i++){
                newArray[i] = newArray[i+1];
            }
            newArray[arraysize-1] = "";
            setArray(newArray);
            setMessage(`Dequeued: ${removed}`);
        }
    };

    const FrontOp = () =>{
        if(array.every(v => v === "")){
            setMessage("Queue is Empty");
        }else{
            const front = array.find(v => v !== "");
            setMessage(`Front: ${front}`);
        }
    };

    const RearOp = () =>{
        if(array.every(v => v === "")){
            setMessage("Queue is Empty");
        }else{
            const rear = [...array].reverse().find(v => v !== "");
            setMessage(`Rear: ${rear}`);
        }
    };

    const isFullOp = () =>{
        if(array.every(v => v !== "")){
            setMessage("Queue is Full");
        }else{
            setMessage("Queue is not Full");
        }
    };

    const isEmptyOp = () =>{
        if(array.every(v => v === "")){
            setMessage("Queue is Empty");
        }else{
            setMessage("Queue is not Empty");
        }
    };

    return (
       <div className="operations">
        <nav className="options">
            <ul>
                {operation.map((op)=>( 
                    <li key = {op}
                    onClick={()=>selectingtab(op)}
                    style={{
                        display:"inline",
                        cursor:"pointer",
                        paddingLeft: "150px",
                        fontWeight : selecttab === op ? "bold" : "normal",
                        color : selecttab === op ? " #fe7743" : "white"
                    }}
                    >{op}</li>
                ))}           
            </ul>
        </nav>
        <div>
            <AnimatePresence mode="wait">
           {selecttab === "Enqueue" && (
            <motion.div className="Enqueue"
            key="Enqueue"
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}}
            transition={{duration:0.4}}
            >
                <label style={{paddingLeft:"40px", fontWeight:"normal"}}>Enter number :</label>
                <input style={{border:"1px solid white", marginLeft:"30px"}} type="Number" value={Isertinput} onChange={handleInput}/>
                <button 
                 style={{
                     marginTop: "20px",
                     border: "1px solid #fe7743", 
                     marginLeft: "40px",
                     color: "black",
                     backgroundColor: "#fe7743"
                 }} 
                 onClick={EnqueueOp}>Perform
                 </button>
            </motion.div>
           )}
           {selecttab === "Dequeue" && (
            <motion.div className="Dequeue"
            key="Dequeue"
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}}
            transition={{duration:0.4}}
            >
                <button style={{marginTop:"20px",border:"1px solid #fe7743", marginLeft:"40px",color:"black",backgroundColor:"#fe7743"}} onClick={DequeueOp}>Perform</button>
            </motion.div>
           )}
           {selecttab === "Front" && (
            <motion.div className="Front"
            key="Front"
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}}
            transition={{duration:0.4}}
            >
                <button style={{marginTop:"20px",border:"1px solid #fe7743", marginLeft:"40px",color:"black",backgroundColor:"#fe7743"}} onClick={FrontOp}>Get Front</button>
            </motion.div>
           )}
           {selecttab === "Rear" && (
            <motion.div className="Rear"
            key="Rear"
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}}
            transition={{duration:0.4}}
            >
                <button style={{marginTop:"20px",border:"1px solid #fe7743", marginLeft:"40px",color:"black",backgroundColor:"#fe7743"}} onClick={RearOp}>Get Rear</button>
            </motion.div>
           )}
           {selecttab === "isFull" && (
            <motion.div className="isFull"
            key="isFull"
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}}
            transition={{duration:0.4}}
            >
                <button style={{marginTop:"20px",border:"1px solid #fe7743", marginLeft:"40px",color:"black",backgroundColor:"#fe7743"}} onClick={isFullOp}>Check isFull</button>
            </motion.div>
           )}
           {selecttab === "isEmpty" && (
            <motion.div className="isEmpty"
            key="isEmpty"
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}}
            transition={{duration:0.4}}
            >
                <button style={{marginTop:"20px",border:"1px solid #fe7743", marginLeft:"40px",color:"black",backgroundColor:"#fe7743"}} onClick={isEmptyOp}>Check isEmpty</button>
            </motion.div>
           )}
           </AnimatePresence>

           {message && (
             <motion.div
               initial={{opacity:0}}
               animate={{opacity:1}}
               exit={{opacity:0}}
               transition={{duration:0.4}}
               style={{
                 backgroundColor:"#333",
                 color:"white",
                 marginTop:"-45px",
                 marginLeft:"740px",
                 padding:"10px",
                 borderRadius:"10px",
                 width:"300px"
               }}
             >
                {message}
             </motion.div>
           )}
        </div>
       </div>
    );
}



export default QueueCr ;
export {Options};
