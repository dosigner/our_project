import HTMLFlipBook from "react-pageflip";
import "../../style/order.css";

import {useRef, useState} from "react";
import {motion, AnimatePresence, MotionConfig} from "framer-motion";
import {isEmpty} from "lodash"
import { useNavigate } from "react-router-dom";

import { menuinfo } from "./menu";
import { ButtonOr3d } from "../../components/Motion3d/ButtonOr3d";

import {database} from "../../firebase";


const variants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 }
      }
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 }
      }
    }
}; 


function MyBook({setMenu}){
    const [selectItem, setSelectItem] = useState();
    const book = useRef();
    const [allSelectItem, setAllSelectItem] = useState({});
    let navigate = useNavigate();
    let sum = calcSum(allSelectItem);
    console.log(Object.keys(allSelectItem));
    console.log(allSelectItem);
    return (
        <>
            <HTMLFlipBook 
                width={540} 
                height={800}
                usePortrait={false}
                useMouseEvents={false}
                ref={book}
                flippingTime={800}
                showCover={false}
                  
            >
                {/* 1페이지 */}
                <div className="demoPage" data-density="hard">
                    <motion.h1
                        className='page-header'
                        initial={{opacity:0}}
                        animate={{opacity:0.8}}
                        transition={{duration:1, delay:2.8}}
                    >
                        여러분을 위한 메뉴
                    </motion.h1>
                    {menuinfo.filter(({special})=> special!==undefined).map((e)=>
                        <>
                            <motion.h3
                                initial={{opacity:0}}
                                animate={{opacity:1, transition:{duration:1,delay:2.8}}}
                                className="recommend"
                            >
                                {e.special}
                            </motion.h3>
                            <motion.div
                                className="menu-elem recommend"
                                initial={{opacity:0}}
                                animate={{opacity:1, transition:{duration:1, delay:2.8}}}
                                whileHover={{scale:1.2}}
                                whileTap={{scale:0.95}}
                                key={e.id}
                                onTap={()=>{
                                    setMenu(e.id);
                                    setSelectItem(e);
                                }}
                            >
                                <span className="menu-elem-name">{e.name}</span>
                                <span className="menu-elem-price">{e.price}</span>
                                
                            </motion.div>
                        </>
                    )}
                    
                </div>
                <div className="demoPage" data-density="hard">
                    <AnimatePresence>
                        {selectItem&&
                            <motion.div
                                initial={{opacity:0}}
                                animate={{opacity:0.8}}
                                transition={{duration:1.2}}
                                
                                key={selectItem?.name}
                            >
                                <motion.h1
                                    className="select-header"
                                >
                                    {selectItem?.name}
                                </motion.h1>
                                
                                <motion.p
                                    className="select-desc"
                                >
                                    {selectItem?.description}
                                </motion.p>
                                <motion.p
                                    className="select-extra"
                                >
                                    {selectItem?.extrainfo}
                                </motion.p>


                                <motion.div
                                    className="select-number"
                                >
                                    {(allSelectItem[selectItem?.name])&&`${allSelectItem[selectItem?.name]}개`}
                                </motion.div>
                                    <motion.div
                                        className="select-button-box"
                                    >
                                        <motion.button
                                            className="select-button"
                                            whileHover={{scale:1.4}}
                                            whileTap={{scale:0.95}}
                                            onTap={
                                                ()=>{
                                                    if(!allSelectItem[selectItem.name]){
                                                        let addName = {}
                                                        addName[selectItem.name] = 1;
                                                        setAllSelectItem({...allSelectItem, ...addName});
                                                    }
                                                    else{
                                                        let addName = {}
                                                        addName[selectItem.name] = allSelectItem[selectItem.name]+1
                                                        setAllSelectItem({...allSelectItem, ...addName})
                                                    }
                                                }
                                            }
                                        >
                                            추가
                                        </motion.button>
                                    <motion.button
                                        className="select-button"
                                        whileHover={{scale:1.4}}
                                        whileTap={{scale:0.95}}
                                        onTap={
                                            ()=>{
                                                let temp = allSelectItem;
                                                delete allSelectItem[selectItem.name];
                                                setAllSelectItem({...allSelectItem});
                                            }
                                        }
                                    >
                                        취소
                                    </motion.button>
                                </motion.div>
                            </motion.div>
                        }
                        {(!selectItem)&&
                            <motion.div
                                initial={{opacity:0}}
                                animate={{opacity:0.8}}
                                transition={{duration:1.2}}
                                
                                key={selectItem?.name}
                            >
                                <motion.h1
                                    className="select-header"
                                >
                                    주문내역
                                </motion.h1>
                            
                                
                                    {Object.keys(allSelectItem)?.map((e)=>{
                                        return(
                                            <motion.div
                                                className="order-elem"
                                            >
                                                <motion.div
                                                    className="order-elem-name"
                                                    key={e}
                                                >
                                                    {e}  x{allSelectItem[e]} 
                                                    
                                                </motion.div>
                                                <motion.div
                                                    className="order-elem-price"
                                                >
                                                    {menuinfo.filter(menu=>menu.name==e)[0]?.price*allSelectItem[e]}
                                                </motion.div>    
                                            </motion.div>
                                        )
                                    })}
                                    <motion.div
                                        className="total-price"
                                    >
                                        <div className="total-price-tag">총 금액</div>
                                        <div className="total-price-value">{sum}원</div>
                                    </motion.div>
                            </motion.div>

                        }
                    </AnimatePresence>
                </div>



                {/* 3페이지 */}
                <div className="demoPage" data-density="hard">
                    <motion.h1
                        className='page-header'
                    >Menu
                    </motion.h1>

                    {menuinfo.filter(({page})=> page==1).map((e)=>
                    <motion.div
                        className="menu-elem"
                        variants={variants}
                        whileHover={{scale:1.2,style:{color:"rgba(100,0,0,0.3)"}}}
                        whileTap={{scale:0.95}}
                        key={e.id}
                        onTap={()=>{
                            setMenu(e.id);
                            setSelectItem(e);
                        }}
                    >
                        <span className="menu-elem-name">{e.name}</span>
                        <span className="menu-elem-price">{e.price}</span>
                         
                    </motion.div>)}
                </div>
                <div className="demoPage" data-density="hard">
                    <AnimatePresence>
                        {selectItem&&
                            <motion.div
                                initial={{opacity:0}}
                                animate={{opacity:0.8}}
                                transition={{duration:1.2}}
                                
                                key={selectItem?.name}
                            >
                                <motion.h1
                                    className="select-header"
                                >
                                    {selectItem?.name}
                                </motion.h1>
                                
                                <motion.p
                                    className="select-desc"
                                >
                                    {selectItem?.description}
                                </motion.p>
                                <motion.p
                                    className="select-extra"
                                >
                                    {selectItem?.extrainfo}
                                </motion.p>


                                <motion.div
                                    className="select-number"
                                >
                                    {(allSelectItem[selectItem?.name])&&`+ ${allSelectItem[selectItem?.name]}개`}
                                </motion.div>
                                    <motion.div
                                        className="select-button-box"
                                    >
                                        <motion.button
                                            className="select-button"
                                            whileHover={{scale:1.4}}
                                            whileTap={{scale:0.95}}
                                            onTap={
                                                ()=>{
                                                    if(!allSelectItem[selectItem.name]){
                                                        let addName = {}
                                                        addName[selectItem.name] = 1;
                                                        setAllSelectItem({...allSelectItem, ...addName});
                                                    }
                                                    else{
                                                        let addName = {}
                                                        addName[selectItem.name] = allSelectItem[selectItem.name]+1
                                                        setAllSelectItem({...allSelectItem, ...addName})
                                                    }
                                                }
                                            }
                                        >
                                            추가
                                        </motion.button>
                                    <motion.button
                                        className="select-button"
                                        whileHover={{scale:1.25}}
                                        whileTap={{scale:0.95}}
                                        onTap={
                                            ()=>{
                                                let temp = allSelectItem;
                                                delete allSelectItem[selectItem.name];
                                                setAllSelectItem({...allSelectItem});
                                            }
                                        }
                                    >
                                        취소
                                    </motion.button>
                                </motion.div>
                            </motion.div>
                        }
                        {(!selectItem)&&
                            <motion.div
                                initial={{opacity:0}}
                                animate={{opacity:0.8}}
                                transition={{duration:1.2}}
                                
                                key={selectItem?.name}
                            >
                                <motion.h1
                                    className="select-header"
                                >
                                    주문내역
                                </motion.h1>
                            
                                
                                    {Object.keys(allSelectItem)?.map((e)=>{
                                        return(
                                            <motion.div
                                                className="order-elem"
                                            >
                                                <motion.div
                                                    className="order-elem-name"
                                                    key={e}
                                                >
                                                    {e}  x{allSelectItem[e]} 
                                                    
                                                </motion.div>
                                                <motion.div
                                                    className="order-elem-price"
                                                >
                                                    {menuinfo.filter(menu=>menu.name==e)[0]?.price*allSelectItem[e]}
                                                </motion.div>    
                                            </motion.div>
                                        )
                                    })}
                                    <motion.div
                                        className="total-price"
                                    >
                                        <div className="total-price-tag">총 금액</div>
                                        <div className="total-price-value">{sum}원</div>
                                    </motion.div>

                            </motion.div>

                        }
                    </AnimatePresence>
                </div>

                {/* 5페이지 */}
                <div className="demoPage" data-density="hard">
                    <motion.h1
                        className='page-header'
                    >Menu
                    </motion.h1>
                    
                    {menuinfo.filter(({page})=> page==2).map((e)=>
                    <motion.div
                        className="menu-elem"
                        variants={variants}
                        whileHover={{scale:1.2}}
                        whileTap={{scale:0.95}}
                        key={e.id}
                        onTap={()=>{
                            setMenu(e.id);
                            setSelectItem(e);
                        }}
                    >
                        <span className="menu-elem-name">{e.name}</span>
                        <span className="menu-elem-price">{e.price}</span>
                         
                    </motion.div>)}
                </div>


                <div className="demoPage" data-density="hard">
                    <AnimatePresence>
                        {selectItem&&
                            <motion.div
                                initial={{opacity:0}}
                                animate={{opacity:0.8}}
                                transition={{duration:1.2}}
                                
                                key={selectItem?.name}
                            >
                                <motion.h1
                                    className="select-header"
                                >
                                    {selectItem?.name}
                                </motion.h1>
                                
                                <motion.p
                                    className="select-desc"
                                >
                                    {selectItem?.description}
                                </motion.p>
                                <motion.p
                                    className="select-extra"
                                >
                                    {selectItem?.extrainfo}
                                </motion.p>


                                <motion.div
                                    className="select-number"
                                >
                                    {(allSelectItem[selectItem?.name])&&`${allSelectItem[selectItem?.name]}개`}
                                </motion.div>
                                    <motion.div
                                        className="select-button-box"
                                    >
                                        <motion.button
                                            className="select-button"
                                            whileHover={{scale:1.4}}
                                            whileTap={{scale:0.95}}
                                            onTap={
                                                ()=>{
                                                    if(!allSelectItem[selectItem.name]){
                                                        let addName = {}
                                                        addName[selectItem.name] = 1;
                                                        setAllSelectItem({...allSelectItem, ...addName});
                                                    }
                                                    else{
                                                        let addName = {}
                                                        addName[selectItem.name] = allSelectItem[selectItem.name]+1
                                                        setAllSelectItem({...allSelectItem, ...addName})
                                                    }
                                                }
                                            }
                                        >
                                            추가
                                        </motion.button>
                                    <motion.button
                                        className="select-button"
                                        whileHover={{scale:1.4}}
                                        whileTap={{scale:0.95}}
                                        onTap={
                                            ()=>{
                                                let temp = allSelectItem;
                                                delete allSelectItem[selectItem.name];
                                                setAllSelectItem({...allSelectItem});
                                            }
                                        }
                                    >
                                        취소
                                    </motion.button>
                                </motion.div>
                            </motion.div>
                        }
                        {(!selectItem)&&
                            <motion.div
                                initial={{opacity:0}}
                                animate={{opacity:0.8}}
                                transition={{duration:1.2}}
                                
                                key={selectItem?.name}
                            >
                                <motion.h1
                                    className="select-header"
                                >
                                    주문내역
                                </motion.h1>
                            
                                
                                    {Object.keys(allSelectItem)?.map((e)=>{
                                        return(
                                            <motion.div
                                                className="order-elem"
                                            >
                                                <motion.div
                                                    className="order-elem-name"
                                                    key={e}
                                                >
                                                    {e}  x{allSelectItem[e]} 
                                                    
                                                </motion.div>
                                                <motion.div
                                                    className="order-elem-price"
                                                >
                                                    {menuinfo.filter(menu=>menu.name==e)[0]?.price*allSelectItem[e]}
                                                </motion.div>    
                                            </motion.div>
                                        )
                                    })}
                                    <motion.div
                                        className="total-price"
                                    >
                                        <div className="total-price-tag">총 금액</div>
                                        <div className="total-price-value">{sum}원</div>
                                    </motion.div>

                            </motion.div>

                        }
                    </AnimatePresence>
                </div>

                <div className="demoPage">
                        
                </div>


            </HTMLFlipBook>


            <motion.div
                className="button-box"
            >
                <motion.div 
                    className="flip-button"
                    onClick={()=>book.current.pageFlip().flipPrev()}>
                    <ButtonOr3d text="이전 장"/>
                </motion.div>
                
                <AnimatePresence mode="wait">
                    {selectItem&&
                    <motion.div
                        className="order-list-btn"
                        onTap={()=>{setSelectItem(0)}}
                        exit={{opacity:0}}
                        key="list"
                    >
                        <ButtonOr3d text="주문서 보기"/>
                    </motion.div>
                    }
                    {((!selectItem)&&!isEmpty(allSelectItem))&&
                        <motion.button
                            className=""
                            onTap={()=>{
                                const nameRef = database.ref("/place/tables/table1");
                                nameRef.update({
                                    order : allSelectItem
                                });
                                navigate("/mood")
                            }}
                            whileHover={{scale:1.2}}
                            whileTap={{scale:0.95}}
                            exit={{opacity:0}}
                            key="order"
                        >
                            주문하기
                        </motion.button>

                    }
                </AnimatePresence>


                <motion.div
                    className="flip-button"
                    
                    onClick={()=>book.current.pageFlip().flipNext()}>
                    <ButtonOr3d text="다음 장"/>
                </motion.div>
            </motion.div>
            

            
            <motion.div
                className="select-food-box"
            >
                <AnimatePresence mode="wait">
                    {selectItem&&
                        <motion.img
                            className="select-food-img"
                            
                            initial={{y:-300, opacity:0}}
                            animate={{y:0, opacity:0.85, transition:{duration:1.2}}}
                            whileHover={{scale:1.1, opacity:1}}
                            whileTap={{scale:0.9, opacity:0.7}}
                            exit={{opacity:0, y:-300, transition:{duration:0.75}}}
                            src={`img/food/${selectItem?.name}.png`}
                            key={selectItem?.name}
                        />
                    }
                </AnimatePresence>
            </motion.div>
        </>
        
    )
            
}

export const calcSum =(allSelectItem)=>{
    let sum=0;
    Object.keys(allSelectItem)?.map((e)=>{
        sum+=menuinfo.filter(menu=>menu.name==e)[0]?.price*allSelectItem[e];
    });

    return sum;
}

export {MyBook}