import React, { useState, useEffect } from 'react';

interface CounterProps {
  initialCount: number;
  angularCallback: (count: number) => void;
  callAngularScopeFunction: (data: any) => void;
}

const Counter: React.FC<CounterProps> = ({ initialCount, angularCallback, callAngularScopeFunction }) => {
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
      <button onClick={() => callAngularScopeFunction({ message: "Updated from React Button!", reactCount: count })}>
        Update Angular Directly
      </button>
    </div>
  );
};

export default Counter;
