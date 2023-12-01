import { useFrame } from '@react-three/fiber';
import { useRef } from 'react'
import { useGLTF } from "@react-three/drei";

export const PlanetFour = () => {
    const planet1 = useGLTF('./planet-4.gltf')
    
    const planetRotation = useRef();

    return (<>

      <group position={[1,-25.8,1]} scale={[1.2,1,1.2]}>
            <primitive object={planet1.scene}  />
      
    </group>
            
            
    </>
    )
}
useGLTF.preload('./planet-4.gltf')
