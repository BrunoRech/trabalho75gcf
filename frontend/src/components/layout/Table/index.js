import React from 'react';
import { Table as SemanticTable } from 'semantic-ui-react';
import { getColumns } from './functions';
import { TableButton } from './styles';

const { Header, Row, HeaderCell, Cell, Body } = SemanticTable;

const Table = ({ data, header, actions }) => {
  const columns = getColumns(header);

  return (
    <SemanticTable celled textAlign="center" compact>
      <Header>
        <Row>
          {columns.map(({ name }) => (
            <HeaderCell>{name}</HeaderCell>
          ))}
          {actions?.length > 0 && <HeaderCell>Ações</HeaderCell>}
        </Row>
      </Header>
      <Body>
        {data.map(item => (
          <Row key={item.id}>
            {columns.map(({ path, render }) => (
              <Cell>
                <p>{render?.(item[path] ?? {}) ?? item[path]}</p>
              </Cell>
            ))}
            {actions?.length > 0 && (
              <Cell width={5}>
                {actions.map(({ icon, label, onClick }) => (
                  <TableButton onClick={() => onClick(item)}>
                    {icon} {label}
                  </TableButton>
                ))}
              </Cell>
            )}
          </Row>
        ))}
      </Body>
    </SemanticTable>
  );
};

export default Table;
