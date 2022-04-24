import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { auth, db } from '../../firebase.js';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, query, where } from 'firebase/firestore';
import { getRecipientEmail } from '../../utils/getRecipientEmail';

import ChatLoading from '../ChatLoading';
import { Container, UserAvatar } from './styles';

export default function Chat({ id, users }) {
  const router = useRouter();
  const [recipientSnapshot, loading] = useCollection(
    query(
      collection(db, 'users'),
      where('email', '==', getRecipientEmail(users, auth.currentUser.email))
    )
  );
  const recipient = useMemo(
    () => recipientSnapshot?.docs?.[0]?.data(),
    [recipientSnapshot]
  );

  const enterChat = () => router.push(`/chat/${id}`);

  if (loading) {
    return <ChatLoading />;
  }

  return (
    <Container onClick={enterChat}>
      {recipient ? (
        <UserAvatar src={recipient?.photoURL} alt={recipient?.email} />
      ) : (
        <UserAvatar>
          {getRecipientEmail(users, auth.currentUser.email)[0]}
        </UserAvatar>
      )}
      <p>{recipient?.email}</p>
    </Container>
  );
}
