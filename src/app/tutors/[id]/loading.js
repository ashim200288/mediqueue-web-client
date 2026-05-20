import React from 'react';

const Loading = () => {
    return (
        <div className="min-h-[80vh] w-full flex flex-col items-center justify-center bg-white dark:bg-slate-950 px-4">
            <div className="flex flex-col items-center max-w-xs text-center space-y-6">
                
               
                <div className="relative flex items-center justify-center w-20 h-20">
                    
                    <div className="absolute inset-0 border-4 border-[#1e6b65] border-opacity-20 rounded-full animate-ping [animation-duration:1.5s]" />
                    
                    
                    <div className="absolute inset-2 border-4 border-dashed border-[#1e6b65] rounded-full animate-spin [animation-duration:3s]" />
                    
                    
                    <div className="absolute inset-5 border-4 border-[#1e6b65] border-t-transparent rounded-full animate-spin" />
                </div>

                
                <div className="space-y-2">
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">
                        Finding Best Tutors
                    </h2>
                    <p className="text-xs font-semibold text-[#1e6b65] tracking-widest uppercase animate-pulse">
                        Please wait a moment...
                    </p>
                </div>

               
                <div className="w-32 h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#1e6b65] to-transparent w-full h-full animate-[pulse_1.5s_infinite] opacity-75" />
                    <div className="absolute inset-y-0 left-0 bg-[#1e6b65] w-full h-full rounded-full animate-[pulse_2s_infinite]" />
                </div>
            </div>
        </div>
    );
};

export default Loading;