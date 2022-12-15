import React, {useState, useEffect} from 'react';
import MainCard from '../components/MainCard';
import InputArea from '../components/InputArea';
import {v4 as uuidv4} from 'uuid';

function Dec14(){
    const [input, setInput] = useState("");
    const [puzzleOneResult, setPuzzleOneResult] = useState(0);
    const [puzzleTwoResult, setPuzzleTwoResult] = useState(0);
    const [timerOne, setTimerOne] = useState("0 ms.");
    const [timerTwo, setTimerTwo] = useState("0 ms.");

    interface Position{
        x: number;
        y: number;
    }

    interface Connection{
        sensorPos: Position;
        closestBeacon: Position;
    }

    function manhattanDistance(pos1: Position, pos2: Position){
        return Math.abs(pos1.x - pos2.x) + Math.abs(pos1.y - pos2.y);
    }

    function findClosestSensor(connections: Connection[], pos: Position){
        let closestConnection = undefined;
        let minDist = undefined;
        for(let i = 0; i < connections.length; i++){
            let manhattan = manhattanDistance(pos, connections[i].sensorPos);
            if(minDist === undefined || manhattan < minDist){
                minDist = manhattan;
                closestConnection = connections[i];
            }
        }

        return closestConnection;
    }

    function generateRow(connections: Connection[], height: number, width: number){
        let counter = 0;
        for(let i = 0; i <= width; i++){
            let closestConnection = findClosestSensor(connections, {x: i, y: height});
            if(closestConnection){
                if(manhattanDistance(closestConnection.sensorPos, {x: i, y: height}) <= manhattanDistance(closestConnection.sensorPos, closestConnection.closestBeacon)){
                    counter++;
                }
            }
            
        }

        return counter;
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
        let connectionArr: Connection[] = [];
        for(let i = 0; i < tmp.length; i++){
            let split = tmp[i].split(' ');
            let numbersArr = split.map((str) => {
                let singleSplit = str.split("");
                let numbersArr: number[] = [];
                let positionArr: Position[] = [];
                if(singleSplit[0] === 'x'){
                    singleSplit.shift();
                    singleSplit.shift();
                    if(singleSplit[singleSplit.length - 1] === ','){
                        singleSplit.pop();
                    }
                    numbersArr.push(+singleSplit.join(''));
                }else if(singleSplit[0] === 'y'){
                    singleSplit.shift();
                    singleSplit.shift();
                    if(singleSplit[singleSplit.length - 1] === ':'){
                        singleSplit.pop();
                    }
                    numbersArr.push(+singleSplit.join(''));
                }

                if(numbersArr.length === 1){
                    return numbersArr;
                }
            });
    
            let newNumbersArr: any  = [];
            for(let i = 0; i < numbersArr.length; i++){
                if(numbersArr !== undefined){
                    if(numbersArr[i] !== undefined){
                        newNumbersArr.push(numbersArr[i]);
                    }
                }
            }

            for(let i = 0; i < newNumbersArr.length; i+=4){
                let sensorPos: Position = {x: +newNumbersArr[i][0], y: +newNumbersArr[i+1][0]};
                let beaconPos: Position = {x: +newNumbersArr[i+2][0], y: +newNumbersArr[i+3][0]};
                let connection: Connection = {sensorPos, closestBeacon: beaconPos};
                connectionArr.push(connection);
            }
        }

        let minX = 0;
        let maxX = 0;
        let minY = 0;
        let maxY = 0;

        for(let i = 0; i < connectionArr.length; i++){
            if(connectionArr[i].sensorPos.x < minX){
                minX = connectionArr[i].sensorPos.x;
            }

            if(connectionArr[i].closestBeacon.x < minX){
                minX = connectionArr[i].closestBeacon.x;
            }

            if(connectionArr[i].sensorPos.x > maxX){
                maxX = connectionArr[i].sensorPos.x;
            }

            if(connectionArr[i].closestBeacon.x > maxX){
                maxX = connectionArr[i].closestBeacon.x;
            }

            if(connectionArr[i].sensorPos.y < minY){
                minY = connectionArr[i].sensorPos.y;
            }

            if(connectionArr[i].closestBeacon.y < minY){
                minY = connectionArr[i].closestBeacon.y;
            }

            if(connectionArr[i].sensorPos.y > maxY){
                maxY = connectionArr[i].sensorPos.y;
            }

            if(connectionArr[i].closestBeacon.y > maxY){
                maxY = connectionArr[i].closestBeacon.y;
            }
        }
        

        let offsetX = Math.abs(minX);
        let offsetY = Math.abs(minY);

        for(let i = 0; i < connectionArr.length; i++){
            connectionArr[i].sensorPos.x += offsetX;
            connectionArr[i].sensorPos.y += offsetY;
            connectionArr[i].closestBeacon.x += offsetX;
            connectionArr[i].closestBeacon.y += offsetY;
        }

        console.log(minX, maxX, minY, maxY);
        
        let result = generateRow(connectionArr, 12, (maxY + offsetY));

        
        console.log(result);
        

        
        setTimerTwo(`${(performance.now() - startTimer).toFixed(1)} ms.`);
        
    }, [input]);


    return <MainCard title='Day 15: Beacon Exclusion Zone.'>                
            <InputArea inputChange={(val: string) => {
                setInput(val);
            }} />

    
            <div className="result-area" style={{padding: "0px"}}>
            
            </div>
    </MainCard>
}

export default Dec14;