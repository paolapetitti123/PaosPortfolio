import { useFrame } from '@react-three/fiber';
import { useRef, useEffect } from 'react'
import { useGLTF } from "@react-three/drei";

export const PlanetThree = ({position, onClick}) => {
    const planet1 = useGLTF('./planetOne.gltf')
    
    const planetRotation = useRef();

    useFrame((state, delta) => {
        planetRotation.current.rotation.y += delta * 0.4
        planetRotation.current.rotation.z += delta * 0.0004
    })



    return (<>

      <group ref={planetRotation} position={position} rotation-x={.2} onClick={onClick}>
            <primitive object={planet1.scene} />
      
    </group>
            
            
    </>
    )
}
useGLTF.preload('./planetOne.gltf')