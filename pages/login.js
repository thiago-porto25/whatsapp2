import Head from 'next/head';
import Image from 'next/image';
import styled from 'styled-components';
import { Button } from '@mui/material';
import Google from '../components/Google';

import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';

export default function Login() {
  const signIn = () => {
    signInWithPopup(auth, provider).catch(alert);
  };

  return (
    <Container>
      <Head>
        <title>Login</title>
      </Head>

      <LoginContainer>
        <Image
          src="/icon.svg"
          width={102}
          height={100}
          layout="fixed"
          alt="whatsapp logo, a phone icon inside a circular speech bubble"
        />

        <h1>Welcome to Whatsapp 2</h1>

        <StyledButton onClick={signIn} color="inherit" variant="outlined">
          <Google />
          Sign in with Google
        </StyledButton>
      </LoginContainer>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const LoginContainer = styled.div`
  padding: 100px;
  display: flex;
  align-items: center;
  flex-direction: column;
  row-gap: 40px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
  color: #444;
`;

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  column-gap: 10px;

  &&& {
    border: 1px solid #ddd;
  }
`;
