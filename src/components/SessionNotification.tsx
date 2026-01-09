"use client";
import { useEffect, useState } from 'react';
import { useActiveSession } from '../hooks/useActiveSession';

export const SessionNotification = () => {
  const { activeSession, loading } = useActiveSession();
  const [isVisible, setIsVisible] = useState(true);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (activeSession && isVisible && !loading) {
      // Fade in effect
      setVisible(true);

      // Auto-dismiss after 15 seconds
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(() => setIsVisible(false), 500); // Wait for fade out
      }, 15000);

      return () => clearTimeout(timer);
    }
  }, [activeSession, isVisible, loading]);

  if (loading || !activeSession || !isVisible) return null;

  const startTime = new Date(activeSession.startTime).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });

  const endTime = new Date(activeSession.endTime).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });

  // Get session type color
  const getSessionColor = (title: string) => {
    if (title.includes('TechXplore')) return 'bg-purple-600';
    if (title.includes('Clarity')) return 'bg-green-600';
    if (title.includes('Taster')) return 'bg-blue-600';
    return 'bg-gray-600';
  };

  const getSessionIcon = (title: string) => {
    if (title.includes('TechXplore')) return '🚀';
    if (title.includes('Clarity')) return '💡';
    if (title.includes('Taster')) return '👋';
    return '📅';
  };

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 w-80 bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden transition-all duration-500 transform ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {/* Header */}
      <div className={`${getSessionColor(activeSession.title)} text-white px-4 py-3 flex justify-between items-center`}>
        <div className="flex items-center gap-2">
          <span className="text-lg">{getSessionIcon(activeSession.title)}</span>
          <h3 className="font-bold text-lg">Session Starting Soon</h3>
        </div>
        <button
          onClick={() => {
            setVisible(false);
            setTimeout(() => setIsVisible(false), 500);
          }}
          className="text-white hover:text-gray-200 transition-colors duration-200 text-xl font-bold"
        >
          ✕
        </button>
      </div>

      {/* Content */}
      <div className="p-4 bg-white dark:bg-gray-900">
        <div className="space-y-3">
          <div>
            <h4 className="font-bold text-xl text-gray-900 dark:text-white">
              {activeSession.title}
            </h4>
            {activeSession.description && (
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 leading-relaxed">
                {activeSession.description}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded-lg">
            <span className="text-lg">⏰</span>
            <span>
              {startTime} - {endTime}
            </span>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={() => window.open(activeSession.sessionLink, '_blank')}
              className={`flex-1 ${getSessionColor(activeSession.title)} text-white rounded-xl px-4 py-3 font-bold text-sm transition-all duration-200 hover:scale-105 hover:shadow-lg`}
            >
              Join Session
            </button>
            
            <button
              onClick={() => {
                setVisible(false);
                setTimeout(() => setIsVisible(false), 500);
              }}
              className="px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 text-sm font-medium transition-all duration-200"
            >
              Later
            </button>
          </div>
        </div>
      </div>

      {/* Footer accent */}
      <div className={`h-1 ${getSessionColor(activeSession.title)}`}></div>
    </div>
  );
};