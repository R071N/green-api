import { useState, useEffect } from 'react';

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
  const [messages, setMessages] = useState<string[]>([]);
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
                notification.body.messageData.textMessageData.textMessage,
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
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setNewMessage('');
      } else {
        console.error('Failed to send message');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      <input
        type="text"
        value={newMessage}
        onChange={(event) => setNewMessage(event.target.value)}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default Chat;
