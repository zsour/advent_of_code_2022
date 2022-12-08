import {useState, useEffect} from 'react';
import MainCard from '../components/MainCard';
import InputArea from '../components/InputArea';

function Dec8(){
    const [input, setInput] = useState("");
    const [puzzleOneResult, setPuzzleOneResult] = useState(0);
    const [puzzleTwoResult, setPuzzleTwoResult] = useState(0);
    const [timer, setTimer] = useState("0 ms.");


    let map: string[][] = [];

    function isVisible(x: number, y: number){
        let num = +map[y][x];
        let visibleTop = true;
        let visibleLeft = true;
        let visibleRight = true;
        let visibleBottom = true;

        for(let i = 0; i < x; i++){
            if(+map[y][i] >= num){
                visibleLeft = false;
            }
        }

        for(let i = x + 1; i < map[y].length; i++){
            if(+map[y][i] >= num){
                visibleRight = false;
            }
        }

        for(let i = 0; i < y; i++){
            if(+map[i][x] >= num){
                visibleTop = false;
            }
        }

        for(let i = y + 1; i < map.length; i++){
            if(+map[i][x] >= num){
                visibleBottom = false;
            }
        }

        if(visibleTop || visibleLeft || visibleRight || visibleBottom){
            return true;
        }
    }


    function scenicScore(x: number, y: number){
        let num = +map[y][x];
        let scenicScoreTop = 1;
        let scenicScoreLeft = 1;
        let scenicScoreRight = 1;
        let scenicScoreBottom = 0;

        for(let i = x - 1; i > 0; i--){
            if(+map[y][i] >= num){
                break;
            }

            scenicScoreLeft++;
        }

        for(let i = x + 1; i < map[y].length; i++){
            if(+map[y][i] >= num){
                break;
            }

            scenicScoreRight++;
        }

        for(let i = y - 1; i > 0; i--){
            if(+map[i][x] >= num){
                break;
            }

            scenicScoreTop++;
        }

        for(let i = y + 1; i < map.length; i++){
            scenicScoreBottom++;

            if(+map[i][x] >= num){
                break;
            }        
        }
        
        return scenicScoreTop * scenicScoreLeft * scenicScoreRight * scenicScoreBottom;
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
        

        map = tmp.map((string) => {
            let numbers = string.split('');
            let newNumbers = [];
            for(let i = 0; i < numbers.length; i++){
                newNumbers.push(+numbers[i]);
            }
            return [...numbers];
        });


        let visibleTrees = 0;

        for(let i = 0; i < map.length; i++){
            // First and last col.
            visibleTrees += 2;
        }

        for(let i = 1; i < map[0].length - 1; i++){
            // First and last row.
            visibleTrees += 2;
        }

        let highestScenicScore = 0;
        for(let i = 1; i < map.length - 1; i++){
            for(let j = 1; j < map[i].length - 1; j++){       
                if(isVisible(j, i)){
                    visibleTrees++;
                }

                let scenic = scenicScore(j, i);
                if(scenic > highestScenicScore){
                    highestScenicScore = scenic;
                }
            }
        }

        setPuzzleOneResult(visibleTrees);
        setPuzzleTwoResult(highestScenicScore);
        setTimer(`${(performance.now() - startTimer).toFixed(1)} ms.`);

    }, [input]);

    return <MainCard title='Day 8: Treetop Tree House.'>                
            <InputArea inputChange={(val: string) => {
                setInput(val);
            }} />

            <div className="result-area">
                <div className="result">
                    <p className="result-text">
                        Number of visible trees: {String(puzzleOneResult)}.
                    </p>
                </div>

                <div className="result">
                    <p className="result-text">
                        Highest scenic score: {String(puzzleTwoResult)}.
                    </p>

                    <p className="result-text">
                        Performance messure: {timer}
                    </p>
                </div>
            </div>
    </MainCard>
}

export default Dec8;