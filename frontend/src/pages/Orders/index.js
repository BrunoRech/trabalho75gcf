import React, { useState, useEffect, useCallback } from 'react';
import { Icon, Button } from 'semantic-ui-react';
import OrderForm from '../../components/forms/OrderForm';
import { Modal, Container } from '../styles';
import { ORDERS } from '../../components/layout/Table/headerNames';
import Table from '../../components/layout/Table';
import useApi from '../../hooks/useApi';

const Orders = () => {
  const { get, destroy } = useApi();
  const [openModal, handleModal] = useState(false);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, selectOrder] = useState({
    customer_id: null,
    products: [],
  });

  const loadOrders = useCallback(async () => {
    const { data } = await get('/orders');
    if (data) {
      setOrders(
        data.map(({ id, customer, sales, total }) => {
          const products = sales.map(({ discount, product, quantity }) => {
            const { description, manufacturer, id } = product || {};
            return {
              id,
              discount: Number(discount),
              price: Number(product?.price),
              quantity: Number(quantity),
              description,
              manufacturer,
            };
          });
          return {
            id,
            customer_id: customer.id,
            customer: customer.name,
            products,
            total,
          };
        }),
      );
    }
  }, [get]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const handleDelete = async ({ id }) => {
    await destroy(`/orders/${id}`, 'Pedido Deletado com Sucesso!', () =>
      setOrders(orders.filter(order => order.id !== id)),
    );
  };

  const handleEdit = order => {
    selectOrder(order);
    handleModal(true);
  };

  return (
    <>
      <Container>
        <div>
          <Button onClick={() => handleModal(true)}>Cadastrar</Button>
        </div>

        <Table
          data={orders}
          header={ORDERS}
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
            selectOrder({ products: [] });
          }}
          closeOnTriggerMouseLeave
        >
          <OrderForm
            setOrder={selectOrder}
            order={selectedOrder}
            afterSubmit={() => {
              loadOrders();
              selectOrder({ products: [] });
              handleModal(false);
            }}
          />
        </Modal>
      </Container>
    </>
  );
};

export default Orders;
