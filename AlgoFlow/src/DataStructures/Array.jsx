
import { useState } from "react";
import { motion , AnimatePresence } from "framer-motion";

import './Array.css';


function ArrayCr(){
    const [arraysize, setArraySize] = useState(0);
    const [array, setArray] = useState([]);
    const [InputValue, setInputValue] = useState('');
    const [showArray, setShowarray] = useState(false);
    const [swap, setSwap] = useState([-1,-1]);
    const [compare, setCompare] = useState([-1,-1]);


    const handlechange = (e) =>{
        const num = Number(e.target.value);
        setArraySize(num);
    };

    const handleInputchange = (e) => {
        setInputValue(e.target.value);
    };

    const createArray = () => {
        if (InputValue.trim() !== '') {
            const rawin = InputValue.split(',');
            const cleanarr = [];

            for(let i = 0; i < rawin.length; i++){
                const trimmed = rawin[i].trim();
                if(trimmed !== ''){
                    cleanarr.push(trimmed);
                }
            }

            const sizedarr =[]
            for(let i=0;i<arraysize;i++){
                if(cleanarr[i]){
                    sizedarr.push(cleanarr[i])
                }else{
                    sizedarr.push("")
                }
            }

            setArray(sizedarr);
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
            <h1 className="arr">Array</h1>
            <input 
                className="arrsize" 
                type="Number" 
                placeholder="enter array size" 
                value={arraysize} 
                onChange={handlechange}
            />
            <input 
                className="arrin" 
                type="text" 
                placeholder="enter array elements with , between them" 
                value={InputValue} 
                onChange={handleInputchange}
            />
            <motion.button 
            className="createbtn" onClick={createArray}>Create</motion.button>
            <motion.button  
            className="clearbtn" onClick={cleararray}>Clear</motion.button>
            <div className="arrayvisualization">
                
            { showArray && (
                <AnimatePresence>
                <motion.div className="dis"
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
                        className="bound" key={index}
                        style={{
                            backgroundColor :swap.includes(index) ? "red" : compare.includes(index) ? "yellow" : "#A3DC9A"
                        }}
                        >{item}</motion.div>
                    ))}
                </motion.div>
                </AnimatePresence>
            )}
            </div>
<Options arraysize={arraysize} array={array} setArray={setArray} swap={swap} setSwap={setSwap} compare={compare} setCompare={setCompare}/>
        </div>
    );
}






function Options({arraysize ,array,setArray,swap,compare,setSwap,setCompare}){

    const[selecttab , selectingtab] = useState("Insertion");
    const operation = ["Insertion","Deletaion","Searching","Sorting"];
    const[Isertinput , Inputset] = useState(0);
    const[position, setposition] = useState(0);
    const[error , seterror] = useState(false);

    const handle_Insertion_input = (e) =>{
        const num = Number(e.target.value);
        Inputset(num);
    };
    const handle_insertion_value = (e) =>{
        const num = Number(e.target.value);
        setposition(num);
    };
    const InsertionOp = () =>{
        if( position > arraysize){
            seterror(true)
            setTimeout(() => seterror(false), 3000);
            console.log("error ",error);
        }else{
            seterror(false)
        
        const newArray = [...array];
        newArray[position]=Isertinput;
        setArray(newArray);
        }
        setposition(0);
        Inputset(0);
        }


        const DeletaionOp =() =>{
             const newarray = [...array];

            if(position >= 0 && Isertinput == 0){
            if( position > array.length){
                  seterror(true)
                  setTimeout(() => seterror(false), 3000);
                  console.log("error ",error);
            }else{
                  seterror(false)
            
            if(position >= 0  && position != array.length ){
               
                for(let i=position;i<array.length;i++){
                    if(array[i+1] == ""){
                        newarray[i]=""
                    }else{
                        newarray[i]=array[i+1]
                    }
                }
            }
            else{
                newarray[position]=""
            }
            }
            setArray(newarray)
            setposition(0);
            Inputset(0);
        }else if(position == 0 && Isertinput >0){
            for(let i=0;i<newarray.length;i++){
                if(newarray[i] == Isertinput){
                    for(let j =i;j<arraysize;j++){
                        newarray[j]=newarray[j+1]
                    }
                    break
                }
            }
            setArray(newarray)
            setposition(0);
            Inputset(0);
        }
        }

        const BubbleSort = async  () =>{
           const newarray = [...array];
           const num = newarray.filter(v => v !== "" && !isNaN(Number(v))).map(Number);

           const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

           for (let i = 0; i < num.length - 1; i++) {
                for (let j = 0; j < num.length - i - 1; j++) {
                    setCompare([j, j + 1]);
                    await delay(500);

                   if (num[j] > num[j + 1]) {
                       setSwap([j, j + 1]);
                      await delay(500);

                         let temp = num[j];
                         num[j] = num[j + 1];
                          num[j + 1] = temp;

                         setArray([...num]);}
            setSwap([-1, -1]);
            setCompare([-1, -1]);
            await delay(200);
        }
    }
};


    const InsertionSort = async () => {
            const newarray = [...array];
             const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

           for (let i = 1; i < newarray.length; i++) {
            if(newarray[i]===""){
                break;
            }
                let key = newarray[i];
                 let j = i - 1; 
                  setSwap([i]);
                  await delay(500);

        
             while (j >= 0 && Number(newarray[j]) > Number(key)) {
                 setCompare([j, j + 1]);
                 await delay(500);

                  newarray[j + 1] = newarray[j];
                   setArray([...newarray]);

                  setSwap([j, j + 1]); 
                  await delay(500);

            j--;
        }
        if(newarray[j+1] !== key){
        newarray[j + 1] = key;
        setArray([...newarray]);
        await delay(500);
        }
        setSwap([-1,-1]);
        setCompare([-1,-1]);
        await delay(200);
    }
};

const Linear_search = async () => {
    const newarray = [...array];
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    for (let i = 0; i < newarray.length; i++) {
        setCompare([i]);
        await delay(500);
        if (Number(newarray[i]) === Number(Isertinput)) {
            setSwap([i]);
            await delay(1000);
            setSwap([-1]);
            setCompare([-1]);
            return; }}
    setCompare([-1]); 
};

const Binary_Search = async () => {
    let newarray = [...array].map(Number); 
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    let target = Number(Isertinput);
    let left = 0;
    let right = newarray.length - 1;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        setCompare([mid]); 
        await delay(500);
        if (newarray[mid] === target) {
            setSwap([mid]);
            await delay(1000);
            setSwap([-1]);
            setCompare([-1]);
            return; 
        } else if (newarray[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    setCompare([-1]); 
};
const SelectionSort = async () => {
    const newarray = [...array];
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    for (let i = 0; i < newarray.length - 1; i++) {
        if(newarray[i] === "") break;

        let minIndex = i;

        for (let j = i + 1; j < newarray.length; j++) {
            if(newarray[j] === "") break;

            setCompare([minIndex, j]);
            await delay(500);

            if (Number(newarray[j]) < Number(newarray[minIndex])) {
                minIndex = j;
            }
        }

        if (minIndex !== i) {
            setSwap([i, minIndex]);
            await delay(500);

            let temp = newarray[i];
            newarray[i] = newarray[minIndex];
            newarray[minIndex] = temp;

            setArray([...newarray]);
            await delay(500);
        }

        setSwap([-1, -1]);
        setCompare([-1, -1]);
    }
};
const MergeSort = async () => {
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const merge = async (arr, l, m, r) => {
        let n1 = m - l + 1;
        let n2 = r - m;

        let L = [];
        let R = [];

        for (let i = 0; i < n1; i++) L.push(arr[l + i]);
        for (let j = 0; j < n2; j++) R.push(arr[m + 1 + j]);

        let i = 0, j = 0, k = l;

        while (i < n1 && j < n2) {
            setCompare([l + i, m + 1 + j]);
            await delay(500);

            if (Number(L[i]) <= Number(R[j])) {
                arr[k] = L[i];
                i++;
            } else {
                arr[k] = R[j];
                j++;
            }
            setArray([...arr]);
            await delay(500);
            k++;
        }

        while (i < n1) {
            arr[k] = L[i];
            setArray([...arr]);
            await delay(500);
            i++;
            k++;
        }

        while (j < n2) {
            arr[k] = R[j];
            setArray([...arr]);
            await delay(500);
            j++;
            k++;
        }

        setCompare([-1, -1]);
    };

    const mergeSortRec = async (arr, l, r) => {
        if (l < r) {
            let m = Math.floor((l + r) / 2);

            await mergeSortRec(arr, l, m);
            await mergeSortRec(arr, m + 1, r);
            await merge(arr, l, m, r);
        }
    };

    // Filter out empty slots, keep numbers only
    let nums = array.filter(v => v !== "" && !isNaN(Number(v))).map(Number);

    await mergeSortRec(nums, 0, nums.length - 1);

    // Rebuild with sorted numbers + empty slots preserved
    let sortedArray = [...nums];
    while (sortedArray.length < arraysize) sortedArray.push("");

    setArray(sortedArray);
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
                        paddingLeft: "220px",
                        fontWeight : selecttab === op ? "bold" : "normal",
                        color : selecttab === op ? " #A3DC9A" : "white"
                    }}
                    >{op}</li>
                ))}           
            </ul>
        </nav>
        <div>
            <AnimatePresence mode="wait">
           {selecttab === "Insertion" && (
            <motion.div className="Insertion"
            key="Insertion"
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}}
            transition={{duration:0.4}}
            >
                <label style={{paddingLeft:"40px", fontWeight:"normal"}}>Enter postion :</label>
                <input style={{border:"1px,solid,white", marginLeft:"30px"}} value={position} type="Number" onChange={handle_insertion_value}/>
                <label style={{paddingLeft:"40px",fontWeight:"normal"}}>Enter number :</label>
                <input style={{border:"1px,solid,white", marginLeft:"30px"}} value={Isertinput} type="Number"onChange={handle_Insertion_input}/>
                <button 
                 style={{
                     marginTop: "20px",
                     border: "1px solid #A3DC9A", 
                   marginLeft: "40px",
                       color: "black",
                   backgroundColor: "#A3DC9A"
                           }} 
                            onClick={InsertionOp}>Perform
                 </button>
                {error &&(
                    <AnimatePresence mode="wait">
                    <motion.div
                     initial={{opacity:0}}
                    animate={{opacity:1}}
                      exit={{opacity:0}}
                      transition={{duration:0.4}}
                      style={{
                        backgroundColor:"#F44336",
                        color:"white",
                        marginTop:"-40px",
                        marginLeft:"900px",
                       
                        height:"30px",
                        width:"200px",
                        textAlign:"center",
                        borderRadius:"10px"
                      }}
                    >
                        Number is out of bound
                        </motion.div>
                        </AnimatePresence>
                )}
            </motion.div>
           )}
           {selecttab === "Deletaion" && (
            <motion.div className="Deletation"
            key="Deletation"
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}}
            transition={{duration:0.4}}
            >
                <label style={{paddingLeft:"40px", fontWeight:"normal"}}>Enter postion :</label>
                <input style={{border:"1px,solid,white", marginLeft:"30px"}} value={position} type="Number" onChange={handle_insertion_value}/>
                <label style={{paddingLeft:"40px",fontWeight:"normal"}}>Enter number :</label>
                <input style={{border:"1px,solid,white", marginLeft:"30px"}} value={Isertinput} type="Number" onChange={handle_Insertion_input} />
                <button style={{marginTop:"20px",border:"1px, solid  #A3DC9A", marginLeft:"40px",color:"black",backgroundColor:" #A3DC9A"}} onClick={DeletaionOp}>Perform</button>
                 {error &&(
                    <AnimatePresence mode="wait">
                    <motion.div
                     initial={{opacity:0}}
                    animate={{opacity:1}}
                      exit={{opacity:0}}
                      transition={{duration:0.4}}
                      style={{
                        backgroundColor:"#F44336",
                        color:"white",
                        marginTop:"-40px",
                        marginLeft:"900px",
                       
                        height:"30px",
                        width:"200px",
                        textAlign:"center",
                        borderRadius:"10px"
                      }}
                    >
                        Number is out of bound
                        </motion.div>
                        </AnimatePresence>
                )}
            </motion.div>
           )}
           {selecttab === "Searching" && (
            <motion.div className="Searching"
            key="Searching"
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}}
            transition={{duration:0.4}}
            >
                <input style={{border:"1px,solid,white", marginLeft:"30px"}} value={Isertinput} type="Number" onChange={handle_Insertion_input} />
                <button style={{marginTop:"15px",marginLeft:"40px",border:"1px,solid, #A3DC9A",color:"black",backgroundColor:" #A3DC9A"}} onClick={Binary_Search}>Binary Search</button>
                <button style={{marginTop:"15px",marginLeft:"40px",border:"1px,solid, #A3DC9A",color:"black",backgroundColor:" #A3DC9A"}} onClick={Linear_search}>Linear Search</button>
            </motion.div>
           )}
           {selecttab === "Sorting" && (
            <motion.div className="Sorting"
            key="Sorting"
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}}
            transition={{duration:0.4}}
            >
                <button style={{marginTop:"15px",marginLeft:"40px",border:"1px,solid, #A3DC9A",color:"black",backgroundColor:" #A3DC9A"}} onClick={BubbleSort}>
                    Bubble Sort
                </button>
                <button style={{marginTop:"15px",marginLeft:"40px",border:"1px,solid, #A3DC9A",color:"black",backgroundColor:" #A3DC9A"}} onClick={InsertionSort}>Insertion Sort</button>

                <button 
                 style={{marginTop:"15px",marginLeft:"40px",border:"1px solid #A3DC9A",color:"black",backgroundColor:" #A3DC9A"}} 
                 onClick={SelectionSort}>
                    Selection Sort
                  </button>
                  <button 
                      style={{marginTop:"15px",marginLeft:"40px",border:"1px solid #A3DC9A",color:"black",backgroundColor:" #A3DC9A"}} onClick={MergeSort}>
                Merge Sort
                 </button>

            </motion.div>
           )}
           </AnimatePresence>
        </div>
       </div>
    );
}



export default ArrayCr ;
export {Options};