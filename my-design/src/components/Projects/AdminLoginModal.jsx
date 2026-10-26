// src/components/AdminLoginModal.jsx
import React, { useState } from 'react';
import { FiX, FiAlertCircle, FiEye, FiEyeOff, FiLock } from 'react-icons/fi';
import { FaUserEdit } from "react-icons/fa";

const AdminLoginModal = ({ isOpen, onClose, onLogin, isLoading, error }) => {
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
    if (!password) {
      setLocalError('Please enter password');
      return;
    }
    setLocalError('');
    onLogin(password);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  if (!isOpen) return null;

  

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="relative bg-white rounded-2xl w-[450px] max-w-full overflow-visible shadow-2xl" onClick={(e) => e.stopPropagation()}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4  right-4 z-20 w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center transition-all duration-300 shadow-sm"
        >
          <FiX className="w-4 h-4 text-gray-500" />
        </button>
        
        {/* Admin Icon - نصفها خارج الإطار */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-20">
          <div className="w-[110px] h-[110px] bg-white rounded-full flex items-center justify-center ">
              <FaUserEdit className="w-14 h-14 text-[#D5775D]" />
          </div>
        </div>
        
        {/* Content */}
        <div className="pt-12 pb-6 px-8">
          <div className="text-center mt-8">
            
            {/* Title */}
            <h1 className="text-3xl font-black mb-2 bg-gradient-to-r from-[#D97D55] to-[#FFB968] bg-clip-text text-transparent">
              Admin Login
            </h1>
            <p className="text-xs font-medium text-gray-500 mb-6">
              Administrator access for project management
            </p>
            
            {/* Password Input with Eye Icon */}
            <div className="mb-6 flex justify-center">
              <div className="relative w-[268px]">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setLocalError('');
                  }}
                  onKeyPress={handleKeyPress}
                  placeholder="Password"
                  className="w-full pl-10 pr-10 py-3 rounded-full border border-[#fab05c] text-sm font-medium outline-none focus:ring-2 focus:ring-[#fab05c]/50 transition-all"
                />
                {/* Lock icon from react-icons/fi */}
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                {/* Show/Hide password button */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            
            {/* Error Message */}
            {(localError || error) && (
              <div className="flex items-center justify-center gap-2 mb-4 text-sm text-red-500">
                <FiAlertCircle className="w-4 h-4" />
                <span>{localError || error}</span>
              </div>
            )}
            
            {/* Login Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-[268px] h-[45px] rounded-full bg-gradient-to-r from-[#fbb267] to-[#d5775d] text-white font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mx-auto mb-16"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "Login"
              )}
            </button>
            
            {/* Footer Wave Decoration */}
            <div className="absolute -bottom-[1px] left-0 right-0 h-14 bg-white rounded-b-2xl overflow-hidden">
              <img 
                src="/images/Group 27.png" 
                alt="wave" 
                className="w-full h-full object-cover "
                onError={(e) => e.target.style.display = 'none'}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginModal;