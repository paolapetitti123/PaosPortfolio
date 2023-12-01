import { Image, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";
import { motion } from "framer-motion-3d";
import { useAtom } from "jotai";
import { useEffect, useRef } from "react";
import { atom } from "jotai";
import { MeshBasicMaterial, BufferGeometry, BufferAttribute  } from 'three'
import { useState } from "react";

// 25 characters

export const videoProjects = [
    {
        projectName: "The Evolution of Nintendo",
        url: "https://vimeo.com/635752043",
        image: "projects/theEvolutionOfNintendo.png",
        description: `A personal project where I created all vector files for the consoles in Adobe Illustrator and made this video in After Effects.`
    },
    {
        projectName: `              Punk Tactics       `,
        url: "https://vimeo.com/890115028",
        image: "projects/punkTactics.png",
        description: `With this video, I experimented with sketchbook stop motion style editing, a style that I had wanted to learn for so long.`
    }
]

export const gameProjects = [
    {
        projectName: `            Analog Horror      `,
        url: "https://paolapetitti123.github.io/Analog-Horror-Game/",
        image: "projects/wakeup.png",
        description: `As my first Three.js project in compination with P5.js, I designed a simple scenario inspired by analog horror games.`
    },
    {
        projectName: `        Monstrous Mansion    `,
        url: "https://paolapetitti123.itch.io/monstrous-mansion",
        image: "projects/monstrousMansion.png",
        description: `During my first Game Jam in a team of 3, we could only use one button, so we made an escape game using the spacebar. `
    }
]

export const threeDmodeling = [
    {
        projectName: `                  Wake Up`,
        url: "https://vimeo.com/726373983",
        image: "projects/wakeupRender.png",
        description: `With my 3D modelling skills, I created a short animation based on ATEEZ music videos' lore. It took me four months to complete this project entirely on my own in Blender. `
    },
    {
        projectName: `             Are You There?`,
        url: "https://vimeo.com/790260445",
        image: "projects/areYouThere.png",
        description: `The animation is based on the lore in Ateez's music.      I thoroughly enjoy creating these and learning new techniques for modeling and animating in Blender.  `
    },
];


const Project = (props) => {
    const {project, highlighted} = props;
    
    const activeImage = useRef();
    const activeTitle = useRef();
    const activeDesc = useRef();
    const bgOpacity = useMotionValue(1);

    // Define a global variable for the transparent material
    const transparentMaterial = new MeshBasicMaterial({ transparent: true, opacity: 0 });


    useEffect(() => {
        animate(bgOpacity, highlighted ? 1 : 0)
    }, [highlighted]);

    useFrame(() => {
        // background.current.material.opacity = bgOpacity.get();
        activeImage.current.material.opacity = bgOpacity.get();
        activeTitle.current.material.opacity = bgOpacity.get();
        activeDesc.current.material.opacity = bgOpacity.get();

    })

    return (
        <>
    
        <group {...props}>
            <Image  ref={activeImage} transparent opacity={0.5} scale={[1.7, 1,1]} url={project.image} position={[14.4,14.56,14.35]} onClick={() => window.open(project.url, "_blank")} />
            <Text material={transparentMaterial} ref={activeTitle} transparent   maxWidth={[2.5]} anchorX={"left"} anchorY={"top"} fontSize={[0.14]} color="white" position={[13.48,15.27,14.35]} font={'fonts/johnnyfever.otf'} >{project.projectName} </Text>
            <Text material={transparentMaterial} ref={activeDesc} transparent  maxWidth={[2.5]} anchorX={"left"} anchorY={"top"} fontSize={[0.07]} color="white"  position={[13.3,14.01,14.34]} lineHeight={1.3} font={'fonts/SpaceMono-Regular.ttf'} s >{project.description} </Text>
        
        </group>
            
        </>
    )
}

export const currentProjectAtom = atom(Math.floor(videoProjects.length / 2));

export const Projects = () => {
    const { viewport } = useThree();
    const [currentProject, setCurrentProject] = useAtom(currentProjectAtom);
    const [currentCategory, setCurrentCategory] = useState("video");

    const handleCategoryChange = (category) => {
        setCurrentCategory(category);
        setCurrentProject(Math.floor(videoProjects.length / 2));
    };

    return (
        <group position={-viewport.height * 2 + 1}>
            {/* Category buttons */}
            <mesh
                position={[13.25, 13.5, 14.444]} 
                scale={[0.17,0.07,0.2]}
                onClick={() => handleCategoryChange("video")}
            >
                <planeGeometry args={[3.7, 2.1, 32,32]}  />
                <Text transparent   maxWidth={[2.5]} anchorX={"center"} anchorY={"bottom"} fontSize={[1]} color="white" font={'fonts/johnnyfever.otf'} position={[0,-0.6,0.1]} >Video</Text>
                <meshBasicMaterial color={currentCategory === "video" ? "rgb(255,0,0)" : "rgb(139,110,255)"} transparent opacity={0.3} />
            </mesh>

            <mesh
                position={[14.35, 13.6, 14.444]} 
                scale={[0.17,0.07,0.2]}
                onClick={() => handleCategoryChange("game")}
            >
                <planeGeometry args={[3.7, 2.1]} />
                <Text transparent   maxWidth={[2.5]} anchorX={"center"} anchorY={"bottom"} fontSize={[1]} color="white" font={'fonts/johnnyfever.otf'} position={[0,-0.6,0.1]} >Games</Text>
                <meshBasicMaterial color={currentCategory === "game" ? "rgb(255,0,0)" : "rgb(139,110,255)"} transparent opacity={0.3} />
            </mesh>

            <mesh
                position={[15.45, 13.5, 14.444]} 
                scale={[0.17,0.07,0.2]}
                onClick={() => handleCategoryChange("threeDmodeling")}
            >
                <planeGeometry args={[3.7, 2.1]} />
                <Text transparent   maxWidth={[2.5]} anchorX={"center"} anchorY={"bottom"} fontSize={[1]} color="white" font={'fonts/johnnyfever.otf'} position={[0,-0.6,0.1]} >3D</Text>
                <meshBasicMaterial color={currentCategory === "threeDmodeling" ? "rgb(255,0,0)" : "rgb(139,110,255)"} transparent opacity={0.3} />
            </mesh>

            {/* Project cards */}
            {currentCategory === "video" &&
                videoProjects.map((project, index) => (
                    <motion.group key={"project_" + index} position={[index * 1.4, 0, 0.3]}
                        animate={{
                            x: (index - currentProject) * 1.4,
                            z: currentProject === index ? 0.2 : 0,
                        }}>
                        <Project project={project} highlighted={index === currentProject} opacity={0.5} />
                    </motion.group>
                ))
            }

            {currentCategory === "game" &&
                gameProjects.map((project, index) => (
                    <motion.group key={"project_" + index} position={[index * 1.4, 0, 0.3]}
                        animate={{
                            x: (index - currentProject) * 1.4,
                            z: currentProject === index ? 0.2 : 0,
                        }}>
                        <Project project={project} highlighted={index === currentProject} opacity={0.5} />
                    </motion.group>
                ))
            }

            {currentCategory === "threeDmodeling" &&
                threeDmodeling.map((project, index) => (
                    <motion.group key={"project_" + index} position={[index * 1.4, 0, 0.3]}
                        animate={{
                            x: (index - currentProject) * 1.4,
                            z: currentProject === index ? 0.2 : 0,
                        }}>
                        <Project project={project} highlighted={index === currentProject} opacity={0.5} />
                    </motion.group>
                ))
            }
        </group>
    );
}