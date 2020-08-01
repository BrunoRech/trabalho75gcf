import React, { useState, useEffect, useCallback } from "react";
import { Table, Button, Icon } from "semantic-ui-react";
import CustomerForm from "../../components/forms/CustomerForm";
import api from "../../components/services/api";
import { Container, SmallModal as Modal } from "../styles";

const { Body, Row, Cell, HeaderCell, Header } = Table;

const Customers = () => {
  const [openModal, handleModal] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState({});

  const loadCustomers = useCallback(async () => {
    try {
      const { data } = await api.get("/customers");
      setCustomers(data);
    } catch (error) {
      alert("Ocorreu um erro ao buscar por produtos");
    }
  }, []);

  useEffect(() => {
    loadCustomers();
  }, [loadCustomers]);

  const handleDelete = async ({ id }) => {
    try {
      await api.delete(`/customers/${id}`);
      setCustomers(customers.filter((prod) => prod.id !== id));
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

      <Table celled textAlign="center" compact>
        <Header>
          <Row>
            <HeaderCell>Nome</HeaderCell>
            <HeaderCell>CPF</HeaderCell>
            <HeaderCell>Endereço</HeaderCell>
            <HeaderCell>Número</HeaderCell>
            <HeaderCell>Bairro</HeaderCell>
            <HeaderCell>Cidade</HeaderCell>
            <HeaderCell>CEP</HeaderCell>
            <HeaderCell>Estado</HeaderCell>
            <HeaderCell>Ações</HeaderCell>
          </Row>
        </Header>
        <Body>
          {customers.map((product) => (
            <Row key={product.id}>
              <Cell>
                <p>{product.name}</p>
              </Cell>
              <Cell>
                <p>{product.cpf}</p>
              </Cell>
              <Cell>
                <p>{product.address}</p>
              </Cell>
              <Cell>
                <p>{product.number}</p>
              </Cell>
              <Cell>
                <p>{product.district}</p>
              </Cell>
              <Cell>
                <p>{product.city}</p>
              </Cell>
              <Cell>
                <p>{product.cep}</p>
              </Cell>
              <Cell>
                <p>{product.state}</p>
              </Cell>
              <Cell width={5}>
                <Button
                  onClick={() => {
                    setCustomer(customer);
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
        onClose={() => {
          handleModal(false);
          setCustomer({});
        }}
        closeOnTriggerMouseLeave
      >
        <CustomerForm
          customer={customer}
          afterSubmit={() => {
            loadCustomers();
            handleModal(false);
          }}
        />
      </Modal>
    </Container>
  );
};

export default Customers;
