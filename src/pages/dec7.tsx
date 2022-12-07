import {useState, useEffect} from 'react';
import MainCard from '../components/MainCard';
import InputArea from '../components/InputArea';
import css from 'styled-jsx/css';
import { Dir } from 'fs';


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

    addFile(file: File){
        this.data.files.push(file);
    }

    sum(total: number){
        for(let i = 0; i < this.data.files.length; i++){
            total += this.data.files[i].size;
        }
        for(let i = 0; i < this.children.length; i++){
            total += this.children[i].sum(0);
        }

        return total;
    }
}

class Tree{
    root: Node;
    sum: number[];
    constructor(root: Node){
        this.root = root;
        this.sum = [];
    }

    addDir(path: string[], newDir: Directory, currentNode: Node = this.root){     
        let tmpPath = [...path];   
        if(tmpPath.length === 0){
            let exists = false;
            for(let i = 0; i < currentNode.children.length; i++){
                if(currentNode.children[i].data.name === newDir.name){
                    exists = true;
                    break;
                }
            }

            if(!exists){
                currentNode.add(new Node(newDir, []));
            }
        }else{
            let nodeFound = false;
            for(let i = 0; i < currentNode.children.length; i++){
                    if(currentNode.children[i].data.name === tmpPath[0]){
                        tmpPath.shift();
                        nodeFound = true;
                        this.addDir(tmpPath, newDir, currentNode.children[i]);
                        break;
                    }
            }

            if(!nodeFound){
                console.log("currentPath:", path, "children:", currentNode.children);
            }
        }
    }

    addFiles(path: string[], newFile: File, currentNode: Node = this.root){
        let tmpPath = [...path];   
        if(tmpPath.length === 0){
            let exists = false;
            for(let i = 0; i < currentNode.data.files.length; i++){
                if(currentNode.data.files[i].name === newFile.name){
                    exists = true;
                    break;
                }
            }

            if(!exists){
                currentNode.addFile(newFile);
            }
        }else{
            let nodeFound = false;
            for(let i = 0; i < currentNode.children.length; i++){
                    if(currentNode.children[i].data.name === tmpPath[0]){
                        tmpPath.shift();
                        nodeFound = true;
                        this.addFiles(tmpPath, newFile, currentNode.children[i]);
                        break;
                    }
            }

            if(!nodeFound){
                console.log("currentPath:", path, "children:", currentNode.children);
            }
        }
    }

    getSum(sum: number = 0, currentNode: Node = this.root){
        let numbers: number[] = [];
        for(let i = 0; i < currentNode.children.length; i++){
            let total = 0;
            total += currentNode.children[i].sum(0);
 
            if(total < 100000 && total !== 0){
                numbers.push(total);
            }

            this.getSum(0, currentNode.children[i]);
        }
        
        if(numbers.length > 0){
            this.sum.push(...numbers);
        }
    }
}

let tree = new Tree(new Node({name: "root", files: []}, [new Node({name: '/', files: []}, [])]));

function Dec7(){
    const [input, setInput] = useState("");
    const [puzzleOneResult, setPuzzleOneResult] = useState(0);
    const [puzzleTwoResult, setPuzzleTwoResult] = useState(0);
    const [timerOne, setTimerOne] = useState("0 ms.");
    const [timerTwo, setTimerTwo] = useState("0 ms.");

    

    function isCommand(output: string, commandType: string){
        let split = output.split(" ");
        if(split[0] === "$" && split[1] === commandType){
            return true;
        }

        return false;
    }

    function cd(arr: string[], directory: string){
        let tmp = arr;
        if(directory === '/'){
            return ['/'];
        }
        else if(directory === '..'){
           
            if(tmp.length === 1){
                return tmp = ['/'];
            }

            tmp.pop();
            return tmp;
        }
        else{
            tmp.push(directory);
            return tmp;
        }
    }

    function ls(includes: string[], path: string[]){
        let tmpPath = [...path];
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
        
        for(let i = 0; i < dirs.length; i++){
            tree.addDir(tmpPath, {name: dirs[i].name, files: []});
        }

        for(let i = 0; i < files.length; i++){
            tree.addFiles(tmpPath, files[i]);
        }
    }

    


    useEffect(() => {
        if(input.length === 0){
            return;
        }

        let tmp = input.split("\n");
        if(tmp[tmp.length - 1] === ''){
            tmp.pop();
        }

        let newPath: string[] = ['/'];
      
        for(let i = 0; i < tmp.length; i++){
            let split = tmp[i].split(" ");
            if(isCommand(tmp[i], "cd")){  
                newPath = cd(newPath, split[2]);
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
                
                ls(result, newPath);
                continue;
            }
        }
        let total = 0;
        tree.getSum(0, tree.root.children[0]);
        console.log(tree.sum);

        let number = tree.sum.reduce((prev, current) => {
            return prev + current;
        });
        
        
        console.log(tree);
        console.log(total);
        console.log(number);
        
        
        
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