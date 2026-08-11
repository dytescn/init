export const app_tpl = `
<div id="chat-container" class="bg-muted/30 flex h-full w-full">
   <div id="chat-slidebar" class="flex h-full flex-col overflow-hidden transition-all duration-200 w-65">
       <div class="mt-2 flex h-12 shrink-0 items-center transition-[padding] duration-200 px-6">
             <span class="text-foreground/90 ml-2 text-sm font-medium whitespace-nowrap transition-opacity duration-200">对话列表</span>
        </div>
        <div class="chat-slidebar-info">
        </div>
   </div>
   <div id="chat-main" class="flex flex-1 flex-col overflow-hidden p-2 md:pl-0">
      <div class="bg-background flex flex-1 flex-col overflow-hidden rounded-lg">
         <div id="chat-header" class="flex h-12 shrink-0 items-center gap-2 px-4"></div>
          <div class="flex-1 overflow-hidden"> 
             <div class="aui-root aui-thread-root bg-background @container flex h-full flex-col">
  
                <div class="relative flex flex-1 flex-col overflow-x-auto overflow-y-scroll scroll-smooth px-4 pt-4">
                  <div id="chat-content" class="mb-14 flex flex-col gap-y-6 empty:hidden">
                  
                  </div>
                  <div id="chat-footer" class="relative flex flex-1 flex-col overflow-x-auto overflow-y-scroll scroll-smooth px-4 pt-4 justify-center">
                 </div>
              </div>
            </div>
        </div>
      </div>
   
   </div>
</div>
`;
