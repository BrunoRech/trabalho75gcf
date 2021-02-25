import React, { useState, useEffect, useCallback } from 'react';
import { Modal, Button, Icon } from 'semantic-ui-react';
import ProductForm from '../../components/forms/ProductForm';
import { PRODUCTS } from '../../components/layout/Table/headerNames';
import Table from '../../components/layout/Table';
import api from '../../components/services/api';
import { Container } from '../styles';

const Products = () => {
  const [openModal, handleModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});

  const loadProducts = useCallback(async () => {
    try {
      const { data } = await api.get('/products');
      setProducts(data);
    } catch (error) {
      alert('Ocorreu um erro ao buscar por produtos');
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleDelete = async ({ id }) => {
    try {
      await api.delete(`/products/${id}`);
      setProducts(products.filter(prod => prod.id !== id));
      alert('Sucesso!');
    } catch (error) {
      alert('Ocorreu um erro ao deletar produto');
    }
  };

  const handleEdit = product => {
    setProduct(product);
    handleModal(true);
  };

  return (
    <Container>
      <div>
        <Button onClick={() => handleModal(true)}>Cadastrar</Button>
      </div>

      <Table
        data={products}
        header={PRODUCTS}
        actions={[
          {
            label: 'Editar',
            icon: <Icon name="pencil" color="orange" />,
            onClick: handleEdit,
          },
          {
            label: 'Excluir',
            icon: <Icon name="close" color="red" />,
            onClick: handleDelete,
          },
        ]}
      />

      <Modal
        open={openModal}
        size="mini"
        onClose={() => {
          handleModal(false);
          setProduct({});
        }}
        closeOnTriggerMouseLeave
      >
        <ProductForm
          product={product}
          afterSubmit={() => {
            loadProducts();
            handleModal(false);
          }}
        />
      </Modal>
    </Container>
  );
};

export default Products;
