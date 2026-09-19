/**
 * Lead Data & Google Forms / Excel Configuration
 * 
 * You can provide your Google Form link and Excel / Google Sheets account details below.
 * When you have your Google Form link ready, paste the action URL and the entry IDs here.
 */

export const LEAD_CONFIG = {
  // 1. Google Form Submission URL (paste your Google Form response URL here)
  // Format: "https://docs.google.com/forms/d/e/1FAIpQLSc.../formResponse"
  googleFormActionUrl: "",

  // 2. Google Form Entry IDs for each field (from your Google Form's inspect element or pre-filled link)
  googleFormEntries: {
    facilityName: "entry.1000001", // Organization / Company / School Name
    contactName: "entry.1000002",  // Contact Person
    phone: "entry.1000003",        // WhatsApp / Phone
    email: "entry.1000004",        // Official Email
    sector: "entry.1000005",       // Sector (Company, Office, Hospital, etc.)
    address: "entry.1000006",      // Delivery Address
    orderItems: "entry.1000007",   // Requisition Products & Quantities
    notes: "entry.1000008",        // Delivery Instructions / Notes
  },

  // 3. Optional: Excel / Google Sheets Webhook (e.g. SheetDB, Make.com, or Google Apps Script Web App)
  // Format: "https://sheetdb.io/api/v1/YOUR_SHEET_ID" or "https://script.google.com/macros/s/.../exec"
  sheetWebhookUrl: "",

  // 4. Contact & Fulfillment details
  whatsappNumber: "919487000000",
  contactEmail: "jasvienterprises28@gmail.com",
  fulfillmentHub: "OSS Roja Nagar, Zuzuwadi, Hosur (TN)"
};
