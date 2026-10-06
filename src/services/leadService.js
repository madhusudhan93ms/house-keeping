import { LEAD_CONFIG } from '../config/leadConfig';
import { apiClient } from './apiClient';

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
 * Employs apiClient with timeout [Rule 7], retry [Rule 16], and error handling [Rule 3]
 */
async function submitToGoogleForms(lead) {
  if (!LEAD_CONFIG.googleFormActionUrl) return { success: false, reason: 'unconfigured' };

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

    // Submit via apiClient with timeout and error handling
    return await apiClient.post(LEAD_CONFIG.googleFormActionUrl, formData, {
      mode: 'no-cors',
      timeoutMs: 10000,
      retries: 1
    });
  } catch (err) {
    console.warn('Google Form submission attempted:', err);
    return { success: false, error: err.message };
  }
}

// Purge any legacy webhook overrides from localStorage to prevent URL hijacking or data exfiltration
try {
  localStorage.removeItem('jasvi_google_sheet_webhook_url');
  localStorage.removeItem('jasvi_google_sheet_iframe_url');
} catch (e) {
  // ignore in non-browser context
}

/**
 * Submit lead to Excel / Google Sheets webhook (Google Apps Script Web App)
 * Permanently locked to verified Google Apps Script endpoint to prevent URL hijacking
 * Employs apiClient with timeout [Rule 7], retry [Rule 16], rate limiting [Rule 18], dev logging [Rule 19]
 */
async function submitToSheetWebhook(lead) {
  const webhookUrl = LEAD_CONFIG.sheetWebhookUrl;

  if (!webhookUrl || !webhookUrl.startsWith('https://script.google.com/macros/s/')) {
    return { success: false, error: 'Invalid Google Apps Script Webhook URL' };
  }

  try {
    // Send via apiClient: handles timeout (10s), retry, rate limit cooldown, dev logging
    return await apiClient.post(webhookUrl, JSON.stringify(lead), {
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      timeoutMs: 10000,
      retries: 1
    });
  } catch (err) {
    console.warn('Sheet Webhook submission attempted:', err);
    return { success: false, error: err.message };
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
 * Synchronize status update to Google Sheets Webhook
 * Permanently locked to official Google Apps Script endpoint
 */
export async function syncLeadStatusToSheet(leadId, newStatus) {
  const webhookUrl = LEAD_CONFIG.sheetWebhookUrl;

  if (!webhookUrl || !webhookUrl.startsWith('https://script.google.com/macros/s/')) {
    return false;
  }

  try {
    return await apiClient.post(webhookUrl, JSON.stringify({
      action: "UPDATE_STATUS",
      leadId,
      status: newStatus,
      acceptedAt: newStatus === 'ACCEPTED' ? new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) : null
    }), {
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      timeoutMs: 10000,
      retries: 1
    });
  } catch (err) {
    console.warn('Google Sheet status sync attempted:', err);
    return false;
  }
}

/**
 * Update the status of an existing lead (e.g., 'NEW' -> 'ACCEPTED')
 * Persists locally and synchronizes with Google Sheets Webhook
 */
export function updateLeadStatus(leadId, newStatus) {
  try {
    const leads = getStoredLeads();
    const updated = leads.map(l => {
      if (l.id === leadId) {
        return { 
          ...l, 
          status: newStatus,
          acceptedAt: newStatus === 'ACCEPTED' 
            ? new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) 
            : (newStatus === 'NEW' ? null : l.acceptedAt)
        };
      }
      return l;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    // Asynchronously notify Google Sheet webhook
    syncLeadStatusToSheet(leadId, newStatus).catch(() => {});

    return updated;
  } catch (err) {
    console.error('Failed to update lead status:', err);
    return getStoredLeads();
  }
}

/**
 * Main function to record an institutional lead
 * Implements [Rule 5] Validation, [Rule 15] Local Caching/Persistence, [Rule 1/3] Safe API dispatch
 */
export async function submitLead(formData, cartItems = []) {
  // [Rule 5] Input Validation
  if (!formData?.facilityName?.trim()) {
    throw new Error('Please enter your Company / Institution / Factory Name.');
  }
  if (!formData?.contactName?.trim()) {
    throw new Error('Please enter the Contact Person Name.');
  }
  if (!formData?.phone?.trim()) {
    throw new Error('Please enter your Phone / WhatsApp Number.');
  }

  const leadId = `JE-LEAD-${Math.floor(100000 + Math.random() * 900000)}`;
  const now = new Date();
  const timestamp = now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  const itemsSummary = formatItemsSummary(cartItems);

  const leadRecord = {
    id: leadId,
    timestamp,
    facilityName: formData.facilityName.trim(),
    contactName: formData.contactName.trim(),
    phone: formData.phone.trim(),
    email: (formData.email || '').trim(),
    sector: formData.sector || 'Company',
    address: (formData.address || '').trim(),
    notes: (formData.notes || '').trim(),
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
    status: 'NEW', // Default status: NEW
    acceptedAt: null
  };

  // 1. [Rule 15] Save locally so requisition is never lost even if offline
  saveLeadToStorage(leadRecord);

  // 2. [Rule 1/3/7/16] Submit to Google Form if action URL configured
  const formResult = await submitToGoogleForms(leadRecord);

  // 3. [Rule 1/3/7/16] Submit to Sheet Webhook (Google Apps Script)
  const sheetResult = await submitToSheetWebhook(leadRecord);

  return {
    ...leadRecord,
    cloudTransmitted: Boolean(sheetResult?.success || formResult?.success)
  };
}

/**
 * Export leads to Excel-ready CSV with 2 distinct sections:
 * 1. 📥 NEW REQUISITIONS (PENDING / TO REVIEW)
 * 2. ✅ ACCEPTED REQUISITIONS (PROCESSED / DISPATCHED)
 */
export function exportLeadsToExcel(leads = null) {
  const data = leads || getStoredLeads();
  if (!data || data.length === 0) {
    alert('No lead records found yet. Submit a wholesale requisition to generate the first lead!');
    return;
  }

  const escapeCSV = (val) => {
    if (val === null || val === undefined) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const newLeads = data.filter(l => l.status === 'NEW' || !l.status || l.status === 'New Inquiry');
  const acceptedLeads = data.filter(l => l.status === 'ACCEPTED' || l.status === 'Dispatched' || l.status === 'Packing');

  const headers = [
    'Status',
    'Lead ID',
    'Date & Time',
    'Organization / Facility',
    'Contact Person',
    'Phone / WhatsApp',
    'Email / GSTIN',
    'Buyer Type',
    'Delivery Address',
    'Total Items Count',
    'Requested Materials & Supplies',
    'Special Instructions / Notes',
    'Accepted Date'
  ];

  const mapLeadToRow = (lead) => [
    escapeCSV(lead.status || 'NEW'),
    escapeCSV(lead.id),
    escapeCSV(lead.timestamp),
    escapeCSV(lead.facilityName),
    escapeCSV(lead.contactName),
    escapeCSV(lead.phone ? `'${lead.phone}` : ''),
    escapeCSV(lead.email),
    escapeCSV(lead.sector),
    escapeCSV(lead.address),
    escapeCSV(lead.itemsCount || 1),
    escapeCSV(lead.itemsSummary),
    escapeCSV(lead.notes),
    escapeCSV(lead.acceptedAt || '')
  ];

  const csvLines = [
    'sep=,',
    escapeCSV('========================================================================================='),
    escapeCSV('JASVI ENTERPRISES - INSTITUTIONAL WHOLESALE REQUISITIONS & ORDER TRACKER'),
    escapeCSV('Account: jasvienterprises28@gmail.com | Hosur Distribution Hub (+91 76390 93837)'),
    escapeCSV('========================================================================================='),
    '',
    escapeCSV(`--- [SECTION 1: NEW REQUISITIONS (${newLeads.length} PENDING REVIEW)] ---`),
    headers.map(escapeCSV).join(','),
    ...newLeads.map(l => mapLeadToRow(l).join(',')),
    '',
    '',
    escapeCSV(`--- [SECTION 2: ACCEPTED REQUISITIONS (${acceptedLeads.length} CONFIRMED / DISPATCHED)] ---`),
    headers.map(escapeCSV).join(','),
    ...acceptedLeads.map(l => mapLeadToRow(l).join(',')),
    '',
    escapeCSV('=========================================================================================')
  ];

  const csvContent = '\uFEFF' + csvLines.join('\r\n');

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
