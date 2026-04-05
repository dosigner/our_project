import '../style/App.css';
import '../style/manual.css'
import { useEffect, useState } from 'react';
import {motion, AnimatePresence} from 'framer-motion';

import {list, item} from "../animations/ListSetting"
import { useNavigate } from "react-router-dom";

// database에 읽을 거 가져오기
import {database} from "../firebase";

function Manual() {
  const [isVisible, setIsVisible] = useState(true);
  let navigate = useNavigate();

  
  useEffect(
    ()=>{
      setTimeout(()=>setIsVisible(false),10000);
      setTimeout(()=>navigate("/intro"),20000);
    }
  ,[]);

  return (
    <motion.div 
        className="App"
        exit={{ opacity: 0, transition: { duration: 1 } }}
    >
      <AnimatePresence mode="wait">
            {isVisible ?
            (<motion.div className="talk"
                key="move"
                initial={false}
                exit={{opacity:0, x:-100, 
                    transition:{
                        duration:1
                    }
                }}
              >
                <motion.div className="guide_text"
                  initial={{ opacity: 0, y:100 }}
                  animate={{ opacity: 1, y:0, transition: { 
                          duration: 1, 
                          delay:0.5
                      }
                  }}
                >손가락을 펴서 포인터를 움직여보세요
                </motion.div>
                
                <motion.ul
                  initial="hidden"
                  animate="visible"
                  variants={list}
                  className="img_hand"
                  whileHover="hover"
                >

                  <motion.li variants={item}
                  >
                    <img width="350px" src="img/use_hand/Frame4.png" />
                  </motion.li>
                  <motion.li variants={item}
                  >
                    <img width="350px" src="img/use_hand/Frame2.png"/>
                  </motion.li>
                  <motion.li variants={item}
                  >
                    <img width="350px" src="img/use_hand/Frame3.png"/>
                  </motion.li>
                  <motion.li variants={item}
                  >
                    <img width="350px" src="img/use_hand/Frame4.png"/>
                  </motion.li>

                </motion.ul>
            </motion.div>
            ):
            (<motion.div className="talk"
              key="click"
              initial={false}
              exit={{opacity:0, x:-100, 
                  transition:{
                      duration:1
                  }
              }}
            >
              <motion.div className="guide_text"
                initial={{ opacity: 0, y:100 }}
                animate={{ opacity: 1, y:0, transition: { 
                        duration: 1, 
                        delay:0.5
                    }
                }}
              >주먹을 쥐면 클릭할 수 있어요
              </motion.div>
              
              <motion.ul
                initial="hidden"
                animate="visible"
                variants={list}
                className="img_hand"
                whileHover="hover"
                whileTap="tap"
              >

                <motion.li variants={item}
                >
                  <img width="350px" src="img/use_hand/Frame5.png" />
                </motion.li>
                <motion.li variants={item}
                >
                  <img width="350px" src="img/use_hand/Frame6.png"/>
                </motion.li>
                <motion.li variants={item}
                >
                  <img width="350px" src="img/use_hand/Frame7.png"/>
                </motion.li>
                <motion.li variants={item}
                >
                  <img width="350px" src="img/use_hand/Frame8.png"/>
                </motion.li>

              </motion.ul>
            </motion.div>

            )
            }
        </AnimatePresence>
    </motion.div>
  )
}

export default Manual;