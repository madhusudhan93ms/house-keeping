import React from 'react';
import { Mail, MapPin, ShieldCheck, Phone, FileSpreadsheet } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { LEAD_CONFIG, getWhatsAppUrl } from '../config/leadConfig';

export default function Footer({ onOpenAdminPreview }) {
  const handleWhatsAppContact = () => {
    window.open(getWhatsAppUrl("Hello Jasvi Enterprises, I would like to request wholesale product pricing."), '_blank');
  };

  return (
    <footer className="bg-slate-100 text-slate-600 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/je-logo-sm.webp"
                alt="Jasvi Enterprises Logo"
                width="44"
                height="44"
                loading="lazy"
                decoding="async"
                className="w-11 h-11 object-contain rounded-xl drop-shadow-sm"
              />
              <div>
                <div className="font-extrabold text-lg text-slate-900 tracking-tight">
                  JASVI <span className="text-teal-600">ENTERPRISES</span>
                </div>
                <div className="text-[10px] text-teal-700 font-bold uppercase tracking-widest">
                  Your Needs Our Priority
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
              Wholesale supplier of Stationery & Housekeeping Materials for Companies, Offices, Hospitals, Colleges & Schools in Hosur.
            </p>

            <button
              type="button"
              onClick={handleWhatsAppContact}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 border border-emerald-400/30 shadow-md shadow-emerald-700/20 transition-all cursor-pointer"
            >
              <WhatsAppIcon size={15} className="text-white shrink-0" />
              <span>WhatsApp Inquiries</span>
            </button>
          </div>

          {/* Quick Contact & Hub */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
              Hosur Distribution Hub
            </h4>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-start gap-2 text-slate-600">
                <MapPin size={16} className="text-teal-600 flex-shrink-0 mt-0.5" />
                <span className="leading-snug">
                  {LEAD_CONFIG.fullAddress}
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Phone size={15} className="text-teal-600 flex-shrink-0" />
                <a href={`tel:${LEAD_CONFIG.phoneTel}`} className="hover:text-teal-700 font-medium transition-colors">
                  {LEAD_CONFIG.displayPhone}
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Mail size={15} className="text-teal-600 flex-shrink-0" />
                <a href={`mailto:${LEAD_CONFIG.contactEmail}`} className="hover:text-teal-700 font-medium transition-colors break-all">
                  {LEAD_CONFIG.contactEmail}
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-500 pt-1">
                <ShieldCheck size={15} className="text-teal-600 flex-shrink-0" />
                <span>GST NUMBER: NIL</span>
              </div>
            </div>
          </div>

          {/* Materials Category Links */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
              Key Wholesale Supplies
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm list-none p-0 m-0">
              {['A4 Copier Paper (JK / Reams)', 'Hardbound Registers & Files', 'Floor & Surface Cleaners (5L)', 'Disinfectant Concentrates (5L)', 'Liquid Hand Soap Refills', 'Heavy Industrial Waste Bags'].map(item => (
                <li key={item}>
                  <a href="#materials" className="text-slate-600 hover:text-teal-700 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation & Admin Portal */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm list-none p-0 m-0 mb-5">
              {[
                { label: 'Sectors We Supply', href: '#sectors' },
                { label: 'Key Materials Showcase', href: '#materials' },
                { label: 'Why Choose Jasvi', href: '#why-us' },
                { label: 'Client Reviews', href: '#reviews' },
                { label: 'Supply Network (TN & KA)', href: '#coverage' },
                { label: 'Request Wholesale Quote', href: '#lead-form' },
                { label: 'Hosur Hub & FAQ', href: '#faq' }
              ].map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="text-slate-600 hover:text-teal-700 transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* B2B Regional Directory & Product Hubs (SEO Internal Link Network) */}
        <div className="pt-8 pb-6 border-t border-slate-200">
          <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
            Wholesale B2B Distribution Network &amp; Regional Hubs:
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-600">
            <a href="/housekeeping-materials" className="hover:text-teal-700 transition-colors">Housekeeping Materials Hosur</a>
            <span className="text-slate-300">•</span>
            <a href="/stationery" className="hover:text-teal-700 transition-colors">Stationery Supplier Hosur</a>
            <span className="text-slate-300">•</span>
            <a href="/office-stationery-supplier" className="hover:text-teal-700 transition-colors">Office Stationery Hosur</a>
            <span className="text-slate-300">•</span>
            <a href="/housekeeping-materials-supplier" className="hover:text-teal-700 transition-colors">Commercial Cleaning Chemicals</a>
            <span className="text-slate-300">•</span>
            <a href="/hospital-supplies" className="hover:text-teal-700 transition-colors">Hospital Disinfectants Hosur</a>
            <span className="text-slate-300">•</span>
            <a href="/school-college-supplies" className="hover:text-teal-700 transition-colors">School &amp; College Supplies</a>
            <span className="text-slate-300">•</span>
            <a href="/corporate-supplies" className="hover:text-teal-700 transition-colors">Corporate Office Restock</a>
            <span className="text-slate-300">•</span>
            <a href="/locations/hosur" className="hover:text-teal-700 transition-colors">SIPCOT Hosur Hub</a>
            <span className="text-slate-300">•</span>
            <a href="/locations/tamil-nadu" className="hover:text-teal-700 transition-colors">Tamil Nadu Supply</a>
            <span className="text-slate-300">•</span>
            <a href="/locations/karnataka" className="hover:text-teal-700 transition-colors">Bengaluru &amp; Karnataka</a>
            <span className="text-slate-300">•</span>
            <a href="/wholesale-supply-india" className="hover:text-teal-700 transition-colors">Pan-India Wholesale Supply</a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 text-center sm:text-left">
          <div 
            onDoubleClick={onOpenAdminPreview}
            className="cursor-default select-none"
            title="Jasvi Enterprises"
          >
            © {new Date().getFullYear()} <strong className="text-slate-700">Jasvi Enterprises</strong>. Hosur, Tamil Nadu. Official Wholesale Supplier.
          </div>
          <div>
            All deliveries accompanied by official delivery challan & GST vouchers.
          </div>
        </div>

      </div>
    </footer>
  );
}
