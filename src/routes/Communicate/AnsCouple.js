import '../../style/App.css'

import {motion, AnimatePresence} from "framer-motion";
import { useEffect, useState } from 'react';
import {Canvas, useThree} from "@react-three/fiber"
import { useNavigate } from 'react-router-dom';

// database에 읽을 거 가져오기
import {database} from "../../firebase";

function AnsCoulple() {
    const [random, setRandom] = useState(Math.floor(Math.random()*5));

    let navigate = useNavigate();
    useEffect(()=>{
        setTimeout(
          ()=>{navigate("/com-purpose");}
        , 4500);
        },[]
    )
    
    return (
        <motion.div className="talk"
            key="people"
            initial={false}
            exit={{opacity:0, x:-100, 
                transition:{
                    duration:1
                }
            }}
        >
            <motion.div className="question"
                initial={{ opacity: 0, y:100 }}
                animate={{ opacity: 1, y:0 }}
                transition={{ duration: 1, delay:0.5}}
            >{msg[random]}
            </motion.div>
        </motion.div>
    )
}
export const msg = [
    "두 분의 행복한 시간을 위해~",
    "이 순간이 두 분에게 뜻 깊은 자리가 되길!",
    `오늘 ${"점심"} 맛있게 대접해드릴께요`,
    "지금 이 분위기를 즐기세요~",
    "두 분 사이가 너무 애틋해 보이네요🥰"
];


export default AnsCoulple;