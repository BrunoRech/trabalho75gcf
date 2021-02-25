import React, { useState, useEffect, useCallback } from 'react';
import { Modal, Button, Icon } from 'semantic-ui-react';
import ProductForm from '../../components/forms/ProductForm';
import { PRODUCTS } from '../../components/layout/Table/headerNames';
import Table from '../../components/layout/Table';
import { Container } from '../styles';
import useApi from '../../hooks/useApi';

const Products = () => {
  const { get, destroy } = useApi();
  const [openModal, handleModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});

  const loadProducts = useCallback(async () => {
    const { data } = await get('/products');
    if (data) {
      setProducts(data);
    }
  }, [get]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleDelete = async ({ id }) => {
    await destroy(`/products/${id}`, 'Produto Deletado com Sucesso!', () =>
      setProducts(products.filter(prod => prod.id !== id)),
    );
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
