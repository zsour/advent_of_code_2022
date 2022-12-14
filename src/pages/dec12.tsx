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

        for(let i = 0; i < graph.edges.length; i++){
            for(let j = 0; j < graph.edges.length; j++){
                if(graph.edges[i].positionOne.x === graph.edges[j].positionTwo.x && 
                   graph.edges[i].positionOne.y === graph.edges[j].positionTwo.y &&
                   graph.edges[i].positionTwo.x === graph.edges[j].positionOne.x &&
                   graph.edges[i].positionTwo.y === graph.edges[j].positionOne.y){
                    graph.edges.splice(j, 1);
                }
            }
        }

        let newEdges = [];
        for(let i = 0; i < graph.edges.length; i++){
            let vertexOne = getVertexFromPos(graph.vertecies, graph.edges[i].positionOne);
            let vertexTwo = getVertexFromPos(graph.vertecies, graph.edges[i].positionOne);
            if(vertexOne && vertexTwo){
                if(Math.abs(getHeightValue(vertexOne.letter) - getHeightValue(vertexTwo.letter)) === 0){
                    newEdges.push(graph.edges[i]);
                }else if(Math.abs(getHeightValue(vertexOne.letter) - getHeightValue(vertexTwo.letter)) === 1){
                    newEdges.push(graph.edges[i]);
                }
            }   
        }

        let prev: number[] | undefined[] = [];
        for(let i = 0; i < graph.vertecies.length; i++) prev[i] = undefined;

        let dist: number[] = [];
        for(let i = 0; i < graph.vertecies.length; i++) dist[i] = Infinity;

        let tmpVertecies: Vertex[] = [];
        for(let i = 0; i < graph.vertecies.length; i++) tmpVertecies[i] = graph.vertecies[i];

        function getNeighbours(pos: Position, vertecies: Vertex[], edges: Edge[]){
            let rv = [];
            for(let i = 0; i < edges.length; i++){
                if(edges[i].positionOne.x === pos.x && edges[i].positionOne.y === pos.y){
                    rv.push(getVertexFromPos(vertecies, {x: edges[i].positionTwo.x, y: edges[i].positionTwo.y}));
                }

                if(edges[i].positionTwo.x === pos.x && edges[i].positionTwo.y === pos.y){
                    rv.push(getVertexFromPos(vertecies, {x: edges[i].positionOne.x, y: edges[i].positionOne.y}));
                }
            }

            return rv;
        }
    
        let finishIndex = 0;
        for(let i = 0; i < graph.vertecies.length; i++){
            if(graph.vertecies[i].letter === "S"){
                dist[i] = 0;
            }

            if(graph.vertecies[i].letter === "E"){
                finishIndex = i;
            }
        }

        function getIndexOfPos(pos: Position | undefined){
            if(!pos){
                return -1;
            }
            for(let i = 0; i < graph.vertecies.length; i++){
                if(graph.vertecies[i].position.x === pos.x && graph.vertecies[i].position.y === pos.y){
                    return i;
                }
            }

            return -1;
        }

        function findLeastDist(vertecies: Vertex[]){
            let least = undefined;
            let leastIndex = undefined;
            let leastIndexVertecies = undefined;
            for(let i = 0; i < vertecies.length; i++){
                let index = getIndexOfPos(vertecies[i].position);
                if(least === undefined || index && dist[index] <= least){
                    least = dist[index];
                    leastIndex = index;
                    leastIndexVertecies = i;
                }
            }
            
            return leastIndex ? {pos: graph.vertecies[leastIndex].position, distIndex: leastIndex, index: leastIndexVertecies} : undefined;
        }


        while(tmpVertecies.length > 0){
            
            let minDist = findLeastDist(tmpVertecies);
            if(minDist === undefined || minDist.distIndex === undefined || minDist.index === undefined){
                console.log(minDist);
                break;
            }
        
            let neighbours = getNeighbours(minDist.pos, graph.vertecies, newEdges);
            tmpVertecies.splice(minDist.index, 1);
            
            for(let i = 0; i < neighbours.length; i++){
                    let newDist = dist[minDist.distIndex] + 1;            
                    let neighbour = getIndexOfPos(neighbours[i]?.position);
                    if(newDist <= dist[neighbour]){
                        dist[neighbour] = newDist;
                        prev[neighbour] = minDist.index;
                    }
            }
        }      
        
        console.log(dist);
        

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