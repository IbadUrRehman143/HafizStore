import React, { useState, useEffect } from "react";

const AutofillCustomer = ({ formData, setFormData }) => {
  const customerList = [
    { name: "Ali Khan", phone: "03001234567", street: "Al Qasim St", familyMembers: "4" },
    { name: "Sara Ahmed", phone: "03111234567", street: "King Fahd St", familyMembers: "3" },
    { name: "Mohammed Saleem", phone: "03451234567", street: "Riyadh St", familyMembers: "5" }
  ];

  const [duplicateCustomer, setDuplicateCustomer] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (!formData.phoneNumber || !formData.streetName) return;

    const duplicate = customerList.find(
      (c) =>
        c.phone === formData.phoneNumber.trim() &&
        c.street === formData.streetName.trim()
    );

    if (duplicate) {
      setDuplicateCustomer(duplicate);
      setShowNotification(true);

      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 60000); // 1 minute

      return () => clearTimeout(timer);
    }
  }, [formData.phoneNumber, formData.streetName]);

  const handleUseCustomer = () => {
    if (!duplicateCustomer) return;

    setFormData((prev) => ({
      ...prev,
      customerName: duplicateCustomer.name,
      phoneNumber: duplicateCustomer.phone,
      streetName: duplicateCustomer.street,
      familyMembers: duplicateCustomer.familyMembers
    }));

    setShowNotification(false);
  };

  if (!showNotification) return null;

  return (
    <div className="mb-4 max-w-5xl mx-auto px-4">
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-lg flex justify-between items-center shadow-md">
        <span>Duplicate customer detected! Use existing data?</span>
        <button
          onClick={handleUseCustomer}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg font-bold transition-all"
        >
          Use This Customer
        </button>
      </div>
    </div>
  );
};

export default AutofillCustomer;
