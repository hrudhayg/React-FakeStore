import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get('https://fakestoreapi.com/products');
        setProducts(res.data);
      } catch (err) {
        setError('Failed to fetch products. Try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;
  if (error) return <Alert variant="danger" className="mt-5 text-center">{error}</Alert>;

  return (
    <Container>
      <h2 className="mb-4 text-center">Available Products</h2>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {products.map((product) => (
          <Col key={product.id} className="product-card fade-in">
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Products;
