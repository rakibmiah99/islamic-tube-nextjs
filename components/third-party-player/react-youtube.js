import YouTube from 'react-youtube';

export function ReactYoutube({videoId, title}){
    const options = {
        height: '390',
        width: '100%',
        iframeClassName: "youtube-iframe",
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
        title: title
    };


    const handleOnReady = (event) => {
        event.target.pauseVideo();
    }


    return <YouTube videoId={videoId} opts={options} onReady={handleOnReady} />;
}