import React, { useState } from "react";
import { objectOf, any, func } from "prop-types";
import { Form } from "semantic-ui-react";
import { Container } from "./styles";
import api from "../services/api";

const { Input, Button, TextArea } = Form;

const ProductForm = ({ product, afterSubmit }) => {
  const [manufacturer, setManufacturer] = useState(product.manufacturer);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);

  const handleSubmit = async () => {
    try {
      const productSubmit = {manufacturer, description, price}
      const { id } = product;
      if (id) {
        await api.put(`/products/${id}`, productSubmit);
      } else {
        await api.post("/products", productSubmit);
      }
      alert("Sucesso!");
      if (afterSubmit) afterSubmit();
    } catch (error) {
      alert("Erro ao cadastrar/alterar o produto");
    }
  };

  return (
    <Container>
      <Form>
        <h2>Produto</h2>
        <Input
          value={manufacturer}
          label="Fabricante"
          type="text"
          onChange={({ target }) => setManufacturer(target.value)}
        />
        <Input
          value={price}
          label="Preço"
          type="number"
          onChange={({ target }) => setPrice(target.value)}
        />
        <TextArea
          value={description}
          label="Descrição"
          type="text"
          onChange={({ target }) => setDescription(target.value)}
        />
        <Button onClick={handleSubmit} primary fluid>
          Salvar
        </Button>
      </Form>
    </Container>
  );
};

ProductForm.propTypes = {
  product: objectOf(any),
  afterSubmit: func,
};

ProductForm.defaultProps = {
  product: {},
  afterSubmit: null,
};

export default ProductForm;
