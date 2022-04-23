import Image from 'next/image';
import { CircularProgress } from '@mui/material';
import { Container, Flex } from './styles';

export default function Loading() {
  return (
    <Container>
      <Flex>
        <Image src="/icon.svg" alt="loading..." width={102} height={100} />

        <CircularProgress sx={{ color: '#3cbc28' }} />
      </Flex>
    </Container>
  );
}
