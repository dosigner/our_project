import '../../style/App.css'
import '../../style/newApp.css'

import {motion, AnimatePresence} from "framer-motion";
import { useEffect, useState } from 'react';
import { Button3d } from '../../components/Motion3d/Button3d';
import { useNavigate } from 'react-router-dom';
import { BtnRelation } from './QueRelation';


// database에 읽을 거 가져오기
import {database} from "../../firebase";

function QuePurpose() {
    const [number, setNumber] = useState("");

    let navigate = useNavigate();

    /*const peopleRef = database.ref('/place/tables/table1/people');
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
    useEffect(()=>{
        if(number==1){
            setTimeout(
                ()=>{navigate("/");}
            , 5000);
        }
    },[number])*/

    return (
        <motion.div className="App"
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

            >
                {message}
            </motion.div>

            <BtnRelation num={4}/>
            
        </motion.div>
    )
}

export default QuePurpose;

export const message = [
    "혹시 어떻게 오시게 되셨을까요?"
]