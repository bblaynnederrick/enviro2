import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { generateDesignCode } from './services/geminiService';
import { DesignVersion, AppState, User } from './types';
import { PreviewFrame } from './components/PreviewFrame';
import { ChatInterface } from './components/ChatInterface';
import { HistorySidebar } from './components/HistorySidebar';
import { AuthOverlay } from './components/AuthOverlay';
import { Button } from './components/Button';
import { Layout, History, LogOut, Code } from 'lucide-react';

function App() {
  const [appState, setAppState] = useState<AppState>(AppState.AUTH);
  const [user, setUser] = useState<User | null>(null);
  
  const [versions, setVersions] = useState<DesignVersion[]>([]);
  const [currentVersionId, setCurrentVersionId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const currentVersion = versions.find(v => v.id === currentVersionId);

  const handleLogin = (user: User) => {
    setUser(user);
    setAppState(AppState.DESIGN);
  };

  const handleLogout = () => {
    setUser(null);
    setAppState(AppState.AUTH);
    setVersions([]);
    setCurrentVersionId(null);
  };

  const handleGenerate = async (prompt: string) => {
    setIsGenerating(true);
    try {
      const currentCode = currentVersion?.code;
      const generatedCode = await generateDesignCode(prompt, currentCode);
      
      const newVersion: DesignVersion = {
        id: uuidv4(),
        timestamp: Date.now(),
        prompt,
        code: generatedCode
      };

      setVersions(prev => [...prev, newVersion]);
      setCurrentVersionId(newVersion.id);
    } catch (error) {
      console.error("Generation failed", error);
      alert("Failed to generate design. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSelectVersion = (version: DesignVersion) => {
    setCurrentVersionId(version.id);
    // On mobile, close sidebar on selection
    if (window.innerWidth < 768) {
      setIsHistoryOpen(false);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col bg-gray-100">
      {appState === AppState.AUTH && (
        <AuthOverlay onLogin={handleLogin} />
      )}

      {/* Header */}
      <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-10 shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Layout className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-gray-900 tracking-tight">NeuroDesign</span>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-2 bg-gray-100 rounded-full px-1 p-0.5">
             <button 
               onClick={() => setShowCode(false)}
               className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${!showCode ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
             >
               Preview
             </button>
             <button 
               onClick={() => setShowCode(true)}
               className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${showCode ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
             >
               Code
             </button>
          </div>

          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsHistoryOpen(!isHistoryOpen)}
            className={isHistoryOpen ? 'bg-gray-100 text-blue-600' : ''}
          >
            <History className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">History</span>
          </Button>

          {user && (
             <div className="flex items-center space-x-3 border-l border-gray-200 pl-4">
               <div className="hidden md:block text-right">
                 <div className="text-sm font-medium text-gray-900">{user.name}</div>
               </div>
               <img src={user.avatarUrl} alt={user.name} className="w-8 h-8 rounded-full border border-gray-200" />
               <button onClick={handleLogout} className="text-gray-400 hover:text-red-600 transition-colors">
                 <LogOut className="w-5 h-5" />
               </button>
             </div>
          )}
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden relative">
        <main className="flex-1 flex flex-col relative transition-all duration-300 ease-in-out">
          
          {/* Preview / Code Area */}
          <div className="flex-1 bg-gray-50 p-4 md:p-8 overflow-hidden">
             {showCode ? (
               <div className="w-full h-full bg-gray-900 rounded-lg shadow-inner p-4 overflow-auto">
                 <pre className="text-sm font-mono text-gray-300">
                   <code>{currentVersion?.code || "<!-- No code generated yet -->"}</code>
                 </pre>
               </div>
             ) : (
               <div className="w-full h-full rounded-lg shadow-sm border border-gray-200 overflow-hidden bg-white">
                  <PreviewFrame code={currentVersion?.code || ''} />
               </div>
             )}
          </div>

          {/* Chat Interface - Floating at bottom */}
          <div className="absolute bottom-6 left-0 right-0 z-10 px-4 pointer-events-none">
             <div className="pointer-events-auto">
                <ChatInterface onGenerate={handleGenerate} isGenerating={isGenerating} />
             </div>
          </div>
        </main>

        {/* Sidebar */}
        <HistorySidebar 
          versions={versions}
          currentVersionId={currentVersionId}
          onSelectVersion={handleSelectVersion}
          isOpen={isHistoryOpen}
          onToggle={() => setIsHistoryOpen(!isHistoryOpen)}
        />
      </div>
    </div>
  );
}

export default App;