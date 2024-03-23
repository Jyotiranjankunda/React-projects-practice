import React, { useState, useRef } from "react";
import ResultModal from "./ResultModal";

// let timer;

//  Here, the timer variable is not dependent on the component. But the problem arises, when we click on more than one components simulatenously, then the later one will overwrite the settimeout function of the previous one, as this variable is global, and hence this method will also not work.  So, we need to use refs.

const TimerChallenge = ({ title, targetTime }) => {
    const timer = useRef();
    // By using ref, the timer element will be component specific and will not clash with timers of other components, and hence we can start or stop timers of each components individually.

    // This ref will not be cleared or reexecuted when component re-renders and react will store the ref values behind the scenes and make sures that these values don't get lost.

    // Another use case for ref -> If you have cases like this where you have a value that doesn't really impact the UI, at least not directly, and you still need to manage it such that it's not reset when the component is re-executed, then you might have a great use case for a ref.

    // const [timerStarted, setTimerStarted] = useState(false);
    // const [timerExpired, settimerExpired] = useState(false);

    const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

    const timerIsActive = (timeRemaining > 0) && (timeRemaining < targetTime * 1000);

    const dialog = useRef();

    // let timer;

    // To stop the timer, we need a pointer of the setTimeout function in the clearTimeout function. When handleStart func is called, then timer variable is set to settimeout function, but after then we are updating the state, so the component will be re-rendered and timer variable will be initialised again. Therefore, the settimeout function assigned to variable is flushed out, and there is nothing left for clearTimeout function. So this method will not work. So, we declare the timer variable globally.

    // function handleStart() {
    //     timer.current = setTimeout(() => {
    //         settimerExpired(true);
    //         dialog.current.open();
    //     }, targetTime * 1000);

    //     setTimerStarted(true);
    // }

    if(timeRemaining <= 0){
        clearInterval(timer.current);
        dialog.current.open();
        // setTimeRemaining(targetTime * 1000);
    }

    function handleStart(){
        timer.current = setInterval(() => {
            setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 10);
        }, 10);
    }

    function handleStop() {
        clearInterval(timer.current);
        dialog.current.open();
    }

    function handleReset(){
        setTimeRemaining(targetTime * 1000);
    }

    return (
        <>
            <ResultModal targetTime={targetTime} ref={dialog} timeRemaining = {timeRemaining} onReset = {handleReset} />
            <section className="challenge">
                <h2>{title}</h2>
                <p className="challenge-time">
                    {targetTime} second{targetTime > 1 ? "s" : ""}
                </p>
                <p>
                    <button onClick={timerIsActive ? handleStop : handleStart}>
                        {timerIsActive ? "Stop Challenge" : "Start Challenge"}
                    </button>
                </p>
                <p className={timerIsActive ? "active" : undefined}>
                    {timerIsActive ? "Timer is running..." : "Timer inactive"}
                </p>
            </section>
        </>
    );
};

export default TimerChallenge;
