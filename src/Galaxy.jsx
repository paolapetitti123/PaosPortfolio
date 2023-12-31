import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useMemo, useRef } from "react";

const CustomGeometryParticles = (props) => {
    const {count} = props;

    const points = useRef();

    const particlesPosition = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const distance = 20;

        for(let i=0; i < count; i++){
            const theta = THREE.MathUtils.randFloatSpread(360);
            const phi = THREE.MathUtils.randFloatSpread(360);

            let x = distance * Math.sin(theta) * Math.cos(phi);
            let y = distance * Math.sin(theta) * Math.sin(phi);
            let z = distance * Math.cos(theta);

            positions.set([x,y,z], i *3);
        }

        return positions;
    }, [count]);


    useFrame((state)=> {
        const {clock} = state;
    
        for(let i = 0; i<count; i++){
            const i3 = i *3;
    
            points.current.geometry.attributes.position.array[i3] += Math.sin(clock.elapsedTime + Math.random() * 10) * 0.001;
            points.current.geometry.attributes.position.array[i3 + 1] += Math.cos(clock.elapsedTime + Math.random() * 10) * 0.001;
            points.current.geometry.attributes.position.array[i3 + 2] += Math.sin(clock.elapsedTime + Math.random() * 10) * 0.005;
    
            points.current.geometry.attributes.position.needsUpdate = true;
        }
    });
    
    return (
        <points ref={points}>
            <bufferGeometry>
                <bufferAttribute 
                    attach="attributes-position"
                    count={particlesPosition.length / 3}
                    array={particlesPosition}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial size={0.05} color={[1.5,1.5,1.5]} toneMapped={true} sizeAttenuation depthWrite={true} />
        </points>
    );
};


const Scene = () => {
return (
    <CustomGeometryParticles count={2000} />
)
}


export default Scene;
