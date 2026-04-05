import '../../style/App.css'

import {motion, AnimatePresence} from "framer-motion";
import { useEffect, useState } from 'react';
import {Canvas, useThree} from "@react-three/fiber"
import { useNavigate } from 'react-router-dom';

// database에 읽을 거 가져오기
import {database} from "../../firebase";

function AnsNewbie() {
    // 1. 새롭게 환영인사
    // 2. 관계 물어보기
    const [random, setRandom] = useState(Math.floor(Math.random()*5));
    let navigate = useNavigate();
    useEffect(()=>{
        setTimeout(
          ()=>{navigate("/com-relation");}
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
    "처음으로 대접하게 되서 영광이에요!!",
    "첫 음식 더욱 맛있게 대접해드릴께요😀",
    `오늘 ${"점심"} 맛있게 대접해드릴께요:)`,
    "처음 모시게 되서 너무 기뻐요~",
    "저희 식당과 첫 인연이에요:)"
];


export default AnsNewbie;