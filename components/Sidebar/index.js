import { auth, db } from '../../firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import { signOut } from 'firebase/auth';
import { addDoc, collection, where, query } from 'firebase/firestore';

import * as EmailValidator from 'email-validator';
import { IconButton } from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  Search as SearchIcon,
  Chat as ChatIcon,
} from '@mui/icons-material';
import Chat from '../Chat';
import {
  Container,
  Header,
  UserAvatar,
  IconsContainer,
  Search,
  SearchInput,
  SidebarButton,
} from './styles';

export default function Sidebar() {
  const [chatsSnapshot] = useCollection(
    query(
      collection(db, 'chats'),
      where('participants', 'array-contains', auth.currentUser.email)
    )
  );

  const createChat = () => {
    const input = prompt(
      'Please enter an email address for the user you wish to chat with'
    );

    if (!input) return;

    if (
      EmailValidator.validate(input) &&
      input !== auth.currentUser.email &&
      !chatAlreadyExists(input)
    ) {
      addDoc(collection(db, 'chats'), {
        participants: [auth.currentUser.email, input],
      });
    }
  };

  const chatAlreadyExists = (recipientEmail) => {
    if (!chatsSnapshot) return false;

    const chat = chatsSnapshot.docs.find((chat) =>
      chat.data().participants.includes(recipientEmail)
    );

    return !!chat;
  };

  const signOutUser = () => signOut(auth);
  return (
    <Container>
      <Header>
        <UserAvatar src={auth?.currentUser?.photoURL} onClick={signOutUser} />

        <IconsContainer>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </IconsContainer>
      </Header>

      <Search>
        <SearchIcon color="action" />
        <SearchInput placeholder="Search in chats..." />
      </Search>

      <SidebarButton onClick={createChat}>Start a new chat</SidebarButton>

      {chatsSnapshot?.docs.map((chat) => (
        <Chat key={chat.id} id={chat.id} users={chat.data().participants} />
      ))}
    </Container>
  );
}
