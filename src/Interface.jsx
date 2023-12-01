import { motion } from "framer-motion";
import { Html } from "@react-three/drei";
import { useAtom } from "jotai";
import { currentProjectAtom, videoProjects } from "./Projects";

const Section = (props) => {
    const {children} = props;
    

    return (<motion.section className={`
    h-screen w-screen p-8 max-w-screen-2xl -mx-auto
    flex flex-col items-start justify-center
    `}
    initial={{
        opacity: 0,
        y: 50
    }}
    whileInView={{
        opacity: 1,
        y: 0,
        transition: {
            duration: 1,
            delay: 0.5
        }
    }}>
        {children}
    </motion.section>)
}

export const Interface = (props) => {
const { onSectionChange } = props;
    return <>
    <div className="flex flex-col justify-center items-center w-screen">
        <WhoAmISection onSectionChange={onSectionChange} />
        <SkillsSection />
        <ProjectsSection/>
        <ReachOut/>
    </div>
    
    </>
};

const WhoAmISection = (props) => {
    const { onSectionChange } = props;
    return (
    <Section>
        <h1 className="text-6xl justify-center items-center font-extrabold leading-snug ">
            Hello! I am <br /> <span className="bg-white px-1 italic text-black pr-4 pl-2"> Paola </span>
        </h1>
        <motion.p className="text-lg text-gray-500 mt-4"
                initial={{
                    opacity:0,
                    y:25
                }}
                whileInView={{
                    opacity: 1,
                    y:0
                }}
                transition={{
                    duration: 1,
                    delay: 1.5
                }}>
            I explore a diverse range of creative realms, <br /> spanning from web and game development <br />to the intricacies of  3D modeling and animation.
        </motion.p>
        <motion.button
        className={`hover:bg-purple-800 bg-purple-400 text-white py-4 px-8 rounded-lg font-bold text-lg mt-16 justify-center s`}
        initial={{
            opacity:0,
            y:25
        }}
        whileInView={{
            opacity: 1,
            y:0
        }}
        transition={{
            duration: 1,
            delay: 1.5
        }}
        onClick={() => onSectionChange(3)}
        >
            Reach Out!
        </motion.button>
    </Section>
    );
}

const skills = [
    {
        title: "HTML / CSS / JavaScript",
        level: 95
    },
    {
        title: "ThreeJs ",
        level: 70
    },
    {
        title: "React Three Fiber",
        level: 40
    },
    {
        title: "3D Modeling",
        level: 80
    },
    {
        title: "Unity / C#",
        level: 70
    },
];

const languages = [
    {
        title: "English",
        level: 100,
    },
    {
        title: "French",
        level: 60
    },
    {
        title: "Italian",
        level: 40
    }
]


const SkillsSection = () => {
    return (
        <Section>
            <motion.div whileInView={"visible"}>
                <h2 className="text-5xl font-bold">Skills</h2>
                <div className="mt-8 space-y-4"
                >
                    {skills.map((skill, index) => (
                        <div className="w-64" key={index}>
                            <motion.h3 className="text-xl font-bold text-gray-600"
                            initial={{
                                opacity: 0
                            }}
                            variants={{
                                visible: {
                                    opacity: 1,
                                    transition:{
                                        duration: 1,
                                        delay: 1 + index/2
                                    }
                                }
                            }}
                            >{skill.title}
                            </motion.h3>
                            <div  className="h-2 w-full bg-gray-200 rounded-full mt-2">
                                <motion.div className="h-full bg-indigo-500 rounded-full" style={{width: `${skill.level}%`}}
                                initial={{
                                    scaleX: 0,
                                    originX: 0,
                                }}
                                variants={{
                                    visible: {
                                        scaleX: 1,
                                        transition: {
                                            duration: 1,
                                            delay: 1 + index/2
                                        }
                                    }
                                }}/>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
            <motion.div whileInView={"visible"} className="pt-10">
                <h2 className="text-5xl font-bold">Languages</h2>
                <div className="mt-8 space-y-4"
                >
                    {languages.map((lng, index) => (
                        <div className="w-64" key={index}>
                            <motion.h3 className="text-xl font-bold text-gray-600"
                            initial={{
                                opacity: 0
                            }}
                            variants={{
                                visible: {
                                    opacity: 1,
                                    transition:{
                                        duration: 1,
                                        delay: 2 + index/2
                                    }
                                }
                            }}
                            >{lng.title}
                            </motion.h3>
                            <div  className="h-2 w-full bg-gray-200 rounded-full mt-2">
                                <motion.div className="h-full bg-indigo-500 rounded-full" style={{width: `${lng.level}%`}}
                                initial={{
                                    scaleX: 0,
                                    originX: 0,
                                }}
                                variants={{
                                    visible: {
                                        scaleX: 1,
                                        transition: {
                                            duration: 1,
                                            delay: 2 + index/2
                                        }
                                    }
                                }} />
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </Section>
    );
    
}

const ProjectsSection = () => {
    const [ currentProject, setCurrentProject ] = useAtom(currentProjectAtom);

    const nextProject = () => {
        setCurrentProject((currentProject + 1) % videoProjects.length)
    }

    const previousProject = () => {
        setCurrentProject((currentProject - 1 + videoProjects.length) % videoProjects.length)
    }

   
    return (
        <Section>
            <div className="flex w-full h-full gap-8 items-start justify-center mt-6">
                
                <h2 className="text-5xl font-bold">Projects</h2>
                
            </div>
            <div className="flex w-full h-full gap-16 items-end justify-center mb-8 pb-8">
            <button
                    className="hover:bg-purple-800 bg-purple-400 transition-colors text-white py-4 px-8 rounded-lg font-bold text-lg mt-8 justify-center "
                    onClick={previousProject}>
                        ← Back
                </button>
            <button
                    className="hover:bg-purple-800 bg-purple-400 transition-colors text-white py-4 px-8 rounded-lg font-bold text-lg mt-8 justify-center "
                    onClick={nextProject}>
                        Next →
                </button>
            </div>
        </Section>
    );
    
}

const ReachOut = () => {
    return (
        <Section id="reachOutSection">
            <h2 className="text-5xl font-bold">Reach out</h2>
            <motion.div className="mt-9 p-8 rounded-md bg-white w-96 max-w=full "
            initial={{
                opacity:0,
                y:25
            }}
            whileInView={{
                opacity: 1,
                y:0
            }}
            transition={{
                duration: 1,
                delay: 1.25
            }}>
                <form>
                    <label htmlFor="name" className="font-large text-gray-900 block mb-1 ">Name</label>
                    <input type="text" name="name" id="name" className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 mb-4 mt-2 " />

                    <label htmlFor="email" className="font-medium text-gray-900 block mb-1">Email</label>
                    <input type="email" name="email" id="email" className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 mb-4" />
                    
                    <label htmlFor="email" className="font-medium text-gray-900 block mb-1 ">Message</label>
                    <textarea name="message" id="message" className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 mb-8 " />

                    <button className={`hover:bg-purple-800 bg-purple-400 text-white py-4 px-8 rounded-lg font-bold text-lg mt-8 justify-center `}> Submit </button>
                </form>
            </motion.div>
        </Section>
    );
    
}

