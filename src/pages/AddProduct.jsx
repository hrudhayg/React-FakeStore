import { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert, Container } from 'react-bootstrap';

function AddProduct() {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

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
      const response = await axios.post('https://fakestoreapi.com/products', formData);
      console.log('Created:', response.data);
      setSuccess(true);
      setFormData({ title: '', price: '', description: '', category: '' });
    } catch (err) {
      setError('Failed to create product. Please try again.');
    }
  };

  return (
    <Container>
      <h2 className="mb-4 text-center">Add New Product</h2>
      {success && <Alert variant="success">Product created successfully!</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter product title"
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
            placeholder="Enter price"
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
            placeholder="Enter description"
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Category</Form.Label>
          <Form.Control
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            placeholder="Enter category"
          />
        </Form.Group>

        <Button type="submit" variant="primary">Create Product</Button>
      </Form>
    </Container>
  );
}

export default AddProduct;
