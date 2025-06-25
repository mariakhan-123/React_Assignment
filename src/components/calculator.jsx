import React, { useState } from 'react';
import './calculator.css';

export default function Calculator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleClick = (value) => {
    if (value === '=') {
      calculateResult();
    } else if (value === 'c') {
      setInput('');
      setResult('');
    } else {
      setInput((prev) => prev + value);
    }
  };

  const calculateResult = () => {
    try {
      const calculated = compute(input);
      setResult(calculated);
    } catch {
      setResult('Error');
    }
  };

  const compute = (expression) => {
   
    const tokens = expression.match(/(\d+\.?\d*|\+|\-|\*|\/)/g);
    console.log(tokens)
    if (!tokens) throw new Error('Invalid Expression');

    let current = parseFloat(tokens[0]);
    for (let i = 1; i < tokens.length; i += 2) {
      const op = tokens[i];
      const next = parseFloat(tokens[i + 1]);

      if (op === '+') current += next;
      else if (op === '-') current -= next;
      else if (op === '*') current *= next;
      else if (op === '/') current /= next;
      else throw new Error('Invalid Operator');
    }
    return current;
  };

  const buttons = [
    '1','2','3','/',
    '4','5','6','*',
    '7','8','9','-',
    '0','.','=','+',
  ];

  return (
    <div className="calculator">
      <input type="text" value={input} readOnly />
      <input type="text" value={result} readOnly />
      <div className="buttons">
        {buttons.map((btn, idx) => (
          <button key={idx} onClick={() => handleClick(btn)}>{btn}</button>
        ))}
        <button onClick={() => handleClick('c')}>c</button>
      </div>
    </div>
  );
}
