import '../../style/App.css'

import {motion, AnimatePresence} from "framer-motion";
import { useEffect, useState } from 'react';
import {Canvas, useThree} from "@react-three/fiber"
import { useNavigate } from 'react-router-dom';

// database에 읽을 거 가져오기
import {database} from "../../firebase";

function AnsTrip() {
    const [random, setRandom] = useState(Math.floor(Math.random()*4));

    let navigate = useNavigate();
    useEffect(()=>{
        setTimeout(
          ()=>{navigate("/com-weather");}
        , 3500);
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
    "여행 중에 찾아와주셔서 영광이에여👋",
    "대전으로 여행을 오시다니 탁월한 선택이에요~",
    `오늘 ${"점심"} 맛있게 대접해드릴께요`,
    "여행, 두 글자만 들어도 설레네요✨",
];


export default AnsTrip;