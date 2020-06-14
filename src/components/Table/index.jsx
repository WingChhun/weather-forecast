import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import delve from 'dlv';
import styled from 'styled-components';

const TableContainer = styled.table`
  height: 500px;
  overflow-y: scroll;

  width: 100%;
  font-size: 14px;
`;

const TableBody = styled.tbody`
  overflow-y: scroll;
`;

const TableBodyCell = styled.td`
  flex: 1 0 180px;
  width: auto;

  text-align: left;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    flex: 1 0 120px;
    border: 1px solid red;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    flex: 1 0 100px;
    font-size: 12px;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.xs}) {
    flex: 1 0 50px;
    font-size: 10px;
  }
`;

const TableHeader = styled.tr`
  display: flex;
  justify-content: space-between;
  padding-bottom: 15px;
  border-bottom: 1px solid ${(props) => props.theme.colors.gray};
`;

const TableHeaderCell = styled.th`
  flex: 1 0 180px;
  width: auto;
  flex: 1;
  text-align: left;
  font-weight: ${(props) => props.theme.weight.demi};
  padding: 5px;
  align-self: center;
  cursor: default;
  color: ${(props) => props.theme.colors.tertiary};

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    flex: 1 0 120px;
    border: 1px solid red;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    flex: 1 0 100px;
    font-size: 12px;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.xs}) {
    flex: 1 0 50px;
    font-size: 10px;
  }
`;

const TableRow = styled.tr`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px;
  transition: all 0.3s ease;
  border: 2.5px solid transparent;
  border-radius: 15px;

  &:hover {
    transition: all 0.3s ease;

    border: 2.5px solid ${(props) => props.theme.colors.primary};
    cursor: pointer;
    box-shadow: ${(props) => props.theme.colors.primary};
  }
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
          {colRenderer ? colRenderer(colLabel) : colLabel}
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

      <TableBody>{bodyCellsJsx}</TableBody>
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
    //   colLabel: 'Date',
    //   data: [],
    //   colRenderer: (props) => {},
    //   cellRenderer: (props) => {},
    // },
    // minTemp: {
    //   colLabel: 'Min. Temp',
    //   data: [],
    //   colRenderer: (props) => {},
    //   cellRenderer: (props) => {},
    // },
    // maxTemp: {
    //   colLabel: 'Max Temp',
    //   data: [],
    //   colRenderer: (props) => {},
    //   cellRenderer: (props) => {},
    // },
    // description: {
    //   colLabel: 'Description',
    //   data: [],
    //   colRenderer: (props) => {},
    //   cellRenderer: (props) => {},
    // },
  }),
};

export default Table;
