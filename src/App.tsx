import React, { useState } from 'react';
import { Settings2, Activity, Thermometer, Droplets, Zap, Wind } from 'lucide-react';
import './App.css'; // เรียกใช้ CSS ที่เราแยกไว้

import Dashboard from './components/Dashboard.jsx';
import CameraView from './components/CameraView.jsx';

export default function App() {
  const [stats] = useState({ temp: 28.5, humidity: 75, ec: 1.2, ph: 6.2, lastUpdate: new Date().toLocaleTimeString('th-TH') });
  const [isFogging, setIsFogging] = useState(false);
  const [isLight, setIsLight] = useState(false);

  const sensorData = [
    { icon: Thermometer, label: "อุณหภูมิ", value: stats.temp, unit: "°C", color: "text-orange-500 bg-orange-50", progress: 65 },
    { icon: Droplets, label: "ความชื้น", value: stats.humidity, unit: "%", color: "text-blue-500 bg-blue-50", progress: 75 },
    { icon: Zap, label: "ค่าปุ๋ย (EC)", value: stats.ec, unit: "mS/cm", color: "text-yellow-500 bg-yellow-50", progress: 40 },
    { icon: Wind, label: "ค่า pH", value: stats.ph, unit: "pH", color: "text-purple-500 bg-purple-50", progress: 60 }
  ];

  return (
    <div className="main-layout">
      <header className="max-w-7xl mx-auto flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-black"> Aeroponic <span className="text-emerald-600 underline decoration-emerald-200">potato planter</span></h1>
          <p className="text-slate-500 font-medium">ระบบควบคุม Aeroponics </p>
        </div>
        <button className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 text-slate-400 hover:text-emerald-600"><Settings2 /></button>
      </header>

      <div className="dashboard-grid">
        <Dashboard
          sensors={sensorData}
          isFogging={isFogging}
          setIsFogging={setIsFogging}
          isLight={isLight}
          setIsLight={setIsLight}
        />
        
        <div className="lg:col-span-4 space-y-8">
          <CameraView streamUrl="http://192.168.1.50:81/stream" />
          <div className="report-card">
            <h4 className="font-black text-slate-800 mb-6 flex items-center gap-2"><Activity size={18} className="text-emerald-500" /> รายงานวันนี้</h4>
            <div className="space-y-4">
              {[{ l: 'พ่นหมอก', v: '48 รอบ' }, { l: 'ใช้น้ำ', v: '1.2 ลิตร' }, { l: 'ปั๊ม', v: 'ปกติ' }].map((item, i) => (
                <div key={i} className="flex justify-between py-3 border-b border-slate-50 last:border-0">
                  <span className="text-slate-400 text-sm font-medium">{item.l}</span>
                  <span className="text-slate-700 font-bold">{item.v}</span>s
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
