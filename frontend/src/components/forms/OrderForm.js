import React, { useState, useEffect } from "react";
import api from "../services/api";
import { Form, Table, Icon } from "semantic-ui-react";
import { Container } from "./styles";

const { Input, Button, Select, Group } = Form;
const { Body, Cell, Header, HeaderCell, Row } = Table;

const columns = [
  { name: "Produto", path: "description" },
  { name: "Preço Unitário", path: "unit_price" },
  { name: "Quantidade", path: "quantity" },
  { name: "Desconto", path: "discount" },
];

const OrderForm = ({ afterSubmit, order, setOrder }) => {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orderProduct, setOrderProduct] = useState(null);
  const [selectedProduct, selectProduct] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const { data } = await api.get("/customers");
        setCustomers(
          data.map(({ id, name }) => {
            return { key: id, value: id, text: name };
          })
        );
      } catch (error) {
        alert("Erro ao buscar por clientes");
      }
    };

    const fetchProducts = async () => {
      try {
        const { data } = await api.get("/products");
        setProducts(
          data.map((product) => {
            const { id, description } = product;
            return { key: id, value: product, text: description };
          })
        );
      } catch (error) {
        alert("Erro ao buscar por produtos");
      }
    };
    fetchCustomers();
    fetchProducts();
  }, []);

  const addProduct = () => {
    const { id, description } = selectedProduct;
    setOrder({
      ...order,
      products: [...order.products, { ...orderProduct, id, description }],
    });
    selectProduct(null);
    setOrderProduct(null);
  };

  const handleSubmit = async () => {
    try {
      const { id } = order;
      if (id) {
        await api.put(`/orders/${id}`, order);
      } else {
        await api.post("/orders", order);
      }
      alert("Sucesso!");
      if (afterSubmit) afterSubmit();
    } catch (error) {
      alert("Erro ao cadastrar/alterar o pedido");
    }
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
          }}
        />
        <Select
          options={products}
          label="Produto"
          value={selectedProduct}
          onChange={(event, { value }) => selectProduct(value)}
        />
        <Group>
          <Input
            label="Preço unitário"
            value={orderProduct?.unit_price || ""}
            onChange={({ target }) =>
              setOrderProduct({ ...orderProduct, unit_price: target.value })
            }
          />
          <Input
            type="number"
            label="Quantidade"
            value={orderProduct?.quantity || ""}
            onChange={({ target }) =>
              setOrderProduct({ ...orderProduct, quantity: target.value })
            }
          />
        </Group>
        <Group>
          <Input
            type="number"
            label="Desconto"
            value={orderProduct?.discount || ""}
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
        <Table>
          <Header>
            <Row>
              {columns?.map(({ name }) => (
                <HeaderCell>{name}</HeaderCell>
              ))}
              <HeaderCell>Excluir</HeaderCell>
            </Row>
          </Header>
          <Body>
            {order?.products?.map((product) => (
              <Row>
                {columns?.map(({ path }) => (
                  <Cell>
                    <p>{product[path]}</p>
                  </Cell>
                ))}
                <Cell>
                  <Button
                    onClick={() => {
                      setOrder({
                        ...order,
                        products: order.products.filter(
                          ({ id }) => product.id !== id
                        ),
                      });
                    }}
                  >
                    <Icon name="close" color="red" />
                  </Button>
                </Cell>
              </Row>
            ))}
          </Body>
        </Table>
        <Button primary fluid onClick={handleSubmit}>
          Cadastrar
        </Button>
      </Form>
    </Container>
  );
};

export default OrderForm;
