'use client';

import React from 'react';
import { Toaster as Sonner, type ToasterProps } from 'sonner';
import {
  FaCheckCircle,
  FaInfoCircle,
  FaExclamationTriangle,
  FaTimesCircle,
  FaSpinner,
} from 'react-icons/fa';

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      position="top-center"
      duration={3000}
      icons={{
        success: <FaCheckCircle className="size-4 text-green-500" />,
        info: <FaInfoCircle className="size-4 text-blue-500" />,
        warning: <FaExclamationTriangle className="size-4 text-yellow-500" />,
        error: <FaTimesCircle className="size-4 text-red-500" />,
        loading: <FaSpinner className="size-4 animate-spin text-muted-foreground" />,
      }}
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
          '--border-radius': 'var(--radius)',
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
