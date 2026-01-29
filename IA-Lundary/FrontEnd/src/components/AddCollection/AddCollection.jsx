import React, { useState } from 'react';

const AddCollection = ({ addItemToDropdown, apiEndpoint }) => {
  const [newItem, setNewItem] = useState({ name: '', price: '' });
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.price) {
      return alert("Name and price required!");
    }

    // 1️⃣ Update Front-End dropdown
    addItemToDropdown(newItem);

    // 2️⃣ Send to Back-End
    try {
      await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem),
      });
      alert("Item added successfully!");
      setNewItem({ name: '', price: '' });
      setShowForm(false);
    } catch (err) {
      console.error(err);
      alert("Error adding item to server.");
    }
  };

  return (
    <div className="my-4">
      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl font-bold"
      >
        {showForm ? "Cancel" : "Add New Collection"}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="mt-3 flex flex-col gap-2">
          <input
            type="text"
            placeholder="Item Name"
            value={newItem.name}
            onChange={e => setNewItem({ ...newItem, name: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Price"
            value={newItem.price}
            onChange={e => setNewItem({ ...newItem, price: parseInt(e.target.value) || '' })}
            className="p-2 border rounded"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-bold"
          >
            Add Item
          </button>
        </form>
      )}
    </div>
  );
};

export default AddCollection;
