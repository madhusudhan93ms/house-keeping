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

  // 3. Google Sheets Iframe Embed URL (File -> Share -> Publish to web -> Embed)
  // Format: "https://docs.google.com/spreadsheets/d/e/2PACX-.../pubhtml?widget=true&amp;headers=false"
  googleSheetIframeUrl: "",

  // 4. Optional: Excel / Google Sheets Webhook (e.g. SheetDB, Make.com, or Google Apps Script Web App)
  sheetWebhookUrl: "",

  // 5. Official Contact & Fulfillment details (from Jasvi Enterprises business card)
  phoneNumber: "7639093837",
  displayPhone: "+91 76390 93837",
  phoneTel: "+917639093837",
  whatsappNumber: "917639093837",
  contactEmail: "jasvienterprises28@gmail.com",
  fulfillmentHub: "Zuzuvadi, Roja Nagar, Hosur",
  fullAddress: "Zuzuvadi, Roja Nagar, Hosur, Tamil Nadu"
};

export const getWhatsAppUrl = (text = "Hello Jasvi Enterprises, I would like to request wholesale product pricing.") => {
  return `https://wa.me/${LEAD_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
};

