import React from "react";

const FinancialCard = ({ 
  icon, 
  label, 
  value, 
  additionalContent,
  borderColor = "",
  bgColor = "bg-white"
}) => (
  <div className={`${bgColor} rounded-xl p-5 lg:-mx-2 lg:p-2 shadow-sm border border-gray-100 hover:shadow-md transition-all ${borderColor}`}>
    <div className="text-sm font-medium text-gray-600 flex items-center gap-2">
      {icon}
      {label}
    </div>
    <p className="text-2xl font-bold text-gray-800 mt-1">
      {value}
    </p>
    {additionalContent}
  </div>
);

export default FinancialCard;