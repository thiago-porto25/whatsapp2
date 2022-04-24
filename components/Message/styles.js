import styled, { css } from 'styled-components';

export const Container = styled.div``;

export const MessageElement = styled.p`
  width: fit-content;
  padding: 15px;
  border-radius: 8px;
  margin: 10px;
  min-width: 60px;
  padding-bottom: 26px;
  position: relative;
  text-align: right;

  ${(props) =>
    props.typeOfMessage === 'sender'
      ? css`
          background-color: #dcf8c6;
          margin-left: auto;
        `
      : css`
          background-color: #f5f5f5;
          text-align: left;
        `}
`;

export const TimeStamp = styled.span`
  color: gray;
  position: absolute;
  bottom: 0;
  right: 0;
  font-size: 9px;
  padding: 10px;
  text-align: right;
`;
