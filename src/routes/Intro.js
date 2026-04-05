import '../style/App.css';
import { useEffect } from 'react';
import {motion} from 'framer-motion';
import { useNavigate } from "react-router-dom";
import Welcome from "../animations/Welcome";

function Intro() {
  let navigate = useNavigate();

  useEffect(()=>{
    setTimeout(
      ()=>{navigate("/com");}
    , 7000);
    },[]
  )
  return (
    <motion.div 
        className="App"
        exit={{ 
          opacity: 0, 
          transition: { duration: 1 } 
        }}
    >
      <Welcome/>
    </motion.div>
  )
}

export default Intro;