import React, { useState, useEffect, useCallback } from "react";
import { Table, Button, Icon } from "semantic-ui-react";
import CustomerForm from "../../components/forms/CustomerForm";
import api from "../../components/services/api";
import { Container, SmallModal as Modal } from "../styles";

const { Body, Row, Cell, HeaderCell, Header } = Table;

const columns = [
  {name:'Nome', path:'name'},
  {name:'CPF', path:'cpf'},
  {name:'Endereço', path:'address'},
  {name:'Número', path:'number'},
  {name:'Bairro', path:'district'},
  {name:'Cidade', path:'city'},
  {name:'CEP', path:'cep'},
  {name:'Estado', path:'state'},
]

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
            {columns.map(({ name }) => (
              <HeaderCell>{name}</HeaderCell>
            ))}
            <HeaderCell>Ações</HeaderCell>
          </Row>
        </Header>
        <Body>
        {customers.map((customer) => (
            <Row key={customer.id}>
              {columns.map(({ path }) => (
                <Cell>
                  <p>{customer[path]}</p>
                </Cell>
              ))}
              <Cell width={5}>
                <Button
                  onClick={() => {
                    setCustomer(customer);
                    handleModal(true);
                  }}
                >
                  <Icon name="pencil" color="orange" /> Editar
                </Button>
                <Button onClick={() => handleDelete(customer)}>
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
