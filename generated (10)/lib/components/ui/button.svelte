<script lang="ts">
  import { Loader2 } from 'lucide-svelte';
  
  let { 
    variant = 'primary', 
    size = 'md', 
    isLoading = false, 
    disabled = false, 
    class: className = '', 
    children, 
    ...props 
  } = $props();

  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";
  
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-600",
    secondary: "bg-white text-gray-900 border border-gray-200 hover:bg-gray-100 focus-visible:ring-gray-400",
    ghost: "hover:bg-gray-100 text-gray-600 hover:text-gray-900",
    danger: "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
  };

  const sizes = {
    sm: "h-8 px-3 text-xs",
    md: "h-10 px-4 py-2",
    lg: "h-12 px-6 text-lg",
    icon: "h-10 w-10"
  };
</script>

<button
  class="{baseStyles} {variants[variant]} {sizes[size]} {className}"
  disabled={disabled || isLoading}
  {...props}
>
  {#if isLoading}
    <Loader2 class="mr-2 h-4 w-4 animate-spin" />
  {/if}
  {@render children?.()}
</button>