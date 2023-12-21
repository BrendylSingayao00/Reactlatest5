const express = require('express');
const router = require('./Product-routes');
const ThermalPrinter = require('node-thermal-printer').printer;
const PrinterTypes = require('node-thermal-printer').types;


router.post('/print', (req, res) => {
    const { content } = req.body;
  
    // Create a new thermal printer
    const printer = new ThermalPrinter({
      type: PrinterTypes.EPSON, // Set the printer type according to your printer model
      interface: 'EPSON L120', // Set the printer name or IP address
    });
  
    // Check if the printer is available
  if (!printer.isPrinterConnected()) {
    console.log('Printer not available');
    return res.status(500).json({ error: 'Printer not available' });
  }

    // Set print options
    printer.alignCenter();
    printer.setTextSize(1, 1);
    printer.println(content);
    printer.cut();
  
    try {
      // Execute print job
      printer.execute().then(() => {
        console.log('Print job sent successfully');
        console.log('HALO');
        res.json({ success: true });
      });
    } catch (error) {
      console.error('Error sending print job:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
// router.post('/print', (req, res) => {
//     const { content, printerName } = req.body;

//     // Get a list of available printers
//     const printers = printer.getPrinters();
  
//     // Check if the specified printer is available
//     const selectedPrinter = printers.find((p) => p.name === printerName);
//     if (!selectedPrinter) {
//       console.log(`Printer ${printerName} not found`);
//       return res.status(500).json({ error: 'Printer not found' });
//     }
  
//     // Send content to the printer
//     printer.printDirect({
//       data: content,
//       printer: printerName,
//       type: 'RAW',
//       success: (jobID) => {
//         console.log(`Print job sent to printer ${printerName} with ID: ${jobID}`);
//         res.json({ success: true, jobID });
//       },
//       error: (err) => {
//         console.error('Error printing:', err);
//         res.status(500).json({ error: 'Internal server error' });
//       },
//     });
//   });

  module.exports = router;