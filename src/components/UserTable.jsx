import React, { useState } from "react";
import UserRow from "./UserRow";
import "../styles/UserTable.css"; // Добавим стили для изменения ширины колонок

const UserTable = ({ users, onRowClick }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [columnWidths, setColumnWidths] = useState({});
  const [resizingColumn, setResizingColumn] = useState(null);
  const [initialPos, setInitialPos] = useState(null);

  const sortedUsers = [...users].sort((a, b) => {
    if (sortConfig.key !== null) {
      const { key, direction } = sortConfig;
      const aKey =
        key === "address" ? `${a.address.city} ${a.address.address}` : a[key];
      const bKey =
        key === "address" ? `${b.address.city} ${b.address.address}` : b[key];

      if (aKey < bKey) {
        return direction === "ascending" ? -1 : 1;
      }
      if (aKey > bKey) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    }
    return 0;
  });

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    } else if (
      sortConfig.key === key &&
      sortConfig.direction === "descending"
    ) {
      direction = null;
    }

    setSortConfig({ key: direction ? key : null, direction });
  };

  const handleMouseDown = (key, event) => {
    setResizingColumn(key);
    setInitialPos(event.clientX);
  };

  const handleMouseMove = (event) => {
    if (resizingColumn !== null) {
      const delta = event.clientX - initialPos;
      setColumnWidths((prevWidths) => ({
        ...prevWidths,
        [resizingColumn]: (prevWidths[resizingColumn] || 150) + delta,
      }));
      setInitialPos(event.clientX);
    }
  };

  const handleMouseUp = () => {
    setResizingColumn(null);
  };

  const columns = [
    { key: "firstName", label: "ФИО" },
    { key: "age", label: "Возраст" },
    { key: "gender", label: "Пол" },
    { key: "phone", label: "Номер телефона" },
    { key: "address", label: "Адрес" },
  ];

  return (
    <div onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      <table className="user-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                onClick={() => requestSort(col.key)}
                style={{ width: columnWidths[col.key] || "auto" }}
                onMouseDown={(e) => handleMouseDown(col.key, e)}
              >
                {col.label}
                {sortConfig.key === col.key
                  ? sortConfig.direction === "ascending"
                    ? " 🔼"
                    : " 🔽"
                  : ""}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user) => (
            <UserRow
              key={user.id}
              user={user}
              onClick={() => onRowClick(user)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
