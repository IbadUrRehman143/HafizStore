import React from "react";

const BillSummary = ({ subTotal, discount }) => {
  const discountAmount = (subTotal * discount) / 100;
  const grandTotal = subTotal - discountAmount;

  return (
    <div className="container mt-6 max-w-7xl mx-auto px-4">
      <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6">
        <h2 className="text-lg font-black text-slate-800 mb-4">
          Bill Summary
        </h2>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="font-bold text-slate-600">Subtotal</span>
            <span className="font-bold">Rs. {subTotal}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-bold text-slate-600">
              Discount ({discount}%)
            </span>
            <span className="font-bold text-green-600">
              - Rs. {discountAmount}
            </span>
          </div>

          <hr />

          <div className="flex justify-between text-lg">
            <span className="font-black">Grand Total</span>
            <span className="font-black text-blue-700">
              Rs. {grandTotal}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillSummary;
