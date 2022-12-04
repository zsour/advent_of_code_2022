import {useState, useEffect} from 'react';
import MainCard from '../components/MainCard';
import InputArea from '../components/InputArea';

function Dec3(){
    const [input, setInput] = useState("");
    const [puzzleOneResult, setPuzzleOneResult] = useState(0);
    const [puzzleTwoResult, setPuzzleTwoResult] = useState(0);
    const [timerPuzzleOne, setTimerPuzzleOne] = useState("0 ms.");
    const [timerPuzzleTwo, setTimerPuzzleTwo] = useState("0 ms.");

    const priorityList = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    function getPriorityValue(letter: string){
        return priorityList.indexOf(letter) + 1;
    }


    function binarySearch(arr: string[], value: string){
        let high = arr.length - 1;
        let low = 0;
        let middle;

        while(low <= high){

            middle = Math.floor((high + low) / 2);
        
            if(arr[middle] === value){
                return middle;
            }else{
                if(arr[middle] < value){
                    low = middle + 1;
                }
    
                if(arr[middle] > value){
                    high = middle - 1;
                }
            }
        };

        return -1;
    };

    function getCompartmentValue(compartmentOne: string, compartmentTwo: string){
        for(let i = 0; i < compartmentOne.length; i++){
            if(binarySearch(compartmentTwo.split(''), compartmentOne[i]) !== -1){
                return getPriorityValue(compartmentOne[i]);
            }
        }

        return 0;
    }


    function getGroupValue(backpackOne: string, backpackTwo: string, backpackThree: string){
        for(let i = 0; i < backpackOne.length; i++){
            if((binarySearch(backpackTwo.split(''), backpackOne[i]) !== -1) && (binarySearch(backpackThree.split(''), backpackOne[i]) !== -1)){
                return getPriorityValue(backpackOne[i]);
            }
        }

        return 0;
    };

    useEffect(() => {
        if(input.length === 0){
            return;
        }
        
        let tmp = input.split("\n");

        function partOne(){
            let startTimer = performance.now();
 
            let firstPuzzleArr = tmp.map((backpack) => {            
                return [backpack.slice(0, backpack.length/2), backpack.slice(backpack.length/2)];
            });

            firstPuzzleArr = firstPuzzleArr.map((arr) => {
                let compartmentOne = arr[0].split("").sort();
                let compartmentTwo = arr[1].split("").sort();
        
                return [compartmentOne.join(''), compartmentTwo.join('')];
            });
    
            let totalSumPuzzleOne = 0;
            for(let i = 0; i < firstPuzzleArr.length; i++){
                totalSumPuzzleOne += getCompartmentValue(firstPuzzleArr[i][0], firstPuzzleArr[i][1]);
            }

            let endTimer = performance.now();
      
            setTimerPuzzleOne(`${(endTimer - startTimer).toFixed(1)} ms.`);
            setPuzzleOneResult(totalSumPuzzleOne);
        }

        function partTwo(){
            let startTimer = performance.now();
            let secondPuzzleArr : string[][] = [];
            let thirdCounter = 0;
            
            for(let i = 0; i < tmp.length; i++){
                if(tmp[thirdCounter] && tmp[thirdCounter+1] && tmp[thirdCounter+2]){
                    secondPuzzleArr[i] = [
                        tmp[thirdCounter].split('').sort().join(''), 
                        tmp[thirdCounter+1].split('').sort().join(''), 
                        tmp[thirdCounter+2].split('').sort().join('')];
                    thirdCounter += 3;
                }else{
                    break;
                }
            }
    
            
         
            let totalSumPuzzleTwo = 0;
            for(let i = 0; i < secondPuzzleArr.length; i++){
                totalSumPuzzleTwo += getGroupValue(secondPuzzleArr[i][0], secondPuzzleArr[i][1], secondPuzzleArr[i][2]);
            }


            let endTimer = performance.now();
    
            setTimerPuzzleTwo(`${(endTimer - startTimer).toFixed(1)} ms.`);
            setPuzzleTwoResult(totalSumPuzzleTwo);
        }

        partOne();
        partTwo();

    }, [input]);

    return <MainCard title='Day 3: Rucksack Reorganization.'>                
            <InputArea inputChange={(val: string) => {
                setInput(val);
            }} />

            <div className="result-area">
                <div className="result">
                    <p className="result-text">
                        Compartment score: {String(puzzleOneResult)}.
                    </p>

                    <p className="result-text">
                        Performance messure: {timerPuzzleOne}
                    </p>
                </div>

                <div className="result">
                    <p className="result-text">
                        Group score: {String(puzzleTwoResult)}.
                    </p>

                    <p className="result-text">
                        Performance messure: {timerPuzzleTwo}
                    </p>
                </div>
            </div>
    </MainCard>
}

export default Dec3;