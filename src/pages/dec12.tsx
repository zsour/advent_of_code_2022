import {useState, useEffect} from 'react';
import MainCard from '../components/MainCard';
import InputArea from '../components/InputArea';


function Dec12(){
    const [input, setInput] = useState("");
    const [puzzleOneResult, setPuzzleOneResult] = useState(0);
    const [puzzleTwoResult, setPuzzleTwoResult] = useState(0);
    const [timerOne, setTimerOne] = useState("0 ms.");
    const [timerTwo, setTimerTwo] = useState("0 ms.");


    const alphabet = "abcdefghijklmnopqrstuvwxyz";

    function getHeightValue(char: string){
        if(char === "S"){
            return alphabet.indexOf("a");
        }else if(char === "E"){
            return alphabet.indexOf("z");
        }

        return alphabet.indexOf(char);
    }


    interface Position{
        x: number;
        y: number;
    }

    interface Vertex{
        letter: string;
        position: Position;
    }

    interface Edge{
        positionOne: Position;
        positionTwo: Position;
    }
 
    interface Graph{
        vertecies: Vertex[];
        edges: Edge[];
    }

    function getVertexFromPos(vertecies: Vertex[], pos: Position){
        for(let i = 0; i < vertecies.length; i++){
            if(vertecies[i].position.x === pos.x && vertecies[i].position.y === pos.y){
                return vertecies[i];
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

        let graph: Graph = {vertecies: [], edges: []};

        let startingNode = {x:0, y:0};
        let finishNode = {x:0, y:0};


        for(let i = 0; i < tmp.length; i++){
            let split = tmp[i].split("");
            for(let j = 0; j < split.length; j++){
                let vertex: Vertex = {letter: tmp[i][j], position: {x: j, y: i}};
                if(tmp[i][j] === 'S'){
                    startingNode = {x: j, y: i};
                }else if(tmp[i][j] === 'E'){
                    finishNode = {x: j, y: i};
                }

                graph.vertecies.push(vertex);

                if((i - 1) >= 0){
                    let edge:Edge = {positionOne: {x: j, y: i}, positionTwo: {x: j, y: i-1}};
                    graph.edges.push(edge);
                }   

                if((i + 1) < tmp.length){
                    let edge:Edge = {positionOne: {x: j, y: i}, positionTwo: {x: j, y: i+1}};
                    graph.edges.push(edge)
                }

                if((j - 1) >= 0){
                    let edge:Edge = {positionOne: {x: j, y: i}, positionTwo: {x: j-1, y: i}};
                    graph.edges.push(edge)
                }

                if((j + 1) < split.length){
                    let edge:Edge = {positionOne: {x: j, y: i}, positionTwo: {x: j+1, y: i}};
                    graph.edges.push(edge)
                }
            }
        }


        function getDistFromPosition(dist: number[], postiion: Position){
            for(let i = 0; i < graph.vertecies.length; i++){
                if(graph.vertecies[i].position.x === postiion.x && graph.vertecies[i].position.y === postiion.y){
                    return dist[i];
                }
            }

            throw 'Dist not found.';
        }


        function getVertexWithLeastDist(arr: Vertex[], dist: number[]){
            let leastPos = undefined;
            let vertex = undefined;
            for(let i = 0; i < arr.length; i++){
                let tmpDist = getDistFromPosition(dist, arr[i].position);
                if(leastPos === undefined || tmpDist < leastPos){
                    leastPos = tmpDist;
                    vertex = i;
                }
            }

            if(vertex === undefined){
                throw "Could not find vertex.";
            }

            return vertex;
        }

        function getNeighbours(position: Position, arr: Vertex[], edges: Edge[]){
            let neighbourPositions = [];
            for(let i = 0; i < edges.length; i++){
                if(edges[i].positionOne.x === position.x && edges[i].positionOne.y === position.y){
                    neighbourPositions.push(edges[i].positionTwo);
                }
            }

            
            

            let indecies: number[] = [];
            for(let i = 0; i < arr.length; i++){
                for(let j = 0; j < neighbourPositions.length; j++){
                    if(arr[i].position.x === neighbourPositions[j].x && arr[i].position.y === neighbourPositions[j].y){
                        indecies.push(i);
                    }
                }
            }



            if(position.x === 0 && position.y === 0){
                console.log(neighbourPositions);
                console.log(indecies);
            }
            
            

            return indecies;
        }
    
        function dijkstra(){
            let tmpVertecies: Vertex[] = [];
            let dist: number[] = [];
            for(let i = 0; i < graph.vertecies.length; i++){
                tmpVertecies.push(graph.vertecies[i]);
                if(graph.vertecies[i].letter !== 'S'){
                    dist[i] = Infinity;
                }else{
                    dist[i] = 0;
                }
            }

            while(tmpVertecies.length > 0){
                let vertexIndex = getVertexWithLeastDist(tmpVertecies, dist);
                let vertex = tmpVertecies[vertexIndex];

                tmpVertecies.splice(vertexIndex, 1);


                let neighbours = getNeighbours(vertex.position, tmpVertecies, graph.edges);
                if(vertex.position.x === 0 && vertex.position.y === 0){
                    console.log(neighbours);
                }
                for(let i = 0; i < neighbours.length; i++){
                    let alt = dist[vertexIndex] + 1;
                    if(alt < dist[neighbours[i]]){
                        dist[neighbours[i]] = alt;
                    }
                }
            }

            return dist;
        }

        let distances = dijkstra();
        let finishIndex = 0;
        for(let i = 0; i < graph.vertecies.length; i++){
            if(graph.vertecies[i].letter === "E"){
                finishIndex = i;
                break;
            }
        }

        console.log(distances[finishIndex]);
        
        


        

       

      


       
        

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