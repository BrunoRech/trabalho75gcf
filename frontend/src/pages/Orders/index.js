import React, { useState, useEffect, useCallback } from "react";
import { Form, Table, Icon, Button } from "semantic-ui-react";
import OrderForm from "../../components/forms/OrderForm";
import { Modal, Container } from "../styles";
import api from "../../components/services/api";
import { TableButton } from "../../components/forms/styles";

const { Body, Cell, Header, HeaderCell, Row } = Table;

const columns = [
  { name: "Cliente", render: ({ customer }) => customer },
  { name: "Valor da Venda", render: ({ total }) => total },
];

const Orders = ({}) => {
  const [openModal, handleModal] = useState(false);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, selectOrder] = useState({
    customer_id: null,
    products: [],
  });

  const loadOrders = useCallback(async () => {
    try {
      const { data } = await api.get("/orders");
      console.log(data)
      setOrders(
        data.map(({ id, customer, sales, total }) => {
          const products = sales.map(
            ({ discount, price, product, quantity }) => {
              const { description, manufacturer, id } = product || {};
              return {
                id,
                discount: Number(discount),
                price: Number(product?.price),
                quantity: Number(quantity),
                description,
                manufacturer,
              };
            }
          );
          return {
            id,
            customer_id: customer.id,
            customer: customer.name,
            products,
            total,
          };
        })
      );
    } catch (error) {
      console.log(error);
      alert("Erro ao buscar pedidos!");
    }
  }, []);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const handleDelete = async ({ id }) => {
    try {
      await api.delete(`/orders/${id}`);
      alert("Sucesso!");
      setOrders(orders.filter((order) => order.id !== id));
    } catch (error) {
      alert("Erro ao deletar pedido!");
    }
  };

  return (
    <>
      <Container>
        <div>
          <Button onClick={() => handleModal(true)}>Cadastrar</Button>
        </div>
        <Table celled textAlign="center">
          <Header>
            <Row>
              {columns.map(({ name }) => (
                <HeaderCell>{name}</HeaderCell>
              ))}
              <HeaderCell>Ações</HeaderCell>
            </Row>
          </Header>
          <Body>
            {orders.map((order) => (
              <Row key={order.id}>
                {columns.map(({ render }) => (
                  <Cell>
                    <p>{render(order)}</p>
                  </Cell>
                ))}
                <Cell width={5}>
                  <TableButton
                    onClick={() => {
                      selectOrder(order);
                      handleModal(true);
                    }}
                  >
                    <Icon name="pencil" color="orange" /> Editar
                  </TableButton>
                  <TableButton onClick={() => handleDelete(order)}>
                    <Icon name="close" color="red" /> Excluir
                  </TableButton>
                </Cell>
              </Row>
            ))}
          </Body>
        </Table>

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
