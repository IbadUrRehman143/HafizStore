import React from 'react';

const ActionBtn = ({ formData, items = [], t }) => {

  const sendWhatsApp = () => {
    const { phoneNumber, customerName, date, returnDate } = formData;

    if (!phoneNumber) {
      alert("Phone number is required!");
      return;
    }

    let phone = phoneNumber.replace(/\D/g, '');
    if (phone.startsWith('0')) phone = '92' + phone.slice(1);

    let total = 0;
    const width = 28; // Fixed width for message box

    // Helper for padding and borders
    const line = "─".repeat(width);
    const formatLine = (text) => {
      const padding = width - text.length;
      return `│ ${text}${" ".repeat(padding > 0 ? padding : 0)} │`;
    };

    const itemLines = items.map(item => {
      const lineTotal = item.qty * item.price;
      total += lineTotal;
      const text = `${item.name.substring(0, 15)} x${item.qty}`;
      const priceText = `Rs.${lineTotal}`;
      const space = width - (text.length + priceText.length);
      return `│ ${text}${" ".repeat(space > 0 ? space : 1)}${priceText} │`;
    });

    // Building the message with monospace wrapper (```)
    const message = 
"```" + `
┌${line}┐
│ Hafiz Charpai & Electronics  │
├${line}┤
${formatLine(`Cust: ${customerName || 'N/A'}`)}
${formatLine(`Date: ${date || 'N/A'}`)}
${formatLine(`Retn: ${returnDate || 'N/A'}`)}
├${line}┤
${itemLines.join('\n')}
├${line}┤
${formatLine(`TOTAL BILL: Rs.${total}`)}
└${line}┘
` + "```" + `\n🙏 *Thank You!*`;

    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  /* Preview remains same as before but styled to match */
  const buildPreview = () => {
    let total = 0;
    const width = 30;
    const line = "═".repeat(width);
    const f = (t) => `║ ${t.padEnd(width - 2)} ║`;

    const itemLines = items.map(item => {
      const lt = item.qty * item.price;
      total += lt;
      return f(`${item.name.substring(0,15)} x${item.qty} = ${lt}`);
    });

    return (
`╔${line}╗
${f("Hafiz Charpai & Electronics")}
╠${line}╣
${f(`Customer: ${formData.customerName || 'N/A'}`)}
${f(`Date: ${formData.date || 'N/A'}`)}
╠${line}╣
${itemLines.join('\n')}
╠${line}╣
${f(`Total Bill: Rs. ${total}`)}
╚${line}╝`
    );
  };

  return (
    <div className="my-6 px-4">
      {/* Desktop Preview */}
      <div className="bg-slate-900 text-green-400 border-2 border-slate-700 rounded-xl p-4 font-mono text-[12px] whitespace-pre overflow-x-auto mb-6 shadow-2xl">
        <div className="text-slate-500 mb-2 uppercase text-[10px] font-bold tracking-widest">Receipt Preview</div>
        {buildPreview()}
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button
          onClick={sendWhatsApp}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl font-black shadow-xl active:scale-95 transition flex items-center justify-center gap-2"
        >
          💬 {t?.save || "Send WhatsApp Receipt"}
        </button>

        <button
          onClick={() => window.location.reload()}
          className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-8 py-4 rounded-2xl font-bold transition"
        >
          {t?.reset || "New Bill"}
        </button>
      </div>
    </div>
  );
};

export default ActionBtn;