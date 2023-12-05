import { useGLTF, Float } from "@react-three/drei";
import { Projects } from "./Projects";

export const Tablet = () => {
    const tablet = useGLTF('./tablet.gltf')

    return (
        <>
    
                <Float rotationIntensity={.04}>
                    <primitive object={tablet.scene} position={[0,-15,1.9]} rotation-z={.02}>
                       <Projects />
                    </primitive>
                    
                    </Float>

      
        </>
    )
    
}

useGLTF.preload('./tablet.gltf')