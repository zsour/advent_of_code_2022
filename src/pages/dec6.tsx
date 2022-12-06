import {useState, useEffect} from 'react';
import MainCard from '../components/MainCard';
import InputArea from '../components/InputArea';

function Dec6(){
    const [input, setInput] = useState("");
    const [puzzleOneResult, setPuzzleOneResult] = useState(0);
    const [puzzleTwoResult, setPuzzleTwoResult] = useState(0);
    const [timerOne, setTimerOne] = useState("0 ms.");
    const [timerTwo, setTimerTwo] = useState("0 ms.");


    function onlyUnique(value: string, index: number, self: string[]) {
        return self.indexOf(value) === index;
    }
      
    useEffect(() => {
        if(input.length === 0){
            return;
        }

        let startTimer = performance.now();
        let partOneComplete = false;
        let partTwoComplete = false;

        for(let i = 0; i < input.length; i++){
            if(partOneComplete && partTwoComplete){
                break;
            }
            
            if((i + 4) <= input.length && !partOneComplete){
                let partOne = [input[i], input[i+1], input[i+2], input[i+3]];
                let tmp = partOne.filter(onlyUnique);
                if(tmp.length === partOne.length){
                    partOneComplete = true;
                    setTimerOne(`${(performance.now() - startTimer).toFixed(1)} ms.`);
                    setPuzzleOneResult(i + 4);
                }
            }
  

            if((i + 14) <= input.length && !partTwoComplete){
                let partTwo = [];

                for(let j = 0; j < 14; j++){
                    partTwo.push(input[i + j]);
                }

                let tmp = partTwo.filter(onlyUnique);
                if(tmp.length === partTwo.length){
                    partTwoComplete = true;
                    setTimerTwo(`${(performance.now() - startTimer).toFixed(1)} ms.`);
                    setPuzzleTwoResult(i + 14);
                }
            }
        };
       
    }, [input]);

    return <MainCard title='Day 6: Tuning Trouble.'>                
            <InputArea inputChange={(val: string) => {
                setInput(val);
            }} />

            <div className="result-area">
                <div className="result">
                    <p className="result-text">
                        First four unique characters: {String(puzzleOneResult)} ({puzzleOneResult-4 > 0 ? String(puzzleOneResult-4) : 0} + 4).
                    </p>

                    <p className="result-text">
                        Performance messure: {timerOne}
                    </p>
                </div>

                <div className="result">
                    <p className="result-text">
                        First 14 unique characters: {String(puzzleTwoResult)} ({puzzleTwoResult-14 > 0 ? String(puzzleTwoResult-14) : 0} + 14).
                    </p>

                    <p className="result-text">
                        Performance messure: {timerTwo}
                    </p>
                </div>
            </div>
    </MainCard>
}

export default Dec6;