import { useEffect, useState } from 'react';
import MainCard from '../components/MainCard';

export default function Dec1() {

    const [input, setInput] = useState("");
    const [puzzleOneResult, setPuzzleOneResult] = useState(0);
    const [puzzleTwoResult, setPuzzleResultTwo] = useState(0);

    useEffect(() => {
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
        setPuzzleResultTwo(firstElf+secondElf+thirdElf);

    }, [input]);
    

    return (
        <MainCard title="Dec 1: Calorie Counting.">

            <div className="input-area">
                <div className="input-header">
                    <p className="input-header-text">Paste puzzle input or import input file:</p>
                </div>
                <label htmlFor="files" className="chooseFile">
                    <p>Select input file</p>
                </label>
                <input  style={{visibility: "hidden"}} type="file" id="files" onChange={(e) => {
                        e.preventDefault();
                        const reader = new FileReader();
                        
                        console.log(reader);
                        
                        if(e.target && e.target.files){
                          
                            
                            reader.onload = async (e) => { 
                                if(e.target){
                                    const text = (e.target.result);
                                    setInput(String(text));
                                }
                            };

                            if(e.target.files[0] && e.target.files[0].type){
                                if(e.target.files[0].type !== "text/plain"){
                                    return;
                                }

                                reader.readAsText(e.target.files[0]);
                            }

                        
                           
                        }
                }}/>
                <textarea name="" value={input} className="input-text-area" onChange={(e) => {
                    setInput(e.target.value);
                }} cols={30} rows={10} placeholder="Paste input here..."></textarea>
            </div>
            

            <div className="result-area">
                <div className="result">
                    <p className="result-text">
                        Highest calorie count: {String(puzzleOneResult)}
                    </p>
                </div>

                <div className="result">
                    <p className="result-text">
                        Top three calorie counts sum: {(puzzleTwoResult === Infinity || puzzleTwoResult === -Infinity) ? 0 : String(puzzleTwoResult)}
                    </p>
                </div>
            </div>
        </MainCard>
    );
}
