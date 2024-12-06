import React, {useState} from 'react';

const Auth = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    const handleClick = (event) => {
        event.preventDefault();
        let endpoint = 'register';
        if (isLogin) {
          endpoint = 'login';
        }
        const url = 'http://localhost:3001/' + endpoint;
        fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error('failed to authenticate');
          })
          .then((data) => {
            localStorage.setItem('token', data.token);
            window.location.reload();
          })
          .catch(() => setErrorMessage('Failure to authenticate'));
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