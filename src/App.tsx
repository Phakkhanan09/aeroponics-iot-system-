import React, { useState, useRef } from 'react';
import { Settings2, Activity, Thermometer, Droplets, Zap, Wind } from 'lucide-react';
import './App.css';

import Dashboard from './components/Dashboard.jsx';
import CameraView from './components/CameraView.jsx';
import TimerModal from './components/TimerModal.jsx';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('fog'); // 'fog' | 'light'
  const [isFogging, setIsFogging] = useState(false);
  const [isLight, setIsLight] = useState(false);
  const [isAutoMode, setIsAutoMode] = useState(true);
  const [toast, setToast] = useState('');
  const toastTimerRef = useRef(null);

  const onOpenSetting = (mode = 'fog') => {
    setModalMode(mode);
    setIsModalOpen(true);
  };

  const showToast = (message) => {
    setToast(message);
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = setTimeout(() => setToast(''), 2500);
  };

  const [stats] = useState({
    temp: 28.5,
    humidity: 75,
    ec: 1.2,
    ph: 6.2,
    lastUpdate: new Date().toLocaleTimeString('th-TH')
  });

  const sensorData = [
    { icon: Thermometer, label: 'อุณหภูมิ', value: stats.temp, unit: '°C', color: 'text-orange-500 bg-orange-50', progress: 65 },
    { icon: Droplets, label: 'ความชื้น', value: stats.humidity, unit: '%', color: 'text-blue-500 bg-blue-50', progress: 75 },
    { icon: Zap, label: 'ค่า EC (ปุ๋ย)', value: stats.ec, unit: 'mS/cm', color: 'text-yellow-500 bg-yellow-50', progress: 40 },
    { icon: Wind, label: 'ค่า pH', value: stats.ph, unit: 'pH', color: 'text-purple-500 bg-purple-50', progress: 60 }
  ];

  return (
    <div className="main-layout">
      <header className="max-w-7xl mx-auto flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-black">
            Aeroponic <span className="text-emerald-600 underline decoration-emerald-200">potato planter</span>
          </h1>
          <p className="text-slate-500 font-medium">ระบบควบคุมการปลูกมันฝรั่งแบบ Aeroponics</p>
        </div>

        <div className="flex items-center gap-3">
          <span className={`text-xs font-bold px-3 py-1 rounded-full ${isAutoMode ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
            {isAutoMode ? 'AUTO' : 'MANUAL'}
          </span>
          <button
            onClick={() => setIsAutoMode((prev) => !prev)}
            className={`p-3 rounded-2xl shadow-sm border transition-colors ${isAutoMode ? 'bg-emerald-600 border-emerald-500 text-white hover:bg-emerald-700' : 'bg-white border-slate-100 text-slate-400 hover:text-amber-600'}`}
            title={isAutoMode ? 'สลับเป็นโหมด Manual' : 'สลับเป็นโหมด Auto'}
            aria-label={isAutoMode ? 'สลับเป็นโหมด Manual' : 'สลับเป็นโหมด Auto'}
          >
            <Settings2 />
          </button>
        </div>
      </header>

      <div className="dashboard-grid">
        <Dashboard
          sensors={sensorData}
          isFogging={isFogging}
          setIsFogging={setIsFogging}
          isLight={isLight}
          setIsLight={setIsLight}
          onOpenSetting={onOpenSetting}
          onNotify={showToast}
          isAutoMode={isAutoMode}
        />

        <div className="lg:col-span-4 space-y-8">
          <CameraView streamUrl="http://192.168.1.50:81/stream" />

          <div className="report-card">
            <h4 className="font-black text-slate-800 mb-6 flex items-center gap-2">
              <Activity size={18} className="text-emerald-500" /> รายงานวันนี้
            </h4>
            <div className="space-y-4">
              {[
                { l: 'พ่นหมอก', v: '48 รอบ' },
                { l: 'ใช้น้ำ', v: '1.2 ลิตร' },
                { l: 'สถานะปั๊ม', v: 'ปกติ' }
              ].map((item, i) => (
                <div key={i} className="flex justify-between py-3 border-b border-slate-50 last:border-0">
                  <span className="text-slate-400 text-sm font-medium">{item.l}</span>
                  <span className="text-slate-700 font-bold">{item.v}</span>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-center text-slate-300 mt-6">อัปเดตล่าสุดเมื่อ {stats.lastUpdate}</p>
          </div>
        </div>
      </div>

      <TimerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        onNotify={showToast}
      />

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 rounded-2xl bg-slate-900 text-white px-4 py-3 shadow-lg shadow-slate-200 text-sm font-semibold">
          {toast}
        </div>
      )}
    </div>
  );
}
