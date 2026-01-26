import * as XLSX from 'xlsx';

export const exportToExcel = (data, fileName = 'transactions') => {
  // Check if there's data to export
  if (!data || data.length === 0) {
    alert('No data to export!');
    return;
  }

  try {
    // Create worksheet from data
    const worksheet = XLSX.utils.json_to_sheet(data);
    
    // Create workbook and add worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Transactions');
    
    // Generate Excel file and trigger download
    XLSX.writeFile(workbook, `${fileName}.xlsx`, {
      bookType: 'xlsx',
      type: 'array'
    });

  } catch (error) {
    console.error('Export error:', error);
    alert('Error exporting data. Please try again.');
  }
};