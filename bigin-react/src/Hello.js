import React from 'react';

//함수형 Hello컴포넌트 (JSX)
function Hello({color, name, isSpecial}) {
    return (
        <div style={{
            color
        }}>
            {/* {isSpecial ? <b>*</b> : null}
            안녕하세요 {name} */}
            {isSpecial && <b>*</b>}
            안녕하세요 {name}
        </div>
    )
}

Hello.defaultProps = {
    name : '이름없음'
}

export default Hello;  //Hello컴포넌트를 만들어서 내보내겠다.