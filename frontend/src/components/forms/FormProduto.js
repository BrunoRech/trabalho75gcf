import React, { useState } from "react";
import { objectOf, any } from "prop-types";
import { Form, Button, Input, TextArea } from "semantic-ui-react";

const FormProduto = ({ produto }) => {
  const [fabricante, setFabricante] = useState("");
  const [descricao, setDescricao] = useState("");

  const handleSubmit = () => {};

  return (
    <>
      <Form>
        <Input
          value={fabricante}
          label="Fabricante"
          type="text"
          onChange={({ target }) => setFabricante(target.value)}
        />
        <TextArea
          value={descricao}
          label="Descrição"
          type="text"
          onChange={({ target }) => setDescricao(target.value)}
        />
        <Button onClick={handleSubmit} primary>
          Cadastrar
        </Button>
      </Form>
    </>
  );
};

FormProduto.propTypes = {
  produto: objectOf(any),
};

FormProduto.defaultProps = {
  produto: {},
};

export default FormProduto;
