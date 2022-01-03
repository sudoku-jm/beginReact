import React, {useRef, useState, useMemo, useCallback} from 'react';
import CreateUser2 from './CreateUser2';
import UserList3 from './UserList3';

function counterActiveUsers(users){
  console.log('활성 사용자 수를 세는중...');
  return users.filter(user => user.active===true).length;
}

const App = () => {
  const [inputs, setInputs] = useState({
    username : '',
    email : ''
  });
  const {username, email} = inputs;

  const onChange = useCallback(e => {
    const {name, value} = e.target;
    setInputs({
      ...inputs,
      [name] : value
    })
  },[inputs]);


  const [users,setUsers] = useState([
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
    },
]);

const nextId = useRef(4);

//추가
const onCreate = useCallback(() => {
  const user = {
    id : nextId.current,
    username,
    email,
  }

  setUsers(users => users.concat(user));
  
  setInputs({
    username :'',
    email :''
  })
  nextId.current += 1 ;

},[username, email]);

//삭제
const onRemove = useCallback(id => {
  setUsers(users => users.filter(user => user.id !== id));
},[]);

//active 토글
const onToggle = useCallback(id => {
  setUsers(users => users.map(
    user => user.id === id 
    ? {...user, active: !user.active} //true
    : user                          //false
    ))
},[]);


const count = useMemo(() =>counterActiveUsers(users),[users]);
/* counterActiveUsers함수가 호출되면 [users]값이 바뀔때에만 호출함 */

  return (
    <>
      <CreateUser2 
        username={username} 
        email={email} 
        onChange={onChange} 
        onCreate={onCreate} 
      />
      <UserList3 
        users={users} 
        onRemove={onRemove} 
        onToggle={onToggle} 
      />
      <div>활성 사용자 수 : {count}</div>
    </>
  );
};

export default App;