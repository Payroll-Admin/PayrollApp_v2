import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // 👈 this is essential

const handlePayslipDownload = () => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Monthly Payslip", 105, 20, { align: "center" });

  doc.setFontSize(12);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);

  const tableRows = rows.map(([label, value]) => [label, String(value)]);

  doc.autoTable({
    startY: 40,
    head: [["Metric", "Value"]],
    body: tableRows,
    theme: "grid",
    headStyles: {
      fillColor: [208, 184, 168],
      textColor: 0,
      fontStyle: "bold",
    },
    styles: {
      cellPadding: 4,
      fontSize: 11,
    },
  });

  doc.save("Payslip.pdf");
  setOpenDialog(false);
};
