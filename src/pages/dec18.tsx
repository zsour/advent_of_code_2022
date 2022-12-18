import React, {useState, useEffect} from 'react';
import MainCard from '../components/MainCard';
import InputArea from '../components/InputArea';

interface Position{
    x: number;
    y: number;
    z: number;
}

interface Cube{
    position: Position;
    availableSurfaces: number;
    children: Cube[];
}

function Dec18(){
    const [input, setInput] = useState("");
    const [puzzleOneResult, setPuzzleOneResult] = useState(0);
    const [puzzleTwoResult, setPuzzleTwoResult] = useState(0);
    const [timerOne, setTimerOne] = useState("0 ms.");
    const [timerTwo, setTimerTwo] = useState("0 ms.");

    
    function cubeExistsAtPos(arr: Cube[], pos: Position){
        for(let i = 0; i < arr.length; i++){
            if(arr[i].position.x === pos.x && arr[i].position.y === pos.y && arr[i].position.z === pos.z){
                return true;
            }
        }

        return false;
    }

    function cubeAbove(arr: Cube[], pos: Position){
        if(cubeExistsAtPos(arr, {x: pos.x, y: pos.y + 1, z: pos.z})){
            return 1;
        }

        return 0;
    }

    function cubeBelow(arr: Cube[], pos: Position){
        if(cubeExistsAtPos(arr, {x: pos.x, y: pos.y - 1, z: pos.z})){
            return 1;
        }

        return 0;
    }

    function cubeNextTo(arr: Cube[], pos: Position){
        let surfaces = 0;

        if(cubeExistsAtPos(arr, {x: pos.x, y: pos.y, z: pos.z + 1})){
            surfaces++;
        }

        if(cubeExistsAtPos(arr, {x: pos.x, y: pos.y, z: pos.z - 1})){
            surfaces++;
        }

        if(cubeExistsAtPos(arr, {x: pos.x - 1, y: pos.y, z: pos.z})){
            surfaces++;
        }

        if(cubeExistsAtPos(arr, {x: pos.x + 1, y: pos.y, z: pos.z})){
            surfaces++;
        }
        
        return surfaces;
    }

    let trappedAirCubes: Cube[] = [];

    function trappedAir(arr: Cube[]){
       let rv: Cube[] = [];
       for(let i = 0; i < arr.length; i++){
            if(!cubeExistsAtPos(rv, {x: arr[i].position.x-1, y: arr[i].position.y, z: arr[i].position.z}) &&
               !cubeExistsAtPos(arr, {x: arr[i].position.x-1, y: arr[i].position.y, z: arr[i].position.z}) &&
                cubeExistsAtPos(arr, {x: arr[i].position.x-2, y: arr[i].position.y, z: arr[i].position.z}) &&
                cubeExistsAtPos(arr, {x: arr[i].position.x-1, y: arr[i].position.y+1, z: arr[i].position.z}) &&
                cubeExistsAtPos(arr, {x: arr[i].position.x-1, y: arr[i].position.y-1, z: arr[i].position.z}) &&
                cubeExistsAtPos(arr, {x: arr[i].position.x-1, y: arr[i].position.y, z: arr[i].position.z+1}) &&
                cubeExistsAtPos(arr, {x: arr[i].position.x-1, y: arr[i].position.y, z: arr[i].position.z-1})){

                let cube: Cube = {availableSurfaces: 0, position: {x: arr[i].position.x-1, y: arr[i].position.y, z: arr[i].position.z}, children: []};
                rv.push(cube);
            }

            if(!cubeExistsAtPos(rv, {x: arr[i].position.x+1, y: arr[i].position.y, z: arr[i].position.z}) &&
               !cubeExistsAtPos(arr, {x: arr[i].position.x+1, y: arr[i].position.y, z: arr[i].position.z}) &&
                cubeExistsAtPos(arr, {x: arr[i].position.x+2, y: arr[i].position.y, z: arr[i].position.z}) &&
                cubeExistsAtPos(arr, {x: arr[i].position.x+1, y: arr[i].position.y+1, z: arr[i].position.z}) &&
                cubeExistsAtPos(arr, {x: arr[i].position.x+1, y: arr[i].position.y-1, z: arr[i].position.z}) &&
                cubeExistsAtPos(arr, {x: arr[i].position.x+1, y: arr[i].position.y, z: arr[i].position.z+1}) &&
                cubeExistsAtPos(arr, {x: arr[i].position.x+1, y: arr[i].position.y, z: arr[i].position.z-1})){

                let cube: Cube = {availableSurfaces: 0, position: {x: arr[i].position.x+1, y: arr[i].position.y, z: arr[i].position.z}, children: []};
                rv.push(cube);
            }

            if(!cubeExistsAtPos(rv, {x: arr[i].position.x, y: arr[i].position.y, z: arr[i].position.z + 1}) &&
               !cubeExistsAtPos(arr, {x: arr[i].position.x, y: arr[i].position.y, z: arr[i].position.z + 1}) &&
                cubeExistsAtPos(arr, {x: arr[i].position.x, y: arr[i].position.y, z: arr[i].position.z + 2}) &&
                cubeExistsAtPos(arr, {x: arr[i].position.x, y: arr[i].position.y+1, z: arr[i].position.z + 1}) &&
                cubeExistsAtPos(arr, {x: arr[i].position.x, y: arr[i].position.y-1, z: arr[i].position.z + 1}) &&
                cubeExistsAtPos(arr, {x: arr[i].position.x - 1, y: arr[i].position.y, z: arr[i].position.z + 1}) &&
                cubeExistsAtPos(arr, {x: arr[i].position.x + 1, y: arr[i].position.y, z: arr[i].position.z + 1})){

                let cube: Cube = {availableSurfaces: 0, position: {x: arr[i].position.x, y: arr[i].position.y, z: arr[i].position.z + 1}, children: []};
                rv.push(cube);
            }

            if(!cubeExistsAtPos(rv, {x: arr[i].position.x, y: arr[i].position.y, z: arr[i].position.z - 1}) &&
               !cubeExistsAtPos(arr, {x: arr[i].position.x, y: arr[i].position.y, z: arr[i].position.z - 1}) &&
               cubeExistsAtPos(arr, {x: arr[i].position.x, y: arr[i].position.y, z: arr[i].position.z - 2}) &&
               cubeExistsAtPos(arr, {x: arr[i].position.x, y: arr[i].position.y+1, z: arr[i].position.z - 1}) &&
               cubeExistsAtPos(arr, {x: arr[i].position.x, y: arr[i].position.y-1, z: arr[i].position.z - 1}) &&
               cubeExistsAtPos(arr, {x: arr[i].position.x - 1, y: arr[i].position.y, z: arr[i].position.z - 1}) &&
               cubeExistsAtPos(arr, {x: arr[i].position.x + 1, y: arr[i].position.y, z: arr[i].position.z - 1})){

                let cube: Cube = {availableSurfaces: 0, position: {x: arr[i].position.x, y: arr[i].position.y, z: arr[i].position.z - 1}, children: []};
                rv.push(cube);
            }

            if(!cubeExistsAtPos(rv, {x: arr[i].position.x, y: arr[i].position.y + 1, z: arr[i].position.z}) &&
                !cubeExistsAtPos(arr, {x: arr[i].position.x, y: arr[i].position.y + 1, z: arr[i].position.z}) &&
                cubeExistsAtPos(arr, {x: arr[i].position.x, y: arr[i].position.y + 2, z: arr[i].position.z}) &&
                cubeExistsAtPos(arr, {x: arr[i].position.x - 1, y: arr[i].position.y + 1, z: arr[i].position.z}) &&
                cubeExistsAtPos(arr, {x: arr[i].position.x + 1, y: arr[i].position.y + 1, z: arr[i].position.z}) &&
                cubeExistsAtPos(arr, {x: arr[i].position.x, y: arr[i].position.y + 1, z: arr[i].position.z - 1}) &&
                cubeExistsAtPos(arr, {x: arr[i].position.x, y: arr[i].position.y + 1, z: arr[i].position.z + 1})){

                let cube: Cube = {availableSurfaces: 0, position: {x: arr[i].position.x, y: arr[i].position.y + 1, z: arr[i].position.z}, children: []};
                rv.push(cube);
            }

            if(!cubeExistsAtPos(rv, {x: arr[i].position.x, y: arr[i].position.y - 1, z: arr[i].position.z}) &&
                !cubeExistsAtPos(arr, {x: arr[i].position.x, y: arr[i].position.y - 1, z: arr[i].position.z}) &&
                cubeExistsAtPos(arr, {x: arr[i].position.x, y: arr[i].position.y - 2, z: arr[i].position.z}) &&
                cubeExistsAtPos(arr, {x: arr[i].position.x - 1, y: arr[i].position.y - 1, z: arr[i].position.z}) &&
                cubeExistsAtPos(arr, {x: arr[i].position.x + 1, y: arr[i].position.y - 1, z: arr[i].position.z}) &&
                cubeExistsAtPos(arr, {x: arr[i].position.x, y: arr[i].position.y - 1, z: arr[i].position.z - 1}) &&
                cubeExistsAtPos(arr, {x: arr[i].position.x, y: arr[i].position.y - 1, z: arr[i].position.z + 1})){

                let cube: Cube = {availableSurfaces: 0, position: {x: arr[i].position.x, y: arr[i].position.y - 1, z: arr[i].position.z}, children: []};
                rv.push(cube);
            }
       }
       return rv;
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

        let map: Cube[] = [];

        for(let i = 0; i < tmp.length; i++){
            let split = tmp[i].split(',');
            let x = +split[0];
            let y = +split[1];
            let z = +split[2];

            let cube: Cube = {position: {x, y, z}, availableSurfaces: 6, children: []}
            map.push(cube);
        }
       
        
        

        for(let i = 0; i < map.length; i++){   
            map[i].availableSurfaces -= (cubeAbove(map, map[i].position) + cubeBelow(map, map[i].position) + cubeNextTo(map, map[i].position));
        }

        let result = 0;
        for(let i = 0; i < map.length; i++){
            result += map[i].availableSurfaces;
        }

 

        console.log(result - (trappedAir(map).length*6));
        
        setTimerTwo(`${(performance.now() - startTimer).toFixed(1)} ms.`);
        
    }, [input]);


    return <MainCard title='Day 18: Boiling Boulders.'>                
            <InputArea inputChange={(val: string) => {
                setInput(val);
            }} />

    
            <div className="result-area" style={{padding: "0px"}}>
            
            </div>
    </MainCard>
}

export default Dec18;