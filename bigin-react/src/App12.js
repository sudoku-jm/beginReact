import React, {useRef, useReducer, useMemo, useCallback} from 'react';
import CreateUser3 from './CreateUser3';
import UserList4 from './UserList4';
import useInputs from './useInputs';

function counterActiveUsers(users){
  console.log('활성 사용자 수를 세는중...');
  return users.filter(user => user.active===true).length;
}

const initialState = {
  users : [
    {
      id:1,
      username:'velopert',
      email : 'public.velopoert@gamil.com',
      active : true
    },
    {
        id:2,
        username:'tester',
        email : 'tester@example.com',
        active : false
    },
    {
        id:3,
        username:'liz',
        email : 'liz@example.com',
        active : false
    }
  ]
}


function reducer(state, action){
  switch (action.type){
    case 'CREATE_USER' : 
      return {
        inputs : initialState.inputs, //초기값으로 바꿔준다.
        users : state.users.concat(action.user) 
        /* 
          onCreate에서 만들었던
           user : {
            id : nextId.current, //useRef로 관리
            username, //받아온 값 넣어줌
            email
          }
        해당 user를 추가해준다.
        */
      };
    case 'TOGGLE_USER' : 
      return{
        ...state, //기존 데이터를 들고온뒤 업데이트
        users : state.users.map(user => 
          user.id === action.id
            ?{ ...user, active : !user.active}
            : user
          )

      };
    case 'REMOVE_USER' : 
      return{
        ...state,
        users : state.users.filter(user => user.id !== action.id)
      }
    default : 
      // throw new Error('Unhandled action');
      return state;
  }
}

const App = () => {

  const [state, dispatch] = useReducer(reducer, initialState);
  //useInputs에서 들고온다
  const [form, onChange, reset] = useInputs({
    username : '',
    email : '',
  });
  const {username, email} = form;

  const nextId = useRef(4);

  const {users} = state;

  //onCreate이벤트
  const onCreate = useCallback(() => {
    dispatch({
      type : 'CREATE_USER',
      user : {
        id : nextId.current, //useRef로 관리
        username, //받아온 값 넣어줌
        email
      }
    });
    nextId.current += 1; //dispatch후 1올림
    reset(); //호출
  },[username,email,reset]);  //해당 함수에서 기존 값 의존하는게 있으니 넣어준다.


  //onToggle이벤트
  const onToggle = useCallback(id => {
    dispatch({
      type : 'TOGGLE_USER',
      id
    })
  },[]);


  //onRemove이벤트
  const onRemove = useCallback(id => {
    dispatch({
      type : 'REMOVE_USER',
      id
    })
  },[]);

  //활성 사용자 수
  const count = useMemo(() => counterActiveUsers(users),[users])

  return(
    <>
      <CreateUser3 
        username={username}
        email = {email} 
        onChange = {onChange}
        onCreate = {onCreate}
      />
      <UserList4 users={users} onToggle={onToggle} onRemove={onRemove}/>
      <div>활성 사용자 수 : {count}</div>
    </>
  )
}

export default App;