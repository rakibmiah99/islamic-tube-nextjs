import AudioPlayer, {RHAP_UI} from 'react-h5-audio-player';
// import 'react-h5-audio-player/lib/styles.css';
import '../app/audio_player.css';
import {LuX} from "react-icons/lu";
import {Button} from "./ui/button";
// import 'react-h5-audio-player/lib/styles.less' Use LESS
// import 'react-h5-audio-player/src/styles.scss' Use SASS

export default function CustomAudioPlayer (props){
    const additionalControll = [RHAP_UI.LOOP]

    return <>
        <AudioPlayer
            autoPlay
            src={props.src}
            // onPlay={e => console.log("onPlay", e)}
            // other props here
            // layout='horizontal'
            footer={<>
                {/*<h1>Hello</h1>*/}
            </>}

            // defaultDuration={<></>}
            showFilledVolume={true}
            showSkipControls={true}
            showJumpControls={false}
            customAdditionalControls={additionalControll}
            customControlsSection={
                [
                    RHAP_UI.ADDITIONAL_CONTROLS,
                    RHAP_UI.MAIN_CONTROLS,
                    <Button variant='' onClick={props.handleClose} className={'rounded-full h-[30px] w-[30px] ms-2'}>
                        <LuX/>
                    </Button>,
                    RHAP_UI.VOLUME_CONTROLS,
                ]
            }
            onClickNext={props.handleNext}
            onClickPrevious={props.handlePrev}
            onEnded={props.handleEnd}
        />
    </>
}