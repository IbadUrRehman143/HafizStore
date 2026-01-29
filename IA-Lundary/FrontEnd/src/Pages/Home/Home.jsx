import React, { useState } from 'react';
import CustomerInfo from '../../components/CustomerInfo/CustomerInfo.jsx';
import ItemSection from '../../components/ItemSection/ItemSection.jsx';
import AutofillCustomer from '../../components/AutofillCustomer/AutofillCustomer.jsx';

const Home = ({ lang }) => {
  const translations = {
    en: { date: "Order Date", name: "Customer Name", phone: "Phone Number", returnDate: "Return Date", street: "Street Name", familyMembers: "Family Members", save: "Save & Send WhatsApp", reset: "Reset Form" },
    ur: { date: "تاریخ", name: "گاہک کا نام", phone: "فون نمبر", returnDate: "واپسی کی تاریخ", street: "گلی کا نام", familyMembers: "گھر کے افراد", save: "واٹس ایپ پر بھیجیں", reset: "فارم ری سیٹ کریں" },
    ar: { date: "التاريخ", name: "اسم العميل", phone: "رقم الهاتف", returnDate: "تاريخ العودة", street: "اسم الشارع", familyMembers: "عدد الأفراد", save: "إرسال واتساب", reset: "إعادة ضبط" }
  };

  const t = translations[lang] || translations.en;

  const [formData, setFormData] = useState({
    date: '', 
    customerName: '', 
    phoneNumber: '', 
    streetName: '', 
    familyMembers: '1', 
    returnDate: ''
  });

  return (
    <main className="max-w-5xl mx-auto py-10 px-6" dir={lang === 'en' ? 'ltr' : 'rtl'}>
      {/* Header */}
      <div className="mb-8 flex items-center gap-3">
        <div className="w-2 h-8 bg-blue-600 rounded-full"></div>
        <h6 className="text-1xl font-black text-slate-800">
          {lang === 'en' ? 'Customer Info' : lang === 'ur' ? 'گاہک کی تفصیلات' : 'تفاصيل العميل'}
        </h6>
      </div>

      {/* Customer Info Form */}
      <CustomerInfo formData={formData} setFormData={setFormData} t={t} />

      {/* Item Section + Bill Summary + WhatsApp Button */}
      <ItemSection formData={formData} t={t} />

      {/* Autofill Duplicate Message */}
      {/* This will appear only if a duplicate customer is detected */}
      <AutofillCustomer setFormData={setFormData} formData={formData} />
    </main>
  );
};

export default Home;
