import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react'
import { Float, useGLTF } from "@react-three/drei";

export const Ufo = ({position}) => {
    const ufo = useGLTF('./ufo.gltf')
    
    const ufoRotation = useRef();
    const downwardSpiral = { enabled: true, maxY: -15, minY: 2 }; // Adjust maxY and minY as needed

    useFrame((state, delta) => {
        ufoRotation.current.rotation.y += delta * 1.5
        ufoRotation.current.rotation.z += delta * 0.0009

        const radius = 7; // Adjust the radius as needed
        const speed = 0.1; // Adjust the speed of the spiral
        const angle = ufoRotation.current.rotation.y * speed;
    
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        if (downwardSpiral.enabled && ufoRotation.current.position.y <= downwardSpiral.maxY) {
            downwardSpiral.enabled = false;
          } else if (!downwardSpiral.enabled && ufoRotation.current.position.y >= downwardSpiral.minY) {
            downwardSpiral.enabled = true;
          }

        // Update the y-coordinate based on the spiral direction
        const yDirection = downwardSpiral.enabled ? -1 : 1;
        ufoRotation.current.position.y += yDirection * delta * 0.1;

        // Apply the translation to the group's position
        ufoRotation.current.position.x = x;
        ufoRotation.current.position.z = z;
    })



    return (<>
    <Float 
    floatIntensity={5}  
    >
      <group ref={ufoRotation} position={[-2,1,2]}>
            <primitive object={ufo.scene}  />
    </group>
            </Float>
            
    </>
    )
}
useGLTF.preload('./ufo.gltf')


