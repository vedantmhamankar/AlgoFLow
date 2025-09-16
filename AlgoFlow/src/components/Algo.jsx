import { motion } from "framer-motion";

function Algo(){
    return(
        <div className="AlgoFlow">
        <motion.h1 className="Algo"
        initial = {{y:-100}}
        animate = {{y:0}}
        exit ={{ opacity :0.5}}
        
        transition={{duration:1}}
        >Algo</motion.h1>
        <motion.h1 className="Flow"
        initial = {{x:100}}
        animate = {{x:0}}
        exit={{opacity: 0.5}}
        transition={{duration:0.5}}
        >Flow</motion.h1>
        </div>
    );
}
export default Algo;