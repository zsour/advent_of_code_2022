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

    interface Node{
        letter: string;
        neighbours: Position[];
        height: number;
    }

    interface Graph{
        nodes: Node[];
    }

    const alphabet = "abcdefghijklmnopqrstuvwxyz";

    function getHeightValue(char: string){
        return alphabet.indexOf(char);
    }

    function getNeighbour(graph: Graph, pos: Position){
        let tmp = []; 
    
        const chunkSize = 83;
        for (let i = 0; i < graph.nodes.length; i += chunkSize) {
            const chunk = graph.nodes.slice(i, i + chunkSize);
            tmp.push(chunk);
        }
        
        return tmp[pos.y][pos.x];
    }

    let visitedPositions: Position[] = [];
    function isVisited(pos: Position){
        let visited = false;
        for(let i = 0; i < visitedPositions.length; i++){
            if(visitedPositions[i].x === pos.x && visitedPositions[i].y === pos.y){
                visited = true;
                break;
            }
        }
        return visited;
    }

    function traverse(graph: Graph, currentNode: Node, depth: number = 0): number[]{
        let depthList = [];
        console.log(currentNode);
        
        if(depth === 2){
            return [];
        }
        if(currentNode.letter === "E"){
            return [depth];
        }

        for(let i = 0; i < currentNode.neighbours.length; i++){
            let heightDif = Math.abs(currentNode.height - getNeighbour(graph, currentNode.neighbours[i]).height);

            if((heightDif === 0 || heightDif === 1) && !isVisited(currentNode.neighbours[i])){
                visitedPositions.push(currentNode.neighbours[i]);
                depthList.push(...traverse(graph, getNeighbour(graph, currentNode.neighbours[i]), depth + 1));
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

        let graph: Graph = {nodes: []};
        let startingNode = {x:0, y:0};
        let finishNode = {x:0, y:0};

        for(let i = 0; i < tmp.length; i++){
            let split = tmp[i].split("");
            for(let j = 0; j < split.length; j++){
                let node: Node;
                if(tmp[i][j] === 'S'){
                    startingNode = {x: j, y: i};
                    node = {height: getHeightValue('a'), neighbours: [], letter: tmp[i][j]};
                }else if(tmp[i][j] === 'E'){
                    finishNode = {x: j, y: i};
                    node = {height: getHeightValue('z'), neighbours: [], letter: tmp[i][j]};
                }else{
                    node = {height: getHeightValue(tmp[i][j]), neighbours: [], letter: tmp[i][j]};
                }
                
                if((i - 1) >= 0){
                    node.neighbours.push({x: j, y: i - 1});
                }

                if((i + 1) < tmp.length){
                    node.neighbours.push({x: j, y: i + 1});
                }

                if((j - 1) >= 0){
                    node.neighbours.push({x: j - 1, y: i});
                }

                if((j + 1) < split.length){
                    node.neighbours.push({x: j + 1, y: i});
                }

                graph.nodes.push(node);
            }
        }

        visitedPositions.push(startingNode);
        console.log(traverse(graph, getNeighbour(graph, startingNode)));     
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