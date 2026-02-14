<script lang="ts">
  let { class: className = '', children, ...props } = $props();
</script>

<div class="rounded-xl border bg-card text-card-foreground shadow-sm bg-white {className}" {...props}>
  {@render children?.()}
</div>