import '../style/App.css';
import { useEffect } from 'react';
import {motion} from 'framer-motion';
import { useNavigate } from "react-router-dom";

function Welcome() {
    let navigate = useNavigate();

    useEffect(()=>{
        setTimeout(
            ()=>{navigate("/agent");}
        , 7000);
    },[])
    return (
        <motion.div 
            className="App"
            exit={{ opacity: 0, transition: { duration: 1 } }}
        >
            <motion.div
                className="circle_top"
                initial={{opacity:0.2}}
                animate={{
                opacity:  [0.2, 0.2, 0.5, 0.5, 0.5, 1], 
                rotate :[0, 0, 90, 90, 90, 90], 
                scale:[1,1,1,1,1.77,2.5]
                }}
                transition={{
                duration: 3,
                times: [0, 0.2, 0.4, 0.6, 0.8, 1],
                }}
            />
            <motion.div
                className="circle_bottom"
                initial={{opacity:0.2}}
                animate={{
                opacity:  [0.2, 0.2, 0.5, 0.5, 0.5, 1], 
                rotate :[0, 0, 90, 90, 90, 90], 
                scale:[1,1,1,1,1.77,2.5]
                }}
                transition={{
                duration: 3,
                times: [0, 0.2, 0.4, 0.6, 0.8,1],
                }}
            />
            
            <motion.div 
                className="progress"
                animate={{
                    opacity:[0,100,100,100],
                    width:[20,20,1920,1920],
                    height:[2,5,5,1080],
                    left: ["50%","50%","0%","0%"],
                    bottom: ["50%","50%","50%","0%"]
                }}
                transition={{
                    delay:3.5,
                    duration: 3,
                    times:[0,0.1,0.4,1]
                }}
            />
        </motion.div>
    )
}

export default Welcome;