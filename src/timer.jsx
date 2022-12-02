import React, { useEffect } from 'react';

const ACTION_TYPE = {
    START: 'start',
    PAUSE: 'pause',
    RESET: 'reset'
}
const Timer = () => {
    const [countDown, setCountDown] = React.useState(0);
    const [pause, setPause] = React.useState(false);
    const [interval, setIntrvl] = React.useState(null);
    const minRef = React.useRef();
    const secRef = React.useRef();
    useEffect(() => {
        if(countDown === 0 && interval) {
            clearInterval(interval);
        }
    }, [countDown])
    
    const onAction = (state) => {
        switch (state) {
            case ACTION_TYPE.START:
                return startTimer();
            case ACTION_TYPE.PAUSE:
                return pauseOrResumeTimer();
            case ACTION_TYPE.RESET:
                return resetTimer();
            default: return;
        } 
    }

    const startTimer = () => {
        if(interval) {
            clearInterval(interval);
        }
        // setStartTime(new Date());
        const inputMins = parseInt(minRef.current.value);
        const inputSecs = parseInt(secRef.current.value);
        const _min = !isNaN(inputMins) && inputMins * 60 * 1000 || 0;
        const _secs = !isNaN(inputSecs) && inputSecs * 1000 || 0;
        const miliseconds = _min + _secs;
        console.log('milisecons', miliseconds);
        setCountDown(miliseconds);
        startCountDown();
       
    }

    const startCountDown = () => {
        const intrvl =   setInterval(() => {
            console.log('inside interval', new Date().getTime())
            setCountDown((prev) => prev - 1000);
        }, 1000);
        setIntrvl(intrvl);
    }

    const pauseOrResumeTimer = () => {
        if(!interval) return;
        
        if(pause) {
            setPause(false);
            startCountDown();
            return;
        }
        setPause(true);
        clearInterval(interval);

    }

    const resetTimer = () => {
        if(!interval) return;
        setCountDown(0);
        clearInterval(interval);
    }

    const Countdown = () => {
        if(!countDown)
            return '00:00';

        const date = new Date();
        const timestamp = date.setHours(0,0,0,0);
        date.setTime(timestamp + countDown);
        const mins = date.getMinutes();
        const secs = date.getSeconds();
        const minutes = mins < 10 ? `0${mins}` : mins;
        const seconds = secs < 10 ? `0${secs}` : secs;
        return `${minutes}:${seconds}`
    }

    return (<>
        <span>Min</span>
        <input type="number" ref={minRef} placeholder="min"/>
        <span>Sec</span>
        <input type="number" ref={secRef} placeholder="seconds" />
        <button onClick={() => onAction(ACTION_TYPE.START)}>Start</button>
        <button onClick={() => onAction(ACTION_TYPE.PAUSE)}>Pause/Resume</button>
        <button onClick={() => onAction(ACTION_TYPE.RESET)}>Reset</button>
        <Countdown />
    </>)
}

export default Timer;