import {useState, useEffect} from 'react';
import MainCard from '../components/MainCard';
import InputArea from '../components/InputArea';

function Dec13(){
    const [input, setInput] = useState("");
    const [puzzleOneResult, setPuzzleOneResult] = useState(0);
    const [puzzleTwoResult, setPuzzleTwoResult] = useState(0);
    const [timerOne, setTimerOne] = useState("0 ms.");
    const [timerTwo, setTimerTwo] = useState("0 ms.");

    interface Packet{
        data: any[];
    }

    function packetsInOrder(pkt1: Packet, pkt2: Packet, depth: number = 0): number | undefined{
        let pkt1Data = pkt1.data;
        let pkt2Data = pkt2.data;
        
        if(typeof pkt1Data === 'number'){
            if(typeof pkt2Data === 'number'){
                if(pkt1Data > pkt2Data){
                    return 0;
                }
    
                if(pkt1Data < pkt2Data){
                    return 1;
                }
    
                return -1;
            }else{
                return packetsInOrder({data: [pkt1Data]}, {data: pkt2Data}, depth+1);
            }
        }else if(typeof pkt1Data === "object"){
            if(typeof pkt2Data === "object"){
                let valueCounter = 0;
                for(let i = 0; i < pkt1Data.length; i++){
                    if(i === pkt2Data.length){
                        return 0;
                    }

                    let compare = packetsInOrder({data: pkt1Data[i]}, {data: pkt2Data[i]}, depth+1);
                                     
                    if(compare === 0){
                        return 0;
                    }else if(compare === 1){
                        return 1;
                    }else{
                        valueCounter++;
                        continue;
                    }
                }

                if(valueCounter === pkt1Data.length && valueCounter <= pkt2Data.length - 1){
                    return 1;
                }

            }else if(typeof pkt2Data === "number"){
                return packetsInOrder({data: pkt1Data}, {data: [pkt2Data]}, depth+1);
            }
        }else{
            return 0;
        }
    }

    function merge(left: Packet[], right: Packet[]){
        let leftTmp = left;
        let rightTmp = right;
        let result = [];
        while(leftTmp.length > 0 && rightTmp.length > 0){
            if(packetsInOrder(leftTmp[0], rightTmp[0])){
                result.push(leftTmp[0]);
                leftTmp.shift();
            }
            else{
                result.push(rightTmp[0]);
                rightTmp.shift();
            }
        }

        while(leftTmp.length > 0){
            result.push(leftTmp[0]);
            leftTmp.shift();
        }

        while(rightTmp.length > 0){
            result.push(rightTmp[0]);
            rightTmp.shift();
        }

        return result;
    }

    function mergeSort(arr: Packet[]){
        if(arr.length === 1){
            return arr;
        }

        let left: any = [];
        let right: any = [];

        for(let i = 0; i < arr.length; i++){
            if(i < Math.floor((arr.length / 2))){
                left.push(arr[i]);
            }else{
                right.push(arr[i]);
            }
        }

        left = mergeSort(left);
        right = mergeSort(right);

        return merge(left, right);
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

        let packetPairs: Packet[][] = [[]];
        let allPackets: Packet[] = [];
        let packetPairIndex = 0;
        tmp.map((str) => {
            if(str === ""){
                packetPairs.push([]);
                packetPairIndex++;
            }else{
                allPackets.push({data: JSON.parse(str)});
                packetPairs[packetPairIndex].push({data: JSON.parse(str)});
            }
        });
    
        let sum: number[] = [];
        for(let i = 0; i < packetPairs.length; i++){
            if(packetsInOrder(packetPairs[i][0], packetPairs[i][1])){
                sum.push(i+1);   
            }
        }

        let result = sum.reduce((prev, current) => {
            return prev + current;
        });

        setPuzzleOneResult(result);
        setTimerOne(`${(performance.now() - startTimer).toFixed(1)} ms.`);
        
        allPackets.push({data: [[2]]});
        allPackets.push({data: [[6]]});
        let sortedPacketPairs = mergeSort(allPackets);
        let dividerPacketOne = 0;
        let dividerPacketTwo = 0;
        for(let i = 0; i < sortedPacketPairs.length; i++){
            if(JSON.stringify(sortedPacketPairs[i].data) === "[[2]]"){
                dividerPacketOne = i + 1;
            }

            if(JSON.stringify(sortedPacketPairs[i].data) === "[[6]]"){
                dividerPacketTwo = i + 1;
            }
        }

        setPuzzleTwoResult(dividerPacketOne * dividerPacketTwo);
        setTimerTwo(`${(performance.now() - startTimer).toFixed(1)} ms.`);
        
    }, [input]);

    return <MainCard title='Day 13: Distress Signal.'>                
            <InputArea inputChange={(val: string) => {
                setInput(val);
            }} />

            <div className="result-area">
                <div className="result">
                    <p className="result-text">
                        Sum of ordered pairs: {String(puzzleOneResult)}.
                    </p>

                    <p className="result-text">
                        Performance messure: {timerOne}
                    </p>
                </div>

                <div className="result">
                    <p className="result-text">
                        Dividers indecies multiplied: {String(puzzleTwoResult)}.
                    </p>

                    <p className="result-text">
                        Performance messure: {timerTwo}
                    </p>
                </div>
            </div>
    </MainCard>
}

export default Dec13;