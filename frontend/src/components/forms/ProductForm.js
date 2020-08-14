import React, { useState } from "react";
import { objectOf, any, func } from "prop-types";
import { Form } from "semantic-ui-react";
import { Container } from "./styles";
import api from "../services/api";

const { Input, Button, TextArea } = Form;

const ProductForm = ({ product, afterSubmit }) => {
  const [manufacturer, setManufacturer] = useState(product.manufacturer);
  const [description, setDescription] = useState(product.description);

  const handleSubmit = async () => {
    try {
      const { id } = product;
      if (id) {
        await api.put(`/products/${id}`, { manufacturer, description });
      } else {
        await api.post("/products", { manufacturer, description });
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
        <TextArea
          value={description}
          label="Descrição"
          type="text"
          onChange={({ target }) => setDescription(target.value)}
        />
        <Button onClick={handleSubmit} primary fluid>
          Cadastrar
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
