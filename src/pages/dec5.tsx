import {useState, useEffect} from 'react';
import MainCard from '../components/MainCard';
import InputArea from '../components/InputArea';

function Dec5(){
    const [input, setInput] = useState("");
    const [puzzleOneResult, setPuzzleOneResult] = useState(0);
    const [puzzleTwoResult, setPuzzleResultTwo] = useState(0);
    const [timer, setTimer] = useState("0 ms.");




    useEffect(() => {
        if(input.length === 0){
            return;
        }

        let startTimer = performance.now();
        
        let tmp = input.split("\n");
        if(tmp[tmp.length - 1] === ''){
            tmp.pop();
        }

        // Insert code here...


        let endTimer = performance.now();
        setTimer(`${(endTimer - startTimer).toFixed(1)} ms.`);
       
    }, [input]);

    return <MainCard title='Day 5: ?'>                
            <InputArea inputChange={(val: string) => {
                setInput(val);
            }} />

            <div className="result-area">
                <div className="result">
                    <p className="result-text">
                        Part 1: {String(puzzleOneResult)}.
                    </p>
                </div>

                <div className="result">
                    <p className="result-text">
                        Part 2: {String(puzzleTwoResult)}.
                    </p>

                    <p className="result-text">
                        Performance messure: {timer}
                    </p>
                </div>
            </div>
    </MainCard>
}

export default Dec5;