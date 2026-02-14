<script lang="ts">
  import { onMount } from 'svelte';
  
  let { code } = $props();
  let iframeRef: HTMLIFrameElement;

  $effect(() => {
    if (iframeRef && code) {
      const doc = iframeRef.contentDocument;
      if (doc) {
        doc.open();
        doc.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <script src="https://cdn.tailwindcss.com"></script>
              <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
              <style>
                body { font-family: 'Inter', sans-serif; }
                ::-webkit-scrollbar { width: 8px; }
                ::-webkit-scrollbar-track { background: transparent; }
                ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
                ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
              </style>
            </head>
            <body>
              ${code}
            </body>
          </html>
        `);
        doc.close();
      }
    }
  });
</script>

{#if !code}
  <div class="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gray-50/50">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
    <p class="text-lg font-medium">Your design canvas is empty</p>
    <p class="text-sm">Describe an interface to get started.</p>
  </div>
{:else}
  <iframe
    bind:this={iframeRef}
    title="Design Preview"
    class="w-full h-full border-0 bg-white shadow-sm rounded-lg overflow-hidden"
    sandbox="allow-scripts allow-same-origin"
  ></iframe>
{/if}