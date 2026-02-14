import React from 'react';
import { DesignVersion } from '../types';
import { Clock, RotateCcw, ChevronRight } from 'lucide-react';

interface HistorySidebarProps {
  versions: DesignVersion[];
  currentVersionId: string | null;
  onSelectVersion: (version: DesignVersion) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const HistorySidebar: React.FC<HistorySidebarProps> = ({
  versions,
  currentVersionId,
  onSelectVersion,
  isOpen,
  onToggle
}) => {
  return (
    <div 
      className={`fixed inset-y-0 right-0 z-20 w-80 bg-white border-l border-gray-200 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="h-full flex flex-col">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-gray-800">
            <Clock className="w-5 h-5" />
            <h2 className="font-semibold">Version History</h2>
          </div>
          <button 
            onClick={onToggle}
            className="p-1 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {versions.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-8">No history yet.</p>
          ) : (
            [...versions].reverse().map((version) => (
              <div
                key={version.id}
                onClick={() => onSelectVersion(version)}
                className={`group cursor-pointer rounded-lg border p-3 transition-all hover:shadow-md ${
                  version.id === currentVersionId
                    ? 'border-blue-500 bg-blue-50/50 ring-1 ring-blue-500'
                    : 'border-gray-200 bg-white hover:border-blue-300'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-mono text-gray-400">
                    {new Date(version.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  {version.id !== currentVersionId && (
                    <span className="opacity-0 group-hover:opacity-100 text-xs text-blue-600 flex items-center bg-blue-50 px-2 py-0.5 rounded">
                      <RotateCcw className="w-3 h-3 mr-1" /> Revert
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-700 line-clamp-2 font-medium">
                  {version.prompt}
                </p>
                <div className="mt-2 h-1 w-full bg-gray-100 rounded overflow-hidden">
                   <div className="h-full bg-gray-300 w-1/3 rounded"></div> 
                   {/* Abstract representation of "preview" thumbnail */}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};