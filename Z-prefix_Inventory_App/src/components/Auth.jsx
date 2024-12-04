import React, {useState} from 'react';

const Auth = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);

    const handleClick = async (event) => {
        event.preventDefault();
    let url = 'http://localhost:3001/';
    if (isLogin) {
        url += 'login'
    } else {
        url += 'register'
    }

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json' }, 
        body: JSON.stringify({username: username, password: password})
        });
    
    if (response.ok) {
        let data =await response.json();
        localStorage.setItem('token', data.token);
        window.location.reload ();
    } else {
        console.error ('failure to authenticate')
    }
};



return (
    <form onSubmit= {handleClick}>
        <h2>{isLogin ? 'Login' : 'Register'}</h2>
        <input
        type="text"
        placeholder ="Username"
        value={username}
        onChange={event => setUsername(event.target.value)}
        />
        <input
        type ="password"
        placeholder="Password"
        value={password}
        onChange={event=> setPassword(event.target.value)}
        />
        <button type= "submit">{isLogin ? 'Login' : 'Register'} </button>
        <button type ="button" onClick={() => setIsLogin(!isLogin)}>
            Switch to {isLogin ? 'Register' : 'Login'}
        </button>
    </form>

    );
};

export default Auth;
 