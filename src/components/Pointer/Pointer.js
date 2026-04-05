import React from "react";
import "./Pointer.css";
import useMousePosition from "../../hooks/useMousePosition";
import {motion} from "framer-motion";

const Pointer = () => {
    const {x,y} = useMousePosition();
    let distance = parseInt(Math.sqrt(Math.pow(960-x,2)+Math.pow(540-y,2)));
    //console.log(distance);
    //console.log(1-distance/1100);
    
    return (
        <>
            <motion.div
                style={{
                    left:`${x}px`, top:`${y}px`, 
                    width: `${1100-Math.abs(540-y)*1.1}px`, height: `${1100-Math.abs(920-x)/1.3}px`,
                    transform: `translate(${-50}%, ${-50}%)`,
                    opacity: `${1-distance/1100}`
                }}
                className="ring"
                initial={{
                    opacity:0,
                }}
                animate={{
                    opacity: 0.9,
                }}
                transition={{
                    delay:1.5,
                    duration: 2.5,
                }}
            ></motion.div>
            <motion.div
                style={{
                    left:`${x}px`, top:`${y}px`, 
                    opacity:`${1-distance/1100}`
                }}
                className="light"
            ></motion.div>
        </>

    )
}

export default Pointer;
