import {useState, useEffect} from 'react';
import MainCard from '../components/MainCard';
import InputArea from '../components/InputArea';

function Dec12(){
    const [input, setInput] = useState("");
    const [puzzleOneResult, setPuzzleOneResult] = useState(0);
    const [puzzleTwoResult, setPuzzleTwoResult] = useState(0);
    const [timerOne, setTimerOne] = useState("0 ms.");
    const [timerTwo, setTimerTwo] = useState("0 ms.");

    interface Position{
        x: number;
        y: number;
    }

    const alphabet = "abcdefghijklmnopqrstuvwxyz";

    function getHeightDif(letterOne: string, letterTwo: string){        
        if(!letterOne || !letterTwo){
            return undefined;
        }

        let letterTmp = letterOne;
        let letterTmpTwo = letterOne;
        if(letterOne === "S"){
            letterTmp = "a";
        }

        if(letterTwo === "S"){
            letterTmpTwo = "a";
        }

        return Math.abs(alphabet.indexOf(letterTmpTwo) - alphabet.indexOf(letterTmp));
    }

    function getAvailablePaths(currentPos: Position, map: string[][], cameFrom: string = ""){
        let availablePositions: Position[] = [];
        
            let upDif; 
            let downDif;
            let leftDif;
            let rightDif;
            if(currentPos.y - 1 > 0){
                upDif = getHeightDif(map[currentPos.y][currentPos.x], map[currentPos.y - 1][currentPos.x]);
            }

            if(currentPos.y < map.length){
                downDif = getHeightDif(map[currentPos.y][currentPos.x], map[currentPos.y + 1][currentPos.x]);
            }

            if(currentPos.x - 1 > 0){
                leftDif = getHeightDif(map[currentPos.y][currentPos.x], map[currentPos.y][currentPos.x - 1]);
            }

            if(currentPos.x < map[0].length){
                rightDif = getHeightDif(map[currentPos.y][currentPos.x], map[currentPos.y][currentPos.x + 1]);
            }

            if(upDif !== undefined && (upDif === 1 || upDif === 0) && cameFrom !== "up") availablePositions.push({x: currentPos.x, y: currentPos.y - 1});
            if(downDif !== undefined && (downDif === 1 || downDif === 0) && cameFrom !== "down") availablePositions.push({x: currentPos.x, y: currentPos.y + 1});
            if(rightDif != undefined && (rightDif === 1 || rightDif === 0) && cameFrom !== "right") availablePositions.push({x: currentPos.x + 1, y: currentPos.y});
            if(leftDif != undefined && (leftDif === 1 || leftDif === 0) && cameFrom !== "left") availablePositions.push({x: currentPos.x - 1, y: currentPos.y});
    
            return availablePositions;
    }

    let visitedPositions: Position[] = [];

    function hasVisited(pos: Position){
        let visited = false;
        for(let i = 0; i < visitedPositions.length; i++){
            if(visitedPositions[i].x === pos.x && visitedPositions[i].y === pos.y){
                visited = true;
                break;
            }
        }

        return visited;
    }

    function traverse(startingPos: Position, map: string[][], cameFrom: string = "", depth: number = 0){
        let depthList: number[] = [];

        visitedPositions.push(startingPos);
        if(depth > 1){
            return [];
        }
        
        if(map[startingPos.y][startingPos.x] === "E"){
            return [depth];
        }

        let availablePositions = getAvailablePaths(startingPos, map, cameFrom);

        if(availablePositions.length === 0){
            return [];
        }
        console.log(startingPos, availablePositions);
        
        for(let i = 0; i < availablePositions.length; i++){
            if(hasVisited(availablePositions[i])){
                continue;
            }
            if(availablePositions[i].x === startingPos.x - 1){
                depthList.push(...traverse(availablePositions[i], map, "right", depth+1));
                continue;
            }

            if(availablePositions[i].x === startingPos.x + 1){
                depthList.push(...traverse(availablePositions[i], map, "left", depth+1));
                continue;
            }

            if(availablePositions[i].y === startingPos.y - 1){
                depthList.push(...traverse(availablePositions[i], map, "up", depth+1));
                continue;
            }

            if(availablePositions[i].y === startingPos.y + 1){
                depthList.push(...traverse(availablePositions[i], map, "down", depth+1));
                continue;
            }
        }

        return depthList;
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

        let map: string[][] = [];
        let startingPosFound = false;
        let startingPos: Position = {x: 0, y: 0};
        for(let i = 0; i < tmp.length; i++){
            let split = tmp[i].split("");
            if(!startingPosFound){
                for(let j = 0; j < split.length; j++){
                    if(split[j] === "S"){
                        startingPosFound = true;
                        startingPos = {x: j, y: i};
                        break;
                    }
                }
            }
    
            map.push(split);
        }

        console.log(startingPos);
        

        let depthList = traverse(startingPos, map);
        

    }, [input]);

    return <MainCard title='Day 12: Hill Climbing Algorithm.'>                
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

export default Dec12;