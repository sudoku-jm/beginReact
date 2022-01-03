import React, {useRef, useReducer, useMemo, useCallback} from 'react';
import CreateUser3 from './CreateUser3';
import UserList4 from './UserList4';

function counterActiveUsers(users){
  console.log('활성 사용자 수를 세는중...');
  return users.filter(user => user.active===true).length;
}

const initialState = {
  inputs : {
    username : '',
    email : ''
  },
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
    case 'CHANGE_INPUT' : 
      return {
        ...state, //기존 상태 들고오고
        inputs : {//inputs의 값을 덮어쓴다. (불변성을 지키기 위해)
          ...state.inputs, 
          [action.name] : action.value // 초기값의 inputs안의 특정값을 바꾼다.
        }
      };
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
  const nextId = useRef(4);

  const {users} = state;
  const {username, email} = state.inputs;

  //onChange이벤트
  const onChange = useCallback(e => {
    const {name, value} = e.target;
    dispatch({
      type : 'CHANGE_INPUT', //액션
      name,
      value
    })
  },[]);

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
  },[username,email]);  //해당 함수에서 기존 값 의존하는게 있으니 넣어준다.


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