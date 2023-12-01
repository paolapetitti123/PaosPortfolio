import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react'
import { useGLTF } from "@react-three/drei";

export const PlanetOne = ({position, onClick }) => {
    const planet1 = useGLTF('./planet-2.gltf')
    
    const planetRotation = useRef();

    useFrame((state, delta) => {
        planetRotation.current.rotation.y += delta * 0.4
        planetRotation.current.rotation.z += delta * 0.0004

    })



    return (<>

      <group ref={planetRotation} position={position} onClick={onClick}>
            <primitive object={planet1.scene}  />
    </group>
            
            
    </>
    )
}
useGLTF.preload('./planet-2.gltf')


