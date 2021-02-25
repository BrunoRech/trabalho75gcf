import React, { useState, useEffect, useCallback } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import CustomerForm from '../../components/forms/CustomerForm';
import { Container, SmallModal as Modal } from '../styles';
import Table from '../../components/layout/Table';
import { CUSTOMERS } from '../../components/layout/Table/headerNames';
import useApi from '../../hooks/useApi';

const Customers = () => {
  const { get, destroy } = useApi();
  const [openModal, handleModal] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState({});

  const loadCustomers = useCallback(async () => {
    const { data } = await get('/customers');
    if (data) {
      setCustomers(data);
    }
  }, [get]);

  useEffect(() => {
    loadCustomers();
  }, [loadCustomers]);

  const handleDelete = async ({ id }) => {
    await destroy(`/customers/${id}`, 'Cliente Deletado com Sucesso!', () =>
      setCustomers(customers.filter(prod => prod.id !== id)),
    );
  };

  const handleEdit = customer => {
    setCustomer(customer);
    handleModal(true);
  };

  return (
    <Container>
      <div>
        <Button onClick={() => handleModal(true)}>Cadastrar</Button>
      </div>

      <Table
        data={customers}
        header={CUSTOMERS}
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
