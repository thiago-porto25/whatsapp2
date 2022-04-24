import Head from 'next/head';
import { db, auth } from '../../firebase';
import {
  doc,
  orderBy,
  query,
  getDocs,
  getDoc,
  collection,
} from 'firebase/firestore';
import { getRecipientEmail } from '../../utils/getRecipientEmail';

import styled from 'styled-components';
import Sidebar from '../../components/Sidebar';
import ChatScreen from '../../components/ChatScreen';

export default function Chat({ messages, chat }) {
  return (
    <Container>
      <Head>
        <title>
          Chat with{' '}
          {getRecipientEmail(chat.participants, auth.currentUser.email)}
        </title>
      </Head>

      <Sidebar />

      <ChatContainer>
        <ChatScreen chat={chat} messages={JSON.parse(messages)} />
      </ChatContainer>
    </Container>
  );
}

export async function getServerSideProps(context) {
  const refMessages = collection(db, 'chats', context.query.id, 'messages');
  const messagesQuery = query(refMessages, orderBy('timestamp', 'asc'));
  const messagesRes = await getDocs(messagesQuery);
  const messages = messagesRes.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .map((message) => ({
      ...message,
      timestamp: message.timestamp.toDate().getTime(),
    }));

  const refChat = doc(db, 'chats', context.query.id);
  const chatRes = await getDoc(refChat);
  const chat = {
    id: chatRes.id,
    ...chatRes.data(),
  };

  return {
    props: {
      messages: JSON.stringify(messages),
      chat,
    },
  };
}

const Container = styled.div`
  display: flex;
`;

const ChatContainer = styled.div`
  flex: 1;
  overflow: scroll;
  height: 100vh;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;
