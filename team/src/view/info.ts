export const info_tpl = `
 <ul class="pages-personal">
            <li class="pages-personal-li row" id="profile_name">
              <div class="flex-auto">
                 <p class="text font-size-14 color-gray-900">团队名称</p>
                 <p class="span mt-4 font-size-12 color-gray-500" id="team_name">piksel功能演示企业号</p>
               </div>
               <button class="vg-btn btn-size-md" id="edit_team_name">编辑名称</button>
             </li>
              <li class="pages-personal-li row" id="profile_avator">
                <div class="vg-avatar-bg avatar-size-lg mr-8" id="avator_img" style="background-image: url(&quot;https://static.funxdata.com/2024/04/11/a7e79bb9eaba4a5194ecb3526b26ceaa.jpg&quot;);"></div>
                <div class="flex-auto">
                  <p class="text font-size-14 color-gray-900">团队图标</p>
                  <p class="span mt-4 font-size-12 color-gray-500">支持 2M 以内的 JPG PNG 图片格式</p>
                 </div>
                 <button class="vg-btn btn-size-md" id="avator_edit">上传图标</button>
                   <input type="file" id="avator_input" accept=".jpeg,.jpg,.png" style="display: none">
                </li>
                <li class="pages-personal-li row" id="profile_description">
                     <div class="flex-auto">
                       <p class="text font-size-14 color-gray-900">团队简介</p>
                       <p class="span mt-4 font-size-12 color-gray-500" id="description_text">piksel功能演示企业号</p>
                     </div>
                     <button class="vg-btn btn-size-md" id="description_edit">编辑信息</button>
                   </li>
               </ul>

`
