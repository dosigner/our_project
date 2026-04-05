import './style/App.css';
import React, { useEffect, useState } from 'react';
import { AnimatePresence } from "framer-motion";
import { useLocation, useRoutes,useNavigate } from "react-router-dom";


// MousePointer
import Pointer from "./components/Pointer/Pointer"

// Component
import Recognize from './routes/Recognize';

// Component
import Manual from './routes/Manual';

import Intro from './routes/Intro';

import AnsPeople from './routes/Communicate/AnsPeople';

import QueFirst from './routes/Communicate/QueFirst';
import AnsNewbie from './routes/Communicate/AnsNewbie';
import AnsRegular from './routes/Communicate/AnsRegular';

import QueRelation from './routes/Communicate/QueRelation';
import AnsCouple from './routes/Communicate/AnsCouple';
import AnsFriend from './routes/Communicate/AnsFriend';

import QuePurpose from './routes/Communicate/QuePurpose';
import AnsWork from './routes/Communicate/AnsWork';
import AnsTrip from './routes/Communicate/AnsTrip';
import AnsLocal from './routes/Communicate/AnsLocal';

import AnsWeather from './routes/Communicate/AnsWeather';

import Order from "./routes/Order/Order";

// mood
import Mood from './routes/Mood/Mood';

import Starlight from './routes/Mood/Starlight';
import Beach from './routes/Mood/Beach';
import CuteBall from './routes/Mood/CuteBall';



function App() {
  const element = useRoutes([
    { path:"/", element: <Recognize/>},
    { path:"/manual", element: <Manual/>},
    { path:"/intro", element: <Intro/> },
    { path:"/com", element: <AnsPeople/> },

    // question
    { path:"/com-first", element: <QueFirst/> },
    // answer
    { path:"/com-newbie", element: <AnsNewbie/> },
    { path:"/com-regular", element: <AnsRegular/> },
    
    // question
    { path: "/com-relation", element: <QueRelation/> },
    { path: "/com-purpose", element:<QuePurpose/>},

    // answer
    { path: "/com-couple", element: <AnsCouple/>},
    { path: "/com-friend", element: <AnsFriend/>},
    
    // answer
    { path: "/com-local", element: <AnsLocal/>},
    { path: "/com-trip", element: <AnsTrip/>},
    { path: "/com-work", element: <AnsWork/>},

    // answer
    { path: "/com-weather", element: <AnsWeather/>},

    { path:"/mood", element: <Mood/> },
    { path:"/mood-sky", element:<Starlight/>},
    { path:"/mood-beach", element:<Beach/>},
    { path:"/mood-cute", element:<CuteBall/>},
    
    { path:"/order", element: <Order/>},

  ])
  let navigate = useNavigate();
  useEffect(() => {
    const onKeyPress = (e) => {
      if(e.key==='o'){
        navigate("/order");
      }
      else if(e.key==='m'){
        navigate("/manual");
      }
      else if(e.key==='i'){
        navigate("/intro");
      }
      else if(e.key==='1'){
        navigate("/com-first");
      }

    };

    document.addEventListener('keypress', onKeyPress);

    return () => {
      document.removeEventListener('keypress', onKeyPress);
    }
  }, [])

  const location = useLocation();

  if (!element) return null;

  return(
    <AnimatePresence mode="wait">
      <Pointer/>
      {React.cloneElement(element, {key:location.pathname})}
    </AnimatePresence>
  )
}

export default App;