import React, { useMemo } from 'react';
import PropTypes, { checkPropTypes } from 'prop-types';
import delve from 'dlv';
import styled from 'styled-components';

const TableContainer = styled.table``;

const TableBody = styled.div``;

const TableBodyCell = styled.td`
  min-width: 150px;
  flex: 1;
`;

const TableHeader = styled.tr`
  display: flex;
  justify-content: space-between;
`;

const TableHeaderCell = styled.th`
  min-width: 150px;
  flex: 1;
`;

const TableRow = styled.tr`
  border: 1px solid red;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px;
`;
const Table = (props) => {
  const { columns, cellCount, ...restProps } = props;

  const { columnCells, bodyCells } = useMemo(() => {
    /* Checks for label and colRenderer overrides */
    const columnCells =
      Object.keys(columns).length &&
      Object.keys(columns).reduce((obj, key) => {
        return Object.assign(obj, {
          [key]: {
            colLabel: delve(columns, `${key}.colLabel`, key),
            colRenderer: delve(columns, `${key}.colRenderer`),
          },
        });
      }, {});

    // Checks for data and cellRenderer overrides
    const bodyCells =
      Object.keys(columns).length &&
      Object.keys(columns).reduce((obj, key) => {
        return Object.assign(obj, {
          [key]: {
            cellData: delve(columns, `${key}.data`, []),
            cellRenderer: delve(columns, `${key}.cellRenderer`),
          },
        });
      }, {});

    return {
      columnCells,
      bodyCells,
    };
  }, [columns]);

  /**
   * Builds Columns JSX
   *
   * Defaulted Table styling is not great; use overrides for custom behavior
   * */
  const columnCellsJsx = useMemo(() => {
    if (!columnCells) {
      return null;
    }
    return Object.values(columnCells).map(({ colRenderer, colLabel }, id) => {
      const reactKey = `${colLabel}_col_${id}`;

      return (
        <TableHeaderCell key={reactKey}>
          {colRenderer ? colRenderer({ colRenderer, colLabel }) : colLabel}
        </TableHeaderCell>
      );
    });
  }, [columnCells]);

  /**
   * Builds Cell JSX
   *
   * Defaulted Table Styling is not great;  use overrides for custom behavior
   */
  const bodyCellsJsx = useMemo(() => {
    if (!bodyCells) {
      return null;
    }

    const bodyCellsArr = Object.values(bodyCells);
    const jsx = [];

    /* Accumulate table row jsx */
    for (let i = 0; i < cellCount; i++) {
      const reactKey = `table_cell_${i}`;

      /* eslint-disable */
      /* Create a TableBody Cell for the indexed position */
      const cellContent = bodyCellsArr.reduce((arr, { cellData, cellRenderer }) => {
        const cell = (
          <TableBodyCell>
            {cellRenderer
              ? cellRenderer({
                  cellData: cellData[i],
                  index: i,
                })
              : cellData[i]}
          </TableBodyCell>
        );

        arr.push(cell);

        return arr;
      }, []);

      /* eslint-enable */

      jsx.push(
        <>
          <TableRow key={reactKey}>{cellContent}</TableRow>
        </>,
      );
    }

    return jsx;
  }, [bodyCells, cellCount]);

  return (
    <TableContainer {...restProps}>
      <TableHeader>{columnCellsJsx}</TableHeader>
      <tbody>{bodyCellsJsx}</tbody>
    </TableContainer>
  );
};

Table.defaultProps = {
  columns: {},
  rowRenderer: () => {},
};

Table.propTypes = {
  rowRenderer: PropTypes.func,
  cellCount: PropTypes.number.isRequired,
  columns: PropTypes.shape({
    // date: {
    //   headerValue: 'Date',
    //   data: [],
    //   headerRenderer: (props) => {},
    //   cellRenderer: (props) => {},
    // },
    // minTemp: {
    //   columnLabel: 'Min. Temp',
    //   data: [],
    //   headerRenderer: (props) => {},
    //   cellRenderer: (props) => {},
    // },
    // maxTemp: {
    //   columnLabel: 'Max Temp',
    //   data: [],
    //   headerRenderer: (props) => {},
    //   cellRenderer: (props) => {},
    // },
    // description: {
    //   columnLabel: 'Description',
    //   data: [],
    //   headerRenderer: (props) => {},
    //   cellRenderer: (props) => {},
    // },
  }),
};

export default Table;
