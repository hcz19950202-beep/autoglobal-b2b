import React from 'react';
import { HiOutlineDocumentDownload } from 'react-icons/hi';

// Generate a printable PDF report
const generateVehiclePDF = (vehicle) => {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please allow popups to download PDF');
    return;
  }

  const html = `
<!DOCTYPE html>
<html>
<head>
  <title>${vehicle.title} - AutoGlobal Report</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', Arial, sans-serif; color: #333; padding: 40px; max-width: 800px; margin: 0 auto; }
    .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #1a73e8; padding-bottom: 20px; margin-bottom: 30px; }
    .header .logo { font-size: 28px; font-weight: bold; color: #1a73e8; }
    .header .report-info { text-align: right; color: #666; font-size: 12px; }
    .header .report-info .date { font-size: 11px; }
    .confidential { background: #fff3cd; border: 1px solid #ffc107; padding: 8px 16px; border-radius: 4px; font-size: 11px; color: #856404; text-align: center; margin-bottom: 20px; font-weight: 600; }
    .vehicle-title { font-size: 22px; font-weight: bold; margin-bottom: 5px; color: #1a1a2e; }
    .stock-id { color: #999; font-size: 12px; margin-bottom: 20px; }
    .price-section { background: #f0f7ff; border: 2px solid #1a73e8; border-radius: 8px; padding: 20px; margin-bottom: 30px; text-align: center; }
    .price-label { font-size: 12px; color: #666; text-transform: uppercase; font-weight: 600; letter-spacing: 1px; }
    .price-value { font-size: 36px; font-weight: bold; color: #1a73e8; }
    .image-section { margin-bottom: 30px; text-align: center; }
    .image-section img { max-width: 100%; max-height: 350px; object-fit: cover; border-radius: 8px; border: 1px solid #eee; }
    .section-title { font-size: 16px; font-weight: bold; color: #1a1a2e; border-bottom: 2px solid #eee; padding-bottom: 8px; margin: 25px 0 15px; text-transform: uppercase; letter-spacing: 1px; }
    .specs-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0; }
    .spec-row { display: flex; justify-content: space-between; padding: 10px 15px; border-bottom: 1px solid #f0f0f0; }
    .spec-row:nth-child(odd) { background: #fafafa; }
    .spec-label { color: #666; font-size: 13px; }
    .spec-value { font-weight: 600; color: #333; font-size: 13px; }
    .features-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; }
    .feature-item { padding: 6px 12px; background: #f0f7ff; border-radius: 4px; font-size: 12px; color: #1a73e8; }
    .feature-item::before { content: "✓ "; color: #4caf50; font-weight: bold; }
    .description { background: #f9f9f9; padding: 20px; border-radius: 8px; font-size: 13px; line-height: 1.8; color: #555; margin-top: 15px; }
    .footer { margin-top: 40px; border-top: 2px solid #1a73e8; padding-top: 20px; text-align: center; color: #666; font-size: 11px; }
    .footer .contact { font-size: 14px; font-weight: 600; color: #1a73e8; margin-bottom: 5px; }
    .qr-note { font-style: italic; color: #999; font-size: 10px; margin-top: 10px; }
    @media print {
      body { padding: 20px; }
      @page { size: A4; margin: 15mm; }
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">AutoGlobal</div>
    <div class="report-info">
      <div>Vehicle Specification Report</div>
      <div class="date">Generated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
    </div>
  </div>

  <div class="confidential">CONFIDENTIAL — For B2B Partners Only</div>

  <div class="vehicle-title">${vehicle.title}</div>
  <div class="stock-id">Stock ID: AG-${vehicle.id}00234</div>

  <div class="price-section">
    <div class="price-label">FOB Export Price (USD)</div>
    <div class="price-value">$${vehicle.price?.toLocaleString()}</div>
  </div>

  ${vehicle.images && vehicle.images[0] ? `
  <div class="image-section">
    <img src="${vehicle.images[0]}" alt="${vehicle.title}" crossorigin="anonymous" />
  </div>
  ` : ''}

  <div class="section-title">Vehicle Specifications</div>
  <div class="specs-grid">
    <div class="spec-row"><span class="spec-label">Year</span><span class="spec-value">${vehicle.year || '-'}</span></div>
    <div class="spec-row"><span class="spec-label">Mileage</span><span class="spec-value">${vehicle.mileage?.toLocaleString() || '-'} km</span></div>
    <div class="spec-row"><span class="spec-label">Fuel Type</span><span class="spec-value">${vehicle.fuel || '-'}</span></div>
    <div class="spec-row"><span class="spec-label">Transmission</span><span class="spec-value">${vehicle.transmission || '-'}</span></div>
    <div class="spec-row"><span class="spec-label">Body Type</span><span class="spec-value">${vehicle.bodyType || '-'}</span></div>
    <div class="spec-row"><span class="spec-label">Engine</span><span class="spec-value">${vehicle.engine || '-'}</span></div>
    <div class="spec-row"><span class="spec-label">Drive Type</span><span class="spec-value">${vehicle.driveType || '-'}</span></div>
    <div class="spec-row"><span class="spec-label">Exterior Color</span><span class="spec-value">${vehicle.color || '-'}</span></div>
    <div class="spec-row"><span class="spec-label">Doors</span><span class="spec-value">${vehicle.doors || '-'}</span></div>
    <div class="spec-row"><span class="spec-label">Seats</span><span class="spec-value">${vehicle.seats || '-'}</span></div>
    <div class="spec-row"><span class="spec-label">Condition</span><span class="spec-value">${vehicle.condition || '-'}</span></div>
    <div class="spec-row"><span class="spec-label">Location</span><span class="spec-value">${vehicle.location || '-'}</span></div>
  </div>

  ${vehicle.features && vehicle.features.length > 0 ? `
  <div class="section-title">Key Features</div>
  <div class="features-grid">
    ${vehicle.features.map(f => `<div class="feature-item">${f}</div>`).join('')}
  </div>
  ` : ''}

  ${vehicle.description ? `
  <div class="section-title">Description</div>
  <div class="description">${vehicle.description}</div>
  ` : ''}

  <div class="footer">
    <div class="contact">Contact us for the best export price</div>
    <div>Email: sales@autoglobal.com | WhatsApp: +86 123 4567 8900</div>
    <div>Website: www.autoglobal.com</div>
    <div class="qr-note">© ${new Date().getFullYear()} AutoGlobal. This report is generated for B2B partners only.</div>
  </div>
</body>
</html>`;

  printWindow.document.write(html);
  printWindow.document.close();

  // Wait for images to load, then trigger print
  printWindow.onload = () => {
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };
};

// Button component for convenience
const PdfExportButton = ({ vehicle, className = '' }) => {
  return (
    <button
      onClick={() => generateVehiclePDF(vehicle)}
      className={`flex items-center justify-center gap-2 ${className}`}
    >
      <HiOutlineDocumentDownload className="w-5 h-5" />
      Download PDF Report
    </button>
  );
};

export { generateVehiclePDF };
export default PdfExportButton;
