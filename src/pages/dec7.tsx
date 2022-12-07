import {useState, useEffect} from 'react';
import MainCard from '../components/MainCard';
import InputArea from '../components/InputArea';

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
    partTwoNumbers: number[];

    constructor(root: Node){
        this.root = root;
        this.sum = [];
        this.partTwoNumbers = [];
    }

    accessPathNode(path: string[], currentNode: Node = this.root, operation: CallableFunction){
        let tmpPath = [...path];   
        if(tmpPath.length === 0){
            operation(currentNode);
        }else{
            let nodeFound = false;
            for(let i = 0; i < currentNode.children.length; i++){
                    if(currentNode.children[i].data.name === tmpPath[0]){
                        tmpPath.shift();
                        nodeFound = true;
                        this.accessPathNode(tmpPath, currentNode.children[i], operation);
                        break;
                    }
            }

            if(!nodeFound){
                console.log("currentPath:", path, "children:", currentNode.children);
            }
        }
    }

    addDir(path: string[], newDir: Directory, currentNode: Node = this.root){     
        this.accessPathNode(path, currentNode, (node: Node) => {
            let exists = false;
            for(let i = 0; i < node.children.length; i++){
                if(node.children[i].data.name === newDir.name){
                    exists = true;
                    break;
                }
            }

            if(!exists){
                node.add(new Node(newDir, []));
            }
        });
    }


    addFiles(path: string[], newFile: File, currentNode: Node = this.root){
        this.accessPathNode(path, currentNode, (node: Node) => {
            let exists = false;
            for(let i = 0; i < node.data.files.length; i++){
                if(node.data.files[i].name === newFile.name){
                    exists = true;
                    break;
                }
            }

            if(!exists){
                node.addFile(newFile);
            }
        });
    }

    totalStorage(){
        return this.root.children[0].sum(0);
    }

    getAllDirectorySizesUnderSpecifiedSize(size: number, output: number[], currentNode: Node = this.root.children[0]){
        let numbers: number[] = [];
        for(let i = 0; i < currentNode.children.length; i++){
            let total = 0;
            total += currentNode.children[i].sum(0);
            if(total < size && total !== 0){
                output.push(total);
            }

            this.getAllDirectorySizesUnderSpecifiedSize(size, output, currentNode.children[i]);
        }
    }

    minSizeAvailableForDeletion(sizeNeeded: number, output: number[], currentNode: Node = this.root.children[0]){
        let numbers: number[] = [];
        for(let i = 0; i < currentNode.children.length; i++){
            let total = 0;
            total += currentNode.children[i].sum(0);
            if(total - sizeNeeded > 0){
                output.push(total);
            }

            this.minSizeAvailableForDeletion(sizeNeeded, output, currentNode.children[i]);
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
        let tmp = [...arr];
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

        let startTimer = performance.now();

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
        
        let partOneOutput:number[] = [];
        tree.getAllDirectorySizesUnderSpecifiedSize(100000, partOneOutput);
        let partOneResult = partOneOutput.reduce((prev, current) => {
            return prev + current;
        });

        setPuzzleOneResult(partOneResult);
        setTimerOne(`${(performance.now() - startTimer).toFixed(1)} ms.`);

        let partTwoOutput:number[] = [];
        let storageNeeded = 30000000 - (70000000 - tree.totalStorage());
        
        tree.minSizeAvailableForDeletion(storageNeeded, partTwoOutput);
        let sortedPartTwo = partTwoOutput.sort();
        setPuzzleTwoResult(sortedPartTwo[sortedPartTwo.length - 1]);
        setTimerTwo(`${(performance.now() - startTimer).toFixed(1)} ms.`);

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