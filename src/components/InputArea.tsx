import {useState} from 'react';

function InputArea(args: {inputChange: Function}){

    const [input, setInput] = useState("");

    return <div className="input-area">
            <div className="input-header">
                <p className="input-header-text">Paste puzzle input or import input file:</p>
            </div>
            <label htmlFor="files" className="chooseFile">
                <p>Select input file</p>
            </label>
            <input  style={{visibility: "hidden"}} type="file" id="files" onChange={(e) => {
                    e.preventDefault();
                    const reader = new FileReader();
                    
                    if(e.target && e.target.files){
                    
                        
                        reader.onload = async (e) => { 
                            if(e.target){
                                const text = (e.target.result);
                                setInput(String(text));
                                args.inputChange(String(text));
                            }
                        };

                        if(e.target.files[0] && e.target.files[0].type){
                            if(e.target.files[0].type !== "text/plain"){
                                return;
                            }

                            reader.readAsText(e.target.files[0]);
                        }

                    
                    
                    }
            }}/>
            <textarea spellCheck="false" name="" value={input} className="input-text-area" onChange={(e) => {
                setInput(e.target.value);
                args.inputChange(e.target.value);
            }} cols={30} rows={10} placeholder="Paste input here..."></textarea>
    </div>
}

export default InputArea;