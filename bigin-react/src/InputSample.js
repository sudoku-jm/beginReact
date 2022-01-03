import React, {useState} from 'react';

function InputSample() {
    //useState를 가지고 input값 상태 관리를 한다.
    const [text, setText] = useState('');//기본값 공백
    const onChange = (e) => {
        //e:객체 파라미터를 가지고 와서 사용
        //e.target = input
        //e.target.valut = input의 값
        setText(e.target.value)
    }

    const onReset = () => {
        setText('')
    }
    return(
        <div>
            <input onChange={onChange} value={text}/>
            {/* value={text}를 해줘야 초기화 버튼을 눌렀을 때 해당 input의 값도 바뀌게 할 수 있다. */}
            <button onClick={onReset}>초기화</button>
            <div>
                <b>값 : </b>
                {text}
            </div>
        </div>
    )
}

export default InputSample;