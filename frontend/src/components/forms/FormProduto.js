import React, { useState } from "react";
import { objectOf, any, func } from "prop-types";
import { Form } from "semantic-ui-react";
import { Container } from "./styles";
import api from "../services/api";

const { Input, Button, TextArea } = Form;

const FormProduto = ({ product, afterSubmit }) => {
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
      alert("Erro ao cadastrar/alterar o product");
    }
  };

  return (
    <Container>
      <Form>
        <h2>product</h2>
        <Input
          value={manufacturer}
          label="manufacturer"
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

FormProduto.propTypes = {
  product: objectOf(any),
  afterSubmit: func,
};

FormProduto.defaultProps = {
  product: {},
  afterSubmit: null,
};

export default FormProduto;
