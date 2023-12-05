import { Suspense, useEffect, useState } from "react";
import Astronaut from "./Astronaut";
import Galaxy from "./Galaxy"
import { Bloom, DepthOfField, EffectComposer } from "@react-three/postprocessing";
import { motion } from "framer-motion-3d";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";
import { framerMotionConfig } from "./motionConfig";
import { useScroll, PresentationControls } from "@react-three/drei";
import { PlanetFour  } from "./PlanetFour";
import { PlanetOne } from "./PlanetOne";
import { PlanetTwo } from "./PlanetTwo";
import { PlanetThree } from "./PlanetThree";
import { Tablet } from './Tablet'


export default function Experience(props)
{
    const { menuOpened} = props;
    const {viewport} = useThree();
    
    const data = useScroll();
    const [section, setSection] = useState(0);


    const cameraPositionX = useMotionValue();
    const cameraLookAtX = useMotionValue();



    useEffect(() => {
        animate(cameraPositionX, menuOpened ? -4 : 0, {
            ...framerMotionConfig
        });
        animate(cameraLookAtX, menuOpened ? 4 : 0, {
            ...framerMotionConfig
        });
    },[menuOpened]);

    const [characterAnimation, setCharacterAnimation ] = useState(1);

    useEffect(() => {
        setCharacterAnimation(0);
        setTimeout(() => {
            setCharacterAnimation(section === 0 ? 1 : 2);
        },700);
    }, [section])

    useFrame((state) => {
        state.camera.position.x =cameraPositionX.get();
        state.camera.lookAt(cameraLookAtX.get(), 0,0);

        let currSection = Math.floor(data.scroll.current * data.pages);
        if(currSection > 3){
            currSection = 3;
            setCharacterAnimation(4);
        }

        if(currSection == 2 ){
            setCharacterAnimation(1);
        }

        if (currSection !== section){
            setSection(currSection);
        }

    });


    return <>
      {/* <Projects /> */}
        <ambientLight intensity={3} />
        
        <motion.group position={[0,1,1]} scale={[1,1,1]} rotation-y={-Math.PI / 4} animate={{ y: section === 0 ? 0 : 1 }}>
            <Galaxy />
        </motion.group>
        <EffectComposer disableNormalPass multisampling={8}>
            <Bloom luminanceThreshold={1.1} mipmapBlur />
            <DepthOfField 
            focusDistance={0.03}
            focusLength={0.030}
             />
        </EffectComposer>

        <Suspense>
     
            <motion.group
                    position={[0,-2,1]}
                    rotation={[0.01,-0.5,0]}
                    animate={"" + section}
                    transition={{
                        duration: 1
                    }}
                    variants={{
                        0: {
                        scaleX: 0.9,
                        scaleY: 0.9,
                        scaleZ: 0.9,
                        x: 0.2,
                        y: -1.5,
                        rotateY: -0.2 
                        },
                        1: {
                            x: 2,
                            y: -viewport.height - 2,
                            z: 1,
                            rotateX: 0,
                            rotateY: -0.4,
                            rotateZ: 0
                        },
                        2: {
                            x: -5,
                            y: -viewport.height * 2 - .5,
                            z: 0,
                            rotateX: 0,
                            rotateY: 1,
                            rotateZ: 0
                        },
                        3: {
                            x: 1,
                            y: -viewport.height *3 - 1.9,
                            z: 1,
                            rotateX: 0.2,
                            rotateY: -0.2,
                            rotateZ: 0,
                        }
                    }}
            >
                
                    <Astronaut animationIndex={characterAnimation} section={section} />
                    
            </motion.group>
            
            <group>
            <PresentationControls
                polar={[-0.4, 0.2]}
                azimuth={[-.25, 0.25]}
                config={{mass:2, tension:400}}
                snap
                >
            <PlanetOne position={[4,0,0]} />
            </PresentationControls>

            <PresentationControls
                polar={[-0.4, 0.2]}
                azimuth={[-.25, 0.25]}
                config={{mass:2, tension:400}}
                snap
                >
            <PlanetTwo position={[-2,-6,-2]} />
            </PresentationControls>

            <PresentationControls
                polar={[-0.4, 0.1]}
                azimuth={[-.1, 0.1]}
                config={{mass:2, tension:400}}
                snap
                >
            <PlanetThree position={[6,-15,-2]} />
            </PresentationControls>
            </group>
            
            <PlanetFour />
             <Tablet />
        </Suspense>
       
    </>
}
