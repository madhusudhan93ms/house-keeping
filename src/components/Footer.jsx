import React from 'react';
import { Mail, MapPin, Lock, ArrowUpRight, MessageSquare, ShieldCheck } from 'lucide-react';

export default function Footer({ onOpenAdminPreview, onExploreCatalog }) {
  const handleWhatsAppContact = () => {
    const text = encodeURIComponent("Hello Jasvi Enterprises, I would like to request wholesale product pricing.");
    window.open(`https://wa.me/919487000000?text=${text}`, '_blank');
  };

  return (
    <footer className="bg-gradient-to-br from-slate-900 to-[#0b1528] text-slate-300">
      <div className="w-full max-w-[1320px] mx-auto px-5 pt-12 pb-6">
        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Brand Col */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="je-logo-badge small">
                <div className="je-logo-inner">
                  <span className="je-letter-j">J</span>
                  <span className="je-letter-e">E</span>
                </div>
              </div>
              <div>
                <div className="font-[var(--font-heading)] text-[1.15rem] font-extrabold text-white tracking-tight leading-tight">
                  JASVI <span className="text-sky-400">ENTERPRISES</span>
                </div>
                <div className="text-[0.62rem] text-emerald-400 font-bold tracking-widest uppercase">
                  YOUR NEEDS OUR PRIORITY
                </div>
              </div>
            </div>

            <p className="text-[0.88rem] text-slate-400 leading-relaxed mb-4">
              Wholesale supplier of Stationery & Housekeeping Materials for Companies, Offices, Hospitals, Colleges & Schools in Hosur.
            </p>

            <div className="flex flex-col gap-2 mb-4">
              <div className="flex items-center gap-2 text-[0.82rem]">
                <Mail size={15} className="text-sky-400 flex-shrink-0" />
                <a href="mailto:jasvienterprises28@gmail.com" className="text-slate-300 hover:text-sky-300 no-underline transition-colors">
                  jasvienterprises28@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-2 text-[0.82rem]">
                <MapPin size={15} className="text-sky-400 flex-shrink-0 mt-0.5" />
                <span>Survey No. 193-1A1, Zuzuwadi, Hosur 1st Cross, Krishnagiri, Tamil Nadu</span>
              </div>
              <div className="flex items-center gap-2 text-[0.82rem]">
                <ShieldCheck size={15} className="text-emerald-400 flex-shrink-0" />
                <span>GST NUMBER: NIL</span>
              </div>
            </div>

            <button
              className="btn-whatsapp inline-flex items-center gap-1.5 font-semibold text-[0.85rem] px-4 py-2 rounded-[8px] transition-all duration-250"
              onClick={handleWhatsAppContact}
            >
              <MessageSquare size={15} />
              <span>WhatsApp Inquiry</span>
            </button>
          </div>

          {/* Stationery Items */}
          <div>
            <h4 className="text-white font-bold text-[0.95rem] mb-4">Stationery Items</h4>
            <ul className="flex flex-col gap-2 list-none m-0 p-0">
              {['Copier Paper (A4 / Legal)', 'Notebooks & Registers', 'Pens, Pencils & Markers', 'Files & Box Folders', 'Desk Stationery & Staplers'].map((item) => (
                <li key={item}>
                  <a href="#catalog" onClick={onExploreCatalog} className="text-slate-400 hover:text-white text-[0.85rem] no-underline transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Housekeeping */}
          <div>
            <h4 className="text-white font-bold text-[0.95rem] mb-4">Housekeeping Materials</h4>
            <ul className="flex flex-col gap-2 list-none m-0 p-0">
              {['Disinfectants & Chemicals (5L)', 'Floor & Glass Cleaner (5L)', 'Liquid Hand Wash (5L)', 'Tissue Napkins & Towels', 'Garbage Bags & Cleaning Mops'].map((item) => (
                <li key={item}>
                  <a href="#catalog" onClick={onExploreCatalog} className="text-slate-400 hover:text-white text-[0.85rem] no-underline transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Supply For */}
          <div>
            <h4 className="text-white font-bold text-[0.95rem] mb-4">Our Supply For</h4>
            <ul className="flex flex-col gap-2 list-none m-0 p-0">
              {[
                { label: 'Companies & Factories', href: '#sectors' },
                { label: 'Corporate Offices',     href: '#sectors' },
                { label: 'Hospitals & Clinics',   href: '#sectors' },
                { label: 'Colleges & Schools',    href: '#sectors' },
                { label: 'Restock Estimator',     href: '#calculator' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="text-slate-400 hover:text-white text-[0.85rem] no-underline transition-colors">
                    {label}
                  </a>
                </li>
              ))}
              <li>
                <button
                  onClick={onOpenAdminPreview}
                  className="flex items-center gap-1.5 bg-transparent border-none text-sky-400 hover:text-sky-300 cursor-pointer text-[0.85rem] p-0 mt-1 transition-colors"
                >
                  <Lock size={12} />
                  <span>Hosur Hub Portal</span>
                  <ArrowUpRight size={12} />
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-5 border-t border-white/10 text-[0.82rem] text-slate-500">
          <div>
            © {new Date().getFullYear()} <strong className="text-slate-400">Jasvi Enterprises</strong>. Hosur, Tamil Nadu. GST NUMBER: NIL.
          </div>
          <div className="flex gap-5 flex-wrap">
            <a href="mailto:jasvienterprises28@gmail.com" className="text-slate-500 hover:text-slate-300 no-underline transition-colors">
              jasvienterprises28@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
