import React from "react";

const UserModal = ({ user, onClose }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
        padding: "20px",
        zIndex: 1000,
        width: "400px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2>
        {user.firstName} {user.lastName}
      </h2>
      <p>Возраст: {user.age}</p>
      <p>Пол: {user.gender}</p>
      <p>
        Адрес: {user.address.city}, {user.address.address}
      </p>
      <p>Рост: {user.height} см</p>
      <p>Вес: {user.weight} кг</p>
      <p>Телефон: {user.phone}</p>
      <p>Email: {user.email}</p>
      <button onClick={onClose}>Закрыть</button>
    </div>
  );
};

export default UserModal;
