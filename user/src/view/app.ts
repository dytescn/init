export const app_tpl = `
<div class="vg-mains flex1 row" id="main">
    <div class="flex-auto rowcolumn">
       <h5 class="h5 color-gray-800 font-weight-lg mt-32 mb-24 pl-32 pr-32">个人中心</h5>
          <div class="flex-auto pl-32 pr-32">
          <ul class="pages-personal">
             <li class="pages-personal-li row" id="item_name">
               <div class="flex-auto">
                 <p class="text font-size-14 color-gray-900">用户名</p>
                 <p class="span mt-4 font-size-12 color-gray-500" id="account_name">杜伟</p>
               </div>
               <button class="vg-btn btn-size-md" id="account_edit">编辑名称</button>
              </li>
           <li class="pages-personal-li row" id="item_avator">
              <div class="vg-avatar-bg avatar-size-lg mr-8 border-radius-max " id="avator_img" style="background-image: url(&quot;https://static.funxdata.com/2023/06/01/c5c6e25e6b914812a14bfc5cf529d847.png&quot;);"></div>
              <div class="flex-auto">
               <p class="text font-size-14 color-gray-900">头像</p>
               <p class="span mt-4 font-size-12 color-gray-500">支持 2M 以内的 JPG PNG 图片格式</p>
              </div>
              <button class="vg-btn btn-size-md" id="avator_edit">修改头像</button>
              <input type="file" id="avator_input" accept=".jpeg,.jpg,.png" style="display: none">
            </li>
            <li class="pages-personal-li row" id="item_phone">
               <div class="flex-auto">
                 <p class="text font-size-14 color-gray-900">手机号</p>
                 <p class="span mt-4 font-size-12 color-gray-500" id="phone_no">15771763360</p>
               </div>
               <button class="vg-btn btn-size-md" id="phone_edit">更换绑定</button>
            </li>
          </ul>    
        </div>
     </div>
  </div>
`;
