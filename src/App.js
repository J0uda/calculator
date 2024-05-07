import { useEffect, useState } from 'react';

import { numbers, operators } from './components/shared/data';
import Formula from './components/Formula';
import Output from './components/Output';
import Keyboard from './components/Keyboard';

function App() {
  const [input, setInput] = useState('0');
  const [output, setOutput] = useState('');
  const [calculator, setCalculator] = useState('');

  const handleSubmit = () => {
    // eslint-disable-next-line
    const total = eval(calculator);
    setInput(total);
    setOutput(`${total} = ${total}`);
    setCalculator(`${total}`);
  };

  const handleClear = () => {
    setInput('0');
    setCalculator('');
  };

  const handleNumbers = (value) => {
    if (!calculator.length) {
      setInput(`${value}`);
      setCalculator(`${value}`);
    } else {
      if (value === 0 && (calculator === '0' || input === '0')) {
        setCalculator(`${calculator}`);
      } else {
        const lastChat = calculator.charAt(calculator.length - 1);
        const isLastChatOperator =
          lastChat === '*' || operators.includes(lastChat);

        setInput(isLastChatOperator ? `${value}` : `${input}${value}`);
        setCalculator(`${calculator}${value}`);
      }
    }
  };

  const handleOperators = (value) => {
    if (calculator.length) {
      setInput(`${value}`);
      const beforeLastChat = calculator.charAt(calculator.length - 2);

      const beforeLastChatIsOperator =
        operators.includes(beforeLastChat) || beforeLastChat === '*';

      const lastChat = calculator.charAt(calculator.length - 1);

      const lastChatIsOperator =
        operators.includes(lastChat) || lastChat === '*';

      const validOp = value === 'x' ? '*' : value;
      if (
        (lastChatIsOperator && value !== '-') ||
        (beforeLastChatIsOperator && lastChatIsOperator)
      ) {
        if (beforeLastChatIsOperator) {
          const updatedValue = `${calculator.substring(
            0,
            calculator.length - 2
          )}${value}`;
          setCalculator(updatedValue);
        } else {
          setCalculator(
            `${calculator.substring(0, calculator.length - 1)}${validOp}`
          );
        }
      } else {
        setCalculator(`${calculator}${validOp}`);
      }
    }
  };

  const dotOperator = () => {
    const lastChat = calculator.charAt(calculator.length - 1);

    if (!calculator.length) {
      setInput('0.');
      setCalculator('0.');
    } else {
      if (lastChat === '*' || operators.includes(lastChat)) {
        setInput('0.');
        setCalculator(`${calculator} 0.`);
      } else {
        setInput(
          lastChat === '.' || input.includes('.') ? `${input}` : `${input}.`
        );

        const formattedValue =
          lastChat === '.' || input.includes('.')
            ? `${calculator}`
            : `${calculator}.`;
        setCalculator(formattedValue);
      }
    }
  };

  const handleInput = (value) => {
    const number = numbers.find((num) => num === value);
    const operator = operators.find((op) => op === value);

    switch (value) {
      case '=':
        handleSubmit();
        break;
      case 'AC':
        handleClear();
        break;
      case number:
        handleNumbers(value);
        break;
      case '.':
        dotOperator();
        break;
      case operator:
        handleOperators(value);
        break;
      default:
        break;
    }
  };

  const handleOutput = () => {
    setOutput(calculator);
  };

  useEffect(() => {
    handleOutput();
    // eslint-disable-next-line
  }, [calculator]);

  return (
    <div className='calculator'>
      <Formula output={output} />
      <Output input={input} />
      <Keyboard handleInput={handleInput} />
    </div>
  );
}

export default App;
