import { useState } from "react";
import "./calc.css";

export default function Calculator() {

    const [result, setResult] = useState("")


    const handleClick = (e) => {
        const allowedChars = /[0-9+\-*/.%π]/;
        if (!allowedChars.test(e.target.name)) {
            window.alert("Enter Numbers only");
            return;
        }
        if (e.target.name === "%") {
            // Special case for the percentage symbol
            setResult((parseFloat(result) / 100).toString());
            return;
        }
        if (e.target.name === "π") {
            // Special case for the π symbol
            setResult((Math.PI).toString());
            return; // Return early after handling the π case
        }

        setResult(result.concat(e.target.name));
    };

    const clear = () => {
        setResult("");
    }

    const deleteScreen = () => {
        setResult(result.slice(0, -1))
    }

    const Calculate = () => {
        try {
            if (result === "") {
                window.alert("Write the expression you wish to Calculate.");
                return;
            }

            const operators = /[+\-*/]/;
            const lastChar = result.charAt(result.length - 1);
            if (operators.test(lastChar)) {
                window.alert("Incomplete input");
                return;
            }
            try {
                eval(result);
            }
            catch (err) {
                window.alert("invalid input");
                return;
            }

            if (result.includes("/0")) {
                window.alert("Division by zero is not allowed");
                return;
            }
            setResult(eval(result).toString());
        }
        catch (err) {
            setResult("syntax error");
        }
    };

    const handleKeyboardInput = (e) => {
        const allowedChars = /[0-9\-*/.=+-]/;
        if (!allowedChars.test(e.key)) {
            window.alert("numbers only");
            e.preventDefault();
            return;
        }

        if (e.key === "=" || e.key == "Enter") {
            e.preventDefault();
            Calculate();
        } else {
            setResult(result.concat(e.key));
        }

    };

    const squareRoot = () => {
        if (result !== "") {
            setResult(Math.sqrt(parseFloat(result)).toString());
        }
    };

    const exponentiation = () => {
        if (result !== "") {
            setResult(Math.pow(parseFloat(result), 2).toString());
        }
    };

    const logarithm = () => {
        if (result !== "") {
            setResult(Math.log10(parseFloat(result)).toString());
        }
    };

    return (
        <>
            <center>
                <h1 id='title'><span class="hollo-text"> Calculator App By Vedant </span></h1>
                <div className="layout">
                    
                    
                    <form>
                        <input className="current-operand output" type="text" value={result} readOnly
    onKeyDown={handleKeyboardInput}/>
                    </form>
                    <div className="buttons">
                        <button className="ac span-two" onClick={clear}>AC</button>
                        <button onClick={deleteScreen}>Del</button>
                        <button name="/" onClick={handleClick} id="operators">&divide;</button>
                        <button name="7" onClick={handleClick}>7</button>
                        <button name="8" onClick={handleClick}>8</button>
                        <button name="9" onClick={handleClick}>9</button>
                        <button name="*" onClick={handleClick} id="operators">&times;</button>
                        <button name="4" onClick={handleClick}>4</button>
                        <button name="5" onClick={handleClick}>5</button>
                        <button name="6" onClick={handleClick}>6</button>
                        <button name="-" onClick={handleClick} id="operators">-</button>
                        <button name="1" onClick={handleClick}>1</button>
                        <button name="2" onClick={handleClick}>2</button>
                        <button name="3" onClick={handleClick}>3</button>
                        <button name="+" onClick={handleClick} id="operators">+</button>
                        <button name="0" onClick={handleClick}>0</button>
                        <button name="." onClick={handleClick}>.</button>
                        <button name="%" onClick={handleClick} id="operators">&#37;</button>
                        <button name="π" onClick={handleClick} id="operators">&#960;</button>
                        <button onClick={squareRoot} id="operators">√</button>
                        <button onClick={exponentiation} id="operators">x²</button>
                        <button onClick={logarithm} id="operators">log</button>
                        <button className="span-two" onClick={Calculate} id="operators">=</button>
                    </div>
                    
                </div>

            </center>
        </>
    );
}