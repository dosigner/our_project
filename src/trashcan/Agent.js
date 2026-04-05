import '../style/App.css'

import {motion, AnimatePresence} from "framer-motion";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import {sleep} from "../utilites/tool"
import { Button3d } from '../components/Motion3d/Button3d';
import {Canvas, useThree} from "@react-three/fiber"
import {MotionConfig} from "framer-motion"

// database에 읽을 거 가져오기
import {database} from "../firebase";
import { OrbitControls } from '@react-three/drei';

function Agent() {
    // 1. 몇 명에서 오셨는지
    const [number, setNumber] = useState("");
    const [placeName, setPlaceName] = useState("");
    const [isVisible, setIsVisible] = useState(true);

    const peopleRef = database.ref('/place/tables/table1/people');
    peopleRef.get().then((snapshot)=>{
        if(snapshot.exists()){
            console.log(snapshot.val());
            setNumber(snapshot.val());
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    })

    const nameRef = database.ref('/place/name');
    nameRef.get().then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          setPlaceName(snapshot.val());
          setTimeout(()=>setIsVisible(false),3000);
        } else {
          console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });

    const people = `${number}명에서 오셨네요`;
    const message = `오늘 ${placeName}은 처음이신가요?`;
    
    return (
        <AnimatePresence mode="wait">
            {isVisible?
            (<motion.div className="talk"
                key="people"
                initial={false}
                exit={{opacity:0, x:-100, 
                    transition:{
                        duration:1
                    }
                }}>
                <motion.div className="question"
                    initial={{ opacity: 0, y:100 }}
                    animate={{ opacity: 1, y:0 }}
                    transition={{ duration: 1, delay:0.5}}
                >{people}
                    
                </motion.div>
            </motion.div>)
            :
            (<motion.div className="agent"
                key="first"
                initial={false}
                exit={{opacity:0, x:-100, 
                    transition:{
                        duration:1
                    }
                }}
            >
                <motion.div className="question"
                    initial={{ opacity: 0, y:100 }}
                    animate={{ opacity: 1, y:0, transition: { 
                            duration: 1, 
                            delay:0.5
                        }
                    }}
                    
                >{message}
                </motion.div>

                <motion.div className="answer"
                    initial={{ opacity: 0, y:150 }}
                    animate={{ opacity: 1, y:0, transition:{
                            duration: 2,
                            delay:0.5
                        } 
                    }}
                >
                    <Button3d text="Yes" type={true} path="/newbie"/>
                    <Button3d text="No" type={false} path="/regular"/>
                </motion.div>
                
            </motion.div>)
            }
        </AnimatePresence>        
    )
}

export default Agent;