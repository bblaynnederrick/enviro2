export interface ComponentItem {
  id: string;
  name: string;
  category: string;
  description: string;
  code: string;
}

export const componentRegistry: ComponentItem[] = [
  // Layout
  {
    id: "navbar-simple",
    name: "Simple Navbar",
    category: "Layout",
    description: "Top navigation with logo and links",
    code: `<nav class="border-b border-gray-200 bg-white">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="flex h-16 justify-between items-center">
      <div class="flex items-center">
        <span class="text-xl font-bold text-gray-900">Logo</span>
      </div>
      <div class="hidden sm:flex sm:space-x-8">
        <a href="#" class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 border-b-2 border-black">Home</a>
        <a href="#" class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-300">Features</a>
        <a href="#" class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-300">Pricing</a>
      </div>
      <div class="flex items-center">
        <button class="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800">Get Started</button>
      </div>
    </div>
  </div>
</nav>`
  },
  {
    id: "hero-section",
    name: "Hero Section",
    category: "Layout",
    description: "Centered hero with heading and actions",
    code: `<div class="bg-white px-6 py-24 sm:py-32 lg:px-8">
  <div class="mx-auto max-w-2xl text-center">
    <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Build something amazing</h1>
    <p class="mt-6 text-lg leading-8 text-gray-600">Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.</p>
    <div class="mt-10 flex items-center justify-center gap-x-6">
      <a href="#" class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Get started</a>
      <a href="#" class="text-sm font-semibold leading-6 text-gray-900">Learn more <span aria-hidden="true">→</span></a>
    </div>
  </div>
</div>`
  },
  
  // Elements
  {
    id: "button-primary",
    name: "Primary Button",
    category: "Elements",
    description: "Standard primary action button",
    code: `<button class="inline-flex items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-slate-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50">
  Button
</button>`
  },
  {
    id: "button-outline",
    name: "Outline Button",
    category: "Elements",
    description: "Secondary outline button",
    code: `<button class="inline-flex items-center justify-center rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 shadow-sm transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50">
  Outline
</button>`
  },
  {
    id: "input-label",
    name: "Input with Label",
    category: "Elements",
    description: "Form input field with label",
    code: `<div class="grid w-full max-w-sm items-center gap-1.5">
  <label for="email" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email</label>
  <input type="email" id="email" placeholder="Email" class="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
</div>`
  },
  {
    id: "badge",
    name: "Badge",
    category: "Elements",
    description: "Status indicator badge",
    code: `<div class="inline-flex items-center rounded-full border border-transparent bg-slate-900 px-2.5 py-0.5 text-xs font-semibold text-slate-50 transition-colors hover:bg-slate-900/80 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2">
  New
</div>`
  },

  // Components
  {
    id: "card-simple",
    name: "Simple Card",
    category: "Components",
    description: "Container with header and content",
    code: `<div class="rounded-lg border border-slate-200 bg-white text-slate-950 shadow-sm w-[350px]">
  <div class="flex flex-col space-y-1.5 p-6">
    <h3 class="text-2xl font-semibold leading-none tracking-tight">Create account</h3>
    <p class="text-sm text-slate-500">Enter your email below to create your account</p>
  </div>
  <div class="p-6 pt-0">
    <div class="grid gap-4">
      <div class="grid gap-2">
        <label class="text-sm font-medium leading-none">Email</label>
        <input class="flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400" placeholder="m@example.com">
      </div>
    </div>
  </div>
  <div class="flex items-center p-6 pt-0">
    <button class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-slate-900 text-slate-50 hover:bg-slate-900/90 h-10 px-4 py-2 w-full">Create account</button>
  </div>
</div>`
  },
  {
    id: "alert-info",
    name: "Alert Info",
    category: "Components",
    description: "Information alert box",
    code: `<div class="relative w-full rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800" role="alert">
  <div class="flex items-center gap-3">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="16" y2="12"/><line x1="12" x2="12.01" y1="8" y2="8"/></svg>
    <h5 class="font-medium leading-none tracking-tight">Heads up!</h5>
  </div>
  <div class="mt-2 text-sm [&_p]:leading-relaxed">
    You can add components to your app using the CLI.
  </div>
</div>`
  },
  {
    id: "table-simple",
    name: "Data Table",
    category: "Components",
    description: "Simple responsive data table",
    code: `<div class="w-full overflow-auto rounded-lg border border-slate-200">
  <table class="w-full caption-bottom text-sm text-left">
    <thead class="[&_tr]:border-b">
      <tr class="border-b transition-colors hover:bg-slate-100/50 data-[state=selected]:bg-slate-100">
        <th class="h-12 px-4 text-left align-middle font-medium text-slate-500">Invoice</th>
        <th class="h-12 px-4 text-left align-middle font-medium text-slate-500">Status</th>
        <th class="h-12 px-4 text-left align-middle font-medium text-slate-500">Method</th>
        <th class="h-12 px-4 text-right align-middle font-medium text-slate-500">Amount</th>
      </tr>
    </thead>
    <tbody class="[&_tr:last-child]:border-0">
      <tr class="border-b transition-colors hover:bg-slate-100/50">
        <td class="p-4 align-middle font-medium">INV001</td>
        <td class="p-4 align-middle">Paid</td>
        <td class="p-4 align-middle">Credit Card</td>
        <td class="p-4 align-middle text-right">$250.00</td>
      </tr>
      <tr class="border-b transition-colors hover:bg-slate-100/50">
        <td class="p-4 align-middle font-medium">INV002</td>
        <td class="p-4 align-middle">Pending</td>
        <td class="p-4 align-middle">PayPal</td>
        <td class="p-4 align-middle text-right">$150.00</td>
      </tr>
    </tbody>
  </table>
</div>`
  }
];