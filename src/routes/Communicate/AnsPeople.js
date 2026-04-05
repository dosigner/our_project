import '../../style/App.css'
import '../../style/newApp.css'


import {motion, AnimatePresence} from "framer-motion";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import {sleep} from "../../utilites/tool"
import { Button3d } from '../../components/Motion3d/Button3d';
import {Canvas, useThree} from "@react-three/fiber"
import {MotionConfig} from "framer-motion"

// database에 읽을 거 가져오기
import {database} from "../../firebase";
import { OrbitControls } from '@react-three/drei';

function AnsPeople() {
    // 1. N명에서 왔습니다.
    const [number, setNumber] = useState("");
    const [placeName, setPlaceName] = useState("");

    const peopleRef = database.ref('/place/tables/table1/people');
    peopleRef.get().then((snapshot)=>{
        if(snapshot.exists()){
            //console.log(snapshot.val());
            setNumber(snapshot.val());
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    })

    const people = `오늘 ${number}명이서 오셨네요`;

    // 2. 처음오셨나요?
    let navigate = useNavigate();
    useEffect(()=>{
        setTimeout(
          ()=>{navigate("/com-first");}
        , 6000);
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
            >{people}
            </motion.div>            
            {convertSVG(number)}

        </motion.div>
    )
}

const draw = {
    hidden:{pathLength:0, opacity:0},
    visible: (i)=>{
        const delay = 1 + i*0.5;
        return {
            pathLength:1, opacity:1, 
            transition: {
                pathLength: {delay, type: "spring", duration:1.5, bounce:0},
                opacity: {delay, duration: 0.01}
            }
        };
    }
};

const convertSVG = (number) => {
    if(number===1){
        return (
            <motion.svg
                className="circle-box"
                width="1920"
                height="1080"
                viewBox="0 0 1920 1080"
                initial="hidden"
                animate="visible"
                exit="hidden"
            >
                <motion.circle
                    cx="910"
                    cy="200"
                    r="100"
                    stroke="#00cc88"
                    variants={draw}
                    custom={1}
                    stroke-width="3"
                />
            </motion.svg>
        )
    }
    else if(number===2){
        return (
            <motion.svg
                className="circle-box"
                width="1920"
                height="1080"
                viewBox="0 0 1920 1080"
                initial="hidden"
                animate="visible"
                exit="hidden"
            >
                <motion.circle
                    cx="910"
                    cy="200"
                    r="100"
                    stroke="#00cc88"
                    variants={draw}
                    custom={1}
                    stroke-width="2"
                />
                <motion.circle
                    cx="910"
                    cy="880"
                    r="100"
                    stroke="#00cc88"
                    variants={draw}
                    custom={2}
                    stroke-width="2"
                />
            </motion.svg>
        )
    }
    else{
        return (
            <motion.svg
                className="circle-box"
                width="1920"
                height="1080"
                viewBox="0 0 1920 1080"
                initial="hidden"
                animate="visible"
                exit="hidden"
            >
                <motion.circle
                    cx="510"
                    cy="200"
                    r="100"
                    stroke="#00cc88"
                    variants={draw}
                    custom={1}
                    stroke-width="2"
                />
                <motion.circle
                    cx="510"
                    cy="880"
                    r="100"
                    stroke="#00cc88"
                    variants={draw}
                    custom={2}
                    stroke-width="2"
                />
                <motion.circle
                    cx="1410"
                    cy="200"
                    r="100"
                    stroke="#00cc88"
                    variants={draw}
                    custom={3}
                    stroke-width="2"
                />
                <motion.circle
                    cx="1410"
                    cy="880"
                    r="100"
                    stroke="#00cc88"
                    variants={draw}
                    custom={4}
                    stroke-width="2"
                />
            </motion.svg>
        )
    }
}

export default AnsPeople;