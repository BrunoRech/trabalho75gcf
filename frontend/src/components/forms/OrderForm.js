import React, { useState, useEffect } from 'react';
import { Form, Icon } from 'semantic-ui-react';
import { ORDER_PRODUCTS } from '../layout/Table/headerNames';
import useApi from '../../hooks/useApi';
import { Container } from './styles';
import Table from '../layout/Table';

const { Input, Button, Select, Group } = Form;

const OrderForm = ({ afterSubmit, order, setOrder }) => {
  const { get, post, put } = useApi();
  const [customers, setCustomers] = useState([]);
  const [customersList, setCustomersList] = useState([]);
  const [products, setProducts] = useState([]);
  const [orderProduct, setOrderProduct] = useState(null);
  const [selectedProduct, selectProduct] = useState(null);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    const fetchCustomers = async () => {
      const { data } = await get('/customers');
      if (data) {
        setCustomersList(data);
        setCustomers(
          data.map(({ id, name }) => {
            return { key: id, value: id, text: name };
          }),
        );
      }
    };

    const fetchProducts = async () => {
      const { data } = await get('/products');
      if (data) {
        setProducts(
          data.map(product => {
            const { id, description } = product;
            return { key: id, value: product, text: description };
          }),
        );
      }
    };
    fetchCustomers();
    fetchProducts();
  }, [get]);

  const addProduct = () => {
    const { id, description, price } = selectedProduct;

    if (order?.products.find(({ id: productId }) => productId === id)) {
      return alert('Esse produto já está na lista!');
    }

    setOrder({
      ...order,
      products: [
        ...order.products,
        { ...orderProduct, id, description, discount, price },
      ],
    });
    selectProduct(null);
    return setOrderProduct(null);
  };

  const handleSubmit = async () => {
    let response;
    const { id } = order || {};
    if (id) {
      response = await put(
        `/orders/${id}`,
        order,
        'Pedido Alterado com Sucesso!',
      );
    } else {
      response = await post('/orders', order, 'Pedido Criado com Sucesso!');
    }

    if (afterSubmit && response.data) afterSubmit();
  };

  const handleTableDelete = product => {
    setOrder({
      ...order,
      products: order.products.filter(({ id }) => product.id !== id),
    });
  };

  return (
    <Container>
      <Form>
        <Select
          options={customers}
          label="Cliente"
          value={order.customer_id}
          onChange={(event, { value }) => {
            setOrder({ ...order, customer_id: value });
            setDiscount(customersList.find(({ id }) => id === value)?.discount);
          }}
        />
        <Select
          options={products}
          label="Produto"
          value={selectedProduct}
          onChange={(event, { value }) => {
            selectProduct(value);
          }}
        />
        <Group>
          <Input
            type="number"
            label="Preço unitário"
            value={selectedProduct?.price || ''}
            onChange={({ target }) =>
              setOrderProduct({ ...orderProduct, price: target.value })
            }
          />
          <Input
            type="number"
            label="Quantidade"
            value={orderProduct?.quantity || ''}
            onChange={({ target }) =>
              setOrderProduct({ ...orderProduct, quantity: target.value })
            }
          />
        </Group>
        <Group>
          <Input
            type="number"
            label="Desconto"
            value={discount}
            onChange={({ target }) =>
              setOrderProduct({ ...orderProduct, discount: target.value })
            }
          />
          <Button
            label="Adicionar na lista do pedido"
            fluid
            onClick={addProduct}
          >
            Adicionar
          </Button>
        </Group>

        <Table
          data={order?.products}
          header={ORDER_PRODUCTS}
          actions={[
            {
              label: 'Excluir',
              icon: <Icon name="close" color="red" />,
              onClick: handleTableDelete,
            },
          ]}
        />

        <Button primary fluid onClick={handleSubmit}>
          Salvar
        </Button>
      </Form>
    </Container>
  );
};

export default OrderForm;
