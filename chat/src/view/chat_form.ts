export const chat_form_tpl = `
<div
  class="aui-root aui-thread-root bg-background @container flex h-full flex-col"
  style="--thread-max-width:44rem;--composer-bg:color-mix(in oklab, var(--color-muted) 30%, var(--color-background));--composer-radius:1.5rem;--composer-padding:8px"
>
  <div
    data-slot="aui_thread-viewport"
    class="relative flex flex-1 flex-col overflow-x-auto overflow-y-scroll scroll-smooth px-4 pt-4 justify-center"
  >
    <div class="aui-thread-welcome-root mx-auto mb-6 flex w-full max-w-(--thread-max-width) flex-col items-center px-4 text-center">
      <h1
        class="aui-thread-welcome-message-inner fade-in slide-in-from-bottom-1 animate-in fill-mode-both text-2xl font-semibold duration-200"
      >
        开始新的设计
      </h1>
    </div>
    <div
      data-slot="aui_message-group"
      class="mb-14 flex flex-col gap-y-6 empty:hidden"
    ></div>
    <div
      class="aui-thread-viewport-footer bg-background mx-auto flex w-full max-w-(--thread-max-width) flex-col gap-4 overflow-visible pb-4 md:pb-6"
    >
      <button
        data-slot="tooltip-trigger"
        data-variant="outline"
        data-size="icon"
        class="focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 inline-flex shrink-0 items-center justify-center gap-2 text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:shrink-0 [&amp;_svg:not([class*='size-'])]:size-4 bg-background hover:bg-accent hover:text-accent-foreground border shadow-xs aui-button-icon size-6 active:scale-90 aui-thread-scroll-to-bottom dark:border-border dark:bg-background dark:hover:bg-accent absolute -top-12 z-10 self-center rounded-full p-4 disabled:invisible"
        type="button"
        disabled=""
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
          class="lucide lucide-arrow-down"
          aria-hidden="true"
        >
          <path d="M12 5v14"></path>
          <path d="m19 12-7 7-7-7"></path>
        </svg>
        <span class="aui-sr-only sr-only">Scroll to bottom</span>
      </button>
      <form class="aui-composer-root relative flex w-full flex-col">
        <div
          data-slot="aui_composer-shell"
          class="border-border/60 data-[dragging=true]:border-ring focus-within:border-border dark:border-muted-foreground/15 dark:focus-within:border-muted-foreground/30 flex w-full flex-col gap-2 rounded-(--composer-radius) border bg-(--composer-bg) p-(--composer-padding) shadow-[0_4px_16px_-8px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] transition-[border-color,box-shadow] focus-within:shadow-[0_6px_24px_-8px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.05)] data-[dragging=true]:border-dashed data-[dragging=true]:bg-[color-mix(in_oklab,var(--color-accent)_50%,var(--color-background))] dark:shadow-none"
        >
          <div
            class="aui-composer-attachments flex w-full flex-row items-center gap-2 overflow-x-auto empty:hidden"
          ></div>
          <div
            class="aui-lexical-editor aui-composer-input [&amp;_.aui-lexical-placeholder]:text-muted-foreground/80 relative max-h-32 min-h-10 w-full resize-none bg-transparent px-2.5 py-1 text-base outline-none [&amp;_.aui-directive-chip]:inline-flex [&amp;_.aui-directive-chip]:items-baseline [&amp;_.aui-directive-chip]:gap-1 [&amp;_.aui-directive-chip]:rounded-md [&amp;_.aui-directive-chip]:bg-blue-100 [&amp;_.aui-directive-chip]:px-1.5 [&amp;_.aui-directive-chip]:py-0.5 [&amp;_.aui-directive-chip]:text-[13px] [&amp;_.aui-directive-chip]:leading-none [&amp;_.aui-directive-chip]:font-medium [&amp;_.aui-directive-chip]:text-blue-700 dark:[&amp;_.aui-directive-chip]:bg-blue-900/50 dark:[&amp;_.aui-directive-chip]:text-blue-300 [&amp;_.aui-directive-chip-icon]:self-center [&amp;_.aui-lexical-input]:min-h-lh [&amp;_.aui-lexical-input]:outline-none [&amp;_.aui-lexical-placeholder]:pointer-events-none [&amp;_.aui-lexical-placeholder]:absolute [&amp;_.aui-lexical-placeholder]:top-0 [&amp;_.aui-lexical-placeholder]:right-0 [&amp;_.aui-lexical-placeholder]:left-0 [&amp;_.aui-lexical-placeholder]:truncate [&amp;_.aui-lexical-placeholder]:px-2.5 [&amp;_.aui-lexical-placeholder]:py-1"
            style="overflow-y:auto"
          >
            <div
              class="aui-lexical-input"
              contenteditable="true"
              role="textbox"
              spellcheck="true"
              style="user-select: text; white-space: pre-wrap; word-break: break-word;"
              data-lexical-editor="true"
            >
              <p dir="auto"><br /></p>
            </div>
            <div class="aui-lexical-placeholder">
              Send a message... (@ to mention, / for commands)
            </div>
          </div>
          <div
            class="aui-composer-action-wrapper relative flex items-center justify-between"
          >
            <div class="flex items-center gap-1">
              <button
                data-slot="tooltip-trigger"
                data-variant="ghost"
                data-size="icon"
                class="focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:shrink-0 [&amp;_svg:not([class*='size-'])]:size-4 hover:text-accent-foreground aui-button-icon active:scale-90 aui-composer-add-attachment hover:bg-muted-foreground/15 dark:border-muted-foreground/15 dark:hover:bg-muted-foreground/30 size-7 rounded-full p-1 text-xs font-semibold"
                aria-label="Add Attachment"
                type="button"
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
                  class="lucide lucide-plus aui-attachment-add-icon size-4.5 stroke-[1.5px]"
                  aria-hidden="true"
                >
                  <path d="M5 12h14"></path>
                  <path d="M12 5v14"></path>
                </svg>
                <span class="aui-sr-only sr-only">Add Attachment</span>
              </button>
            </div>
            <div class="flex items-center gap-1.5">
              <button
                data-slot="tooltip-trigger"
                data-variant="default"
                data-size="icon"
                class="focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 inline-flex shrink-0 items-center justify-center gap-2 text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:shrink-0 [&amp;_svg:not([class*='size-'])]:size-4 bg-primary text-primary-foreground hover:bg-primary/90 aui-button-icon p-1 active:scale-90 aui-composer-send size-7 rounded-full"
                type="button"
                aria-label="Send message"
                disabled=""
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
                  class="lucide lucide-arrow-up aui-composer-send-icon size-4.5"
                  aria-hidden="true"
                >
                  <path d="m5 12 7-7 7 7"></path>
                  <path d="M12 19V5"></path>
                </svg>
                <span class="aui-sr-only sr-only">Send message</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>



`;
