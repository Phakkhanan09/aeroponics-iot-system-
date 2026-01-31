import React, { useState } from 'react';
import { Camera, RefreshCw, Maximize2, AlertCircle } from 'lucide-react';

const CameraView = ({ imageUrl, onCapture, isCapturing }) => {
  return (
    <div className="camera-card">
      <div className="p-5 flex justify-between items-center border-b">
        <h3 className="font-bold text-slate-700">ภาพถ่ายรากมันฝรั่ง</h3>
        <span className="text-[10px] bg-slate-100 px-2 py-1 rounded-md font-bold">SNAPSHOT</span>
      </div>

      <div className="video-frame">
        {imageUrl ? (
          <img src={imageUrl} alt="Garden" className="w-full h-full object-cover" />
        ) : (
          <div className="flex items-center justify-center h-full text-white/20">ยังไม่มีภาพถ่าย</div>
        )}
        
        {/* Shutter Effect ตอนกำลังโหลด */}
        {isCapturing && (
          <div className="absolute inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        )}
      </div>

      <div className="p-4">
        <button 
          onClick={onCapture}
          disabled={isCapturing}
          className={`w-full btn-base ${isCapturing ? 'bg-slate-300' : 'btn-primary'}`}
        >
          {isCapturing ? 'กำลังถ่ายภาพ...' : 'กดเพื่อถ่ายภาพใหม่'}
        </button>
      </div>
    </div>
  );
};
export default CameraView;