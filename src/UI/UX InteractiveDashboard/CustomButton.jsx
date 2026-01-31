import { Icon, icons } from "lucide-react";
import React from "react";

const CustomButton = ({ label, isActive, onclick, icon: Icon, isLoadeing }) => {
    return(
        <button
            onClick={onClick}
            disabled={isLoadeing}
            className={`
                relative flex items-center justifify-between w-full p-4 rounded-2xL transition-all duration-3oo front-semiblod
                ${isLoadeing ? 'opasity-50 cursor-not-allowed' : 'cursor-pointer active:scale-95'}
                ${isActive
                    ? 'bg-green-500 text-white shadow-lg shadow-green-200 ring-2 ring-green-600 ring-offset-2'
                    : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'
                }
            `}
        >
            <div className="flex item-center gap-3">
                {Icon && <Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-gray-400'}`} />}
                <span className="text-lg">{label}</span>
            </div>

            <div className="flex items-center ">
                {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                    <span className={`text-xs uppercase tracking-wider font-bold ${isActive ? 'text-green-100' : 'text-gray-400'}`}>
                        {isActive ? 'Active' : 'Off'}
                    </span>
                    )}
            </div>
        </button>
    );
};

export default CustomButton;