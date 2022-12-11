import {useState, useEffect} from 'react';
import MainCard from '../components/MainCard';
import InputArea from '../components/InputArea';
import BigNumber from '../components/big-number';

interface Operation{
    operator: string;
    numberOne: string;
    numberTwo: string;
}

interface Monkey{
    inspectedItems: number;
    items: number[];
    opereration: Operation;
    conditionalDivision: number;
    trueThrowTo: number;
    falseThrowTo: number;
}

function doOpertion(op: Operation, old: number){
    let numberOne = (op.numberOne === 'old') ? old : +op.numberOne;
    let numberTwo = (op.numberTwo === 'old') ? old : +op.numberTwo;
    
    switch(op.operator){
        case "+": return numberOne +numberTwo;
        case "*": return numberOne * numberTwo;
        default: return 0;
    }
}

function Dec11(){
    const [input, setInput] = useState("");
    const [puzzleOneResult, setPuzzleOneResult] = useState(0);
    const [puzzleTwoResult, setPuzzleTwoResult] = useState(0);
    const [timerOne, setTimerOne] = useState("0 ms.");
    const [timerTwo, setTimerTwo] = useState("0 ms.");
      
    useEffect(() => {
        if(input.length === 0){
            return;
        }

        let startTimer = performance.now();

        let tmp = input.split("\n");
        if(tmp[tmp.length - 1] === ''){
            tmp.pop();
        }

        let monkeyList: Monkey[] = [];

        for(let i = 0; i < tmp.length; i+=7){
            let startingItems = tmp[i+1];
            let startingItemsStringArr = startingItems.split(" ");
            let startingItemsArr = startingItemsStringArr.map((str: string) => {
                let tmpString = str.replace(',', '');
                return +tmpString;
            });
            startingItemsArr.splice(0, 4);
            

            let operation = tmp[i+2];
            let operationStringArr = operation.split(" ");
            operationStringArr.splice(0, operationStringArr.length - 3);

            let conditionalDivisionArr = tmp[i+3].split(" ");
            conditionalDivisionArr.splice(0, conditionalDivisionArr.length - 1);
            let conditionalDivision = +conditionalDivisionArr[0];
            

            let trueThrowToArr = tmp[i+4].split(" ");
            trueThrowToArr.splice(0, trueThrowToArr.length - 1);
            let falseThrowToArr = tmp[i+5].split(" ");
            falseThrowToArr.splice(0, falseThrowToArr.length - 1);

            let trueThrowTo = +trueThrowToArr[0];
            let falseThrowTo = +falseThrowToArr[0];

            let monkey: Monkey = {
                inspectedItems: 0,

                items: startingItemsArr, 
                
                opereration: {
                    operator: operationStringArr[1],
                    numberOne: operationStringArr[0],
                    numberTwo: operationStringArr[2]
                }, 

                conditionalDivision,
                trueThrowTo,
                falseThrowTo
            };

            monkeyList.push(monkey);
        }

        for(let rounds = 0; rounds < 20; rounds++){
            for(let i = 0; i < monkeyList.length; i++){
                if(monkeyList[i].items.length !== 0){
                    for(let j = 0; j < monkeyList[i].items.length; j++){
                        let oldWorryLevel = monkeyList[i].items[j];
                        let newWorryLevel = doOpertion(monkeyList[i].opereration, oldWorryLevel);
            
                        if(BigNumber(newWorryLevel).mod(monkeyList[i].conditionalDivision)?.toString() == '0'){
                  
                            monkeyList[monkeyList[i].trueThrowTo].items.push(newWorryLevel);
                        }else{
                            monkeyList[monkeyList[i].falseThrowTo].items.push(newWorryLevel);
                        }
                    }
        
                    monkeyList[i].inspectedItems += monkeyList[i].items.length;
                    monkeyList[i].items = [];
                };
            }
        }

        console.log(monkeyList);
        

        let inspectedItemsList: number[] = [];
        for(let i = 0; i < monkeyList.length; i++){
            inspectedItemsList.push(monkeyList[i].inspectedItems);
        }

        inspectedItemsList = inspectedItemsList.sort((a, b) => {
            return a - b;
        });
        
        setPuzzleOneResult(inspectedItemsList[inspectedItemsList.length - 2] * inspectedItemsList[inspectedItemsList.length - 1]);
    
        setTimerTwo(`${(performance.now() - startTimer).toFixed(1)} ms.`);
    }, [input]);

    return <MainCard title='Day 11: ?'>                
            <InputArea inputChange={(val: string) => {
                setInput(val);
            }} />

            <div className="result-area">
                <div className="result">
                    <p className="result-text">
                        Monkey business after 10000 rounds: {String(puzzleOneResult)}.
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

export default Dec11;