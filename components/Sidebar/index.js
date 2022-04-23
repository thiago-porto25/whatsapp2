import { IconButton } from '@material-ui/core';
import { MoreVert, Chat, Search as SearchIcon } from '@material-ui/icons';
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

      <SidebarButton>Start a new chat</SidebarButton>
    </Container>
  );
}
