import '../../style/App.css'
import '../../style/newApp.css'

import {motion, AnimatePresence} from "framer-motion";
import { useEffect, useState } from 'react';
import { Button3d } from '../../components/Motion3d/Button3d';
import { useNavigate } from 'react-router-dom';



// database에 읽을 거 가져오기
import {database} from "../../firebase";

function QueRelation() {
    const [number, setNumber] = useState("");

    let navigate = useNavigate();

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
    useEffect(()=>{
        if(number==1){
            setTimeout(
                ()=>{navigate("/");}
            , 5000);
        }
    },[number])

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
                {message[number]}
            </motion.div>

            <BtnRelation num={number}/>
            
        </motion.div>
    )
}

export default QueRelation;

export const message = [
    "",
    "혼자만의 시간을 만끽하세요 :)",
    "혹시 두 분은 썸 또는 연인이신가요?",
    "근처에서 오셨을까요?",
    "근처에서 오셨을까요?"
]

export const BtnRelation = ({num})=>{
    if (num>2){
        return (
            <>
                <motion.div className="answer"
                    initial={{ opacity: 0, y:100 }}
                    animate={{ opacity: 1, y:0, transition:{
                            duration: 2,
                            delay:0.5
                        }    
                    }}
                >
                    <Button3d text="집근처" str="local" path="/com-local"/>
                    <Button3d text="여행" str="trip" path="/com-trip"/>
                </motion.div>
                <motion.div className="add-answer"
                    initial={{ opacity: 0, y:100 }}
                    animate={{ opacity: 1, y:0, transition:{
                            duration: 2,
                            delay:0.5
                        }    
                    }}
                >
                    <Button3d text="직장" str="work" path="/com-work"/>
                </motion.div>
            </>
        )
    }

    else if (num==2){
        return (
            <motion.div 
                className="answer"
                initial={{ opacity: 0, y:100 }} 
                animate={{ opacity: 1, y:0, transition:{
                        duration: 2,
                        delay:0.5
                    }    
                }}
            >
                <Button3d text="Yes" type={true} path="/com-couple"/>
                <Button3d text="No"  type={false} path="/com-friend"/>
            </motion.div>
        )
    }
}