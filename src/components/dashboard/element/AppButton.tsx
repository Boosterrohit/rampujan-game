import React from 'react'
import { PuffLoader } from 'react-spinners';
interface AppButtonProps {
    type?: 'button' | 'submit';
    label?: string;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    loading?: boolean;
    loadingText?: string;
    disabled?: boolean;
    size?: 'default' | 'sm' | 'lg' | 'icon';
    className?: string;
    handleClick?: () => void;
}
const AppButton = ({
    type = 'button',
    label = '',
    startIcon,
    endIcon,
    loading = false,
    disabled = false,
    size = 'default',
    loadingText = '',
    className,
    handleClick
}:AppButtonProps) => {
    const sizeClass = {
        default: 'py-2 px-4 text-base',
        sm: 'py-1 px-2 text-sm',
        lg: 'py-3 px-6 text-lg',
        icon: 'p-2',
      }[size];
  return (
    <button 
    type={type}
    disabled={loading || disabled}
    className={`${className} ${sizeClass} flex justify-center items-center gap-1`}
    onClick={handleClick}
    >
        {!loading && startIcon && <span className="mr-2">{startIcon}</span>}
        {!loading ? label : loadingText}
        {loading && <PuffLoader color="#ffffff" size={20}/>}
        {!loading && endIcon && <span className="ml-2">{endIcon}</span>}
    </button>
  )
}

export default AppButton