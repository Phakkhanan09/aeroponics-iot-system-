import React, { useState } from 'react';
import { X, Clock, Plus, Trash2 } from 'lucide-react';
import CustomButton from './CustomButton';

const TimerModal = ({ isOpen, onClose, mode = 'fog', onNotify }) => {
  const [schedules, setSchedules] = useState(['13:00', '17:00', '21:00']);
  const [newTime, setNewTime] = useState('');
  const [durationHours, setDurationHours] = useState(4);

  if (!isOpen) return null;

  const addTime = () => {
    if (newTime && !schedules.includes(newTime)) {
      setSchedules([...schedules, newTime].sort());
      setNewTime('');
    }
  };

  const removeTime = (time) => {
    setSchedules(schedules.filter((t) => t !== time));
  };

  const isLightMode = mode === 'light';
  const notify = onNotify || (() => {});

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="p-6 bg-emerald-600 text-white flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Clock size={20} />
            <h3 className="font-bold">
              {isLightMode ? 'ตั้งเวลาเปิด-ปิดไฟ' : 'ตั้งเวลาพ่นอัตโนมัติ'}
            </h3>
          </div>
          <button onClick={onClose}><X /></button>
        </div>

        <div className="p-6 space-y-6">
          {!isLightMode && (
            <>
              <div className="flex gap-2">
                <input
                  type="time"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="time-input flex-1"
                />
                <button
                  onClick={addTime}
                  className="bg-emerald-100 text-emerald-600 p-3 rounded-xl hover:bg-emerald-200"
                >
                  <Plus size={24} />
                </button>
              </div>

              <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">รายการเวลาทำงาน</p>
                {schedules.map((time) => (
                  <div key={time} className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <span className="text-xl font-mono font-bold text-slate-700">{time} น.</span>
                    <button onClick={() => removeTime(time)} className="text-rose-400 hover:text-rose-600">
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {isLightMode && (
            <div className="space-y-3">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ตั้งระยะเวลาเปิดไฟ</p>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min={1}
                  max={24}
                  value={durationHours}
                  onChange={(e) => setDurationHours(Number(e.target.value))}
                  className="time-input w-28"
                />
                <span className="text-slate-500 font-medium">ชั่วโมง</span>
              </div>
              <p className="text-xs text-slate-400">ระบบจะเปิดไฟตามจำนวนชั่วโมงที่กำหนด</p>
            </div>
          )}

          <div className="pt-4 flex gap-3">
            <CustomButton onClick={onClose} variant="secondary" className="flex-1">ปิด</CustomButton>
            <CustomButton
              onClick={() => {
                notify(
                  isLightMode
                    ? `บันทึกระยะเวลาเปิดไฟ ${durationHours} ชั่วโมง`
                    : 'บันทึกตารางเวลาส่งไปยัง ESP32 แล้ว'
                );
                onClose();
              }}
              className="flex-1"
            >
              บันทึกค่า
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimerModal;
