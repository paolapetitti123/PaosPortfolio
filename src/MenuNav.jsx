import ResumePDF from '../public/PaolaResume.pdf';
import DownloadIcon  from '../public/download-icon.svg'
import LinkIcon  from '../public/external-link.svg'


export const MenuNav = (props) => {
    const { onSectionChange, menuOpened, setMenuOpened } = props;

    return (
        <>
            <button onClick={() => setMenuOpened(!menuOpened)}
                className="z-20 fixed top-12 right-12 p-3 bg-slate-900 w-11 h-11 rounded-md  hover:bg-pink-600 transition-colors">
                <div 
                className={`bg-white h-0.5 rounded-md w-full transition-all ${ 
                    menuOpened ? "rotate-45 translate-y-0.5" : "" 
                    }`}
                />
                <div 
                className={`bg-white h-0.5 rounded-md w-full my-1 ${ 
                    menuOpened ? "hidden" : "" 
                    }`} 
                />
                <div 
                className={`bg-white h-0.5 rounded-md w-full transition-all ${ 
                    menuOpened ? "-rotate-45" : "" 
                    }`} 
                />
            </button>
            <div
            className={`z-10 fixed top-0 right-0 bottom-0  bg-white transition-all overflow-hidden flex flex-col ${menuOpened ? "w-80" : "w-0"}`}>
                <div className="flex-1 flex items-start justify-end flex-col gap-9 text-black">

                    <MenuButton label="Who am I?" onClick={() => onSectionChange(0)}/>
                    <MenuButton label="Skills" onClick={() => onSectionChange(1)}/>
                    <MenuButton label="Projects" onClick={() => onSectionChange(2)}/>
                    <MenuButton label="Reach Out" onClick={() => onSectionChange(3)}/>
                </div>
                <div className="flex-1 flex items-start justify-center flex-col gap-2 text-black">
                    <a href={ResumePDF} download="PaolaResume.pdf" className="flex items-center">
                    <img src={DownloadIcon} alt="Download Icon" className="ml-3 w-6 h-5" />
                        <button className="text-2xl font-bold cursor-pointer  hover:text-pink-600 transition-colors pl-4">Resume</button>
                    </a>
                    <a href='https://paolapetitti123.github.io/PaosPortfolio/' className="flex items-center">
                        <img src={LinkIcon} alt="Link Icon" className="ml-3 w-6 h-5" />
                        <button className="text-2xl font-bold cursor-pointer  hover:text-pink-600 transition-colors pl-4">Github Repo</button>
                    </a>
                    
                </div>
            </div>
        </>
    );
};

const MenuButton = (props) => {
    const {label, onClick} = props;

    return (
        <button 
            onClick={onClick}
            className="text-2xl font-bold cursor-pointer  hover:text-pink-600 transition-colors pl-4">
                    {label}
                </button>
    )
}