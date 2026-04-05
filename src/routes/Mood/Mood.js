import { useEffect, useState } from 'react';
import {motion} from 'framer-motion';
import MoodSelection from '../../animations/MoodSelection';

function Mood(){
    return (
        <motion.div className="mood"
            initial={{opacity:0}}
            animate={{opacity:1, transition:{duration:3, type:'spring'}}}
            exit={{opacity:0, x:-100, 
                transition:{
                    duration:1
                }
            }}
        >
            <MoodSelection/>        
        </motion.div>
    )
}
export default Mood;