import React, { useState,  useRef  } from 'react';

const MusicButton = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    const handlePlayButtonClick = () => {
        if(isPlaying){
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <>
            <button
                onClick={handlePlayButtonClick}
                className="z-20 fixed pt-2.5 top-12 right-20 mr-5 p-3 bg-slate-900 w-11 h-11 rounded-md  hover:bg-pink-600 transition-colors text-center justify-center items-center"
            >
                {isPlaying ? '||' : '▶'}
            </button>

            <audio ref={audioRef} src="./projects/SpaceshipInterior.mp3" />
         </>
    )
}

export default MusicButton;
