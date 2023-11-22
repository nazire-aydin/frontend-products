// src/components/ProductList.js
import React, { useState } from 'react';
import { Table, Button, Modal, Form, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductList = () => {
// State for managing the product list	
  const [products, setProducts] = useState([
    {
      id: 1,
      description: 'Carrot',
      canExpire: true,
      expiryDate: '2023-12-31',
      category: 'Vegetables',
      price: 1.5,
      isOnSpecial: false,
    },
    {
      id: 2,
      description: 'Chicken Breast',
      canExpire: true,
      expiryDate: '2023-12-15',
      category: 'Meat',
      price: 5.99,
      isOnSpecial: true,
    },
    {
      id: 3,
      description: 'Desk Chair',
      canExpire: false,
      expiryDate: null,
      category: 'Furniture',
      price: 79.99,
      isOnSpecial: false,
    },
	{
      id: 4,
      description: 'Tomato',
      canExpire: true,
      expiryDate: '2023-12-20',
      category: 'Vegetables',
      price: 0.99,
      isOnSpecial: true,
    },
    {
      id: 5,
      description: 'Laptop',
      canExpire: false,
      expiryDate: null,
      category: 'Electronics',
      price: 899.99,
      isOnSpecial: false,
    },
    {
      id: 6,
      description: 'Shampoo',
      canExpire: true,
      expiryDate: '2024-01-15',
      category: 'Personal Care',
      price: 4.49,
      isOnSpecial: false,
    }
    // Add more sample products as needed
  ]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  // State for managing the edit modal visibility and edited product
 const [editProduct, setEditProduct] = useState({});
  // State for managing the add modal visibility and new product
 const [newProduct, setNewProduct] = useState({
    description: '',
    canExpire: false,
    expiryDate: '',
    category: '',
    price: 0,
    isOnSpecial: false,
  });
  // State for managing the category filter
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Method to handle the click event for editing a product
  const handleEditClick = (product) => {
    setEditProduct({ ...product });
    setShowEditModal(true);
  };
  // Method to handle closing the edit modal
  const handleEditModalClose = () => {
    setShowEditModal(false);
    // Reset edit product form fields
    setEditProduct({});
  };
// Method to handle the submission of edits
  const handleEditSubmit = () => {
    const updatedProducts = products.map((product) =>
      product.id === editProduct.id ? editProduct : product
    );
    setProducts(updatedProducts);
    setShowEditModal(false);
  };
// Method to delete a product
  const deleteProduct = (productId) => {
    const updatedProducts = products.filter((product) => product.id !== productId);
    setProducts(updatedProducts);
  };
// Method to filter products based on the selected category
  const filterProductsByCategory = () => {
    if (categoryFilter === 'All') {
      return products;
    } else {
      return products.filter(
        (product) => product.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }
  };
 // Method to highlight special products
  const highlightSpecial = (product) => {
    return product.isOnSpecial ? 'special-row' : '';
  };

  // Method to handle the click event for adding a new product
  const handleAddClick = () => {
    setShowAddModal(true);
  };
  
  // Method to handle closing the add modal
  const handleAddModalClose = () => {
    setShowAddModal(false);
    // Reset new product form fields
    setNewProduct({
      description: '',
      canExpire: false,
      expiryDate: '',
      category: '',
      price: 0,
      isOnSpecial: false,
    });
  };

  // Method to handle the submission of a new product
  const handleAddSubmit = () => {
    const newProductWithId = {
      ...newProduct,
      id: Math.max(...products.map((product) => product.id), 0) + 1,
    };
    setProducts([...products, newProductWithId]);
    setShowAddModal(false);
  };

  return (
    <div className="container mt-4">
      <h1>Product List</h1>
      <Button variant="success" className="mb-3" onClick={handleAddClick}>
        Add Product
      </Button>
      <Dropdown className="mb-3">
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {`Filter by Category: ${categoryFilter}`}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setCategoryFilter('All')}>All</Dropdown.Item>
          <Dropdown.Item onClick={() => setCategoryFilter('Vegetables')}>Vegetables</Dropdown.Item>
          <Dropdown.Item onClick={() => setCategoryFilter('Meat')}>Meat</Dropdown.Item>
          <Dropdown.Item onClick={() => setCategoryFilter('Furniture')}>Furniture</Dropdown.Item>
		  <Dropdown.Item onClick={() => setCategoryFilter('Electronics')}>Electronics</Dropdown.Item>
		  <Dropdown.Item onClick={() => setCategoryFilter('Personal Care')}>Personal Care</Dropdown.Item>
          {/* Add more categories as needed */}
        </Dropdown.Menu>
      </Dropdown>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Description</th>
            <th>Category</th>
            <th>Price</th>
            <th>Expiry Date</th>
            <th>Special</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filterProductsByCategory().map((product) => (
            <tr key={product.id} className={highlightSpecial(product)}>
              <td>{product.description}</td>
              <td>{product.category}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>{product.canExpire ? product.expiryDate : 'N/A'}</td>
              <td>{product.isOnSpecial ? 'Yes' : 'No'}</td>
              <td>
                <Button
                  variant="info"
                  size="sm"
                  className="mr-2"
                  onClick={() => handleEditClick(product)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => deleteProduct(product.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={handleEditModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={editProduct.description || ''}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, description: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={editProduct.category || ''}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, category: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={editProduct.price || ''}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, price: parseFloat(e.target.value) })
                }
              />
            </Form.Group>
            <Form.Group controlId="formExpiryDate">
              <Form.Label>Expiry Date</Form.Label>
              <Form.Control
                type="date"
                value={editProduct.expiryDate || ''}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, expiryDate: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formIsOnSpecial">
              <Form.Check
                type="checkbox"
                label="Is On Special"
                checked={editProduct.isOnSpecial || false}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, isOnSpecial: e.target.checked })
                }
              />
            </Form.Group>
            {/* Add other fields as needed */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

     {/* Add Modal */}
      <Modal show={showAddModal} onHide={handleAddModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* (değişiklik) */}
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={newProduct.description || ''}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, description: e.target.value })
                }
              />
            </Form.Group>
            {/* (değişiklik) */}
            <Form.Group controlId="formCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={newProduct.category || ''}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, category: e.target.value })
                }
              />
            </Form.Group>
            {/* (değişiklik) */}
            <Form.Group controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={newProduct.price || ''}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })
                }
              />
            </Form.Group>
            {/* (değişiklik) */}
            <Form.Group controlId="formExpiryDate">
              <Form.Label>Expiry Date</Form.Label>
              <Form.Control
                type="date"
                value={newProduct.expiryDate || ''}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, expiryDate: e.target.value })
                }
              />
            </Form.Group>
            {/* (değişiklik) */}
            <Form.Group controlId="formIsOnSpecial">
              <Form.Check
                type="checkbox"
                label="Is On Special"
                checked={newProduct.isOnSpecial || false}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, isOnSpecial: e.target.checked })
                }
              />
            </Form.Group>
            {/* (değişiklik) */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleAddModalClose}>
            Close
          </Button>
          {/* (değişiklik) */}
          <Button variant="primary" onClick={handleAddSubmit}>
            Add Product
          </Button>
          {/* (değişiklik) */}
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default ProductList;