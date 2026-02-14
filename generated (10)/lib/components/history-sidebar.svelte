<script lang="ts">
  import { Clock, RotateCcw, ChevronRight } from 'lucide-svelte';
  
  interface Version {
    id: string;
    timestamp: number;
    prompt: string;
    code: string;
  }

  let { 
    versions, 
    currentVersionId, 
    isOpen, 
    onSelectVersion, 
    onToggle 
  } = $props<{
    versions: Version[],
    currentVersionId: string | null,
    isOpen: boolean,
    onSelectVersion: (v: Version) => void,
    onToggle: () => void
  }>();
</script>

<div 
  class="fixed inset-y-0 right-0 z-20 w-80 bg-white border-l border-gray-200 transform transition-transform duration-300 ease-in-out {isOpen ? 'translate-x-0' : 'translate-x-full'}"
>
  <div class="h-full flex flex-col">
    <div class="p-4 border-b border-gray-100 flex items-center justify-between">
      <div class="flex items-center space-x-2 text-gray-800">
        <Clock class="w-5 h-5" />
        <h2 class="font-semibold">Version History</h2>
      </div>
      <button 
        onclick={onToggle}
        class="p-1 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
      >
        <ChevronRight class="w-5 h-5" />
      </button>
    </div>

    <div class="flex-1 overflow-y-auto p-4 space-y-4">
      {#if versions.length === 0}
        <p class="text-gray-400 text-sm text-center py-8">No history yet.</p>
      {:else}
        {#each [...versions].reverse() as version (version.id)}
          <!-- svelte-ignore a11y_click_events_have_key_events -->
          <!-- svelte-ignore a11y_no_static_element_interactions -->
          <div
            onclick={() => onSelectVersion(version)}
            class="group cursor-pointer rounded-lg border p-3 transition-all hover:shadow-md {version.id === currentVersionId ? 'border-blue-500 bg-blue-50/50 ring-1 ring-blue-500' : 'border-gray-200 bg-white hover:border-blue-300'}"
          >
            <div class="flex justify-between items-start mb-2">
              <span class="text-xs font-mono text-gray-400">
                {new Date(version.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
              {#if version.id !== currentVersionId}
                <span class="opacity-0 group-hover:opacity-100 text-xs text-blue-600 flex items-center bg-blue-50 px-2 py-0.5 rounded">
                  <RotateCcw class="w-3 h-3 mr-1" /> Revert
                </span>
              {/if}
            </div>
            <p class="text-sm text-gray-700 line-clamp-2 font-medium">
              {version.prompt}
            </p>
            <div class="mt-2 h-1 w-full bg-gray-100 rounded overflow-hidden">
               <div class="h-full bg-gray-300 w-1/3 rounded"></div> 
            </div>
          </div>
        {/each}
      {/if}
    </div>
  </div>
</div>