import React, { useState } from 'react';

function InputSample2() {
    const [inputs,setInputs] = useState({
        name : '',
        nickname: '',
    });

    //비구조할당
    const {name, nickname} = inputs;

    const onChange = (e) => {
        //value값과 name값을 미리 추출
        const {name, value} = e.target;
        //e.target을 2번 안써도 됨

        // console.log(e.target.name);
        // console.log(e.target.value);

        setInputs ({
            ...inputs,
            // 내용 덮어씌우기
            [name] : value,
            //[]는 문자 자체의 name이 들어가므로 대괄호 씌워준다.
        })
    
    }

    const onReset = () => {
        //초기화
        setInputs ({
            name :'',
            nickname : ''
        })
    }

    return(
        <div>
            <input 
                name="name" 
                placeholder="이름" 
                onChange={onChange} 
                value={name}
            />
            <input 
                name="nickname" 
                placeholder="닉네임" 
                onChange={onChange} 
                value={nickname} 
            />
            <button onClick={onReset}>초기화</button>
            <div>
                <b>값 : </b>
                {name} ({nickname})
            </div>
        </div>
    )
}

export default InputSample2;