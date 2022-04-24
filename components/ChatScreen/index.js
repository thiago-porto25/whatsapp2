import { useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { auth, db } from '../../firebase';
import {
  collection,
  query,
  orderBy,
  setDoc,
  doc,
  serverTimestamp,
  addDoc,
  where,
} from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { getRecipientEmail } from '../../utils/getRecipientEmail';
import TimeAgo from 'timeago-react';

import { Avatar, IconButton } from '@mui/material';
import {
  MoreVert,
  AttachFile,
  InsertEmoticon,
  Send,
} from '@mui/icons-material';
import Message from '../Message';
import {
  Container,
  Header,
  HeaderInformation,
  HeaderIcons,
  MessageContainer,
  EndOfMessages,
  InputContainer,
  StyledInput,
} from './styles';

export default function ChatScreen({ chat, messages }) {
  const [input, setInput] = useState('');
  const endOfMessagesRef = useRef(null);
  const router = useRouter();
  const [messagesSnapshot] = useCollection(
    query(
      collection(db, 'chats', router.query.id, 'messages'),
      orderBy('timestamp', 'asc')
    )
  );
  const [recipientSnapshot] = useCollection(
    query(
      collection(db, 'users'),
      where(
        'email',
        '==',
        getRecipientEmail(chat.participants, auth.currentUser.email)
      )
    )
  );

  const showMessages = () => {
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map((message) => (
        <Message
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        />
      ));
    } else {
      messages.map((message) => (
        <Message key={message.id} user={message.user} message={message} />
      ));
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    await setDoc(
      doc(db, 'users', auth.currentUser.uid),
      {
        lastSeen: serverTimestamp(),
      },
      { merge: true }
    );

    await addDoc(collection(db, 'chats', router.query.id, 'messages'), {
      timestamp: serverTimestamp(),
      message: input,
      user: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL,
    });

    setInput('');
    scrollToBottom();
  };

  const shouldInputBeDisabled = () => {
    if (!input || input?.length <= 0 || input.trim() === '') return true;

    return false;
  };

  const scrollToBottom = () => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const recipient = useMemo(
    () => recipientSnapshot?.docs?.[0]?.data(),
    [recipientSnapshot]
  );

  const recipientEmail = getRecipientEmail(
    chat.participants,
    auth.currentUser.email
  );

  return (
    <Container>
      <Header>
        {recipient ? (
          <Avatar src={recipient?.photoURL} alt={recipient?.email} />
        ) : (
          <Avatar>{recipient?.email[0]}</Avatar>
        )}

        <HeaderInformation>
          <h3>{recipientEmail}</h3>
          {recipientSnapshot ? (
            <p>
              Last active:{' '}
              {recipient?.lastSeen?.toDate() ? (
                <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
              ) : (
                'Unavailable'
              )}
            </p>
          ) : (
            <p>Loading...</p>
          )}
        </HeaderInformation>

        <HeaderIcons>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </HeaderIcons>
      </Header>

      <MessageContainer>
        {showMessages()}
        <EndOfMessages ref={endOfMessagesRef} />
      </MessageContainer>

      <InputContainer onSubmit={sendMessage} method="POST">
        <InsertEmoticon />
        <StyledInput value={input} onChange={(e) => setInput(e.target.value)} />
        <IconButton disabled={shouldInputBeDisabled()} type="submit">
          <Send />
        </IconButton>
      </InputContainer>
    </Container>
  );
}
