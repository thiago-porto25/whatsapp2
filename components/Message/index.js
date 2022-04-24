import { auth } from '../../firebase';
import { format } from 'date-fns';
import { Container, MessageElement, TimeStamp } from './styles';

export default function Message({ user, message }) {
  const typeOfMessage =
    user === auth.currentUser.email ? 'sender' : 'recipient';

  return (
    <Container>
      <MessageElement typeOfMessage={typeOfMessage}>
        {message.message}
        {message?.timestamp ? (
          <TimeStamp>{format(message.timestamp, 'HH:mm')}</TimeStamp>
        ) : (
          '...'
        )}
      </MessageElement>
    </Container>
  );
}
