import '../style/mood.css';
import {motion} from "framer-motion";
import {useEffect, useState} from 'react';
import {MoodButton} from '../components/MoodButton';
import Pointer from '../components/Pointer/Pointer';

function MoodSelection(){
    const [mood,setMood] = useState(0);
    const [ploc, setPloc] = useState({x:0,y:0});

    const list = {
        visible: {
            opacity:1,
            transition: {
                delay:2,
                when: "beforeChildren",
                staggerChildren: 0.6,
            }
        },
        hidden:  {
            opacity:0,
            transition: {
                when: "afterChildren",
            }
        },
    }

    const item = {
        visible: {opacity: 1, y: 0},
        hidden: {opacity: 0, y: 100},
    }

    return (
        <>
            <motion.div
                className="question"
                initial={{
                    opacity:0,
                    y:100
                }}
                animate={{
                    opacity:  1,
                    y: 0
                }}
                transition={{
                    delay:1,
                    duration: 1,
                }}
                style={{fontSize:"40px", top:"50%"}}
            >분위기를 한번 바꿔볼까요?
            </motion.div>

            
            
            <motion.ul
                initial="hidden"
                animate="visible"
                variants={list}
                className="mood-plates"
            >   
                <motion.li variants={item} className="mood_plates">
                    <MoodButton src="img/mood_plate/Modern.png" path="/mood-cutes"/>
                    <MoodButton src="img/mood_plate/Vintage.png" />
                    <MoodButton src="img/mood_plate/Wonderful.png"/>
                </motion.li>

                <motion.li variants={item} className="mood_plates">
                    <MoodButton src="img/mood_plate/Picnic.png" path="/mood-cute"/>
                    <MoodButton src="img/mood_plate/Cool.png" path="/mood-beach"/>
                    <MoodButton src="img/mood_plate/Nightsky.png" path="/mood-sky"/>
                </motion.li>

                <motion.li variants={item} className="mood_plates">
                    <MoodButton src="img/mood_plate/Modern.png"/>
                    <MoodButton src="img/mood_plate/Nature.png" path="/mood-beach"/>
                    <MoodButton src="img/mood_plate/Modern.png"/>
                </motion.li>
                
            </motion.ul>

        </>
    )

}

export default MoodSelection;
