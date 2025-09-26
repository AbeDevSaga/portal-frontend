import React from 'react';
import { cn } from '@/lib/utils';

interface RequestTypeTagProps {
  requestType: string;
  className?: string;
}

const requestTypeStyles = {
  BIRTH: {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    border: 'border-blue-200'
  },
  MARRIAGE: {
    bg: 'bg-pink-100',
    text: 'text-pink-800',
    border: 'border-pink-200'
  },
  DIVORCE: {
    bg: 'bg-red-100',
    text: 'text-red-800',
    border: 'border-red-200'
  },
  NON_MARRIAGE: {
    bg: 'bg-purple-100',
    text: 'text-purple-800',
    border: 'border-purple-200'
  },
  DEATH: {
    bg: 'bg-gray-100',
    text: 'text-gray-800',
    border: 'border-gray-200'
  }
};

export const RequestTypeTag: React.FC<RequestTypeTagProps> = ({ 
  requestType, 
  className 
}) => {
  const styles = requestTypeStyles[requestType as keyof typeof requestTypeStyles] || {
    bg: 'bg-gray-100',
    text: 'text-gray-800',
    border: 'border-gray-200'
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        styles.bg,
        styles.text,
        styles.border,
        className
      )}
    >
      {requestType}
    </span>
  );
};

export default RequestTypeTag;
