import React, { useState, useEffect } from 'react';

interface CounterProps {
  initialCount: number;
  angularCallback: (count: number) => void;
}

const Counter: React.FC<CounterProps> = ({ initialCount, angularCallback }) => {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    setCount(initialCount);
  }, [initialCount]);

  const handleIncrement = () => {
    const newCount = count + 1;
    setCount(newCount);
    angularCallback(newCount);
  };

  const handleDecrement = () => {
    const newCount = count - 1;
    setCount(newCount);
    angularCallback(newCount);
  };

  return (
    <div>
      <h4>React Counter</h4>
      <p>Current Count: {count}</p>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement}>Decrement</button>
    </div>
  );
};

export default Counter;
