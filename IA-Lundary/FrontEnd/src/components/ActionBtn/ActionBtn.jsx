import React from 'react';

const ActionBtn = ({ formData, items = [], t }) => {

  /* =========================
     SEND WHATSAPP (MOBILE SAFE)
  ========================== */
  const sendWhatsApp = () => {
    const { phoneNumber, customerName, date, returnDate } = formData;

    if (!phoneNumber) {
      alert("Phone number is required!");
      return;
    }

    // Phone format (PK)
    let phone = phoneNumber.replace(/\D/g, '');
    if (phone.startsWith('0')) phone = '92' + phone.slice(1);

    let total = 0;

    const itemLines = items.map(item => {
      const lineTotal = item.qty * item.price;
      total += lineTotal;

      return `• ${item.name}
  Qty: ${item.qty} × Rs.${item.price}
  Amount: Rs.${lineTotal}`;
    });

    const message =
`🧾 *Hafiz Charpai & Electronics*
━━━━━━━━━━━━━━━━━━
📄 *Order Receipt*

👤 Customer: ${customerName || 'N/A'}
📅 Order Date: ${date || 'N/A'}
🔁 Return Date: ${returnDate || 'N/A'}

🛒 *Items*
${itemLines.join('\n\n')}

━━━━━━━━━━━━━━━━━━
💰 *Total Bill:* Rs. ${total}

🙏 Please keep this receipt.
Thank you for choosing us!`;

    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  /* =========================
     DESKTOP UI PREVIEW (TABLE)
  ========================== */
  const buildPreview = () => {
    let total = 0;

    const itemLines = items.map(item => {
      const lt = item.qty * item.price;
      total += lt;
      return `${item.name}  x${item.qty}  = Rs.${lt}`;
    });

    const allLines = [
      "Hafiz Charpai & Electronics",
      "Order Receipt",
      `Customer: ${formData.customerName || 'N/A'}`,
      `Order Date: ${formData.date || 'N/A'}`,
      `Return Date: ${formData.returnDate || 'N/A'}`,
      ...itemLines,
      `Total Bill: Rs. ${total}`
    ];

    const maxLen = Math.max(...allLines.map(l => l.length));
    const line = "═".repeat(maxLen + 2);
    const f = (t) => `║ ${t.padEnd(maxLen)} ║`;

    return (
`╔${line}╗
${f("Hafiz Charpai & Electronics")}
${f("Order Receipt")}
╠${line}╣
${f(`Customer: ${formData.customerName || 'N/A'}`)}
${f(`Order Date: ${formData.date || 'N/A'}`)}
${f(`Return Date: ${formData.returnDate || 'N/A'}`)}
╠${line}╣
${f("Items")}
${itemLines.map(i => f(i)).join('\n')}
╠${line}╣
${f(`Total Bill: Rs. ${total}`)}
╚${line}╝`
    );
  };

  return (
    <div className="my-6 px-4">

      {/* ===== Desktop Preview ===== */}
      <div
        className="inline-block bg-green-50 border border-green-400
                   rounded-xl p-4 font-mono text-sm
                   whitespace-pre overflow-x-auto max-w-full"
      >
        {buildPreview()}
      </div>

      {/* ===== Buttons ===== */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">

        <button
          onClick={sendWhatsApp}
          className="bg-blue-600 hover:bg-blue-700 text-white
                     px-8 py-4 rounded-2xl font-black shadow-xl
                     active:scale-95 transition"
        >
          💬 {t?.save || "Send WhatsApp"}
        </button>

        <button
          onClick={() => window.location.reload()}
          className="bg-slate-200 hover:bg-slate-800 hover:text-white
                     px-8 py-4 rounded-2xl font-bold "
        >
          {t?.reset || "Reset"}
        </button>

      </div>

    </div>
  );
};

export default ActionBtn;
