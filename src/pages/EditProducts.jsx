import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Alert, Container, Spinner } from 'react-bootstrap';

function EditProduct() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
  });
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setFormData({
          title: res.data.title,
          price: res.data.price,
          description: res.data.description,
          category: res.data.category,
        });
      } catch {
        setError('Failed to fetch product.');
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError('');

    try {
      await axios.put(`https://fakestoreapi.com/products/${id}`, formData);
      setSuccess(true);
    } catch {
      setError('Failed to update product.');
    }
  };

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container>
      <h2 className="mb-4 text-center">Edit Product</h2>
      {success && <Alert variant="success">Product updated successfully!</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            name="price"
            value={formData.price}
            onChange={handleChange}
            type="number"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            name="description"
            value={formData.description}
            onChange={handleChange}
            as="textarea"
            rows={3}
            required
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Category</Form.Label>
          <Form.Control
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button type="submit" variant="primary">Update Product</Button>
      </Form>
    </Container>
  );
}

export default EditProduct;
