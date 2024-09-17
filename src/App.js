// src/App.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, deleteItem, updateItem } from './features/itemsSlice';
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

function App() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items.items);
  const [form, setForm] = useState({ id: null, name: '', age: '' });
  const [editMode, setEditMode] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAddItem = () => {
    if (form.name && form.age) {
      dispatch(addItem({ name: form.name, age: form.age }));
      setForm({ id: null, name: '', age: '' });
    }
  };

  const handleEditItem = (item) => {
    setForm(item);
    setEditMode(true);
  };

  const handleUpdateItem = () => {
    dispatch(updateItem(form));
    setForm({ id: null, name: '', age: '' });
    setEditMode(false);
  };

  const handleDeleteItem = (id) => {
    dispatch(deleteItem(id));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>CRUD App with Redux Toolkit & Material UI</h1>

      {/* Form Section */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <TextField
          label="Name"
          name="name"
          value={form.name}
          onChange={handleInputChange}
          variant="outlined"
        />
        <TextField
          label="Age"
          name="age"
          value={form.age}
          onChange={handleInputChange}
          variant="outlined"
        />
        {editMode ? (
          <Button variant="contained" color="primary" onClick={handleUpdateItem}>
            Update
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={handleAddItem}>
            Add
          </Button>
        )}
      </div>

      {/* Table Section */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Serial No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.age}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEditItem(item)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDeleteItem(item.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default App;
