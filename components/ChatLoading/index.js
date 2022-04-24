import { CircularProgress } from '@mui/material';
import { Container } from './styles';

export default function ChatLoading() {
  return (
    <Container>
      <CircularProgress sx={{ color: '#3cbc28' }} />
    </Container>
  );
}
