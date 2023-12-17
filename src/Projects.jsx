import { Image, Text, RoundedBox } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";
import { motion } from "framer-motion-3d";
import { useAtom } from "jotai";
import { useEffect, useRef } from "react";
import { atom } from "jotai";
import { MeshBasicMaterial } from 'three'
import { useState } from "react";


// 25 characters

export const videoProjects = [
    {
        projectName: `              Punk Tactics       `,
        url: "https://vimeo.com/890115028",
        image: "projects/punkTactics.png",
        description: `With this video, I experimented with sketchbook stop motion style editing, a style that I had wanted to learn for so long.`
    },
    {
        projectName: "  Nightmares Mini Lyric Video",
        url: "https://vimeo.com/687759825/",
        image: "projects/drinkIt.png",
        description: `One of my hobbies is creating short lyric videos to songs I am listening to at the time and this video is just one of many that I've made.`
    },
    {
        projectName: "  The Evolution of Nintendo",
        url: "https://vimeo.com/635752043",
        image: "projects/theEvolutionOfNintendo.png",
        description: `A personal project where I created all vector files for the consoles in Adobe Illustrator and made this video in After Effects.`
    },
    
    {
        projectName: "                 Borderline",
        url: "https://vimeo.com/895598240",
        image: "projects/borderline.png",
        description: `At the time I made this, there was a trend on TikTok where people made video edits to this song and so I had decided to give it a go and loved how it turned out.`
    }
]

export const gameProjects = [
    {
        projectName: `            Analog Horror      `,
        url: "https://paolapetitti123.github.io/Analog-Horror-Game/",
        image: "projects/wakeup.png",
        description: `This is my first Three.js game prototype I made in combination with P5.js, heavily inspired by analog horror games.`
    },
    {
        projectName: `        A Ghosts Revenge    `,
        url: "https://paolapetitti123.itch.io/a-ghosts-revenge",
        image: "projects/aGhostsRevenge.png",
        description: `In this Game Jam I was in a team of 3 again, but this time we could not have any text in the game. This game was made in Unity. `
    },
    {
        projectName: `        Monstrous Mansion    `,
        url: "https://paolapetitti123.itch.io/monstrous-mansion",
        image: "projects/monstrousMansion.png",
        description: `During my first Game Jam in a team of 3, we could only use one button, so we made an escape game using the spacebar in Unity.`
    },
    
    {
        projectName: `        Poisoned Inheritance    `,
        url: "https://paolapetitti123.itch.io/poisoned-inheritance",
        image: "projects/poison.png",
        description: `This is a roguelike 2D game jam project done in Unity, where the game theme had to be Memories and I was the main programmer of the team.`
    }
]

export const threeDmodeling = [
    {
        projectName: `     GOT7 Promotional Video`,
        url: "https://vimeo.com/711483871",
        image: "projects/got7Comeback.png",
        description: `A personal project of mine where I mixed both Blender and After Effects to create a promotional video for a music album I was looking forward to being released.`
    },
    
    {
        projectName: `             Are You There?`,
        url: "https://vimeo.com/790260445",
        image: "projects/areYouThere.png",
        description: `The animation is based on the lore in Ateez's music.      I thoroughly enjoy creating these and learning new techniques for modeling and animating in Blender.  `
    },
    {
        projectName: `                  Wake Up`,
        url: "https://vimeo.com/726373983",
        image: "projects/wakeupRender.png",
        description: `With my 3D modelling skills, I created a short animation based on ATEEZ music videos' lore. It took me four months to complete this project entirely on my own in Blender. `
    },
    {
        projectName: `              Face Model`,
        url: "https://imgur.com/a/UZoJKoX",
        image: "projects/firstCharacterFace.png",
        description: `My very first attempt at creating a human head in Blender, primarily using the sculpting feature and minor color-grading done in Photoshop.`
    }
];




const Project = (props) => {
    const {project, highlighted, isCurrentProject} = props;
    const [hovered, setHovered] = useState(false);
    
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
    useEffect(() => {
        document.body.style.cursor = hovered ? 'pointer' : 'auto'
    }, [hovered]);

    const handleOnClick = () => {
        if(isCurrentProject) {
            window.open(project.url, "_blank");
        }
    };
    

    return (
        <>
    
        <group {...props}>
            <Image  ref={activeImage} transparent toneMapped={false} opacity={0.5} scale={[1.8, 1,1]} url={project.image} position={[14.4,14.56,14.21]} onClick={handleOnClick} 
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)} />
            <Text material={transparentMaterial} ref={activeTitle} transparent   maxWidth={[2.5]} anchorX={"left"} anchorY={"top"} fontSize={[0.14]} color="white" position={[13.48,15.24,14.21]} font={'fonts/johnnyfever.otf'} >{project.projectName} </Text>
            <Text material={transparentMaterial} ref={activeDesc} transparent  maxWidth={[2.5]} anchorX={"left"} anchorY={"top"} fontSize={[0.07]} color="white"  position={[13.2,14.01,14.21]} lineHeight={1.3} font={'fonts/SpaceMono-Regular.ttf'} s >{project.description} </Text>
        
        </group>
            
        </>
    )
}

export const currentProjectAtom = atom(Math.floor(gameProjects.length / 2));

export const Projects = () => {
    const { viewport } = useThree();
    const [currentProject, setCurrentProject] = useAtom(currentProjectAtom);
    const [currentCategory, setCurrentCategory] = useState("video");
    const [hovered, setHovered] = useState(false);

    const handleCategoryChange = (category) => {
        setCurrentCategory(category);

        setCurrentProject(Math.floor(gameProjects.length / 2));
    };

    useEffect(() => {
        document.body.style.cursor = hovered ? 'pointer' : 'auto'
    }, [hovered])

    return (
        <group position={-viewport.height * 2 + 1}>
            {/* Category buttons */}
            <mesh
                position={[13.25, 13.5, 14.444]} 
                scale={[0.17,0.07,0.2]}
                onClick={() => handleCategoryChange("video")}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                <RoundedBox args={[3.7, 1.8, 0]} radius={0.1}>
                    <Text transparent maxWidth={[2.5]} anchorX={"center"} anchorY={"top"} fontSize={[1]} color="white" font={'fonts/johnnyfever.otf'}  position={[0,.6,0.01]} >Video</Text>
                    <meshBasicMaterial color={currentCategory === "video" ? "rgb(255,0,0)" : "rgb(139,110,255)"} transparent opacity={0.3} />
                </RoundedBox>
               
                
            </mesh>

            <mesh
                position={[14.35, 13.6, 14.444]} 
                scale={[0.17,0.07,0.2]}
                onClick={() => handleCategoryChange("game")}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                <RoundedBox args={[3.7, 1.8, 0]} radius={0.1}>
                    <Text transparent   maxWidth={[2.5]} anchorX={"center"} anchorY={"top"} fontSize={[1]} color="white" font={'fonts/johnnyfever.otf'} position={[0,0.6,0.01]} >Games</Text>
                    <meshBasicMaterial color={currentCategory === "game" ? "rgb(255,0,0)" : "rgb(139,110,255)"} transparent opacity={0.3} />
                </RoundedBox>
                
                
            </mesh>

            <mesh
                position={[15.45, 13.5, 14.444]} 
                scale={[0.17,0.07,0.2]}
                onClick={() => handleCategoryChange("threeDmodeling")}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                <RoundedBox args={[3.7,1.8,0]} radius={0.1}>
                    <Text transparent   maxWidth={[2.5]} anchorX={"center"} anchorY={"bottom"} fontSize={[1]} color="white" font={'fonts/johnnyfever.otf'} position={[0,-0.6,0.01]} >3D</Text>
                    <meshBasicMaterial color={currentCategory === "threeDmodeling" ? "rgb(255,0,0)" : "rgb(139,110,255)"} transparent opacity={0.3} />
                </RoundedBox>
         
                
            </mesh>

            {/* Project cards */}
            {currentCategory === "video" &&
                videoProjects.map((project, index) => (
                    <motion.group key={"project_" + index} position={[index * 0.2, 0, 0.3]}
                        animate={{
                            x: (index - currentProject) * 0.2,
                            z: currentProject === index ? 0.26 : 0.25
                        }}>
                        <Project project={project} highlighted={index === currentProject} isCurrentProject={index === currentProject} opacity={0.5} />
                    </motion.group>
                ))
            }

            {currentCategory === "game" &&
                gameProjects.map((project, index) => (
                    <motion.group key={"project_" + index} position={[index * 0.2, 0, 0.3]}
                        animate={{
                            x: (index - currentProject) * 0.2,
                            z: currentProject === index ? 0.26 : 0.25
                        }}>
                        <Project project={project} highlighted={index === currentProject} isCurrentProject={index === currentProject} opacity={0.5} />
                    </motion.group>
                ))
            }

            {currentCategory === "threeDmodeling" &&
                threeDmodeling.map((project, index) => (
                    <motion.group key={"project_" + index} position={[index * 0.2, 0, 0.3]}
                        animate={{
                            x: (index - currentProject) * 0.2,
                            z: currentProject === index ? 0.26 : 0.25
                        }}>
                        <Project project={project} highlighted={index === currentProject} isCurrentProject={index === currentProject} opacity={0.5} />
                    </motion.group>
                ))
            }

            <mesh
                position={[14.35, 14.35, 14.48]} 
                scale={[1,1.18,0.2]}
                
            >
                <RoundedBox args={[3.7, 1.8, 0.5]} radius={0.1}>
                <meshStandardMaterial color='pink'  transparent opacity={0.05} />
                </RoundedBox>

            </mesh>
        </group>
    );
}