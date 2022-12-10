import {useState, useEffect} from 'react';
import MainCard from '../components/MainCard';
import InputArea from '../components/InputArea';

function Dec10(){
    const [input, setInput] = useState("");
    const [puzzleOneResult, setPuzzleOneResult] = useState(0);
    const [timer, setTimer] = useState("0 ms.");
    const [map, setMap] = useState<string[][] | null>(null);

    let currentCycle = 0;
    let registerX = 1;
    let signalStrengths: number[] = [];

    let defaultPosition = [  '.','.','.','.','.','.','.','.','.','.',
                            '.','.','.','.','.','.','.','.','.','.',
                            '.','.','.','.','.','.','.','.','.','.',
                            '.','.','.','.','.','.','.','.','.','.'];

    let display: string[][] = [[], [], [], [], [], []];
    let currentRow = 0;

    function generateSpritePosition(){
        let returnSprite = [...defaultPosition];
        if(registerX === -1){
            returnSprite[registerX + 1] = "#";
        }else if(registerX === 0){
            returnSprite[registerX + 1] = "#";
            returnSprite[registerX] = "#";
        }else if(registerX > 0){
            returnSprite[registerX - 1] = "#";
            returnSprite[registerX] = "#";
            returnSprite[registerX + 1] = "#";
        }
       
        return returnSprite;
    }

    function drawPixel(){
        let row = currentRow;
        let col = (currentCycle % 40);
        let spritePos = generateSpritePosition();
        if(spritePos[col] === "."){
            display[row].push(".");
        }else{
            display[row].push("#");
        }

        if(col === 39 && currentRow < 5){
            currentRow++;
        }
    }

    function addX(num: number){
        for(let i = 0; i < 2; i++){ 
            drawPixel();
            currentCycle++;

            if(currentCycle % 20 === 0) signalStrengths.push(registerX * currentCycle);
            
            if(i == 1) registerX += num;   
        }
    }

    function noop(){
        drawPixel();
        currentCycle++;

        if(currentCycle % 20 === 0) signalStrengths.push(registerX * currentCycle);
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

        for(let i = 0; i < tmp.length; i++){
            let split = tmp[i].split(" ");
            if(split[0] === "addx"){
                addX(+split[1]);
            }else if(split[0] === "noop"){
                noop();
            }
        }

        setMap([...display]);
        setTimer(`${(performance.now() - startTimer).toFixed(1)} ms.`);
  
        let sum = 0;
        for(let i = 0; i < signalStrengths.length; i++){         
            if(i % 2 === 0){
                sum += signalStrengths[i];
            }
        }

        setPuzzleOneResult(sum);
        
        
    }, [input]);

    function displayLetters(){
        let jsx = [];
        if(map === null) return null;
        for(let i = 0; i < map.length; i++){
            for(let j = 0; j < map[i].length; j++){
                if(map[i][j] === "#"){
                    jsx.push(<span className="pixel-white"></span>);
                }else{
                    jsx.push(<span className="pixel-black"></span>);
                }
            }
        }

        return jsx;
    }

    return <MainCard title='Day 10: Cathode-Ray Tube.'>                
            <InputArea inputChange={(val: string) => {
                setInput(val);
            }} />

            <div className="result-area">
                <div className="result">
                    <p className="result-text">
                        Register X sum: {String(puzzleOneResult)}.
                    </p>
                </div>

                <div className="result">
                    <p className="result-text">
                        Display result: 
                    </p>

                    <div className="map">
                        {displayLetters()}
                    </div>

                    <p className="result-text">
                        Performance messure: {timer}
                    </p>
                </div>

                
            </div>
    </MainCard>
}

export default Dec10;