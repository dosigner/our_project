import '../../style/order.css';
import './button.css';

import { motion, MotionConfig, useMotionValue } from "framer-motion";
import {useState} from 'react';
import {transition, scale_state} from "./settings";

import {ShapeOrd} from "./Shapes/ShapeOrd";

import useMeasure from 'react-use-measure';

export const ButtonOr3d = ({text, type}) => {
    // ref는 motion.button을 참조.
    // bounds는 button 크기를 측정한 결과
    const [ref, bounds] = useMeasure({scroll:false});

    // Event에 대한 State
    const [isHover, setIsHover] = useState(false);
    const [isPress, setIsPress] = useState(false);

    // 1. MotionValue들은 useMotionValue hook으로 생성
    // 2. 인자로 MotionValue의 초기 값이 들어감
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const resetMousePosition = ()=>{
        //3. set method로 Motion Value 값 update
        mouseX.set(0);
        mouseY.set(0);
    }
    return (
        <MotionConfig transition={transition}>
            <motion.button
                 className={(text=="주문서 보기")?"order-list-3dbutton":"page-button"}
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
                }}
                onTapCancel={()=>{setIsPress(false);}}
                
                /* Pointer가 버튼 안에 들어왔을 때 */
                onPointerMove={(e)=>{
                    mouseX.set(-(e.clientX - bounds.x - bounds.width/2));
                    mouseY.set((e.clientY - bounds.y - bounds.height/2));
                }}
                >
                    <motion.div
                        className={changeColor(text)}
                        variants={{
                            rest: {opacity:0},
                            hover: {opacity:1},
                        }}
                    >
                        <Shadow text={text}/>

                        {/* 3d Object */}
                        <div className="container">
                            <ShapeOrd
                                isHover={isHover}
                                isPress={isPress}
                                mouseX={mouseX}
                                mouseY={mouseY}
                                text={text}
                            />
                        </div>

                    </motion.div>

                    {/* 글자 */}
                    <motion.div
                        variants={{
                            hover:{scale:0.85, color:"#000"},
                            press:{scale:1.1}
                        }}
                        className={(text=="주문서 보기")?"label list":"label page"}
                    >
                        {text}
                    </motion.div>

            </motion.button>
        </MotionConfig>
    )
}

// 버튼 색깔 바꾸긴
const changeColor = (text) =>{
    if(text==="이전 장"){
        return "shapes page-btn";
    }
    else if(text==="다음 장"){
        return "shapes page-btn";
    }
    else if(text==="주문서 보기"){
        return "shapes list-btn"
    }
}

// 버튼 그림자 바꾸기
const Shadow = ({text})=>{
    if(text=="다음 장"){
        return (
            <>
                <div className="blush-order mint"/>
                <div className="blush-order blueR"/>
            </>
        )
    }
    else if(text=="이전 장"){
        return (
            <>
                <div className="blush-order blue"/>
                <div className="blush-order mintR"/>
            </>
        )
    }
    else if(text=="주문서 보기"){
        return (
            <>

            </>
        )
    }
}
