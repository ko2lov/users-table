import React, { useState, useEffect } from "react";
import { fetchUsers } from "./services/api";
import UserTable from "./components/UserTable";
import SearchInput from "./components/SearchInput";
import UserModal from "./components/UserModal";
import "./index.css";

const App = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const usersData = await fetchUsers();
        setUsers(usersData);
        setFilteredUsers(usersData);
      } catch (error) {
        setError(error.message);
      }
    };
    loadUsers();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term) {
      const filtered = users.filter(
        (user) =>
          `${user.firstName} ${user.lastName}`
            .toLowerCase()
            .includes(term.toLowerCase()) ||
          user.age.toString().includes(term) ||
          user.gender.toLowerCase().includes(term.toLowerCase()) ||
          user.phone.toLowerCase().includes(term.toLowerCase()) ||
          user.address.city.toLowerCase().includes(term.toLowerCase()) ||
          user.address.address.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  };

  const handleRowClick = (user) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  return (
    <div className="app-container">
      <SearchInput onSearch={handleSearch} />
      {error && <p>{error}</p>}
      <div className="table-container">
        <UserTable users={filteredUsers} onRowClick={handleRowClick} />
      </div>
      {selectedUser && (
        <UserModal user={selectedUser} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default App;
