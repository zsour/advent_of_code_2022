import {useState, useEffect} from 'react';
import MainCard from '../components/MainCard';
import InputArea from '../components/InputArea';

function Dec11(){
    const [input, setInput] = useState("");
    const [puzzleOneResult, setPuzzleOneResult] = useState(0);
    const [puzzleTwoResult, setPuzzleTwoResult] = useState(0);
    const [timerOne, setTimerOne] = useState("0 ms.");
    const [timerTwo, setTimerTwo] = useState("0 ms.");

      
    useEffect(() => {
        if(input.length === 0){
            return;
        }

        let startTimer = performance.now();

        let tmp = input.split("\n");
        if(tmp[tmp.length - 1] === ''){
            tmp.pop();
        }

        
        setTimerTwo(`${(performance.now() - startTimer).toFixed(1)} ms.`);
    }, [input]);

    return <MainCard title='Day 11: ?'>                
            <InputArea inputChange={(val: string) => {
                setInput(val);
            }} />

            <div className="result-area">
                <div className="result">
                    <p className="result-text">
                        Result 1: {String(puzzleOneResult)}.
                    </p>

                    <p className="result-text">
                        Performance messure: {timerOne}
                    </p>
                </div>

                <div className="result">
                    <p className="result-text">
                        Result 2: {String(puzzleTwoResult)}.
                    </p>

                    <p className="result-text">
                        Performance messure: {timerTwo}
                    </p>
                </div>
            </div>
    </MainCard>
}

export default Dec11;