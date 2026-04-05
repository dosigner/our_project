import '../../style/App.css';
import '../../style/newApp.css';

import {motion} from "framer-motion";
import { useEffect, useState } from 'react';
import { Button3d } from '../Motion3d/Button3d';


export default function({num}){
    console.log(num);
    return(
        <>
            {num==2 ? (
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
            ):(
                <motion.div className="answer"
                    initial={{ opacity: 0, y:100 }}
                    animate={{ opacity: 1, y:0, transition:{
                            duration: 2,
                            delay:0.5
                        }    
                    }}
                >
                    <Button3d text="가족" type={true} path="/com-family"/>
                    <Button3d text="직장"  type={false} path="/com-company"/>
                    <Button3d text="친구"  type={false} path="/com-friend"/>
                </motion.div>
            )
        }
        </>
    )
}