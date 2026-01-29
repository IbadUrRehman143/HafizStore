import React from 'react';

const CustomerInfo = ({ formData, setFormData, t }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Reusable Tailwind Classes
  const inputStyle = "w-full p-4 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all duration-200 text-slate-700 shadow-sm placeholder:text-slate-300";
  const labelStyle = "text-xs font-black text-slate-500 uppercase tracking-widest mb-2 block px-1 group-focus-within:text-blue-600 transition-colors";

  return (
    <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-2xl shadow-slate-200/60 border border-slate-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
        
        {/* Left Column */}
        <div className="space-y-8">
          <div className="group">
            <label className={labelStyle}>{t.date}</label>
            <input type="date" name="date" value={formData.date} onChange={handleChange} className={inputStyle} />
          </div>
          
          <div className="group">
            <label className={labelStyle}>{t.name}</label>
            <input type="text" name="customerName" placeholder={t.name} value={formData.customerName} onChange={handleChange} className={inputStyle} />
          </div>
          
          <div className="group">
            <label className={labelStyle}>{t.phone}</label>
            <input type="tel" name="phoneNumber" placeholder="+92..." value={formData.phoneNumber} onChange={handleChange} className={inputStyle} />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          <div className="group">
            <label className={labelStyle}>{t.returnDate}</label>
            <input type="date" name="returnDate" value={formData.returnDate} onChange={handleChange} className={`${inputStyle} bg-blue-50/40 border-blue-100 focus:bg-white`} />
          </div>
          
          <div className="group">
            <label className={labelStyle}>{t.street}</label>
            <input type="text" name="streetName" placeholder={t.street} value={formData.streetName} onChange={handleChange} className={inputStyle} />
          </div>
          
          <div className="group">
            <label className={labelStyle}>{t.familyMembers}</label>
            <input type="number" name="familyMembers" value={formData.familyMembers} onChange={handleChange} className={inputStyle} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default CustomerInfo;