import './button.css';

import { motion, MotionConfig, useMotionValue } from "framer-motion";
import {Suspense, useState} from 'react';
import {transition, scale_state} from "./settings"
import {Shape1} from "./Shapes/Shape1";
import {Shape2} from "./Shapes/Shape2";
import {Shape3} from "./Shapes/Shape3";

import useMeasure from "react-use-measure";

import { useNavigate } from "react-router-dom";
import {upload} from "./upload"

export const Button3d = ({text, type, path, str}) => {
    // 버튼 이동을 위해
    let navigate = useNavigate();
    
    // ref는 motion.button을 참조함. bounds는 ref를 측정한 결과
    const [ref, bounds] = useMeasure({ scroll:false });
    
    // Event에 대한 State
    const [isHover, setIsHover] = useState(false);
    const [isPress, setIsPress] = useState(false);

    // 1. MotionValue들은 useMotionValue  hook으로 생성됨
    // 2. 인자로 MotionValue의 초기 값이 들어감
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    
    const resetMousePosition = () => {
        // 3. set method로 MotionValue 값 update. re-render를 발생시키진 않음
        mouseX.set(0);
        mouseY.set(0);
    };
    return (
        <MotionConfig transition={transition}>
            <motion.button
                ref={ref}
                initial={false}
                animate={isHover?"hover":"rest"}
                whileTap="press"
                variants={scale_state}
                onHoverStart={()=>{
                    resetMousePosition();
                    setIsHover(true);
                }}
                onHoverEnd={()=>{
                    resetMousePosition();
                    setIsHover(false);
                }}
                
                onTapStart={()=>{setIsPress(true);}}
                onTap={()=>{
                    setIsPress(false);
                    upload(path, str);
                    navigate(path);
                }}
                onTapCancel={()=>{setIsPress(false);}}
                /* Pointer가 버튼 안에 들어왔을 때, 
                마우스 포인터 X,Y 값에 bounds.x, bounds.y
                */
                onPointerMove={(e)=>{
                    mouseX.set(-(e.clientX - bounds.x - bounds.width/2));
                    mouseY.set((e.clientY - bounds.y - bounds.height/2));
                }}
            >
                <motion.div
                    className={changeColor(text,str)}
                    variants={{
                        rest:  {opacity:0},
                        hover: {opacity:1}
                    }}
                >
                    {str==""?(
                        <Shadow yes={type}/>
                    ):(
                        <Shadow str={str}/>
                    )}
                    
                    

                    {/* 3d Object */}    
                    <div className="container">
                        <Shapes 
                            isHover={isHover}
                            isPress={isPress}
                            mouseX={mouseX}
                            mouseY={mouseY}
                            type={type}
                            path={path}
                            str={str}
                        />
                    </div>
                
                </motion.div>
                
                {/* 글자 */}
                <motion.div
                    variants={{
                        hover:{ scale:0.85, color:"#000" },
                        press:{ scale:1.1 }
                    }}
                    className="label"
                >
                    {text}
                </motion.div>

            </motion.button>
        </MotionConfig>
    )

}

export const changeColor = (text,str) =>{
    if(text==="Yes"){
        return "shapes Yes";
    }
    else if(text==="No"){
        return "shapes No";
    }
    else if(str==="local"){
        return "shapes local"
    }
    else if(str==="trip"){
        return "shapes trip"
    }
    else if(str==="work"){
        return "shapes work"
    }

}

export const Shadow = ({yes, str})=>{
    if(str==""){
        if(yes){
            return (
                <>
                    <div className="blush green"/>
                    <div className="blush blue"/>
                    
                </>
            )
        }
        else {
            return (
                <>
                    <div className="blush pink"/>
                    <div className="blush red"/>
                </>
            )
        }  
    }
    else {
        if(str=="local"){
            return (
                <>
                    <div className="blush orange"/>
                    <div className="blush yellow"/>
                </>
            )
        }
        else if(str=="trip"){
            return (
                <>
                    <div className="blush green"/>
                    <div className="blush blue"/>
                </>
            )
        }
        else{
            return (
                <>
                    <div className="blush white"/>
                    <div className="blush grey"/>
                </>
            )
        }
    }
     
}

export const Shapes = ({isHover, isPress, mouseX, mouseY, type, path, str})=>{
    if(path=="/com-couple" || path=="/com-friend"){
        return (
            <Shape2
                isHover={isHover}
                isPress={isPress}
                mouseX={mouseX}
                mouseY={mouseY}
                yes={type}
            />
        )
    }
    else if(path=="/com-local" || path=="/com-trip" || path=="/com-work"){
        return (
            <Shape3
                isHover={isHover}
                isPress={isPress}
                mouseX={mouseX}
                mouseY={mouseY}
                str={str}
            />
        )
    }
    else {
        return (
            <Shape1
                isHover={isHover}
                isPress={isPress}
                mouseX={mouseX}
                mouseY={mouseY}
                yes={type}
            />
        )
    }
}