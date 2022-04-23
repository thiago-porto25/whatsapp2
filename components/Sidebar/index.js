import * as EmailValidator from 'email-validator';
import { IconButton } from '@mui/material';
import { MoreVert, Chat, Search as SearchIcon } from '@mui/icons-material';
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
  const createChat = () => {
    const input = prompt(
      'Please enter an email address for the user you wish to chat with'
    );

    if (!input) return;

    if (EmailValidator.validate(input)) {
      // TODO: Create a chat with the user
    }
  };

  return (
    <Container>
      <Header>
        <UserAvatar />
        <IconsContainer>
          <IconButton>
            <Chat />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </IconsContainer>
      </Header>

      <Search>
        <SearchIcon color="action" />
        <SearchInput placeholder="Search in chats..." />
      </Search>

      <SidebarButton onClick={createChat}>Start a new chat</SidebarButton>
    </Container>
  );
}
