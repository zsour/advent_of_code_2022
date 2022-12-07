import {useState, useEffect} from 'react';
import MainCard from '../components/MainCard';
import InputArea from '../components/InputArea';
import css from 'styled-jsx/css';


interface File{
    name: string;
    size: number;
}

interface Directory{
    name: string;
    files: File[];
}

class Node{
    data: Directory;
    children: Node[];
    constructor(data: Directory, children: Node[]){
        this.data = data;
        this.children = children;
    }

    add(dir: Node){
        this.children.push(dir);
    }

    remove(name: string){
        this.children.filter((dir: Node) => {
            if(dir.data.name !== name){
                return dir;
            }
        });
    }
}

class Tree{
    root: Node;
    constructor(root: Node){
        this.root = root;
    }
}

function Dec7(){
    const [input, setInput] = useState("");
    const [puzzleOneResult, setPuzzleOneResult] = useState(0);
    const [puzzleTwoResult, setPuzzleTwoResult] = useState(0);
    const [timerOne, setTimerOne] = useState("0 ms.");
    const [timerTwo, setTimerTwo] = useState("0 ms.");

    let tree = new Tree(new Node({name: "/", files: []}, []));

    function isCommand(output: string, commandType: string){
        let split = output.split(" ");
        if(split[0] === "$" && split[1] === commandType){
            return true;
        }

        return false;
    }

    function cd(directory: string){
        if(directory === '/'){
            currentPath = ['/'];
        }
        else if(directory === '..'){
            currentPath.pop();
        }
        else{
            currentPath.push(directory);
        }
    }

    function ls(includes: string[]){
        let files: File[] = [];
        let dirs: Directory[] = [];
        for(let i = 0; i < includes.length; i++){
            let split = includes[i].split(" ");
            if(split[0] === 'dir'){
                dirs.push({name: split[1], files: []});
            }
            else{
                files.push({size: +split[0], name: split[1]});
            }
        }

        // add files and dirs to current path.
    }

    let currentPath: string[] =  ['/'];


    useEffect(() => {
        if(input.length === 0){
            return;
        }

        let tmp = input.split("\n");
        if(tmp[tmp.length - 1] === ''){
            tmp.pop();
        }

        try{
           console.log(tree);
           
        }catch(err){
            console.log(err);
        }
        
        for(let i = 0; i < tmp.length; i++){
            let split = tmp[i].split(" ");
            if(isCommand(tmp[i], "cd")){           
                cd(split[2]);
                continue;
            }

            if(isCommand(tmp[i], 'ls')){
                let result = [];
                for(let j = i + 1; j < tmp.length; j++){
                    let secondSplit = tmp[j].split(" ");
                    if(secondSplit[0] !== '$'){
                        result.push(tmp[j]);
                    }else{
                        break;
                    }
                }

                ls(result);
                continue;
            }

        }

        let startTimer = performance.now();

    }, [input]);

    return <MainCard title='Day 7: No Space Left On Device.'>                
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

export default Dec7;