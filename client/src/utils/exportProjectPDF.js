import jsPDF from "jspdf";

const exportProjectPDF = (project, generations) => {
  const doc = new jsPDF();

  let y = 20;

  doc.setFontSize(20);
  doc.text(project.title, 20, y);

  y += 10;

  doc.setFontSize(12);

  doc.text(
    project.description || "",
    20,
    y
  );

  y += 20;

  generations.forEach((item) => {
    if (y > 250) {
      doc.addPage();
      y = 20;
    }

    doc.setFontSize(16);

    doc.text(
      item.type.toUpperCase(),
      20,
      y
    );

    y += 10;

    doc.setFontSize(11);

    const content = Array.isArray(item.output)
      ? item.output.join("\n")
      : item.output;

    const lines = doc.splitTextToSize(
      content,
      170
    );

    doc.text(lines, 20, y);

    y += lines.length * 6 + 15;
  });

  doc.save(
    `${project.title}.pdf`
  );
};

export default exportProjectPDF;