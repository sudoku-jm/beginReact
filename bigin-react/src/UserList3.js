import React from 'react'

const User = React.memo(function User({user, onRemove, onToggle}){
    const {username, email, id, active} = user;

    // useEffect(() => {
    //     console.log('user 값이 설정 됨');
    //     console.log(user);
    //     return () => {
    //         console.log('user값이 바뀌기 전');
    //         console.log(user);
    //     }
    // },[user])
    
    return(
        <div>
            <b 
            onClick={() => onToggle(id)}
            style={{
                color : active ? 'green' : 'black',
                cursor : 'pointer'
            }}>
                {username}
            </b> 
            &nbsp;
            <span>{email}</span>
            <button onClick={()=>onRemove(id)}>삭제</button>
        </div>
    )
});

function UserList3 ({users, onRemove, onToggle}) {
    return(
        <>
            {
             users.map(
                (user) => (
                    <User 
                        key={user.id} 
                        user={user} 
                        onRemove={onRemove} 
                        onToggle={onToggle}
                    />
                )
             )
            }
        </>
    )
}

export default React.memo(
    UserList3,
    (prevProps, nextProps) => nextProps.users === prevProps.users
);