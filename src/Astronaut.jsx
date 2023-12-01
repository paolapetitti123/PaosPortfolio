import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import { useControls } from "leva";
import { motion } from "framer-motion-3d";

export default function Astronaut(props)
{
    const {animationIndex, section } = props;
    const model = useGLTF('./astronaut.gltf')
    const animations = useAnimations(model.animations, model.scene);
    

    useEffect(() => {
        const action = animations.actions[animations.names.at(animationIndex)]
        action.reset().fadeIn(0.5).play()

        return() => {
            action.fadeOut(0.5)
        }

    }, [animationIndex])

    return <>
    <motion.group scale={[0,0,0]} animate={{ scale: section === 0 ? 1 : 1}}>
        <primitive  {...props} object={model.scene}  rotation-y={[-.1]}/>
    </motion.group>
            
    </>
     
}

useGLTF.preload('./astronaut.gltf')