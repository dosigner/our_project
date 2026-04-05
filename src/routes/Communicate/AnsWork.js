import '../../style/App.css'

import {motion, AnimatePresence} from "framer-motion";
import { useEffect, useState } from 'react';
import {Canvas, useThree} from "@react-three/fiber"
import { useNavigate } from 'react-router-dom';

// database에 읽을 거 가져오기
import {database} from "../../firebase";

function AnsWork() {
    const [random, setRandom] = useState(Math.floor(Math.random()*3));

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
    "잠시 일에 벗어나 힐링시간이 되시길~",
    "근처에서 회사를 다니시군요!",
    `피로가 풀릴 수 있도록 좋은 서비스 대접할게요!!`,
];


export default AnsWork;