import React, { useState, useEffect, useCallback } from "react";
import { Form, Table, Icon } from "semantic-ui-react";
import OrderForm from "../../components/forms/OrderForm";
import { SmallModal as Modal, Container } from "../styles";
import api from "../../components/services/api";

const { Button } = Form;
const { Body, Cell, Header, HeaderCell, Row } = Table;

const columns = [
  { name: "Cliente", render: ({ customer }) => customer },
  { name: "Venda", render: () => "aa" },
];
const productColumns = [];

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
      console.log(data);
      setOrders(
        data.map(({ id, customer, sales, total }) => {
          const products = sales.map(
            ({ discount, unit_price, product, quantity }) => {
              const { description, manufacturer, id } = product || {};
              return {
                id,
                discount: Number(discount),
                unit_price: Number(unit_price),
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

  const handleDelete = (order) => {};

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
                  <Button
                    onClick={() => {
                      selectOrder(order);
                      handleModal(true);
                    }}
                  >
                    <Icon name="pencil" color="orange" /> Editar
                  </Button>
                  <Button onClick={() => handleDelete(order)}>
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
            selectOrder({});
          }}
          closeOnTriggerMouseLeave
        >
          <OrderForm
            setOrder={selectOrder}
            order={selectedOrder}
            afterSubmit={() => {
              loadOrders();
              handleModal(false);
            }}
          />
        </Modal>
      </Container>
    </>
  );
};

export default Orders;
