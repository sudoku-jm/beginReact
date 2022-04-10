import {useReducer, useCallback} from 'react';

function reducer(state, action){
    switch (action.type){
        //CHANGE
        case 'CHANGE':
            return{
                ...state,
                [action.name] : action.value
            };
        //RESET
        case 'RESET' : 
        //Object.keys(obj) – 객체의 키만 담은 배열을 반환합니다.

        //reduce ?
        //배열.reduce((누적값, 현잿값, 인덱스, 요소) => { return 결과 }, 초깃값);

            return Object.keys(state).reduce((acc, current) => 
            //acc 누산기
            //current : state로 들어오는 값
                { acc[current] = '';  
                return acc; //{username : '', email : ''}
             }, {});
        default :
             return state;
    }
}

function useInputs2(initialForm) {
    //파라미터 : initialForm 에서 관리하는 초기값
    //form 상태 초기화는 initialForm 에서 관리하는 초기값
    // const [form, setForm] = useState(initialForm);
    const [form, dispatch] = useReducer(reducer,initialForm);

    //onChange
    const onChange = useCallback( e => {
        const {name ,value} = e.target;
        //form 업데이트
        // setForm(form => ({...form, [name] : value}) );
        dispatch({
            type : 'CHANGE',
            name,
            value
        })
    },[]);

    //form 초기화 
     //초기값으로 다시 초기화.
    const reset = useCallback(() => 
        dispatch({type : 'RESET', })
    ,[initialForm]); 

    //만들었던거 내보냄.
    return [form, onChange, reset];
}

//다른곳에서 사용할 수 있게 export.
export default useInputs2;