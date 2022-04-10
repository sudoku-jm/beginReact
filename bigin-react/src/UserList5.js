import React, {useContext} from 'react';
import {UserDispatch} from './App';

const User = React.memo(function User({user}){
    const {username, email, id, active} = user;

    const dispatch = useContext(UserDispatch);
    
    return(
        <div>
            <b 
            style={{
                color : active ? 'green' : 'black',
                cursor : 'pointer'
            }}
            onClick={() => dispatch({
                type : 'TOGGLE_USER',
                id
            })}
            >
                {username}
            </b> 
            &nbsp;
            <span>{email}</span>
            <button 
            onClick={() => dispatch({
                type : 'REMOVE_USER',
                id
            })}
            >
                삭제
            </button>
        </div>
    )
});

function UserList5 ({users}) {
    return(
        <>
            {
             users.map(
                (user) => (
                    <User 
                        key={user.id} 
                        user={user} 
                    />
                )
             )
            }
        </>
    )
}

export default React.memo(
    UserList5,
    (prevProps, nextProps) => nextProps.users === prevProps.users
);