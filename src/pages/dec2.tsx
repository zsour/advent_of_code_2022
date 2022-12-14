import { useEffect, useState } from 'react';
import MainCard from '../components/MainCard';
import InputArea from '../components/InputArea';

export default function Dec2() {

    const [input, setInput] = useState("");
    const [puzzleOneResult, setPuzzleOneResult] = useState(0);
    const [puzzleTwoResult, setPuzzleTwoResult] = useState(0);
    const [timer, setTimer] = useState("0 ms.");

    const elfGestureMapping = {
        ROCK: "A",
        PAPER: "B",
        SCISSORS: "C"
    }

    const myGestureMapping = {
        ROCK: "X",
        PAPER: "Y",
        SCISSORS: "Z"
    }

    function getGesture(letter: string, mapping: {ROCK: string, PAPER: string, SCISSORS: string}){
        switch(letter){
            case mapping.ROCK:
                return "ROCK";
            case mapping.PAPER:
                return "PAPER";
            case mapping.SCISSORS:
                return "SCISSORS";
            default:
                throw `Letter ${letter} does not match any gesture.`;
        }
    }

    function winOverMapping(gesture: string){
        switch(gesture){
            case "ROCK":
                return "SCISSORS";
            case "PAPER":
                return "ROCK";
            case "SCISSORS":
                return "PAPER";
            default:
                throw `Gesture ${gesture} does not exist.`;
        }
    }

    function loseToMapping(gesture: string){
        switch(gesture){
            case "ROCK":
                return "PAPER";
            case "PAPER":
                return "SCISSORS";
            case "SCISSORS":
                return "ROCK";
            default:
                throw `Gesture ${gesture} does not exist.`;
        }
    }

    function getGestureValue(gesture: string){
        switch(gesture){
            case "ROCK":
                return 1;
            case "PAPER":
                return 2;
            case "SCISSORS":
                return 3;
            default:
                throw `Gesture ${gesture} does not exist.`;
        }
    }

    function returnResult(elfGesture: string, myGesture: string){
        if(winOverMapping(elfGesture) === myGesture){
            return getGestureValue(myGesture) + 0;
        }

        if(elfGesture === myGesture){
            return getGestureValue(myGesture) + 3;
        }

        if(winOverMapping(elfGesture) !== myGesture){
            return getGestureValue(myGesture) + 6;
        }

        throw "Could not find a winner.";
    }

    function calculateScore(round: string){
        try{
            let tmp = round.split(" ");
            let elfGesture = getGesture(tmp[0], elfGestureMapping);
            let myGesture = getGesture(tmp[1], myGestureMapping);
            return returnResult(elfGesture, myGesture);
        }catch(err){
            console.log(err);
            return 0;
        }
    }

    function calculateScorePartTwo(round: string){
        try{
            let tmp = round.split(" ");
            let elfGesture = getGesture(tmp[0], elfGestureMapping);
            let action = tmp[1];
            switch(action){
                case "X":
                    return returnResult(elfGesture, winOverMapping(elfGesture));
                case "Y":
                    return returnResult(elfGesture, elfGesture);
                case "Z":
                    return returnResult(elfGesture, loseToMapping(elfGesture));
                default:
                    throw `Action ${action} not found.`;
            }
        }catch(err){
            console.log(err);
            return 0;
        }
    }
    
    useEffect(() => {
        if(input.length > 0){
            let startTimer = performance.now();
            let tmp = input.split("\n");

            if(tmp[tmp.length - 1] === ''){
                tmp.pop();
            }
            
            let totalScore = 0;
            let totalScorePartTwo = 0;
            for(let i = 0; i < tmp.length; i++){
                totalScore += calculateScore(tmp[i]);
                totalScorePartTwo += calculateScorePartTwo(tmp[i]);
            }
        
            let endTimer = performance.now();
            setPuzzleOneResult(totalScore);
            setPuzzleTwoResult(totalScorePartTwo);
            setTimer(`${(endTimer - startTimer).toFixed(1)} ms.`);
        }
    }, [input]);
    

    return (
        <MainCard title="Day 2: Rock Paper Scissors.">

            <InputArea inputChange={(value: string) => {
                setInput(value);
            }} />
            

            <div className="result-area">
                <div className="result">
                    <p className="result-text">
                        Round result (part 1): {String(puzzleOneResult)}.
                    </p>
                </div>

                <div className="result">
                    <p className="result-text">
                        Round result (part 2): {String(puzzleTwoResult)}.
                    </p>

                    <p className="result-text">
                        Performance messure: {timer}
                    </p>
                </div>
            </div>
        </MainCard>
    );
}
