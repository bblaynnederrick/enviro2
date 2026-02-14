<script lang="ts">
  import { onMount } from 'svelte';
  import Clerk from 'https://esm.sh/@clerk/clerk-js@5.0.0-beta.37';
  import { Loader2, ShieldCheck, Layout } from 'lucide-svelte';
  import Button from '../lib/components/ui/button.svelte';
  
  let { children } = $props();
  let clerk = $state<any>(null);
  let user = $state<any>(null);
  let isLoaded = $state(false);
  
  // NOTE: In a real app, use env var. Using a demo key for simulation if not provided.
  const CLERK_KEY = 'pk_test_bWFudWFsLXNoZWVwLTUxLmNsZXJrLmFjY291bnRzLmRldiQ'; 

  onMount(async () => {
    try {
      const clerkInstance = new Clerk(CLERK_KEY);
      await clerkInstance.load();
      clerk = clerkInstance;
      user = clerkInstance.user;
      
      clerkInstance.addListener((payload: any) => {
        user = payload.user;
      });
      
      isLoaded = true;
    } catch (e) {
      console.error("Failed to load Clerk", e);
      isLoaded = true; // Fail open for demo or show error
    }
  });

  function handleSignIn() {
    clerk?.openSignIn();
  }

  function handleSignOut() {
    clerk?.signOut();
  }
</script>

{#if !isLoaded}
  <div class="h-screen w-full flex items-center justify-center bg-gray-50">
    <Loader2 class="w-8 h-8 animate-spin text-blue-600" />
  </div>
{:else if !user}
  <div class="h-screen w-full flex items-center justify-center bg-gray-100 p-4">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden p-8 text-center">
      <div class="flex justify-center mb-6">
        <div class="bg-blue-100 p-3 rounded-full">
          <ShieldCheck class="w-8 h-8 text-blue-600" />
        </div>
      </div>
      <h1 class="text-2xl font-bold text-gray-900 mb-2">Welcome to NeuroDesign</h1>
      <p class="text-gray-500 mb-8">Sign in to access the AI design studio and save your versions.</p>
      <Button onclick={handleSignIn} size="lg" class="w-full">
        Sign In with Clerk
      </Button>
      <div class="mt-6 text-xs text-gray-400">
        Secured by Clerk Authentication
      </div>
    </div>
  </div>
{:else}
  <div class="h-screen flex flex-col bg-gray-100">
    <header class="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-10 shrink-0">
      <div class="flex items-center space-x-3">
        <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <Layout class="w-5 h-5 text-white" />
        </div>
        <span class="font-bold text-gray-900 tracking-tight">NeuroDesign</span>
      </div>
      <div class="flex items-center space-x-4">
        <div class="flex items-center space-x-3 border-l border-gray-200 pl-4">
          <span class="text-sm font-medium text-gray-900 hidden md:block">
            {user.firstName || user.identifier}
          </span>
          <img src={user.imageUrl} alt="Profile" class="w-8 h-8 rounded-full border border-gray-200" />
          <Button variant="ghost" size="sm" onclick={handleSignOut}>Sign Out</Button>
        </div>
      </div>
    </header>
    
    <div class="flex-1 overflow-hidden relative">
      {@render children()}
    </div>
  </div>
{/if}