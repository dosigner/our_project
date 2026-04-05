import '../../style/App.css'
import '../../style/order.css'

import {motion, AnimatePresence, MotionConfig} from "framer-motion";
import { Suspense, useState } from 'react';

import {Canvas, useFrame} from "@react-three/fiber"
import {Samsung} from "../../Three_comp/Samsung"

import {MyBook} from "./OrderBook"

function Order(){
    const [selectItem,setSelectItem] = useState();
    return (
        <motion.div 
            className='order-system'
            initial={{y:-1000}}
            animate={{y:0}}
            transition={{duration:2, delay:0.5}}
            exit={{opacity:0, y:-500, 
                transition:{
                    duration:1.3
                }
            }}
        >
            <MyBook setMenu={setSelectItem}/>

        </motion.div>
    )
}

export default Order;