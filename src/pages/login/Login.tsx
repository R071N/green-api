import { useState } from 'react';
import CreateChat from '../createChat/CreateChat';
import './login.scss'

const Login = () => {
  const [idInstance, setIdInstance] = useState('');
  const [apiTokenInstance, setApiTokenInstance] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://api.green-api.com/waInstance${idInstance}/getStatusInstance/${apiTokenInstance}`
      );
      if (response.ok) {
        setIsLoggedIn(true);
      } else {
        alert('Неверный IdInstance или ApiTokenInstance');
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoggedIn) {
    return (
      <CreateChat idInstance={idInstance} apiTokenInstance={apiTokenInstance} />
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        idInstance:
        <input
          type="text"
          value={idInstance}
          onChange={(event) => setIdInstance(event.target.value)}
        />
      </label>
      <br />
      <label>
        apiTokenInstance:
        <input
          type="password"
          value={apiTokenInstance}
          onChange={(event) => setApiTokenInstance(event.target.value)}
        />
      </label>
      <br />
      <input type="submit" value="Submit" />
    </form>
  );
};

export default Login;
