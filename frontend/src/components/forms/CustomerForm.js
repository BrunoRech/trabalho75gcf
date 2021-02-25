import React, { useState } from 'react';
import { Form } from 'semantic-ui-react';
import { Container } from './styles';
import api from '../services/api';

const { Input, Button, Group } = Form;

const CustomerForm = ({ customer: selectedCustomer, afterSubmit }) => {
  const [customer, setCustomer] = useState(selectedCustomer);

  const handleSubmit = async () => {
    try {
      const { id } = customer;
      if (id) {
        await api.put(`/customers/${id}`, customer);
      } else {
        await api.post('/customers', customer);
      }
      alert('Sucesso!');
      if (afterSubmit) afterSubmit();
    } catch (error) {
      alert('Erro ao cadastrar/alterar o cliente');
    }
  };

  return (
    <Container>
      <Form>
        <h2>Cliente</h2>
        <Input
          value={customer.name}
          label="Nome"
          type="text"
          onChange={({ target }) =>
            setCustomer({ ...customer, name: target.value })
          }
        />
        <Group>
          <Input
            value={customer.discount}
            label="Desconto"
            type="number"
            onChange={({ target }) =>
              setCustomer({ ...customer, discount: target.value })
            }
          />
          <Input
            value={customer.address}
            label="Logradouro"
            type="text"
            onChange={({ target }) =>
              setCustomer({ ...customer, address: target.value })
            }
          />
        </Group>
        <Group>
          <Input
            value={customer.cpf}
            label="CPF"
            type="number"
            onChange={({ target }) =>
              setCustomer({ ...customer, cpf: target.value })
            }
          />
          <Input
            value={customer.state}
            label="Estado"
            type="text"
            onChange={({ target }) =>
              setCustomer({ ...customer, state: target.value })
            }
          />
        </Group>
        <Group>
          <Input
            value={customer.district}
            label="Bairro"
            type="text"
            onChange={({ target }) =>
              setCustomer({ ...customer, district: target.value })
            }
          />
          <Input
            value={customer.city}
            label="Cidade"
            type="text"
            onChange={({ target }) =>
              setCustomer({ ...customer, city: target.value })
            }
          />
        </Group>
        <Group>
          <Input
            value={customer.number}
            label="Número"
            type="number"
            onChange={({ target }) =>
              setCustomer({ ...customer, number: target.value })
            }
          />
          <Input
            value={customer.cep}
            label="CEP"
            type="number"
            onChange={({ target }) =>
              setCustomer({ ...customer, cep: target.value })
            }
          />
        </Group>

        <Button onClick={handleSubmit} primary fluid>
          Salvar
        </Button>
      </Form>
    </Container>
  );
};

export default CustomerForm;
