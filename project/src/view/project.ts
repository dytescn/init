export const project_card_tpl = `
<% it.projects.forEach(function(rowitem){ %>
  <div class="vg-cards cards-content-img" uuid="d62ee3fe933d47d6878059f80a527d23">
    <div class="cards-images-container">
        <div class="cards-img-images" style="background-image: url('');"></div>
    </div>
    <p class="cards-img-tip vg-avatar-bg avatar-size-sm not-bg" style="background-image: url('https://book.funxdata.com/public/img/webmanage/AI.png');">
    </p>
    <div class="cards-img-name">
        <p class="name mb-2"><%= rowitem.name %></p>
        <p class="span ">更新于：<span><%= rowitem.updated_at %></span></p>
    </div>
    </div>
<% }) %>
`;
