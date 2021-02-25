import React, { useState } from 'react';
import { Form } from 'semantic-ui-react';
import { Container } from './styles';
import useApi from '../../hooks/useApi';

const { Input, Button, Group } = Form;

const CustomerForm = ({ customer: selectedCustomer, afterSubmit }) => {
  const [customer, setCustomer] = useState(selectedCustomer);
  const { put, post } = useApi();

  const handleSubmit = async () => {
    const { id } = customer;
    let response;
    if (id) {
      response = await put(
        `/customers/${id}`,
        customer,
        selectedCustomer,
        'Cliente Alterado com Sucesso!',
      );
    } else {
      response = await post(
        '/customers',
        customer,
        'Cliente Criado com Sucesso!',
      );
    }
    if (afterSubmit && response.data) afterSubmit();
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
