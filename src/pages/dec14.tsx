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
    const [displayMap, setDisplayMap] = useState<string[][]>([[]]);

    let map: string[][] = [];

    function generateDefaultMap(width: number, height: number){
        let tmp: string[][] = [[]];
        for(let i = 0; i < height - 1; i++){
            tmp.push([]);
            for(let j = 0; j < width - 1; j++){
                tmp[i].push('.');
            }
        }

        return tmp;
    }

    function drawStoneLine(map: string[][], from: {x: number, y: number}, to: {x: number, y: number}){
        let tmpMap = [...map];
        
        if(from.x === to.x){
            if(from.y > to.y){
                for(let i = to.y; i < from.y; i++){
                    tmpMap[i][from.x] = '#';
                }
            }else{
                for(let i = from.y; i < to.y; i++){
                    tmpMap[i][from.x] = '#';
                }
            }
        }else{
            if(from.x > to.x){
                for(let i = to.x; i < from.x; i++){
                    tmpMap[from.y][i] = '#';
                }
            }else{
                for(let i = from.x; i < to.x; i++){
                    tmpMap[from.y][i] = '#';
                }
            }
        }

        return tmpMap;
    }

    function dropSand(map: string[][], startingY: number, startingX: number): string[][] | undefined{
        let tmpMap: string[][] = [...map];
        let positionY = startingY;
        let positionX = startingX;
        
        
        if(positionY === tmpMap.length - 1){
            return undefined;
        }
        
        if(positionX === tmpMap[0].length - 1){
            return undefined;
        }

        if(tmpMap[positionY+1][positionX] === 'O' || tmpMap[positionY+1][positionX] === '#'){
           
        
            if(tmpMap[positionY+1][positionX - 1] !== '.' && tmpMap[positionY+1][positionX + 1] !== '.'){
                tmpMap[positionY][positionX] = 'O';
                return tmpMap;
            }
            
            if(tmpMap[positionY+1][positionX-1] === "."){
                if(tmpMap[positionY][positionX-1] === "."){
                    return dropSand(tmpMap, positionY+1, positionX-1);
                }
            }
            
            if(tmpMap[positionY+1][positionX+1] === "."){     
                if(tmpMap[positionY][positionX+1] === "."){
                    return dropSand(tmpMap, positionY+1, positionX+1);
                }      
            }


            console.log(positionY, positionX);
            

            console.log(tmpMap[positionY][positionX-1], tmpMap[positionY][positionX], tmpMap[positionY][positionX+1]);
            
        }else{
            return dropSand(tmpMap, positionY+1, positionX);
        }
    }


    function timeout(ms: number){
        return new Promise((resolve, reject) => {
            setTimeout(resolve, ms);
        });
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

        map = generateDefaultMap(2000, 2000);
        let fromToPairs = [];
        for(let i = 0; i < tmp.length; i++){
            
            let split = tmp[i].split(' ');
            for(let j = 0; j < split.length; j++){
                if(split[j + 1] === '->'){
                    let fromSplit = split[j].split(',');
                    let toSplit = split[j+2].split(',');
                    fromToPairs.push([{x: +fromSplit[0], y: +fromSplit[1]}, {x: +toSplit[0], y: +toSplit[1]}]);
                }
            }
        }

        for(let i = 0; i < fromToPairs.length; i++){
            map = drawStoneLine(map, fromToPairs[i][0], fromToPairs[i][1]);
        }

        async function pushSand(){
            for(let i = 0; i < 500; i++){     
                let tmpMap: undefined | string[][] = dropSand(map, 0, 500);
                if(!tmpMap){
                    break;
                } 

                map = tmpMap;
                
                // await timeout(20);
                // setDisplayMap([...map]);
            }        


            let sandCount = 0;
            for(let i = 0; i < map.length; i++){
                for(let j = 0; j < map[i].length; j++){
                    if(map[i][j] === "O"){
                        sandCount++;
                    }
                }
            }
    
            console.log(sandCount);
        }

        pushSand();


        
        setTimerTwo(`${(performance.now() - startTimer).toFixed(1)} ms.`);
        
    }, [input]);

    function displaySandMap(){
        let jsx: React.ReactNode[] = [];
        if(displayMap.length > 400){
            for(let i = 0; i < 400; i++){
                for(let j = 420; j < 520; j++){
                    if(displayMap[i][j] === '#'){
                        jsx.push(<span key={`${i}${j}`} className='sand-map-pixel grey'></span>);
                    }else if(displayMap[i][j] === 'O'){
                        jsx.push(<span key={`${i}${j}`} className='sand-map-pixel sand'></span>);
                    }else{
                        jsx.push(<span key={`${i}${j}`} className='sand-map-pixel dark'></span>);
                    }
                }
            }
        }
        
        return jsx;
    }

    return <MainCard title='Day 14: Regolith Reservoir.'>                
            <InputArea inputChange={(val: string) => {
                setInput(val);
            }} />

    
            <div className="result-area" style={{padding: "0px"}}>
                <div className="sand-map">
                            {displaySandMap()}
                </div>
            </div>
    </MainCard>
}

export default Dec14;