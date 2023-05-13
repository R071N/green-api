import { useState } from 'react';
import Chat from '../chat/Chat';

interface CreateChatProps {
  idInstance: string;
  apiTokenInstance: string;
}

const CreateChat: React.FC<CreateChatProps> = ({
  idInstance,
  apiTokenInstance,
}) => {
  const [recipientPhoneNumber, setRecipientPhoneNumber] = useState('');
  const [showChat, setShowChat] = useState(false);

  const handleCreateChat = () => {
    setShowChat(true);
  };

  if (showChat) {
    return (
      <Chat
        idInstance={idInstance}
        apiTokenInstance={apiTokenInstance}
        recipientPhoneNumber={recipientPhoneNumber}
      />
    );
  }

  return (
    <div className='form'>
      <label className='form__label'>
        Введите телефон контакта:
        <input
          className='form__input'
          type='tel'
          maxLength={11}
          value={recipientPhoneNumber}
          placeholder='79994442211'
          onChange={(event) => setRecipientPhoneNumber(event.target.value)}
        />
      </label>
      <br />
      <button className='btn form__submit' onClick={handleCreateChat}>
        Создать новый чат
      </button>
    </div>

  );
};

export default CreateChat;
