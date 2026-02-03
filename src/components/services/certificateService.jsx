import jsPDF from 'jspdf';

export const certificateService = {
  generateCertificate(courseName, studentName, masteryScore) {
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // Border
    pdf.setLineWidth(3);
    pdf.setDrawColor(42, 93, 154); // --primary color
    pdf.rect(10, 10, pageWidth - 20, pageHeight - 20);

    // Inner border
    pdf.setLineWidth(0.5);
    pdf.setDrawColor(201, 169, 110); // --accent color
    pdf.rect(15, 15, pageWidth - 30, pageHeight - 30);

    // Title
    pdf.setFontSize(36);
    pdf.setTextColor(42, 93, 154);
    pdf.text('Certificate of Completion', pageWidth / 2, 45, { align: 'center' });

    // Subtitle
    pdf.setFontSize(18);
    pdf.setTextColor(201, 169, 110);
    pdf.text('Lumen Academy', pageWidth / 2, 60, { align: 'center' });

    // Presented to
    pdf.setFontSize(14);
    pdf.setTextColor(26, 26, 26);
    pdf.text('This certifies that', pageWidth / 2, 85, { align: 'center' });

    // Student name
    pdf.setFontSize(28);
    pdf.setTextColor(42, 93, 154);
    pdf.text(studentName, pageWidth / 2, 100, { align: 'center' });

    // Completion text
    pdf.setFontSize(14);
    pdf.setTextColor(26, 26, 26);
    pdf.text('has successfully completed', pageWidth / 2, 115, { align: 'center' });

    // Course name
    pdf.setFontSize(20);
    pdf.setTextColor(42, 93, 154);
    pdf.text(courseName, pageWidth / 2, 130, { align: 'center' });

    // Mastery note
    pdf.setFontSize(12);
    pdf.setTextColor(26, 26, 26);
    pdf.text(`With ${masteryScore}% mastery`, pageWidth / 2, 145, { align: 'center' });

    // Date
    pdf.setFontSize(12);
    pdf.setTextColor(107, 114, 128);
    const date = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    pdf.text(`Date: ${date}`, pageWidth / 2, 160, { align: 'center' });

    // Footer
    pdf.setFontSize(10);
    pdf.setTextColor(107, 114, 128);
    pdf.text('Powered by Grok xAI', pageWidth / 2, pageHeight - 20, { align: 'center' });

    // Save
    const fileName = `${courseName.replace(/[^a-z0-9]/gi, '_')}_Certificate.pdf`;
    pdf.save(fileName);
  }
};

export default certificateService;