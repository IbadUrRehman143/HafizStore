import React, { useState } from 'react';
import BillSummary from "../BillSummary/BillSummary";
import ActionBtn from "../ActionBtn/ActionBtn";
import AddCollection from "../AddCollection/AddCollection.jsx";

const ItemSection = ({ formData, t }) => {

  const basePrices = {
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
  };

  const [items, setItems] = useState([
    {
      id: Date.now(),
      name: "Dc Pedastal 22 inch",
      service: "Dry Clean",
      quantity: 1,
      price: basePrices["Dc Pedastal 22 inch"]
    }
  ]);

  const [discount, setDiscount] = useState(0);

  const handleUpdate = (id, field, value) => {
    const updated = items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        const base = basePrices[updatedItem.name] || 0;
        updatedItem.price =
          updatedItem.service === "Dry Clean"
            ? base
            : Math.floor(base / 2);
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
        price: basePrices["Dc Pedastal 22 inch"]
      }
    ]);
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const addItemToDropdown = (newItem) => {
    basePrices[newItem.name] = parseInt(newItem.price);
    alert(`"${newItem.name}" added successfully`);
  };

  const subTotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const grandTotal = subTotal - (subTotal * discount) / 100;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">

      {/* Add New Collection */}
      <AddCollection addItemToDropdown={addItemToDropdown} />

      {/* ===== TABLE ===== */}
      <div className="mt-4 rounded-2xl border border-slate-200 bg-white shadow-md">

        {/* MOBILE FIX */}
        <div className="overflow-x-auto w-full">
          <table className="min-w-212.5 w-full border-collapse">

            <thead className="bg-slate-800 text-white text-[10px] sm:text-xs font-bold uppercase">
              <tr>
                <th className="px-2 sm:px-6 py-2">Item</th>
                <th className="px-2 sm:px-6 py-2">Service</th>
                <th className="px-2 sm:px-6 py-2 text-center">Qty</th>
                <th className="px-2 sm:px-6 py-2 text-right">Unit</th>
                <th className="px-2 sm:px-6 py-2 text-right">Total</th>
                <th className="px-2 sm:px-6 py-2 text-center">❌</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {items.map(item => (
                <tr key={item.id} className="hover:bg-slate-50">

                  <td className="px-2 sm:px-6 py-2 text-xs sm:text-sm">
                    <select
                      value={item.name}
                      onChange={e => handleUpdate(item.id, 'name', e.target.value)}
                      className="w-50 sm:w-full bg-transparent font-semibold outline-none"
                    >
                      {Object.keys(basePrices).map(name => (
                        <option key={name} value={name}>
                          {name} (Rs.{basePrices[name]})
                        </option>
                      ))}
                    </select>
                  </td>

                  <td className="px-2 sm:px-6 py-2">
                    <select
                      value={item.service}
                      onChange={e => handleUpdate(item.id, 'service', e.target.value)}
                      className="bg-blue-100 px-2 py-1 rounded text-[10px] sm:text-xs font-bold"
                    >
                      <option value="Dry Clean">Dry Clean</option>
                      <option value="Wash">Wash (Half)</option>
                    </select>
                  </td>

                  <td className="px-2 sm:px-6 py-2 text-center">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={e =>
                        handleUpdate(
                          item.id,
                          'quantity',
                          parseInt(e.target.value) || 1
                        )
                      }
                      className="w-12 sm:w-16 text-center text-xs sm:text-sm font-bold bg-slate-100 rounded"
                    />
                  </td>

                  <td className="px-2 sm:px-6 py-2 text-right text-xs sm:text-sm">
                    Rs.{item.price}
                  </td>

                  <td className="px-2 sm:px-6 py-2 text-right font-bold text-blue-700 text-xs sm:text-sm">
                    Rs.{item.price * item.quantity}
                  </td>

                  <td className="px-2 sm:px-6 py-2 text-center">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500"
                    >
                      🗑️
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* FOOTER */}
        <div className="p-4 bg-slate-50 flex flex-col lg:flex-row justify-between gap-4">

          <button
            onClick={addNewRow}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-bold"
          >
            + Add More Item
          </button>

          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-600">Discount %</span>
            <input
              type="number"
              value={discount}
              onChange={e => setDiscount(parseInt(e.target.value) || 0)}
              className="w-20 text-center font-bold bg-slate-100 rounded"
            />
          </div>

          <div className="font-black text-lg">
            Subtotal: Rs.{subTotal}
          </div>

        </div>
      </div>

      {/* SUMMARY + ACTION */}
      <BillSummary subTotal={subTotal} discount={discount} />
      <ActionBtn
        formData={formData}
        items={items.map(i => ({
          name: i.name,
          qty: i.quantity,
          price: i.price
        }))}
        t={t}
      />
    </div>
  );
};

export default ItemSection;
