import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="text-center">
      <h1>Welcome to FakeStore</h1>
      <p>Your favorite mock e-commerce experience.</p>
      <Button onClick={() => navigate('/products')} variant="primary">
        View Products
      </Button>
    </div>
  );
}

export default Home;
