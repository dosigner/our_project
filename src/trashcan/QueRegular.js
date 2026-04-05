import '../style/App.css'

import {motion, AnimatePresence} from "framer-motion";
import { useEffect, useState } from 'react';
import { Button3d } from '../components/Motion3d/Button3d';

function Regular() {
    const [isVisible, setIsVisible] = useState(true);
    useEffect(
        ()=>setTimeout(()=>setIsVisible(false),6000),
    []);
    console.log(isVisible);
    const agent_msg = `저번에도 뵈었는데 오늘 또 찾아와주셔서 감사해요`;
    const question = `쌀쌀한 환절기에 좋은 음식 추천해드릴까요?`;

    return (
        <AnimatePresence mode="wait">
            {isVisible?
            (<motion.div className="talk"
                key="people"
                initial={false}
                exit={{opacity:0, x:-100, 
                    transition:{
                        duration:1
                    }
                }}>
                <motion.div className="question"
                    initial={{ opacity: 0, y:100 }}
                    animate={{ opacity: 1, y:0 }}
                    transition={{ duration: 1, delay:0.5}}
                >{agent_msg}
                </motion.div>
            </motion.div>)
            :
            (<motion.div className="agent"
                key="first"
                initial={false}
                exit={{opacity:0, x:-100, 
                    transition:{
                        duration:1
                    }
                }}
            >
                <motion.div className="question"
                    initial={{ opacity: 0, y:100 }}
                    animate={{ opacity: 1, y:0, transition: { 
                            duration: 1, 
                            delay:0.5
                        }
                    }}
                    
                >{question}
                </motion.div>

                <motion.div className="answer"
                    initial={{ opacity: 0, y:150 }}
                    animate={{ opacity: 1, y:0, transition:{
                            duration: 2,
                            delay:0.5
                        } 
                    }}
                >
                    <Button3d text="Yes" type={true} path="/order"/>
                    <Button3d text="No" type={false} path="/order"/>
                </motion.div>
                
            </motion.div>)
            }
        </AnimatePresence> 
    )
}

export default Regular;