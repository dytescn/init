export const slidebar_tpl = `
<div class="relative w-65 flex-1 overflow-y-auto p-3">
    <div class="aui-root aui-thread-list-root flex flex-col gap-0.5">
        <!-- 新建会话按钮 -->
        <button 
            data-slot="button" 
            data-variant="ghost" 
            data-size="default" 
            class="focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 inline-flex shrink-0 items-center whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:shrink-0 [&amp;_svg:not([class*='size-'])]:size-4 hover:text-accent-foreground dark:hover:bg-accent/50 py-2 has-[&gt;svg]:px-3 aui-thread-list-new hover:bg-muted data-active:bg-muted h-8 justify-start gap-2 rounded-md px-2.5 text-sm font-normal" 
            type="button" 
            data-active="true" 
            aria-current="true"
        >
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                stroke-width="2" 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                class="lucide lucide-plus size-4" 
                aria-hidden="true"
            >
                <path d="M5 12h14"></path>
                <path d="M12 5v14"></path>
            </svg>
            New Thread
        </button>

        <div class="aui-thread-list-group-label text-muted-foreground px-2.5 pt-3 pb-1 text-xs font-medium">
            Today
        </div>

        <div class="aui-thread-list-item group hover:bg-muted focus-visible:bg-muted data-active:bg-muted relative flex h-8 items-center rounded-md transition-colors focus-visible:outline-none">
            <button 
                class="aui-thread-list-item-trigger flex h-full min-w-0 flex-1 items-center px-2.5 text-start text-sm group-hover:pe-9 group-has-data-[state=open]:pe-9 group-data-active:pe-9" 
                type="button"
            >
                <span class="aui-thread-list-item-title min-w-0 flex-1 truncate">
                    User Greeting
                </span>
            </button>
            <button 
                data-slot="button" 
                data-variant="ghost" 
                data-size="icon" 
                class="focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:shrink-0 [&amp;_svg:not([class*='size-'])]:size-4 hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 aui-thread-list-item-more data-[state=open]:bg-accent absolute end-1.5 top-1/2 size-6 -translate-y-1/2 p-0 opacity-0 group-hover:opacity-100 group-data-active:opacity-100 data-[state=open]:opacity-100" 
                type="button" 
                id="radix-_r_7_" 
                aria-haspopup="menu" 
                aria-expanded="false" 
                data-state="closed"
            >
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    stroke-width="2" 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    class="lucide lucide-ellipsis size-3.5" 
                    aria-hidden="true"
                >
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="19" cy="12" r="1"></circle>
                    <circle cx="5" cy="12" r="1"></circle>
                </svg>
                <span class="sr-only">More options</span>
            </button>
        </div>

        <!-- 会话项2 -->
        <div class="aui-thread-list-item group hover:bg-muted focus-visible:bg-muted data-active:bg-muted relative flex h-8 items-center rounded-md transition-colors focus-visible:outline-none">
            <button 
                class="aui-thread-list-item-trigger flex h-full min-w-0 flex-1 items-center px-2.5 text-start text-sm group-hover:pe-9 group-has-data-[state=open]:pe-9 group-data-active:pe-9" 
                type="button"
            >
                <span class="aui-thread-list-item-title min-w-0 flex-1 truncate">
                    User Greeting
                </span>
            </button>
            <button 
                data-slot="button" 
                data-variant="ghost" 
                data-size="icon" 
                class="focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:shrink-0 [&amp;_svg:not([class*='size-'])]:size-4 hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 aui-thread-list-item-more data-[state=open]:bg-accent absolute end-1.5 top-1/2 size-6 -translate-y-1/2 p-0 opacity-0 group-hover:opacity-100 group-data-active:opacity-100 data-[state=open]:opacity-100" 
                type="button" 
                id="radix-_r_9_" 
                aria-haspopup="menu" 
                aria-expanded="false" 
                data-state="closed"
            >
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    stroke-width="2" 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    class="lucide lucide-ellipsis size-3.5" 
                    aria-hidden="true"
                >
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="19" cy="12" r="1"></circle>
                    <circle cx="5" cy="12" r="1"></circle>
                </svg>
                <span class="sr-only">More options</span>
            </button>
        </div>
    </div>
</div>
`;
