import React, { useState } from 'react';
import { Form } from 'semantic-ui-react';
import useApi from '../../hooks/useApi';
import { Container } from './styles';

const { Input, Button, TextArea } = Form;

const ProductForm = ({ product, afterSubmit }) => {
  const { put, post } = useApi();
  const [manufacturer, setManufacturer] = useState(product.manufacturer);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);

  const handleSubmit = async () => {
    const productSubmit = { manufacturer, description, price };
    const { id } = product;
    let response;
    if (id) {
      response = await put(
        `/products/${id}`,
        productSubmit,
        'Produto Alterado com Sucesso!',
      );
    } else {
      response = await post(
        '/products',
        productSubmit,
        'Produto Criado com Sucesso!',
      );
    }

    if (afterSubmit && response.data) afterSubmit();
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

export default ProductForm;
