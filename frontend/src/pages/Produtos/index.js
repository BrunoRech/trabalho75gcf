import React, { useState, useEffect, useCallback } from "react";
import { Table, Modal, Button, Icon } from "semantic-ui-react";
import FormProduto from "../../components/forms/FormProduto";
import api from "../../components/services/api";
import { Container } from "./styles";

const { Body, Row, Cell, HeaderCell, Header } = Table;

const CadastroProduto = () => {
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
            <HeaderCell>Fabricante</HeaderCell>
            <HeaderCell>Descrição</HeaderCell>
            <HeaderCell>Ações</HeaderCell>
          </Row>
        </Header>
        <Body>
          {products.map((product) => (
            <Row key={product.id}>
              <Cell>
                <p>{product.manufacturer}</p>
              </Cell>
              <Cell>
                <p>{product.description}</p>
              </Cell>
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
        <FormProduto
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

export default CadastroProduto;
