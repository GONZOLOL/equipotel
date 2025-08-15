'use client';

import { useEffect, useState } from 'react';

const Toast = ({ message, onClose }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onClose, 300); // Esperar a que termine la animación
        }, 4000);

        return () => clearTimeout(timer);
    }, [onClose]);

    const getIcon = (severity) => {
        switch (severity) {
            case 'success':
                return 'pi pi-check-circle';
            case 'error':
                return 'pi pi-times-circle';
            case 'warn':
                return 'pi pi-exclamation-triangle';
            case 'info':
                return 'pi pi-info-circle';
            default:
                return 'pi pi-info-circle';
        }
    };

    const getSeverityStyles = (severity) => {
        switch (severity) {
            case 'success':
                return 'bg-green-50 border-green-200 text-green-800';
            case 'error':
                return 'bg-red-50 border-red-200 text-red-800';
            case 'warn':
                return 'bg-yellow-50 border-yellow-200 text-yellow-800';
            case 'info':
                return 'bg-blue-50 border-blue-200 text-blue-800';
            default:
                return 'bg-blue-50 border-blue-200 text-blue-800';
        }
    };

    const getIconColor = (severity) => {
        switch (severity) {
            case 'success':
                return 'text-green-600';
            case 'error':
                return 'text-red-600';
            case 'warn':
                return 'text-yellow-600';
            case 'info':
                return 'text-blue-600';
            default:
                return 'text-blue-600';
        }
    };

    return (
        <div
            className={`fixed top-4 right-4 z-[9999] max-w-sm w-full transition-all duration-300 ease-in-out ${
                isVisible
                    ? 'translate-x-0 opacity-100'
                    : 'translate-x-full opacity-0'
            }`}
        >
            <div
                className={`border rounded-lg shadow-lg p-4 ${getSeverityStyles(
                    message.severity
                )}`}
            >
                <div className="flex items-start gap-3">
                    <i
                        className={`${getIcon(message.severity)} ${getIconColor(
                            message.severity
                        )} text-lg mt-0.5 flex-shrink-0`}
                    />
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium whitespace-pre-line">
                            {message.text}
                        </p>
                    </div>
                    <button
                        onClick={() => {
                            setIsVisible(false);
                            setTimeout(onClose, 300);
                        }}
                        className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0 ml-2"
                    >
                        <i className="pi pi-times text-sm" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Toast;
