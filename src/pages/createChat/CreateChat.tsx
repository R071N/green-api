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
    <div>
      <label>
        Введите номер контакта:
        <input
          type="tel"
          value={recipientPhoneNumber}
          onChange={(event) => setRecipientPhoneNumber(event.target.value)}
        />
      </label>
      <br />
      <button onClick={handleCreateChat}>Создать новый чат</button>
    </div>
  );
};

export default CreateChat;
