import React, { useState } from 'react';
import UserTable from '../components/users/UserTable';
import UserFormModal from '../components/users/UserFormModal';
import { useSelector } from 'react-redux';

const Users = () => {
  const role = useSelector(state => state.auth.user?.role);
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const handleAddUser = () => {
    setEditUser(null);
    setShowModal(true);
  };

  const handleEditUser = (user) => {
    setEditUser(user);
    setShowModal(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Users</h1>
        {role === 'admin' && (
          <button
            onClick={handleAddUser}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            + Add User
          </button>
        )}
      </div>

      <UserTable onEdit={handleEditUser} />

      {showModal && (
        <UserFormModal
          onClose={() => setShowModal(false)}
          user={editUser}
        />
      )}
    </div>
  );
};

export default Users;
