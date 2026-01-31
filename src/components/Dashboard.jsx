import React from 'react';
import { Activity, Play, Square } from 'lucide-react';
import CustomButton from './CustomButton';

const SensorItem = ({ icon: Icon, label, value, unit, color, progress }) => (
  <div className="sensor-card group">
    <div className="flex items-start justify-between mb-4">
      <div className={`sensor-icon-box ${color}`}><Icon size={24} /></div>
      <div className="text-right">
        <p className="sensor-label">{label}</p>
        <div className="flex items-baseline justify-end gap-1 mt-1">
          <span className="sensor-value">{value}</span>
          <span className="text-sm font-bold text-slate-400">{unit}</span>
        </div>
      </div>
    </div>
    <div className="progress-bar-bg">
      <div className={`h-full opacity-70 ${color.replace('text-', 'bg-')}`} style={{ width: `${progress}%` }}></div>
    </div>
  </div>
);

const Dashboard = ({ sensors, isFogging, setIsFogging, isLight, setIsLight, onOpenSetting, onNotify, isAutoMode }) => {
  const notify = onNotify || (() => {});
  const manualDisabled = isAutoMode; /*ถ้าเปิดโหมด Auto ไว้ ปุ่มกดมือ (Manual) ทั้งหมดจะถูกปิดใช้งานทันที*/ 
  return (
    <div className="lg:col-span-8 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sensors.map((s, i) => <SensorItem key={i} {...s} />)}
      </div>

      <div className="action-panel">
        <div className="panel-glow"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Activity size={20} className="text-emerald-400" /> แผงควบคุมระบบพ่นหมอก
            </h3>
                /*แผงควบคุมระบบพ่นหมอก (Fogging Control)*/
            <div className={`status-tag ${isFogging ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/10 text-slate-400'}`}>
              {isFogging ? 'กำลังพ่นหมอก...' : 'ระบบสแตนด์บาย'}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <CustomButton
              variant={isFogging ? 'secondary' : 'primary'}
              icon={Play}
              onClick={() => setIsFogging(true)}
              disabled={manualDisabled}
              className={manualDisabled ? 'opacity-50 cursor-not-allowed' : ''}
            >
              เริ่มพ่นหมอก
            </CustomButton>
            <CustomButton
              variant="danger"
              icon={Square}
              onClick={() => setIsFogging(false)}
              disabled={manualDisabled}
              className={manualDisabled ? 'opacity-50 cursor-not-allowed' : ''}
            >
              หยุดฉุกเฉิน
            </CustomButton>
            <CustomButton variant="secondary" className="btn-glass" onClick={() => { onOpenSetting('fog'); notify('เปิดหน้าตั้งเวลาพ่นหมอก'); }}>ตั้งค่าเวลา</CustomButton>
          </div>
        </div>
      </div>

      <div className="action-panel">
        <div className="panel-glow"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Activity size={20} className="text-emerald-400" /> แผงควบคุมระบบไฟ
            </h3>
            /*แผงควบคุมระบบไฟ (Light Control)*/
            <div className={`status-tag ${isLight ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/10 text-slate-400'}`}>
              {isLight ? 'เปิดไฟอยู่...' : 'ระบบสแตนด์บาย'}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <CustomButton
              variant={isLight ? 'secondary' : 'primary'}
              icon={Play}
              onClick={() => setIsLight(true)}
              disabled={manualDisabled}
              className={manualDisabled ? 'opacity-50 cursor-not-allowed' : ''}
            >
              เปิดไฟ
            </CustomButton>
            <CustomButton
              variant="danger"
              icon={Square}
              onClick={() => setIsLight(false)}
              disabled={manualDisabled}
              className={manualDisabled ? 'opacity-50 cursor-not-allowed' : ''}
            >
              ปิดไฟฉุกเฉิน
            </CustomButton>
            <CustomButton variant="secondary" className="btn-glass" onClick={() => { onOpenSetting('light'); notify('เปิดหน้าตั้งเวลาไฟ'); }}>ตั้งเวลาเปิด-ปิดไฟ</CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
