<script lang="ts">
  import { Search, Plus, Grid, X } from 'lucide-svelte';
  import { componentRegistry } from '../data/component-registry';
  import type { ComponentItem } from '../data/component-registry';

  let { 
    isOpen, 
    onToggle, 
    onInsert 
  } = $props<{
    isOpen: boolean,
    onToggle: () => void,
    onInsert: (component: ComponentItem) => void
  }>();

  let searchQuery = $state('');
  
  // Derived state for filtering
  let filteredComponents = $derived(
    componentRegistry.filter(c => 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      c.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Group by category
  let groupedComponents = $derived(
    filteredComponents.reduce((acc, component) => {
      const category = component.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(component);
      return acc;
    }, {} as Record<string, ComponentItem[]>)
  );

  let categories = $derived(Object.keys(groupedComponents).sort());
</script>

<div 
  class="fixed inset-y-0 left-0 z-20 w-80 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out {isOpen ? 'translate-x-0' : '-translate-x-full'}"
>
  <div class="h-full flex flex-col">
    <!-- Header -->
    <div class="p-4 border-b border-gray-100">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-2 text-gray-800">
          <Grid class="w-5 h-5" />
          <h2 class="font-semibold">Library</h2>
        </div>
        <button 
          onclick={onToggle}
          class="p-1 hover:bg-gray-100 rounded-full text-gray-500 transition-colors md:hidden"
        >
          <X class="w-5 h-5" />
        </button>
      </div>
      
      <div class="relative">
        <Search class="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
        <input
          type="text"
          bind:value={searchQuery}
          placeholder="Search components..."
          class="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
        />
      </div>
    </div>

    <!-- List -->
    <div class="flex-1 overflow-y-auto p-4">
      {#if categories.length === 0}
        <div class="text-center py-8 text-gray-400 text-sm">
          No components found.
        </div>
      {:else}
        {#each categories as category}
          <div class="mb-6">
            <h3 class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-1">{category}</h3>
            <div class="space-y-2">
              {#each groupedComponents[category] as component}
                <button
                  onclick={() => onInsert(component)}
                  class="w-full group flex items-start p-3 rounded-lg border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all text-left"
                >
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center justify-between">
                      <span class="text-sm font-medium text-gray-900 truncate">{component.name}</span>
                    </div>
                    <p class="text-xs text-gray-500 truncate mt-0.5">{component.description}</p>
                  </div>
                  <div class="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div class="p-1 bg-blue-100 text-blue-600 rounded">
                      <Plus class="w-3 h-3" />
                    </div>
                  </div>
                </button>
              {/each}
            </div>
          </div>
        {/each}
      {/if}
    </div>
  </div>
</div>