import React from 'react';
import { 
  HiOutlineClipboardList, 
  HiOutlineSearch, 
  HiOutlineDocumentText, 
  HiOutlineTruck, 
  HiOutlineCheckCircle 
} from 'react-icons/hi';
import { FaShip } from 'react-icons/fa';

const steps = [
  { id: 1, icon: HiOutlineClipboardList, title: "Inquiry & Quote", desc: "Send requirements, get FOB/CIF pricing" },
  { id: 2, icon: HiOutlineDocumentText, title: "Contract & Deposit", desc: "Sign PI, pay 30% T/T deposit" },
  { id: 3, icon: HiOutlineSearch, title: "Procurement & Deregistration", desc: "SGS inspection, cancel Chinese license plate" },
  { id: 4, icon: FaShip, title: "Customs & Loading", desc: "Export clearance, RoRo/Container loading, pay 70% balance" },
  { id: 5, icon: HiOutlineCheckCircle, title: "Shipping & B/L", desc: "Vessel departs, receive Telex Release B/L & Certificates" },
];

const ExportProcess = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-gray-50 border-y border-blue-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="inline-block bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">Export Process</div>
          <h2 className="text-3xl md:text-4xl font-black mb-4 text-gray-900">
            How B2B Export Works
          </h2>
          <p className="text-gray-500 text-lg">
            Simple 5-step process from inquiry to delivery
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Desktop Connecting Lines */}
          <div className="hidden md:block absolute top-[60px] left-[10%] right-[10%] border-t-2 border-dashed border-blue-200 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-4 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.id} className="flex flex-col items-center group">
                  {/* Step Circle */}
                  <div className="w-24 h-24 rounded-full bg-white border-4 border-white shadow-xl flex items-center justify-center mb-6 transition-all duration-300 transform group-hover:scale-110 group-hover:border-blue-500 group-hover:shadow-blue-200/50 group-hover:shadow-2xl relative">
                    <div className="flex items-center justify-center w-full h-full rounded-full bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                      <Icon className="text-4xl" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-md border-2 border-white">
                      {index + 1}
                    </div>
                  </div>

                  {/* Text */}
                  <div className="text-center px-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed max-w-[200px] mx-auto">
                      {step.desc}
                    </p>
                  </div>

                  {/* Mobile vertical connector */}
                  {index < steps.length - 1 && (
                    <div className="md:hidden w-0.5 h-12 border-l-2 border-dashed border-blue-200 mt-6" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExportProcess;
