import React, {useRef, useState, useMemo} from 'react';
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

  const onChange = e => {
    const {name, value} = e.target;
    setInputs({
      ...inputs,
      [name] : value
    })
  }


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
const onCreate = () => {
  //1. 새로운 user 객체를 만들어준다
  const user = {
    id : nextId.current,
    // ...inputs
    username,
    email,
  }
 //2. 기존 배열을 복사해서 새롭게 만든 객체를 추가한다.
  // setUsers([...users, user]);

  //2. concat 함수 사용하기로도 객체 추가할 수 있다.
  setUsers(users.concat(user));
  
  //3. input 빈값
  setInputs({
    username :'',
    email :''
  })
  nextId.current += 1 ;

}

//삭제
const onRemove = id => {
  setUsers(users.filter(user => user.id !== id));
}

//active 토글
const onToggle = id => {
  setUsers(users.map(
    user => user.id === id 
    ? {...user, active: !user.active} //true
    : user                          //false
    ))
}


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