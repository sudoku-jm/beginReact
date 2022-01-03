import React from 'react'

function User({user, onRemove, onToggle}){
    const {username, email, id, active} = user;
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
}

function UserList2 ({users, onRemove, onToggle}) {
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

export default UserList2;