import React, { useState, useEffect, useCallback } from 'react';
import { Icon, Button } from 'semantic-ui-react';
import OrderForm from '../../components/forms/OrderForm';
import { Modal, Container } from '../styles';
import api from '../../components/services/api';
import { ORDERS } from '../../components/layout/Table/headerNames';
import Table from '../../components/layout/Table';

const Orders = () => {
  const [openModal, handleModal] = useState(false);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, selectOrder] = useState({
    customer_id: null,
    products: [],
  });

  const loadOrders = useCallback(async () => {
    try {
      const { data } = await api.get('/orders');
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
    } catch (error) {
      alert('Erro ao buscar pedidos!');
    }
  }, []);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const handleDelete = async ({ id }) => {
    try {
      await api.delete(`/orders/${id}`);
      alert('Sucesso!');
      setOrders(orders.filter(order => order.id !== id));
    } catch (error) {
      alert('Erro ao deletar pedido!');
    }
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
