import '../App.css';
import {motion} from "framer-motion";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import {sleep} from "../utilites/tool"


function Opening2() {
    const [value, setValue] = useState(false);
    const [yesclick, setYesclick] = useState({click:false});
    
    useEffect(()=>{
        setTimeout(()=>{
            onTap();
            setValue(true);
    }, 1000)});
    let navigate = useNavigate();
    
    let onTap = async (event, info)=>{
        setYesclick({click:true, point:{x:info.point.x, y:info.point.y}});
        await sleep(2000);
        navigate("/agent");
    }
    console.log(yesclick);
    return (
        <>
            <motion.div
                className="box_top"
                initial={{
                    opacity:0,
                    y:100
                }}
                animate={{
                opacity:  1,
                y: 0
                }}
                transition={{
                duration: 1,
                }}
            >오늘 “Our”는 처음이신가요?
            </motion.div>

            {value && 
                <div className='opening-btns'>
                    <motion.button 
                        className='opening-btn'
                        style={{top:"640px", left:"600px"}}
                        initial={{
                            opacity:0,
                            y:100
                        }}
                        animate={{
                            opacity:  1,
                            y: 0,
                            transition: { duration: 1 }
                        }}

                        whileHover={{ scale: 1.2 }} 
                        whileTap={{ scale: 0.8 }}
                    >네
                    </motion.button>
                    <motion.button 
                        className='opening-btn'
                        style={{top:"311px", left:"600px"}}
                        initial={{
                            opacity:0,
                            y:100
                        }}
                        animate={{
                            opacity:  1,
                            y: 0,
                            transition: { duration: 1 }
                        }}
                        whileHover={{ scale: 1.2 }} 
                        whileTap={{ scale: 0.8 }}
                        onTap={onTap}
                    >아니요

                    </motion.button>
                    {yesclick.click && (
                        <motion.div 
                            className="circle-transition"
                            style={{left:yesclick.point.x, top:yesclick.point.y}}
                            animate={{
                                scale:150,
                                transition: { duration: 0.9, ease:'easeIn' }
                            }}
                        />
                    )}
                </div>
            }
        </>
    )
}

export default Opening2;