import React, {useState, useEffect} from 'react';
import MainCard from '../components/MainCard';
import InputArea from '../components/InputArea';

function Dec9(){
    const [input, setInput] = useState("");
    const [puzzleOneResult, setPuzzleOneResult] = useState(0);
    const [puzzleTwoResult, setPuzzleTwoResult] = useState(0);
    const [timer, setTimer] = useState("0 ms.");

    interface Position{
        x: number;
        y: number;
    }

    let headPos: Position = {y: 0, x: 0};
    let tailPos: Position = {y: 0, x: 0};
    let allTailPositions: Position[] = [{y: 0, x: 0}];


    let knots: Position[] = [
        {y: 0, x: 0},
        {y: 0, x: 0},
        {y: 0, x: 0},
        {y: 0, x: 0},
        {y: 0, x: 0},
        {y: 0, x: 0},
        {y: 0, x: 0},
        {y: 0, x: 0},
        {y: 0, x: 0},
        {y: 0, x: 0}
    ];

    function moveHead(str: string){
        let split = str.split(" ");

        for(let i = 0; i < +split[1]; i++){            
            switch(split[0]){
                case "U": headPos = {y: headPos.y-1, x: headPos.x}; break;
                case "L": headPos = {y: headPos.y, x: headPos.x-1}; break;
                case "R": headPos = {y: headPos.y, x: headPos.x+1}; break;
                case "D": headPos = {y: headPos.y+1, x: headPos.x}; break;
            }

            let movedTail = false;
            if(headPos.x > tailPos.x + 1){
                if(headPos.y !== tailPos.y){
                    tailPos = {y: headPos.y, x: tailPos.x + 1};
                }else{
                    tailPos = {y: tailPos.y, x: tailPos.x + 1};
                }

                movedTail = true;
            }

            if(headPos.x < tailPos.x - 1){
                if(headPos.y !== tailPos.y){
                    tailPos = {y: headPos.y, x: tailPos.x - 1};
                }else{
                    tailPos = {y: tailPos.y, x: tailPos.x - 1};
                }

                movedTail = true;
            }

            if(headPos.y > tailPos.y + 1){
                if(headPos.x !== tailPos.x){
                    tailPos = {y: tailPos.y + 1, x: headPos.x};
                }else{
                    tailPos = {y: tailPos.y + 1, x: tailPos.x};
                }

                movedTail = true;
            }

            if(headPos.y < tailPos.y - 1){
                if(headPos.x !== tailPos.x){
                    tailPos = {y: tailPos.y - 1, x: headPos.x};
                }else{
                    tailPos = {y: tailPos.y - 1, x: tailPos.x};
                }

                movedTail = true;
            }


            if(movedTail){
                allTailPositions.push(tailPos);
            }
        }
    }

    function isUniquePosition(arr: Position[]){
        let returnArr: Position[] = [];
        for(let i = 0; i < arr.length; i++){
            if(returnArr.length === 0){
                returnArr.push(arr[0]);
                continue;
            }

            let insert = true;
            for(let j = 0; j < returnArr.length; j++){
                if(returnArr[j].x === arr[i].x && returnArr[j].y === arr[i].y){
                    insert = false;
                    break;
                }
            }

            if(insert){
                returnArr.push(arr[i]);
            }
        }

        return returnArr;
    }

    function moveKnots(dir: string, knotIndex: number = 0){
        if(knotIndex === knots.length){
            return;
        }

        if(knotIndex === 0){
            switch(dir){
                case "U": knots[knotIndex] = {x: knots[knotIndex].x, y: knots[knotIndex].y - 1}; break;
                case "L": knots[knotIndex] = {x: knots[knotIndex].x - 1, y: knots[knotIndex].y}; break;
                case "R": knots[knotIndex] = {x: knots[knotIndex].x + 1, y: knots[knotIndex].y}; break;
                case "D": knots[knotIndex] = {x: knots[knotIndex].x, y: knots[knotIndex].y + 1}; break;
            }

            moveKnots(dir, knotIndex + 1);
        }else{
            let movedKnot = false;
            if(knots[knotIndex - 1].x > knots[knotIndex].x + 1){
                if(knots[knotIndex - 1].y !== knots[knotIndex].y){
                    knots[knotIndex] = {y: knots[knotIndex - 1].y, x: knots[knotIndex].x + 1};
                }else{
                    knots[knotIndex] = {y: knots[knotIndex].y, x: knots[knotIndex].x + 1};
                }

                movedKnot = true;
            }
    
            if(knots[knotIndex - 1].x < knots[knotIndex].x - 1){
                if(knots[knotIndex - 1].y !== knots[knotIndex].y){
                    knots[knotIndex] = {y: knots[knotIndex - 1].y, x: knots[knotIndex].x - 1};
                }else{
                    knots[knotIndex] = {y: knots[knotIndex].y, x: knots[knotIndex].x - 1};
                }

                movedKnot = true;
            }
    
            if(knots[knotIndex - 1].y > knots[knotIndex].y + 1){
                if(knots[knotIndex - 1].x !== knots[knotIndex].x){
                    knots[knotIndex] = {y: knots[knotIndex].y + 1, x: knots[knotIndex - 1].x};
                }else{
                    knots[knotIndex] = {y: knots[knotIndex].y + 1, x: knots[knotIndex].x};
                }

                movedKnot = true;
            }
    
            if(knots[knotIndex - 1].y < knots[knotIndex].y - 1){
                if(knots[knotIndex - 1].x !== knots[knotIndex].x){
                    knots[knotIndex] = {y: knots[knotIndex].y - 1, x: knots[knotIndex - 1].x};
                }else{
                    knots[knotIndex] = {y: knots[knotIndex].y - 1, x: knots[knotIndex].x};
                }

                movedKnot = true;
            }

            if(movedKnot){
                moveKnots(dir, knotIndex + 1);
            }else{
                return;
            }
        }
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

        // for(let i = 0; i < tmp.length; i++){
        //     moveHead(tmp[i]);
        // }

        // let unique = isUniquePosition(allTailPositions);
        // console.log(unique.length);
        
        console.log(knots);
        moveKnots("R");
        moveKnots("R");
        moveKnots("R");
        moveKnots("R");
        moveKnots("U");
        moveKnots("U");
        moveKnots("U");
        moveKnots("U");
        console.log(knots);
        

        // Insert code here.
        
        setTimer(`${(performance.now() - startTimer).toFixed(1)} ms.`);

    }, [input]);

    return <MainCard title='Day 9: ?'>                
            <InputArea inputChange={(val: string) => {
                setInput(val);
            }} />

            <div className="result-area">
           
            </div>
    </MainCard>
}

export default Dec9;