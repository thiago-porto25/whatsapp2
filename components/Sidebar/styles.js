import styled from 'styled-components';
import { Avatar, Button } from '@mui/material';

export const Container = styled.div`
  flex: 0.45;
  border-right: 1px solid #f5f5f5;
  height: 100vh;
  min-width: 300px;
  max-width: 350px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: #fff;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid #f5f5f5;
`;

export const UserAvatar = styled(Avatar)`
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

export const IconsContainer = styled.div``;

export const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  border-radius: 2px;
`;

export const SearchInput = styled.input`
  outline-width: 0;
  border: none;
  flex: 1;
`;

export const SidebarButton = styled(Button)`
  width: 100%;

  &&& {
    border-top: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
  }
`;
