import '../style/App.css';
import {motion} from "framer-motion";
import { useNavigate } from 'react-router-dom';

function MoodButton({src, path}){
    let navigate = useNavigate();
    return (
        <motion.button 
            className='mood_plate'
            whileHover={{ scale: 1.15, opacity:0.5}} 
            whileTap={{ scale: 0.9, opacity:0.8}}
            onTap={()=>navigate(path)}
        >
            <img src={src} style={{width:"200px"}}/>
        </motion.button>
    )
}

export {MoodButton};