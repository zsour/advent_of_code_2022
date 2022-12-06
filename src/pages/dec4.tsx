import {useState, useEffect} from 'react';
import MainCard from '../components/MainCard';
import InputArea from '../components/InputArea';

function Dec4(){
    const [input, setInput] = useState("");
    const [puzzleOneResult, setPuzzleOneResult] = useState(0);
    const [puzzleTwoResult, setPuzzleTwoResult] = useState(0);
    const [timer, setTimer] = useState("0 ms.");


    function getInterval(str: string){ 
        let tmp = str.split('-');
        return [tmp[0], tmp[1]];
    }
 
    function intervalWithin(intervalOneStart: number, intervalOneEnd: number, intervalTwoStart: number, intervalTwoEnd: number){
        if(intervalOneStart === intervalOneEnd && intervalOneStart >= intervalTwoStart && intervalOneEnd <= intervalTwoEnd) return true;

        if(intervalTwoStart === intervalTwoEnd && intervalTwoStart >= intervalOneStart && intervalTwoEnd <= intervalOneEnd) return true;

        if(intervalOneStart < intervalOneEnd && intervalTwoStart >= intervalOneStart && intervalTwoEnd <= intervalOneEnd) return true;
        
        if(intervalTwoStart < intervalTwoEnd && intervalOneStart >= intervalTwoStart && intervalOneEnd <= intervalTwoEnd) return true;

        return false;
    }


    function overlaps(intervalOneStart: number, intervalOneEnd: number, intervalTwoStart: number, intervalTwoEnd: number){
        if(intervalWithin(intervalOneStart, intervalOneEnd, intervalTwoStart, intervalTwoEnd)) return true;

        if(intervalOneStart <= intervalTwoEnd && intervalTwoStart <= intervalOneEnd) return true;
        
        return false;
    }


    useEffect(() => {
        if(input.length === 0){
            return;
        }

        let startTimer = performance.now();
        
        let tmp = input.split("\n");
        if(tmp[tmp.length - 1] === ''){
            tmp.pop();
        }

        let intervalsWithinCounter = 0;
        let overlapCounter = 0;
        tmp.map((str) => {
            let newStr = str.split(',');
            let intervalOne = getInterval(newStr[0]);
            let intervalTwo = getInterval(newStr[1]);
            if(intervalWithin(+intervalOne[0], +intervalOne[1], +intervalTwo[0], +intervalTwo[1])){
                intervalsWithinCounter++;
            }
            if(overlaps(+intervalOne[0], +intervalOne[1], +intervalTwo[0], +intervalTwo[1])){
                overlapCounter++;
            }
        
            return [intervalOne, intervalTwo];
        });

        let endTimer = performance.now();

        setPuzzleOneResult(intervalsWithinCounter);
        setPuzzleResultTwo(overlapCounter);
        setTimer(`${(endTimer - startTimer).toFixed(1)} ms.`);
       
    }, [input]);

    return <MainCard title='Day 4: Camp Cleanup.'>                
            <InputArea inputChange={(val: string) => {
                setInput(val);
            }} />

            <div className="result-area">
                <div className="result">
                    <p className="result-text">
                        Intervals within: {String(puzzleOneResult)}.
                    </p>
                </div>

                <div className="result">
                    <p className="result-text">
                        Overlaps: {String(puzzleTwoResult)}.
                    </p>

                    <p className="result-text">
                        Performance messure: {timer}
                    </p>
                </div>
            </div>
    </MainCard>
}

export default Dec4;