import '../../style/App.css';
import '../../style/newApp.css';

import {motion} from "framer-motion";
import { useEffect, useState } from 'react';


export default function(){
    return(
        <motion.div className="answer"
            initial={{ opacity: 0, y:100 }}
            animate={{ opacity: 1, y:0, transition:{
                    duration: 2,
                    delay:0.5
                } 
            }}
        >
            <Button3d text="Yes" type={true} path="/love"/>
            <Button3d text="No"  type={false} path="/notlove"/>
        </motion.div>
    )
}