import '../../style/App.css'

import {motion, AnimatePresence, MotionConfig} from "framer-motion";
import { Suspense, useState } from 'react';

import {Canvas, useFrame} from "@react-three/fiber"
import {Newbook, Rectangle, Samsung} from "../../Three_comp/Samsung"
import { Environment, OrbitControls } from '@react-three/drei';

import {scale_state, transition} from "../../animations/button-animation/Settings"

function Order(){
    const [isHover, setIsHover] = useState(false);
    const [isHover2, setIsHover2] = useState(false);
    const [isHover3, setIsHover3] = useState(false);
    const [isPress, setIsPress] = useState(false);

    return (
        <motion.div className="order"
            initial={{y:0,x:0}}
            animate={{y:0, x:0, transition:{duration:2}}}>

            <motion.div className="order-system">
                <MotionConfig transition={transition}>
                    <motion.button
                        initial={false}
                        animate={isHover?"hover":"rest"}
                        whileTap="press"
                        variants={scale_state}
                        onHoverStart={()=>{
                            setIsHover(true);
                        }}
                        onHoverEnd={()=>{
                            setIsHover(false);
                        }}
                        
                        onTapStart={()=>{setIsPress(true);}}
                        onTap={()=>{
                            setIsPress(false);
                        }}
                        onTapCancel={()=>{setIsPress(false);}}
                        style={{backgroundColor:"rgba(255,255,255,0.3)", color:"black", borderRadius: "20px"}}
                    >
                        <motion.div
                            variants={{
                                hover:{ scale:0.85 },
                                press:{ scale:1.1 }
                            }}
                            className="menu" style={{fontSize:"20px", }}
                        >
                            떡볶이---------40000원
                        </motion.div>
                    </motion.button>



                </MotionConfig>
            </motion.div>
        </motion.div>
    )
}

export default Order;