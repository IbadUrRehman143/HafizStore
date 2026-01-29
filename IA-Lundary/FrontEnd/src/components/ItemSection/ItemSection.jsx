import React, { useState } from 'react';
import BillSummary from "../BillSummary/BillSummary";
import ActionBtn from "../ActionBtn/ActionBtn";
import AddCollection from "../AddCollection/AddCollection.jsx";

const ItemSection = ({ formData, t }) => {
  const [basePrices, setBasePrices] = useState({
    "Dc Pedastal 22 inch": 6500,
    "Dc Pedastal 20 inch": 6000,
    "Ac Pedastal 24 inch": 12000,
    "AC/Dc Pedastal 24 inch": 13500,
    "AC/Dc Moon 56 inch": 7500,
    "AC/Dc Wifi 56 inch": 9000,
    "AC/Dc Antiuqe 56 inch": 9500,
    "Bracket Fan 20 inch": 6000,
    "Egzast Fan 12 inch": 3000,
    "Circuit ACDC": 1200
  });

  const [items, setItems] = useState([
    {
      id: Date.now(),
      name: "Dc Pedastal 22 inch",
      service: "Dry Clean",
      quantity: 1,
      price: 6500
    }
  ]);

  const [discount, setDiscount] = useState(0);

  const handleUpdate = (id, field, value) => {
    const updated = items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        const base = basePrices[updatedItem.name] || 0;
        updatedItem.price = updatedItem.service === "Dry Clean" ? base : Math.floor(base / 2);
        return updatedItem;
      }
      return item;
    });
    setItems(updated);
  };

  const addNewRow = () => {
    setItems([
      ...items,
      {
        id: Date.now(),
        name: "Dc Pedastal 22 inch",
        service: "Dry Clean",
        quantity: 1,
        price: 6500
      }
    ]);
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const addItemToDropdown = (newItem) => {
    setBasePrices(prev => ({ ...prev, [newItem.name]: parseInt(newItem.price) }));
    alert(`"${newItem.name}" added successfully`);
  };

  const subTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-4 py-6 overflow-hidden">
      <AddCollection addItemToDropdown={addItemToDropdown} />

      {/* Container: No Table Tags anymore */}
      <div className="mt-4 rounded-2xl border border-slate-200 bg-white shadow-md">
        
        {/* Desktop Header - Hidden on Mobile */}
        <div className="hidden md:grid grid-cols-12 bg-slate-800 text-white text-[10px] font-bold uppercase p-4">
          <div className="col-span-4">Item</div>
          <div className="col-span-3">Service</div>
          <div className="col-span-2 text-center">Qty</div>
          <div className="col-span-2 text-right">Total</div>
          <div className="col-span-1 text-center">❌</div>
        </div>

        {/* Items Rows */}
        <div className="divide-y divide-slate-100">
          {items.map((item) => (
            <div key={item.id} className="p-4 flex flex-col md:grid md:grid-cols-12 md:items-center gap-4">
              
              {/* Item Name */}
              <div className="md:col-span-4">
                <label className="md:hidden text-[10px] font-bold text-slate-400 uppercase mb-1 block">Item Name</label>
                <select
                  value={item.name}
                  onChange={e => handleUpdate(item.id, 'name', e.target.value)}
                  className="w-full bg-slate-50 md:bg-transparent font-bold text-slate-800 outline-none p-2 md:p-0 rounded-lg text-sm"
                >
                  {Object.keys(basePrices).map(name => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
              </div>

              {/* Service */}
              <div className="md:col-span-3">
                <label className="md:hidden text-[10px] font-bold text-slate-400 uppercase mb-1 block">Service</label>
                <select
                  value={item.service}
                  onChange={e => handleUpdate(item.id, 'service', e.target.value)}
                  className="w-full bg-blue-50 text-blue-700 px-3 py-2 md:py-1 rounded-lg text-xs font-bold"
                >
                  <option value="Dry Clean">Dry Clean</option>
                  <option value="Wash">Wash (Half)</option>
                </select>
              </div>

              {/* Qty & Price Row (Side by side on mobile) */}
              <div className="flex items-center justify-between gap-4 md:col-span-4 md:grid md:grid-cols-2">
                <div>
                  <label className="md:hidden text-[10px] font-bold text-slate-400 uppercase mb-1 block">Qty</label>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={e => handleUpdate(item.id, 'quantity', parseInt(e.target.value) || 1)}
                    className="w-20 md:w-16 text-center font-black bg-slate-100 rounded-lg p-2 md:mx-auto"
                  />
                </div>
                <div className="text-right">
                  <label className="md:hidden text-[10px] font-bold text-slate-400 uppercase mb-1 block">Total</label>
                  <span className="font-bold text-blue-700 text-sm">Rs.{item.price * item.quantity}</span>
                </div>
              </div>

              {/* Remove Button */}
              <div className="md:col-span-1 text-right md:text-center mt-2 md:mt-0 border-t md:border-none pt-3 md:pt-0">
                <button 
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 bg-red-50 md:bg-transparent px-4 py-2 md:p-0 rounded-lg text-sm font-bold flex items-center justify-center gap-2 w-full md:w-auto"
                >
                  <span className="md:hidden">Remove</span> 🗑️
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Footer Area */}
        <div className="p-4 bg-slate-50 border-t space-y-4">
          <button
            onClick={addNewRow}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold shadow-lg shadow-blue-200 transition-all"
          >
            + Add More Item
          </button>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200">
            <div className="flex items-center gap-3">
              <span className="font-bold text-slate-500 text-xs">DISCOUNT %</span>
              <input
                type="number"
                value={discount}
                onChange={e => setDiscount(parseInt(e.target.value) || 0)}
                className="w-16 text-center font-black bg-slate-100 rounded-lg p-1 border-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="text-xl font-black text-slate-900">
              Subtotal: Rs.{subTotal}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Components */}
      <BillSummary subTotal={subTotal} discount={discount} />
      <div className="mt-4">
        <ActionBtn
          formData={formData}
          items={items.map(i => ({ name: i.name, qty: i.quantity, price: i.price }))}
          t={t}
        />
      </div>
    </div>
  );
};

export default ItemSection;