import {useState, useEffect} from 'react';
import MainCard from '../components/MainCard';
import InputArea from '../components/InputArea';

function Dec5(){
    const [input, setInput] = useState("");
    const [puzzleOneResult, setPuzzleOneResult] = useState(0);
    const [puzzleTwoResult, setPuzzleResultTwo] = useState(0);
    const [timer, setTimer] = useState("0 ms.");

    let stacks: string[][] = [
        ["Z", "T", "F", "R", "W", "J", "G"],
        ["G", "W", "M"],
        ["J", "N", "H", "G"],
        ["J", "R", "C", "N", "W"],
        ["W", "F", "S", "B", "G", "Q", "V", "M"],
        ["S", "R", "T", "D", "V", "W", "C"],
        ["H", "B", "N", "C", "D", "Z", "G", "V"],
        ["S", "J", "N", "M", "G", "C"],
        ["G", "P", "N", "W", "C", "J", "D", "L"]
    ];


    function moveCrates(arr: string[][], numberOfCrates: number, from: number, to: number){
        let tmp = arr;

        let newArr: string[] = [];
        for(let i = 0; i < numberOfCrates; i++){   
            newArr[i] = tmp[from - 1][tmp[from - 1].length - 1];
            tmp[from - 1].pop();
        }

        for(let i = 0; i < newArr.length; i++){
            tmp[to - 1].push(newArr[i]);
        }

        return tmp;
    }

    function moveCratesPartTwo(arr: string[][], numberOfCrates: number, from: number, to: number){
        let tmp = arr;

        let newArr: string[] = [];
        for(let i = 0; i < numberOfCrates; i++){   
            newArr[i] = tmp[from - 1][tmp[from - 1].length - 1];
            tmp[from - 1].pop();
        }

        newArr = newArr.reverse();

        for(let i = 0; i < newArr.length; i++){
            tmp[to - 1].push(newArr[i]);
        }

        return tmp;
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

        let newArr = tmp.map((str) => {
            let newStr = str.split(" ");   
            return [+newStr[1], +newStr[3], +newStr[5]];
        });

        for(let i = 0; i < newArr.length; i++){
            if(newArr[i][0] && newArr[i][1] && newArr[i][2]){   
                stacks = moveCratesPartTwo(stacks, newArr[i][0], newArr[i][1], newArr[i][2]);
            }
        }
        
        let returnString = [];
        for(let i = 0; i < stacks.length; i++){
            returnString.push(stacks[i][stacks[i].length - 1]);
        }

       
        console.log(stacks, String(returnString));
        let endTimer = performance.now();
        setTimer(`${(endTimer - startTimer).toFixed(1)} ms.`);
       
    }, [input]);

    return <MainCard title='Day 5: Supply Stacks.'>                
            <InputArea inputChange={(val: string) => {
                setInput(val);
            }} />

            <div className="result-area">
                <div className="result">
                    <p className="result-text">
                        CrateMover 9000: {String(puzzleOneResult)}.
                    </p>
                </div>

                <div className="result">
                    <p className="result-text">
                        CrateMover 9001: {String(puzzleTwoResult)}.
                    </p>

                    <p className="result-text">
                        Performance messure: {timer}
                    </p>
                </div>
            </div>
    </MainCard>
}

export default Dec5;