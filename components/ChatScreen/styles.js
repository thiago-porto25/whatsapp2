import styled from 'styled-components';

export const Container = styled.div``;

export const Header = styled.div`
  position: sticky;
  background-color: #fff;
  z-index: 100;
  top: 0;
  display: flex;
  align-items: center;
  padding: 11px;
  height: 80px;
  border-bottom: 1px solid #f5f5f5;
`;

export const HeaderInformation = styled.div`
  margin-left: 15px;
  flex: 1;

  > h3 {
    margin-bottom: 3px;
  }

  > p {
    font-size: 14px;
    color: gray;
  }
`;

export const HeaderIcons = styled.div``;

export const MessageContainer = styled.div`
  padding: 30px;
  background-color: #e5ded8;
  min-height: 90vh;
`;

export const EndOfMessages = styled.div`
  margin-bottom: 50px;
`;

export const InputContainer = styled.form`
  display: flex;
  align-items: center;
  padding: 10px;
  position: sticky;
  bottom: 0;
  background-color: #fff;
  z-index: 100;
  border-top: 1px solid #f5f5f5;
`;

export const StyledInput = styled.input`
  flex: 1;
  outline: 0;
  border: none;
  border-radius: 10px;
  padding: 20px;
  background-color: #f5f5f5;
  margin-left: 15px;
  margin-right: 15px;

  &:hover {
    opacity: 0.8;
  }
`;
