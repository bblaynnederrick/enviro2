<script lang="ts">
  import { v4 as uuidv4 } from 'uuid';
  import { generateDesignCode } from '../lib/services/gemini';
  import PreviewFrame from '../lib/components/preview-frame.svelte';
  import HistorySidebar from '../lib/components/history-sidebar.svelte';
  import ComponentLibrary from '../lib/components/component-library.svelte';
  import Button from '../lib/components/ui/button.svelte';
  import { Send, Sparkles, Loader2, History, Code, Grid } from 'lucide-svelte';
  import type { ComponentItem } from '../lib/data/component-registry';
  
  // State
  let versions = $state<Array<{ id: string, timestamp: number, prompt: string, code: string }>>([]);
  let currentVersionId = $state<string | null>(null);
  let isGenerating = $state(false);
  let isHistoryOpen = $state(false);
  let isLibraryOpen = $state(false);
  let showCode = $state(false);
  let prompt = $state('');
  
  // Derived
  let currentVersion = $derived(versions.find(v => v.id === currentVersionId));
  
  async function handleGenerate() {
    if (!prompt.trim() || isGenerating) return;
    
    isGenerating = true;
    try {
      const currentCode = currentVersion?.code;
      const generatedCode = await generateDesignCode(prompt, currentCode);
      
      const newVersion = {
        id: uuidv4(),
        timestamp: Date.now(),
        prompt: prompt,
        code: generatedCode
      };
      
      versions = [...versions, newVersion];
      currentVersionId = newVersion.id;
      prompt = '';
    } catch (error) {
      console.error("Generation failed", error);
      alert("Failed to generate design. Please try again.");
    } finally {
      isGenerating = false;
    }
  }

  function handleSelectVersion(version: any) {
    currentVersionId = version.id;
    if (window.innerWidth < 768) {
      isHistoryOpen = false;
    }
  }

  function handleInsertComponent(component: ComponentItem) {
    const currentCode = currentVersion?.code || '<div class="p-8"></div>';
    
    // Simple append strategy - in a real parser we might find a better spot, 
    // but appending to body is a safe default for HTML strings
    const newCode = `${currentCode}\n\n<!-- Inserted ${component.name} -->\n${component.code}`;
    
    const newVersion = {
      id: uuidv4(),
      timestamp: Date.now(),
      prompt: `Inserted ${component.name}`,
      code: newCode
    };
    
    versions = [...versions, newVersion];
    currentVersionId = newVersion.id;
    
    // Optional: Close library on mobile
    if (window.innerWidth < 768) {
      isLibraryOpen = false;
    }
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleGenerate();
    }
  }
</script>

<div class="flex-1 flex overflow-hidden relative h-full">
  <main class="flex-1 flex flex-col relative transition-all duration-300 ease-in-out {isLibraryOpen ? 'ml-80' : 'ml-0'}">
    
    <!-- Toolbar -->
    <div class="absolute top-4 left-4 z-10">
      <Button 
        variant="secondary" 
        size="sm" 
        class="bg-white/90 backdrop-blur shadow-sm {isLibraryOpen ? 'text-blue-600 border-blue-200' : ''}"
        onclick={() => isLibraryOpen = !isLibraryOpen}
      >
        <Grid class="w-4 h-4 mr-2" />
        <span class="hidden sm:inline">Library</span>
      </Button>
    </div>

    <div class="absolute top-4 right-4 z-10 flex space-x-2">
       <div class="flex items-center space-x-1 bg-white/90 backdrop-blur border border-gray-200 rounded-full px-1 p-0.5 shadow-sm">
         <button 
           onclick={() => showCode = false}
           class="px-3 py-1 rounded-full text-sm font-medium transition-all {!showCode ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-900'}"
         >
           Preview
         </button>
         <button 
           onclick={() => showCode = true}
           class="px-3 py-1 rounded-full text-sm font-medium transition-all {showCode ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-900'}"
         >
           Code
         </button>
      </div>

      <Button 
        variant="secondary" 
        size="sm" 
        class="bg-white/90 backdrop-blur shadow-sm {isHistoryOpen ? 'text-blue-600 border-blue-200' : ''}"
        onclick={() => isHistoryOpen = !isHistoryOpen}
      >
        <History class="w-4 h-4 mr-2" />
        <span class="hidden sm:inline">History</span>
      </Button>
    </div>

    <!-- Canvas -->
    <div class="flex-1 bg-gray-50 p-4 md:p-8 overflow-hidden">
       {#if showCode}
         <div class="w-full h-full bg-gray-900 rounded-lg shadow-inner p-4 overflow-auto">
           <pre class="text-sm font-mono text-gray-300"><code>{currentVersion?.code || "<!-- No code generated yet -->"}</code></pre>
         </div>
       {:else}
         <div class="w-full h-full rounded-lg shadow-sm border border-gray-200 overflow-hidden bg-white">
            <PreviewFrame code={currentVersion?.code || ''} />
         </div>
       {/if}
    </div>

    <!-- Chat Interface -->
    <div class="absolute bottom-6 left-0 right-0 z-10 px-4 pointer-events-none">
       <div class="pointer-events-auto w-full max-w-3xl mx-auto">
        <div class="relative bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden ring-1 ring-black/5">
          <div class="flex flex-col">
            <div class="relative">
              <textarea
                bind:value={prompt}
                onkeydown={handleKeyDown}
                placeholder="Describe your interface... (e.g., 'A modern pricing page with 3 tiers')"
                class="w-full p-4 pr-12 text-gray-900 placeholder-gray-400 bg-transparent border-none resize-none focus:ring-0 focus:outline-none min-h-[60px] max-h-[200px]"
                rows="1"
                disabled={isGenerating}
              ></textarea>
              <div class="absolute right-3 top-3">
                <Button
                  onclick={handleGenerate}
                  variant="primary"
                  size="sm"
                  class="rounded-full h-8 w-8 p-0 flex items-center justify-center transition-all {prompt.trim() ? 'opacity-100 scale-100' : 'opacity-50 scale-90'}"
                  disabled={!prompt.trim() || isGenerating}
                >
                   {#if isGenerating}
                    <Loader2 class="w-4 h-4 animate-spin" />
                   {:else}
                    <Send class="w-4 h-4" />
                   {/if}
                </Button>
              </div>
            </div>
            
            <div class="bg-gray-50 px-4 py-2 flex items-center justify-between border-t border-gray-100">
              <div class="flex items-center space-x-2 text-xs text-gray-500">
                <Sparkles class="w-3 h-3 text-purple-500" />
                <span>AI-Powered Design</span>
              </div>
              <div class="text-xs text-gray-400">
                Press Enter to send
              </div>
            </div>
          </div>
        </div>
       </div>
    </div>
  </main>

  <!-- Left Sidebar: Component Library -->
  <ComponentLibrary 
    isOpen={isLibraryOpen}
    onToggle={() => isLibraryOpen = !isLibraryOpen}
    onInsert={handleInsertComponent}
  />

  <!-- Right Sidebar: History -->
  <HistorySidebar 
    versions={versions}
    currentVersionId={currentVersionId}
    onSelectVersion={handleSelectVersion}
    isOpen={isHistoryOpen}
    onToggle={() => isHistoryOpen = !isHistoryOpen}
  />
</div>