import { useEffect, useState } from 'react';
import MainCard from '../components/MainCard';
import InputArea from '../components/InputArea';

export default function Dec1() {

    const [input, setInput] = useState("");
    const [puzzleOneResult, setPuzzleOneResult] = useState(0);
    const [puzzleTwoResult, setPuzzleTwoResult] = useState(0);
    const [timer, setTimer] = useState("0 ms.");

    useEffect(() => {
        let startTimer = performance.now();
        let tmp = input.split("\n");
        let chunks:string[][] =  [[]];
        let chunkIndex = 0;
        for(let i = 0; i < tmp.length; i++){
            if(tmp[i] !== ""){
                chunks[chunkIndex].push(tmp[i]);
                continue;
            }

            chunks.push([]);
            chunkIndex++;
        };

        let reducedValues:number[] = [];

        for(let i = 0; i < chunks.length; i++){
            let reduced = chunks[i].reduce((partialSum, currentValue) => {
                return (+partialSum) + (+currentValue);
            }, 0);

            reducedValues[i] = reduced;
        }

        function removeValueFromArray(value: number){
            for(let i = 0; i < reducedValues.length; i++){
                if(reducedValues[i] === value){
                    reducedValues.splice(i, 1);
                    break;
                }
            };
        }

        let firstElf = Math.max(...reducedValues);
        setPuzzleOneResult(firstElf);
        removeValueFromArray(firstElf);
        let secondElf = Math.max(...reducedValues);
        removeValueFromArray(secondElf);
        let thirdElf = Math.max(...reducedValues);
        setPuzzleTwoResult(firstElf+secondElf+thirdElf);
        let endTimer = performance.now();
        setTimer(`${(endTimer - startTimer).toFixed(1)} ms.`);

    }, [input]);
    

    return (
        <MainCard title="Dec 1: Calorie Counting.">
            
            <InputArea inputChange={(val: string) => {
                setInput(val);
            }} />

            <div className="result-area">
                <div className="result">
                    <p className="result-text">
                        Highest calorie count: {String(puzzleOneResult)}.
                    </p>
                </div>

                <div className="result">
                    <p className="result-text">
                        Top three calorie counts sum: {(puzzleTwoResult === Infinity || puzzleTwoResult === -Infinity) ? 0 : String(puzzleTwoResult)}.
                    </p>

                    <p className="result-text">
                        Performance messure: {timer}
                    </p>
                </div>
            </div>
        </MainCard>
    );
}
