import {useState, useCallback} from 'react';

function useInputs(initialForm) {
    //파라미터 : initialForm 에서 관리하는 초기값
    const [form, setForm] = useState(initialForm);
    //form 상태 초기화는 initialForm 에서 관리하는 초기값

    //onChange
    const onChange = useCallback( e => {
        const {name ,value} = e.target;
        //form 업데이트
        setForm(form => ({...form, [name] : value}) );
    },[]);

    //form 초기화 
     //초기값으로 다시 초기화.
    const reset = useCallback(() => setForm(initialForm),[initialForm]); 

    //만들었던거 내보냄.
    return [form, onChange, reset];
}

//다른곳에서 사용할 수 있게 export.
export default useInputs;