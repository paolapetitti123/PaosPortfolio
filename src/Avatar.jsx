/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/
import { useAnimations, useFBX, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { motion } from "framer-motion-3d";

export function Avatar(props) {
    const{ animation, section } = props;

  const group = useRef();
  const { nodes, materials } = useGLTF("/astronaut.gltf");

  
  const { animations: floatingAnimation } = useFBX("/animations/Floating-01.fbx");
  const { animations: fallingAnimation } = useFBX("/animations/Floating-02.fbx");
  const { animations: floating02Animation } = useFBX("/animations/Floating-03.fbx");
  const { animations: wavingAnimation } = useFBX("/animations/Waving.fbx");

  floatingAnimation[0].name = "FloatingIdle";
  fallingAnimation[0].name = "Falling";
  floating02Animation[0].name = "FloatingIdle02";
  wavingAnimation[0].name = "Waving";


  const { actions } = useAnimations(
    [floatingAnimation[0], fallingAnimation[0], floating02Animation[0], wavingAnimation[0]], 
    group );

  useEffect(() => {
    actions[animation].reset().fadeIn(0.5).play();
    return () => {
      actions[animation].fadeOut(.5);
    };
  }, [animation]);



  return (
          <motion.group scale={[0,0,0]} animate={{ scale: section === 0 ? 1 : 1}}>
    <group ref={group} {...props} dispose={null}>

      <group name="Scene">
        <group name="Empty">
          <group name="Armature" scale={0.01}>
            <skinnedMesh
              name="Body"
              geometry={nodes.Body.geometry}
              material={materials["suit.001"]}
              skeleton={nodes.Body.skeleton}
            />
            <skinnedMesh
              name="Glass"
              geometry={nodes.Glass.geometry}
              material={materials["Material.002"]}
              skeleton={nodes.Glass.skeleton}
            />
            <group name="Hands001">
              <skinnedMesh
                name="Cube009"
                geometry={nodes.Cube009.geometry}
                material={materials["suit.001"]}
                skeleton={nodes.Cube009.skeleton}
              />
              <skinnedMesh
                name="Cube009_1"
                geometry={nodes.Cube009_1.geometry}
                material={materials["highlight.001"]}
                skeleton={nodes.Cube009_1.skeleton}
              />
            </group>
            <group name="Hands002">
              <skinnedMesh
                name="Cube011"
                geometry={nodes.Cube011.geometry}
                material={materials["suit.001"]}
                skeleton={nodes.Cube011.skeleton}
              />
              <skinnedMesh
                name="Cube011_1"
                geometry={nodes.Cube011_1.geometry}
                material={materials["highlight.001"]}
                skeleton={nodes.Cube011_1.skeleton}
              />
            </group>
            <group name="Head">
              <skinnedMesh
                name="Cube004"
                geometry={nodes.Cube004.geometry}
                material={materials["suit.001"]}
                skeleton={nodes.Cube004.skeleton}
              />
              <skinnedMesh
                name="Cube004_1"
                geometry={nodes.Cube004_1.geometry}
                material={materials["highlight.001"]}
                skeleton={nodes.Cube004_1.skeleton}
              />
            </group>
            <group name="Legs">
              <skinnedMesh
                name="Cube008"
                geometry={nodes.Cube008.geometry}
                material={materials["suit.001"]}
                skeleton={nodes.Cube008.skeleton}
              />
              <skinnedMesh
                name="Cube008_1"
                geometry={nodes.Cube008_1.geometry}
                material={materials["highlight.001"]}
                skeleton={nodes.Cube008_1.skeleton}
              />
            </group>
            <group name="Legs001">
              <skinnedMesh
                name="Cube010"
                geometry={nodes.Cube010.geometry}
                material={materials["suit.001"]}
                skeleton={nodes.Cube010.skeleton}
              />
              <skinnedMesh
                name="Cube010_1"
                geometry={nodes.Cube010_1.geometry}
                material={materials["highlight.001"]}
                skeleton={nodes.Cube010_1.skeleton}
              />
            </group>
            <skinnedMesh
              name="Torus"
              geometry={nodes.Torus.geometry}
              material={materials["highlight.001"]}
              skeleton={nodes.Torus.skeleton}
            />
            <primitive object={nodes.mixamorigHips} />
          </group>
        </group>
      </group>
      
    </group>
    </motion.group>
  );
}

useGLTF.preload("/astronaut.gltf");
