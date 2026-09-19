import { LEAD_CONFIG } from '../config/leadConfig';

const STORAGE_KEY = 'jasvi_institutional_leads';

/**
 * Get all stored leads from localStorage
 */
export function getStoredLeads() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Failed to load leads from localStorage', err);
    return [];
  }
}

/**
 * Save a lead to local storage
 */
export function saveLeadToStorage(lead) {
  try {
    const leads = getStoredLeads();
    leads.unshift(lead);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
  } catch (err) {
    console.error('Failed to save lead to localStorage', err);
  }
}

/**
 * Submit lead to Google Forms (if configured)
 */
async function submitToGoogleForms(lead) {
  if (!LEAD_CONFIG.googleFormActionUrl) return false;

  try {
    const formData = new FormData();
    const entries = LEAD_CONFIG.googleFormEntries;

    if (entries.facilityName) formData.append(entries.facilityName, lead.facilityName || '');
    if (entries.contactName)  formData.append(entries.contactName,  lead.contactName || '');
    if (entries.phone)        formData.append(entries.phone,        lead.phone || '');
    if (entries.email)        formData.append(entries.email,        lead.email || '');
    if (entries.sector)       formData.append(entries.sector,       lead.sector || '');
    if (entries.address)      formData.append(entries.address,      lead.address || '');
    if (entries.orderItems)   formData.append(entries.orderItems,   lead.itemsSummary || '');
    if (entries.notes)        formData.append(entries.notes,        lead.notes || '');

    // Submit with no-cors so browser doesn't block Google Forms response
    await fetch(LEAD_CONFIG.googleFormActionUrl, {
      method: 'POST',
      mode: 'no-cors',
      body: formData
    });
    return true;
  } catch (err) {
    console.warn('Google Form submission attempted:', err);
    return false;
  }
}

/**
 * Submit lead to Excel / Google Sheets webhook (if configured)
 */
async function submitToSheetWebhook(lead) {
  if (!LEAD_CONFIG.sheetWebhookUrl) return false;

  try {
    await fetch(LEAD_CONFIG.sheetWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead)
    });
    return true;
  } catch (err) {
    console.warn('Sheet Webhook submission attempted:', err);
    return false;
  }
}

/**
 * Format items list as readable summary string
 */
export function formatItemsSummary(items = []) {
  if (!items.length) return 'General Inquiry (No specific items added)';
  return items.map((item, idx) => {
    return `${idx + 1}. ${item.name} (${item.qty} ${item.unit || 'units'}, ${item.packageSize || 'standard'})`;
  }).join('; ');
}

/**
 * Main function to record an institutional lead
 */
export async function submitLead(formData, cartItems = []) {
  const leadId = `JE-LEAD-${Math.floor(100000 + Math.random() * 900000)}`;
  const now = new Date();
  const timestamp = now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  const itemsSummary = formatItemsSummary(cartItems);

  const leadRecord = {
    id: leadId,
    timestamp,
    facilityName: formData.facilityName || '',
    contactName: formData.contactName || '',
    phone: formData.phone || '',
    email: formData.email || '',
    sector: formData.sector || 'Company',
    address: formData.address || '',
    notes: formData.notes || '',
    itemsCount: cartItems.reduce((acc, curr) => acc + curr.qty, 0),
    items: cartItems.map(item => ({
      id: item.id,
      name: item.name,
      qty: item.qty,
      unit: item.unit || 'unit',
      packageSize: item.packageSize || '',
      dept: item.dept || ''
    })),
    itemsSummary,
    status: 'New Inquiry'
  };

  // 1. Save locally so data is never lost
  saveLeadToStorage(leadRecord);

  // 2. Submit to Google Form if action URL configured
  await submitToGoogleForms(leadRecord);

  // 3. Submit to Sheet Webhook if configured
  await submitToSheetWebhook(leadRecord);

  return leadRecord;
}

/**
 * Export leads to Excel-ready CSV (with UTF-8 BOM for direct Excel compatibility)
 */
export function exportLeadsToExcel(leads = null) {
  const data = leads || getStoredLeads();
  if (!data || data.length === 0) {
    alert('No lead records found yet. Submit a wholesale requisition to generate the first lead!');
    return;
  }

  const headers = [
    'Lead ID',
    'Date & Time',
    'Organization / Facility',
    'Contact Person',
    'Phone / WhatsApp',
    'Email',
    'Sector',
    'Delivery Address',
    'Total Items Count',
    'Requested Products & Quantities',
    'Special Instructions / Notes',
    'Status'
  ];

  const escapeCSV = (val) => {
    if (val === null || val === undefined) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = data.map(lead => [
    escapeCSV(lead.id),
    escapeCSV(lead.timestamp),
    escapeCSV(lead.facilityName),
    escapeCSV(lead.contactName),
    escapeCSV(lead.phone),
    escapeCSV(lead.email),
    escapeCSV(lead.sector),
    escapeCSV(lead.address),
    escapeCSV(lead.itemsCount),
    escapeCSV(lead.itemsSummary),
    escapeCSV(lead.notes),
    escapeCSV(lead.status)
  ]);

  const csvContent = '\uFEFF' + [
    headers.map(escapeCSV).join(','),
    ...rows.map(r => r.join(','))
  ].join('\r\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `Jasvi_Enterprises_Leads_${new Date().toISOString().slice(0,10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Generate formatted text for direct WhatsApp quotation request
 */
export function generateWhatsAppQuoteText(lead) {
  let text = `*JASVI ENTERPRISES - WHOLESALE QUOTATION REQUEST*\n`;
  text += `*Lead Ref:* ${lead.id}\n`;
  text += `*Institution:* ${lead.facilityName || 'Valued Client'}\n`;
  text += `*Contact Person:* ${lead.contactName} (${lead.phone || 'N/A'})\n`;
  if (lead.email) text += `*Email:* ${lead.email}\n`;
  text += `*Sector:* ${lead.sector || 'Institutional Partner'}\n`;
  text += `*Delivery Address:* ${lead.address || 'Hosur / TN'}\n\n`;
  text += `*Requested Wholesale Products:*\n`;

  if (lead.items && lead.items.length) {
    lead.items.forEach((item, index) => {
      text += `${index + 1}. ${item.name} - Qty: ${item.qty} ${item.unit || 'units'} (${item.packageSize || 'standard'})\n`;
    });
  } else {
    text += `Wholesale catalog quotation for ${lead.sector || 'general'} supplies.\n`;
  }

  if (lead.notes) text += `\n*Special Notes:* ${lead.notes}\n`;
  text += `\nPlease provide wholesale rate quotation with dispatch schedule.`;
  return text;
}
