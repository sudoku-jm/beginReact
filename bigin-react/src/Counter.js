import React, {useState} from 'react';

const Counter = () => {
    const [number,setNumber] = useState(0)
    const onIncrease = () => {
        console.log('+1');
        // setNumber(number + 1);

        //값을 어떻게 할지에 대한 로직을 정의하는 함수를 넣어줄 수도 있다.
        setNumber(prevNumber => prevNumber + 1)
        //현재 상태를 가지고 와서 => 이렇게 업데이트 하겠다.
    }
    const onDecrease = () => {
        console.log('-1');
        // setNumber(number - 1);
        setNumber(prevNumber => prevNumber - 1)
    }
    return (
        <div>
            <h1>{number}</h1>
            <button onClick={onIncrease}>+1</button>
            <button onClick={onDecrease}>-1</button>
        </div>
    );
};

export default Counter;