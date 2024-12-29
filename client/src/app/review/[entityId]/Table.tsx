import classNames from "classnames";
import Mousetrap from "mousetrap";
import {
  createContext,
  memo,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import styles from "./Table.module.css";

export type TableContext = {
  renderFns: Array<(value: string) => ReactNode>;
  data: string[][];
  state: {
    cursor: { row: number; column: number };
    editing: boolean;
  };
  mutations: {
    adjustCursor: (adjustment: {
      rowAdjust: number;
      columnAdjust: number;
    }) => void;
    setCursor: (cursor: { row: number; column: number }) => void;
    startEditing: (row: number, column: number) => void;
    stopEditing: () => void;
  };
};

const Context = createContext<TableContext | null>(null);

// export const useTableContext = (): TableContext => {
//   const context = useContext(Context);

//   if (context === null) {
//     throw new Error("useTableData must be used within a TableProvider tag");
//   }

//   return context;
// };

const useTableRows = () => {
  const context = useContext(Context);

  if (context === null) {
    throw new Error("useTableRows must be used within a TableProvider tag");
  }

  return context.data.length;
};

const useTableRow = (rowNumber: number) => {
  const context = useContext(Context);

  if (context === null) {
    throw new Error("useTableRow must be used within a TableProvider tag");
  }

  return context.data[rowNumber];
};

const useCursor = () => {
  const context = useContext(Context);

  if (context === null) {
    throw new Error("useCursor must be used within a TableProvider tag");
  }

  return context.state.cursor;
};

const useTableCell = (rowNumber: number, columnNumber: number) => {
  const context = useContext(Context);

  if (context === null) {
    throw new Error("useTableCell must be used within a TableProvider tag");
  }

  const { cursor, editing } = context.state;

  return {
    renderFn: context.renderFns[columnNumber],
    value: context.data[rowNumber][columnNumber],
    isSelected: cursor.row === rowNumber && cursor.column === columnNumber,
    isEditing:
      editing && cursor.row === rowNumber && cursor.column === columnNumber,
  };
};

export const TableProvider = ({
  data,
  renderFns,
  children,
}: {
  data: TableContext["data"];
  renderFns: TableContext["renderFns"];
  children?: ReactNode;
}) => {
  const [cursor, setCursor] = useState({ row: 0, column: 0 });
  const [editing, setEditing] = useState(false);

  // Stable mutations object
  const mutations = useMemo(
    () => ({
      setCursor: (newCursor: { row: number; column: number }) => {
        setCursor(newCursor);
      },
      adjustCursor: ({
        rowAdjust,
        columnAdjust,
      }: {
        rowAdjust: number;
        columnAdjust: number;
      }) => {
        setCursor((prev) => ({
          row: Math.max(0, Math.min(prev.row + rowAdjust, data.length - 1)),
          column: Math.max(
            0,
            Math.min(prev.column + columnAdjust, data[0]?.length - 1 || 0),
          ),
        }));
      },
      startEditing: (row: number, column: number) => {
        setEditing(true);
        setCursor({ row, column });
      },
      stopEditing: () => {
        setEditing(false);
      },
    }),
    [data],
  );

  // Provide stable context value
  const contextValue = useMemo(
    () => ({
      data,
      renderFns,
      state: { cursor, editing },
      mutations,
    }),
    [data, renderFns, cursor, editing, mutations],
  );

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

const useAdjustCursor = () => {
  const context = useContext(Context);

  if (context === null) {
    throw new Error("useAdjustCursor must be used within a TableProvider tag");
  }

  return context.mutations.adjustCursor;
};

const useSetCursor = () => {
  const context = useContext(Context);

  if (context === null) {
    throw new Error("useSetCursor must be used within a TableProvider tag");
  }

  return context.mutations.setCursor;
};

const useStartEditing = () => {
  const context = useContext(Context);

  if (context === null) {
    throw new Error("useStartEditing must be used within a TableProvider tag");
  }

  return context.mutations.startEditing;
};

const useStopEditing = () => {
  const context = useContext(Context);

  if (context === null) {
    throw new Error("useStopEditing must be used within a TableProvider tag");
  }

  return context.mutations.stopEditing;
};

export const TableCell = memo(
  ({
    rowNumber,
    columnNumber,
  }: {
    rowNumber: number;
    columnNumber: number;
  }) => {
    const setCursor = useSetCursor();
    const { renderFn, value, isSelected, isEditing } = useTableCell(
      rowNumber,
      columnNumber,
    );

    const handleClick = useCallback(() => {
      setCursor({ row: rowNumber, column: columnNumber });
    }, [setCursor, rowNumber, columnNumber]);

    return (
      <td
        onClick={handleClick}
        className={classNames({
          [styles.regularCell]: !isSelected && !isEditing,
          [styles.selectedCell]: isSelected,
          [styles.editingCell]: isEditing,
        })}
      >
        {renderFn(value)}
      </td>
    );
  },
  (prevProps, nextProps) => {
    // Only re-render if row or column numbers change
    return (
      prevProps.rowNumber === nextProps.rowNumber &&
      prevProps.columnNumber === nextProps.columnNumber
    );
  },
);
TableCell.displayName = "TableCell";

export const TableRow = memo(({ rowNumber }: { rowNumber: number }) => {
  const row = useTableRow(rowNumber);

  if (!row) {
    return null;
  }

  return (
    <tr>
      {row.map((_row, index) => (
        <TableCell key={index} rowNumber={rowNumber} columnNumber={index} />
      ))}
    </tr>
  );
});

export const Table = () => {
  const adjustCursor = useAdjustCursor();
  const startEditing = useStartEditing();
  const stopEditing = useStopEditing();
  const rows = useTableRows();
  const cursor = useCursor();

  useEffect(() => {
    const handleKey = (event: KeyboardEvent, callback: () => void) => {
      event.preventDefault(); // Prevent default page scroll behavior
      callback();
    };

    Mousetrap.bind("up", (event) =>
      handleKey(event, () => adjustCursor({ rowAdjust: -1, columnAdjust: 0 })),
    );
    Mousetrap.bind("down", (event) =>
      handleKey(event, () => adjustCursor({ rowAdjust: 1, columnAdjust: 0 })),
    );
    Mousetrap.bind("left", (event) =>
      handleKey(event, () => adjustCursor({ rowAdjust: 0, columnAdjust: -1 })),
    );
    Mousetrap.bind("right", (event) =>
      handleKey(event, () => adjustCursor({ rowAdjust: 0, columnAdjust: 1 })),
    );
    Mousetrap.bind("enter", (event) =>
      handleKey(event, () => startEditing(cursor.row, cursor.column)),
    );
    Mousetrap.bind("escape", (event) => handleKey(event, () => stopEditing()));

    return () => {
      Mousetrap.unbind(["up", "down", "left", "right", "enter", "escape"]);
    };
  }, [adjustCursor, startEditing, stopEditing, cursor]);

  const rowsContent = useMemo(() => {
    return Array.from({ length: rows }, (_, index) => (
      <TableRow key={index} rowNumber={index} />
    ));
  }, [rows]);

  return (
    <table>
      <tbody>{rowsContent}</tbody>
    </table>
  );
};

TableRow.displayName = "TableRow";
