import React, { useState, useEffect, useCallback } from "react";
import { Table, Modal, Button, Icon } from "semantic-ui-react";
import ProductForm from "../../components/forms/ProductForm";
import api from "../../components/services/api";
import { Container } from "../styles";

const { Body, Row, Cell, HeaderCell, Header } = Table;

const collumns = [
  { name: "Fabricante", path: "manufacturer" },
  { name: "Descrição", path: "description" },
];

const Products = () => {
  const [openModal, handleModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});

  const loadProducts = useCallback(async () => {
    try {
      const { data } = await api.get("/products");
      setProducts(data);
    } catch (error) {
      alert("Ocorreu um erro ao buscar por produtos");
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleDelete = async ({ id }) => {
    try {
      await api.delete(`/products/${id}`);
      setProducts(products.filter((prod) => prod.id !== id));
      alert("Sucesso!");
    } catch (error) {
      alert("Ocorreu um erro ao deletar produto");
    }
  };

  return (
    <Container>
      <div>
        <Button onClick={() => handleModal(true)}>Cadastrar</Button>
      </div>

      <Table celled textAlign="center">
        <Header>
          <Row>
            {collumns.map(({ name }) => (
              <HeaderCell>{name}</HeaderCell>
            ))}
            <HeaderCell>Ações</HeaderCell>
          </Row>
        </Header>
        <Body>
          {products.map((product) => (
            <Row key={product.id}>
              {collumns.map(({ path }) => (
                <Cell>
                  <p>{product[path]}</p>
                </Cell>
              ))}
              <Cell width={5}>
                <Button
                  onClick={() => {
                    setProduct(product);
                    handleModal(true);
                  }}
                >
                  <Icon name="pencil" color="orange" /> Editar
                </Button>
                <Button onClick={() => handleDelete(product)}>
                  <Icon name="close" color="red" /> Excluir
                </Button>
              </Cell>
            </Row>
          ))}
        </Body>
      </Table>

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
