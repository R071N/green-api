import { useState } from 'react';
import CreateChat from '../createChat/CreateChat';

const Login = () => {
  const [idInstance, setIdInstance] = useState('');
  const [apiTokenInstance, setApiTokenInstance] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://api.green-api.com/waInstance${idInstance}/getStatusInstance/${apiTokenInstance}`
      );
      if (response.ok) {
        setIsLoggedIn(true);
      } else {
        setErrorMessage('Неверный IdInstance или ApiTokenInstance');
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
    <form className='form' onSubmit={handleSubmit}>
      <label className='form__label'>
        idInstance:
        <input
          className='form__input'
          type='text'
          value={idInstance}
          onChange={(event) => setIdInstance(event.target.value)}
        />
      </label>
      <label className='form__label'>
        apiTokenInstance:
        <input
          className='form__input'
          type='password'
          value={apiTokenInstance}
          onChange={(event) => setApiTokenInstance(event.target.value)}
        />
      </label>
      <input className='btn form__submit' type='submit' value='Авторизация' />
      <p style={{ color: 'red' }}>{errorMessage}</p>
    </form>
  );
};

export default Login;
