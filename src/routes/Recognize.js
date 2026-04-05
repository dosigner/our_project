import '../style/App.css';
import '../style/newApp.css'
import '../style/manual.css'




import {motion, AnimatePresence} from "framer-motion";
import { useEffect, useState } from 'react';
import {Canvas, useThree} from "@react-three/fiber"
import { useNavigate } from 'react-router-dom';

// database에 읽을 거 가져오기
import {database} from "../firebase";

function Recognize() {
    let navigate = useNavigate();
    const [number, setNumber] = useState("");
    const peopleRef = database.ref('/place/tables/table1/people');
    let interval = setInterval(()=>{
        peopleRef.get().then((snapshot)=>{
            if(snapshot.exists()){
                setNumber(snapshot.val());
                console.log(number);
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        })
    }, 1000);
    
    useEffect(()=>{
        if(number>=1){
            clearInterval(interval);
            navigate("/manual");
        }
    },[number])

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
            >
                시작
            </motion.div>
        </motion.div>
    )
}
export const msg = [
    "앗, 제가 오해했네요...",
    "실례해서 죄송합니다..",
    `죄송해요. 제가 아직 서툴어서..`,
    "오늘 우리 좋은 추억 쌓아가요~",
    "나의 앞에 사람과 빛나는 시간을 위해~"
];


export default Recognize;