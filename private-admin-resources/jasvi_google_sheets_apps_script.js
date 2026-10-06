/**
 * ============================================================================
 * JASVI ENTERPRISES - AUTOMATED GOOGLE SHEETS B2B LEAD CAPTURE SCRIPT
 * Account: jasvienterprises28@gmail.com
 * Hub: Hosur, Tamil Nadu (+91 76390 93837)
 * ============================================================================
 * 
 * HOW TO INSTALL IN 3 MINUTES:
 * 1. Open Google Sheets (https://sheets.google.com) with: jasvienterprises28@gmail.com
 * 2. Create a new spreadsheet named: "Jasvi Enterprises - Wholesale Requisition Leads"
 * 3. In the top menu, click: Extensions -> Apps Script
 * 4. Delete any code in the editor, paste this entire file, and click Save (Ctrl+S / Cmd+S).
 * 5. Run the function "setupSpreadsheet" once to generate the two sheets:
 *    - "📥 New Requisitions"
 *    - "✅ Accepted Orders"
 * 6. Click "Deploy" (top right) -> "New deployment"
 * 7. Click the gear icon (Select type) -> choose "Web app"
 * 8. Set:
 *    - Description: "Jasvi Lead Capture Webhook"
 *    - Execute as: "Me (jasvienterprises28@gmail.com)"
 *    - Who has access: "Anyone" (crucial so the website can submit leads)
 * 9. Click "Deploy" -> "Authorize Access" -> choose your Google Account -> Allow.
 * 10. Copy the "Web App URL" (e.g. https://script.google.com/macros/s/.../exec)
 *     and paste it in the website Admin Portal -> Google Sheets tab!
 * ============================================================================
 */

const NOTIFICATION_EMAIL = "jasvienterprises28@gmail.com";
const SHEET_NEW = "📥 New Requisitions";
const SHEET_ACCEPTED = "✅ Accepted Orders";

/**
 * Run this function once from the Apps Script editor to create the two sheets with styled headers!
 */
function setupSpreadsheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // 1. Create or get "New Requisitions" sheet
  let sheetNew = ss.getSheetByName(SHEET_NEW);
  if (!sheetNew) {
    sheetNew = ss.insertSheet(SHEET_NEW, 0);
  }

  const headersNew = [
    "Timestamp",
    "Lead Ref ID",
    "Status",
    "Company / Factory Name",
    "Contact Person",
    "Phone / WhatsApp",
    "Email / GSTIN",
    "Buyer Type",
    "Delivery Address",
    "Materials Requested",
    "Monthly Volume / Notes"
  ];

  sheetNew.getRange(1, 1, 1, headersNew.length).setValues([headersNew]);
  sheetNew.getRange(1, 1, 1, headersNew.length)
    .setBackground("#0f766e")
    .setFontColor("#ffffff")
    .setFontWeight("bold")
    .setFontFamily("Arial")
    .setFontSize(10)
    .setHorizontalAlignment("center");
  sheetNew.setFrozenRows(1);

  // 2. Create or get "Accepted Orders" sheet
  let sheetAccepted = ss.getSheetByName(SHEET_ACCEPTED);
  if (!sheetAccepted) {
    sheetAccepted = ss.insertSheet(SHEET_ACCEPTED, 1);
  }

  const headersAccepted = [
    "Accepted Date",
    "Lead Ref ID",
    "Status",
    "Company / Factory Name",
    "Contact Person",
    "Phone / WhatsApp",
    "Email / GSTIN",
    "Buyer Type",
    "Delivery Address",
    "Materials Requested",
    "Monthly Volume / Notes",
    "Challan / Invoice #",
    "Dispatch Remarks"
  ];

  sheetAccepted.getRange(1, 1, 1, headersAccepted.length).setValues([headersAccepted]);
  sheetAccepted.getRange(1, 1, 1, headersAccepted.length)
    .setBackground("#059669")
    .setFontColor("#ffffff")
    .setFontWeight("bold")
    .setFontFamily("Arial")
    .setFontSize(10)
    .setHorizontalAlignment("center");
  sheetAccepted.setFrozenRows(1);

  SpreadsheetApp.getUi().alert("✅ Jasvi Enterprises Sheets Setup Complete!\n\nTabs created:\n1. 📥 New Requisitions\n2. ✅ Accepted Orders\n\nYou can now deploy as a Web App.");
}

/**
 * Handle HTTP POST from Website Requisition Form & Admin Portal
 */
function doPost(e) {
  try {
    let payload = {};
    if (e.postData && e.postData.contents) {
      payload = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      payload = e.parameter;
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();

    // ── 1. AUTOMATED STATUS UPDATE (from Website Admin Portal) ──
    if (payload.action === "UPDATE_STATUS" && payload.leadId) {
      let sheetNew = ss.getSheetByName(SHEET_NEW) || (setupSpreadsheet(), ss.getSheetByName(SHEET_NEW));
      let sheetAccepted = ss.getSheetByName(SHEET_ACCEPTED) || (setupSpreadsheet(), ss.getSheetByName(SHEET_ACCEPTED));

      if (payload.status === "ACCEPTED") {
        // Find in New Requisitions and move to Accepted Orders
        const data = sheetNew.getDataRange().getValues();
        for (let i = 1; i < data.length; i++) {
          if (String(data[i][1]).trim() === String(payload.leadId).trim()) {
            const rowValues = data[i];
            const now = new Date();
            const acceptedDate = payload.acceptedAt || Utilities.formatDate(now, "Asia/Kolkata", "dd-MMM-yyyy HH:mm:ss");

            const acceptedRow = [
              acceptedDate,
              rowValues[1], // Lead Ref ID
              "ACCEPTED",
              rowValues[3], // Company
              rowValues[4], // Contact
              rowValues[5], // Phone
              rowValues[6], // Email/GSTIN
              rowValues[7], // Sector
              rowValues[8], // Address
              rowValues[9], // Materials
              rowValues[10], // Notes
              "", // Challan #
              ""  // Remarks
            ];

            sheetAccepted.appendRow(acceptedRow);
            const accLastRow = sheetAccepted.getLastRow();
            sheetAccepted.getRange(accLastRow, 3).setBackground("#d1fae5").setFontColor("#065f46").setFontWeight("bold");

            sheetNew.deleteRow(i + 1);
            return ContentService.createTextOutput(JSON.stringify({ status: "success", action: "ACCEPTED" }))
              .setMimeType(ContentService.MimeType.JSON);
          }
        }
      } else if (payload.status === "NEW") {
        // Find in Accepted Orders and move back to New Requisitions
        const data = sheetAccepted.getDataRange().getValues();
        for (let i = 1; i < data.length; i++) {
          if (String(data[i][1]).trim() === String(payload.leadId).trim()) {
            const rowValues = data[i];
            const now = new Date();
            const dateStr = Utilities.formatDate(now, "Asia/Kolkata", "dd-MMM-yyyy HH:mm:ss");

            const newRow = [
              dateStr,
              rowValues[1], // Lead Ref ID
              "NEW",
              rowValues[3], // Company
              rowValues[4], // Contact
              rowValues[5], // Phone
              rowValues[6], // Email/GSTIN
              rowValues[7], // Sector
              rowValues[8], // Address
              rowValues[9], // Materials
              rowValues[10] // Notes
            ];

            sheetNew.appendRow(newRow);
            const newLastRow = sheetNew.getLastRow();
            sheetNew.getRange(newLastRow, 3).setBackground("#fef3c7").setFontColor("#b45309").setFontWeight("bold");

            sheetAccepted.deleteRow(i + 1);
            return ContentService.createTextOutput(JSON.stringify({ status: "success", action: "NEW" }))
              .setMimeType(ContentService.MimeType.JSON);
          }
        }
      }
      return ContentService.createTextOutput(JSON.stringify({ status: "leadNotFound" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // ── 2. NEW REQUISITION LEAD RECORDING ──
    const lead = payload;
    let sheetNew = ss.getSheetByName(SHEET_NEW);
    if (!sheetNew) {
      setupSpreadsheet();
      sheetNew = ss.getSheetByName(SHEET_NEW);
    }

    const now = new Date();
    const formattedDate = Utilities.formatDate(now, "Asia/Kolkata", "dd-MMM-yyyy HH:mm:ss");

    const rowData = [
      lead.timestamp || formattedDate,
      lead.id || ("JE-LEAD-" + Math.floor(100000 + Math.random() * 900000)),
      "NEW",
      lead.facilityName || "",
      lead.contactName || "",
      lead.phone || "",
      lead.email || "",
      lead.sector || "Company",
      lead.address || "",
      lead.itemsSummary || (Array.isArray(lead.selectedTags) ? lead.selectedTags.join(", ") : ""),
      lead.notes || ""
    ];

    // Append to "New Requisitions" tab
    sheetNew.appendRow(rowData);
    const lastRow = sheetNew.getLastRow();

    // Style the status cell
    const statusCell = sheetNew.getRange(lastRow, 3);
    statusCell.setBackground("#fef3c7").setFontColor("#b45309").setFontWeight("bold");

    // Optional: Send instant email notification to jasvienterprises28@gmail.com
    try {
      const emailSubject = `🔔 New Wholesale RFQ: ${lead.facilityName || 'Institutional Lead'} (${lead.id || 'JE'})`;
      const emailBody = `
New Wholesale Quotation Request Received on Website!

Reference ID: ${lead.id || 'N/A'}
Organization: ${lead.facilityName || 'N/A'}
Contact Person: ${lead.contactName || 'N/A'}
Phone / WhatsApp: ${lead.phone || 'N/A'}
Email / GSTIN: ${lead.email || 'N/A'}
Sector: ${lead.sector || 'N/A'}
Delivery Location: ${lead.address || 'N/A'}

Materials Requested:
${lead.itemsSummary || (Array.isArray(lead.selectedTags) ? lead.selectedTags.join(", ") : "Standard catalog")}

Volume / Instructions:
${lead.notes || 'None'}

Direct WhatsApp Reply to Buyer:
https://wa.me/${(lead.phone || '').replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(lead.contactName || '')},%20this%20is%20Jasvi%20Enterprises%20regarding%20your%20quotation%20request%20${lead.id || ''}.

View in Google Sheets:
${ss.getUrl()}
      `;
      MailApp.sendEmail(NOTIFICATION_EMAIL, emailSubject, emailBody);
    } catch (mailErr) {
      console.warn("Mail send error:", mailErr);
    }

    return ContentService.createTextOutput(JSON.stringify({ status: "success", id: lead.id }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle HTTP GET for health check
 */
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({ 
    status: "active", 
    account: "jasvienterprises28@gmail.com",
    hub: "Jasvi Enterprises Hosur" 
  })).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Automatically move a row from "New Requisitions" to "Accepted Orders"
 * when the user changes column C ("Status") to "ACCEPTED" in Google Sheets!
 */
function onEdit(e) {
  const range = e.range;
  const sheet = range.getSheet();
  
  if (sheet.getName() === SHEET_NEW && range.getColumn() === 3) {
    const val = String(range.getValue()).trim().toUpperCase();
    if (val === "ACCEPTED") {
      const row = range.getRow();
      if (row === 1) return; // Skip header

      const ss = SpreadsheetApp.getActiveSpreadsheet();
      let sheetAccepted = ss.getSheetByName(SHEET_ACCEPTED);
      if (!sheetAccepted) {
        setupSpreadsheet();
        sheetAccepted = ss.getSheetByName(SHEET_ACCEPTED);
      }

      const rowValues = sheet.getRange(row, 1, 1, sheet.getLastColumn()).getValues()[0];
      const now = new Date();
      const acceptedDate = Utilities.formatDate(now, "Asia/Kolkata", "dd-MMM-yyyy HH:mm:ss");

      // Build accepted row:
      // [Accepted Date, Ref ID, "ACCEPTED", Company, Contact, Phone, Email, Sector, Address, Materials, Notes, Challan#, Remarks]
      const acceptedRow = [
        acceptedDate,
        rowValues[1], // Ref ID
        "ACCEPTED",
        rowValues[3], // Company
        rowValues[4], // Contact
        rowValues[5], // Phone
        rowValues[6], // Email/GSTIN
        rowValues[7], // Sector
        rowValues[8], // Address
        rowValues[9], // Materials
        rowValues[10], // Notes
        "", // Challan #
        ""  // Remarks
      ];

      sheetAccepted.appendRow(acceptedRow);
      const accLastRow = sheetAccepted.getLastRow();
      sheetAccepted.getRange(accLastRow, 3).setBackground("#d1fae5").setFontColor("#065f46").setFontWeight("bold");

      // Delete from New Requisitions
      sheet.deleteRow(row);
      SpreadsheetApp.getActiveSpreadsheet().toast("Lead moved to ✅ Accepted Orders tab!", "Jasvi Workflow");
    }
  }
}
