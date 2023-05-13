import { useState, useEffect } from 'react';
import './chat.scss'

interface ChatProps {
  idInstance: string;
  apiTokenInstance: string;
  recipientPhoneNumber: string;
}

const Chat: React.FC<ChatProps> = ({
  idInstance,
  apiTokenInstance,
  recipientPhoneNumber,
}) => {
  const [messages, setMessages] = useState<{ text: string, isSent: boolean }[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        const response = await fetch(
          `https://api.green-api.com/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`,
          {
            method: 'GET',
          }
        );
        if (response.ok) {
          const notification = await response.json();
          console.log(notification);
          if (notification) {
            if (
              notification.body.typeWebhook === 'incomingMessageReceived' &&
              notification.body.senderData.sender === `${recipientPhoneNumber}@c.us` &&
              notification.body.messageData.typeMessage === 'textMessage'
            ) {
              setMessages((prevMessages) => [
                ...prevMessages,
                { text: notification.body.messageData.textMessageData.textMessage, isSent: false },
              ]);
            }
            await fetch(
              `https://api.green-api.com/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${notification.receiptId}`,
              {
                method: 'DELETE',
              }
            );
          }
        }
      } catch (error) {
        console.error(error);
      }
    }, 5000);
    return () => {
      clearInterval(intervalId);
    };
  }, [idInstance, apiTokenInstance, recipientPhoneNumber]);


  const handleSendMessage = async () => {
    try {
      const response = await fetch(
        `https://api.green-api.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chatId: `${recipientPhoneNumber}@c.us`,
            message: newMessage,
          }),
        }
      );
      if (response.ok) {
        setMessages((prevMessages) => [...prevMessages, { text: newMessage, isSent: true }]);
        setNewMessage('');
      } else {
        console.error('Не удалось отправить сообщение');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='chat'>
      <ul className='chat__messages'>
        <div className='spacer'></div>
        {messages.map((message, index) => (
          <li className={`chat__message ${message.isSent ? 'chat__message--sent' : ''}`} key={index}>
            {message.text}
          </li>
        ))}
      </ul>
      <div className='chat__input-container'>
        <input
          className='chat__input'
          type='text'
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
        />
        <button className='chat__send' onClick={handleSendMessage}>
          Отправить
        </button>
      </div>
    </div>
  );
};

export default Chat;
