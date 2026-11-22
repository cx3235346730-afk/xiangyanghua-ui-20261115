(() => {
  'use strict';

  const categories = [
    {id:'meat', label:'鲜肉专区', short:'鲜肉专区', image:['food.png',50,652,104,105]},
    {id:'food', label:'食品饮料', short:'食品饮料', image:['food.png',50,263,104,92]},
    {id:'clean', label:'家清日化', short:'家清日化', image:['food.png',50,452,104,100]},
    {id:'home', label:'家居百货', short:'家居百货', image:['food.png',50,856,104,99]},
    {id:'pet', label:'宠物用品', short:'宠物用品', image:['food.png',50,1055,104,99]},
    {id:'fruit', label:'水果', short:'水果', image:['food.png',50,1247,104,102]},
    {id:'health', label:'健康生活', short:'健康生活', image:['home.png',430,1340,125,95]},
    {id:'hot', label:'网红爆品', short:'网红爆品', image:['food.png',50,263,104,92]},
  ];
  const products = [
    {id:'m1', category:'meat', name:'锡盟肚包肉（3号）', sub:'草原好味 · 冷链配送', price:'139.00', badge:'冷链', stock:'300', image:'ximeng-stuffed-tripe-studio.jpg'},
    {id:'f1', category:'food', name:'乐事薯片 混合口味', sub:'40g × 5袋 · 薄脆可口', price:'16.90', badge:'热销', stock:'120', image:'lays-assorted-chips-studio.jpg'},
    {id:'m2', category:'meat', name:'羔羊半排骨（A级）', sub:'内蒙草原 · 精选好物', price:'179.00', badge:'冷链', stock:'参考库存', image:'lamb-ribs-studio.jpg'},
    {id:'f2', category:'food', name:'洽洽嘎吱脆薯片', sub:'35g × 6袋 · 休闲零食', price:'26.90', badge:'热销', stock:'参考库存', image:'qiaqia-crisps-studio.jpg'},
    {id:'p1', category:'pet', name:'熙讯木薯猫砂', sub:'植物混合 · 5kg 多规格', price:'15.90', badge:'热销', stock:'参考库存', image:'cassava-cat-litter-studio.jpg'},
    {id:'f3', category:'food', name:'葡萄干沙琪玛', sub:'良品铺子 · 500g', price:'15.90', badge:'新品', stock:'参考库存', image:'raisin-sachima-studio.jpg'},
    {id:'p2', category:'pet', name:'实木猫窝 创意拼搭', sub:'温暖猫窝 · 趣味生活', price:'49.00', badge:'新品', stock:'参考库存', image:'wooden-cat-house-studio.jpg'},
    {id:'h1', category:'home', name:'四季亚麻拖鞋', sub:'软底静音 · 家居好物', price:'29.90', badge:'热销', stock:'参考库存', image:'linen-slippers-studio.jpg'},
    {id:'m3', category:'meat', name:'苏尼特羊肚包肉（1号）', sub:'草原精选 · 冷链配送', price:'159.00', badge:'冷链', stock:'参考库存', image:'sunite-stuffed-tripe-studio.jpg'},
    {id:'p3', category:'pet', name:'智能宠物饮水机', sub:'无线不锈钢 · 宠物用品', price:'43.00', badge:'新品', stock:'参考库存', image:'pet-water-fountain-studio.jpg'},
    {id:'m4', category:'meat', name:'牛肉肚包肉', sub:'草原精选 · 冷链配送', price:'149.00', badge:'冷链', stock:'参考库存', image:'beef-stuffed-tripe-studio.jpg'},
    {id:'f4', category:'food', name:'上好佳 龙虾片', sub:'200g · 盒装', price:'12.90', badge:'热销', stock:'参考库存', image:'oishi-prawn-crackers-studio.jpg'},
  ];
  const state = {route:'home', category:'food', query:'', product:null, previous:'home', report:[]};
  const screen = document.getElementById('screen');
  const nav = document.getElementById('bottom-nav');
  const toast = document.getElementById('toast');
  let toastTimer;
  const esc = v => String(v).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');

  const icons = {
    home:'<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-6v-6H10v6H4a1 1 0 0 1-1-1z"/>',
    grid:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    bag:'<rect x="4" y="7" width="16" height="14" rx="2"/><path d="M8 7V4h8v3M8 10a4 4 0 0 0 8 0"/>',
    cart:'<circle cx="9" cy="20" r="1.3"/><circle cx="18" cy="20" r="1.3"/><path d="M2.5 3h2l2.2 11.3a2 2 0 0 0 2 1.6h9a2 2 0 0 0 2-1.6L21 7H5.4"/>',
    user:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="9" r="3"/><path d="M6.5 18c.8-4 10.2-4 11 0"/>',
    search:'<circle cx="10.5" cy="10.5" r="7"/><path d="m16 16 4.5 4.5"/>',
    camera:'<path d="M4 7h3l2-2h6l2 2h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z"/><circle cx="12" cy="13" r="3.5"/>',
    back:'<path d="m15 5-7 7 7 7"/>',
    box:'<path d="M3 8.5 12 4l9 4.5v10L12 23l-9-4.5z"/><path d="m3 8.5 9 4.5 9-4.5M12 13v10M7.5 6.3l9 4.5"/>',
  };
  function icon(name, extra='') { return `<svg class="icon ${extra}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name]}</svg>`; }
  function productPhoto(product, width = 480) {
    const loading = width === 1024 ? 'eager' : 'lazy';
    return `<img class="product-photo" src="./assets/mobile/${width}/${esc(product.image)}" width="${width}" height="${width}" alt="${esc(product.name)}" loading="${loading}" decoding="async">`;
  }
  function sprite(image, cls='') {
    const [file,x,y,w,h] = image;
    return `<img class="sprite ${cls}" src="./assets/crops/${esc(file.replace(/\.png$/, ''))}--${x}-${y}-${w}-${h}.jpg" style="object-fit:cover" alt="" aria-hidden="true">`;
  }
  function categoryIllustration(id) {
    const art = {
      meat:`<defs><linearGradient id="meat-art" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#ff8b6e"/><stop offset="1" stop-color="#db2838"/></linearGradient></defs><ellipse cx="29" cy="50" rx="19" ry="3.5" fill="#e7ddd9"/><path d="M8 26C8 16 16 10 27 9c11-1 21 4 22 14 1 11-6 19-19 20C18 44 8 38 8 26Z" fill="url(#meat-art)"/><path d="M14 26c0-7 6-11 14-11 8-1 14 3 14 9 0 8-5 13-14 13-8 1-14-4-14-11Z" fill="none" stroke="#ffe4d1" stroke-width="3"/><ellipse cx="32" cy="24" rx="4" ry="3" fill="#fff5e7"/><path d="M13 14c0-5 4-8 9-8-1 5-4 8-9 8Z" fill="#26b977"/><path d="M14 13C15 8 19 6 23 7" fill="none" stroke="#149d63" stroke-width="1.5"/></svg>`,
      food:`<defs><linearGradient id="food-art" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#ff7e64"/><stop offset="1" stop-color="#f02d3c"/></linearGradient></defs><ellipse cx="29" cy="50" rx="19" ry="3.5" fill="#e9ded9"/><rect x="13" y="12" width="12" height="23" rx="3" fill="#ffb63c"/><path d="M15 12h8l2 5H13z" fill="#ffd978"/><rect x="28" y="10" width="11" height="25" rx="3" fill="#5bbaf1"/><path d="M31 7h5v4h-5z" fill="#2588d6"/><path d="M8 25h42l-4 16c-.5 3-2 5-5 5H17c-3 0-4.5-2-5-5Z" fill="url(#food-art)"/><path d="M6 24h46v5H6z" fill="#ff5a56"/><path d="M21 33v7m8-7v7m8-7v7" stroke="#ffddd2" stroke-width="3" stroke-linecap="round"/></svg>`,
      clean:`<defs><linearGradient id="clean-art" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#78d7fb"/><stop offset="1" stop-color="#278be2"/></linearGradient></defs><ellipse cx="29" cy="51" rx="17" ry="3.5" fill="#dce8ed"/><path d="M20 15h17l4 7v22c0 3-2 5-5 5H18c-3 0-5-2-5-5V23z" fill="url(#clean-art)"/><path d="M20 11h15v6H20z" fill="#3da6e9"/><path d="M23 7h11v5H23z" fill="#246cbd"/><path d="M16 25c4-3 17-3 22 0v13c-7 3-15 3-22 0z" fill="#e9f9ff"/><path d="M27 25c-3 4-5 6-5 9a5 5 0 0 0 10 0c0-3-2-5-5-9Z" fill="#55b8e8"/><circle cx="43" cy="13" r="4" fill="#b9edff"/><circle cx="11" cy="14" r="3" fill="#d6f4ff"/></svg>`,
      pet:`<defs><linearGradient id="pet-art" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#ffcf79"/><stop offset="1" stop-color="#f58b46"/></linearGradient></defs><ellipse cx="29" cy="51" rx="18" ry="3.5" fill="#eadfd5"/><path d="M11 23 12 10l12 6a19 19 0 0 1 10 0l12-6 1 13c3 12-4 22-18 22S8 35 11 23Z" fill="url(#pet-art)"/><path d="m15 15 6 4-6 1zm27 0-6 4 6 1z" fill="#f06b66"/><ellipse cx="29" cy="34" rx="11" ry="8" fill="#fff0d5"/><circle cx="22" cy="26" r="2" fill="#65412f"/><circle cx="36" cy="26" r="2" fill="#65412f"/><path d="m26 31 3 2 3-2m-3 2v3" fill="none" stroke="#a55b48" stroke-width="1.5" stroke-linecap="round"/><path d="M43 8c2-3 5-2 5 1 2-2 5-1 5 2 0 3-5 6-5 6s-5-3-5-6c0-1 .1-2 .5-3Z" fill="#f44655"/></svg>`,
      home:`<defs><linearGradient id="home-art" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#ffcf78"/><stop offset="1" stop-color="#f58d3a"/></linearGradient></defs><ellipse cx="29" cy="50" rx="19" ry="3.5" fill="#ece2d8"/><path d="M9 25 29 9l20 16v19a4 4 0 0 1-4 4H13a4 4 0 0 1-4-4Z" fill="url(#home-art)"/><path d="M7 25 29 7l22 18" fill="none" stroke="#f05843" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><rect x="23" y="30" width="12" height="18" rx="2" fill="#fff2df"/><rect x="14" y="27" width="6" height="6" rx="1.5" fill="#ffead0"/><rect x="38" y="27" width="6" height="6" rx="1.5" fill="#ffead0"/></svg>`,
      all:`<ellipse cx="29" cy="51" rx="19" ry="3.5" fill="#e6e3e7"/><rect x="9" y="9" width="18" height="18" rx="6" fill="#fa4c51"/><rect x="31" y="9" width="18" height="18" rx="6" fill="#ffb847"/><rect x="9" y="31" width="18" height="18" rx="6" fill="#40c88b"/><rect x="31" y="31" width="18" height="18" rx="6" fill="#5ea9f4"/><path d="M15 18h6m-3-3v6M36 18h8M18 36v8M36 40h8" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/></svg>`,
    };
    return `<svg class="category-illustration" viewBox="0 0 58 58" aria-hidden="true">${art[id] || art.all}`;
  }
  function showcaseCard(title, tag, ids) {
    const items = ids.map(id=>products.find(p=>p.id===id)).filter(Boolean);
    return `<article class="showcase-card"><div class="showcase-heading"><h3>${esc(title)}</h3><span>${esc(tag)}</span></div><div class="showcase-products">${items.map(p=>`<button class="showcase-product" type="button" data-action="product" data-id="${p.id}" aria-label="查看${esc(p.name)}"><span class="showcase-photo">${productPhoto(p, 192)}</span><span class="showcase-price">¥<strong>${esc(p.price)}</strong></span></button>`).join('')}</div></article>`;
  }
  function statusBar() {
    return `<div class="status-bar"><span>9:41</span><span class="status-icons" aria-hidden="true"><svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="4" y="6" width="3" height="6" rx="1"/><rect x="8" y="3" width="3" height="9" rx="1"/><rect x="12" y="1" width="3" height="11" rx="1"/></svg><svg width="15" height="12" viewBox="0 0 15 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M1 4c3.5-3.5 9.5-3.5 13 0M3.5 6.5c2-2 6-2 8 0M6 9c.8-.8 2.2-.8 3 0"/></svg><svg width="23" height="12" viewBox="0 0 23 12" fill="none" stroke="currentColor"><rect x=".5" y="1" width="19" height="10" rx="3"/><rect x="2.5" y="3" width="14" height="6" rx="1" fill="currentColor" stroke="none"/><path d="M21 4v4" stroke-width="2"/></svg></span></div>`;
  }
  function capsule() { return `<span class="capsule" aria-hidden="true"><span class="capsule-dots">•••</span><span class="capsule-divider"></span><span class="capsule-ring"></span></span>`; }
  function searchForm(value='', extra='') {
    return `<form class="search-form ${extra}" data-search-form role="search"><button class="pdd-search-go" type="submit" aria-label="搜索">${icon('search')}</button><input type="search" name="query" value="${esc(value)}" placeholder="搜索向阳花好物" aria-label="搜索本店好物"><span class="pdd-camera" aria-hidden="true">${icon('camera')}</span></form>`;
  }
  function pageHeader(title, back=false, withSearch=false) {
    return `<header class="page-header">${statusBar()}<div class="page-title-row">${back?`<button class="back-button" type="button" data-action="back" aria-label="返回">${icon('back')}</button>`:'<span class="spacer"></span>'}<h1>${esc(title)}</h1>${capsule()}</div>${withSearch?searchForm(state.query,'search-page-form'):''}</header>`;
  }
  function sectionHeading(title, right='', action='') {
    return `<div class="section-heading"><h2>${esc(title)}</h2>${action?`<button class="section-link" type="button" data-action="${action}">${esc(right)} ›</button>`:`<span class="minor">${esc(right)}</span>`}</div>`;
  }
  function productCard(product) {
    const badgeClass = product.badge === '冷链' ? '' : 'hot';
    return `<article class="product-card"><button class="product-open" type="button" data-action="product" data-id="${product.id}" aria-label="查看${esc(product.name)}"><div class="product-image">${productPhoto(product)}</div><div class="product-body"><span class="product-name"><span class="inline-badge ${badgeClass}">${esc(product.badge)}</span> ${esc(product.name)}</span><span class="product-sub">${esc(product.sub)}</span><span class="product-bottom"><span class="price"><span class="currency">¥</span><span class="amount">${esc(product.price)}</span></span><span class="pdd-reference">参考价</span></span></div></button></article>`;
  }
  function shelfRow(title, tag, ids, category) {
    const items=ids.map(id=>products.find(p=>p.id===id)).filter(Boolean);
    return `<section class="pdd-shelf" aria-label="${esc(title)}"><button class="pdd-shelf-label" type="button" data-action="category" data-id="${esc(category)}"><span class="pdd-shelf-art">${categoryIllustration(category)}</span><strong>${esc(title)}</strong><small>${esc(tag)}</small></button><div class="pdd-shelf-products">${items.map(p=>`<button class="pdd-shelf-product" type="button" data-action="product" data-id="${p.id}" aria-label="查看${esc(p.name)}"><span class="pdd-shelf-photo">${productPhoto(p, 192)}</span><span class="pdd-shelf-price">¥<b>${esc(p.price)}</b></span></button>`).join('')}</div></section>`;
  }
  function renderHome() {
    const shortcutIds = ['meat','food','clean','pet'];
    const shortcuts = shortcutIds.map(id=>categories.find(c=>c.id===id)).map((c,i)=>`<button class="shortcut" type="button" data-action="category" data-id="${c.id}"><span class="shortcut-art">${categoryIllustration(c.id)}${i===0?'<span class="shortcut-tag">精选</span>':''}</span><span>${esc(c.short)}</span></button>`).join('');
    const channels = [{label:'热门',id:''},{label:'精选好物',id:'hot'},{label:'食品',id:'food'},{label:'鲜肉',id:'meat'},{label:'百货',id:'home'},{label:'宠物',id:'pet'},{label:'家清',id:'clean'}];
    return `<header class="home-header">${statusBar()}<div class="pdd-search-top">${searchForm()}${capsule()}</div><div class="channels" aria-label="商品频道">${channels.map((c,i)=>`<button type="button" class="channel ${i===0?'is-active':''} ${i===1?'is-emphasis':''}" data-action="${i===0?'home':'category'}" ${c.id?`data-id="${c.id}"`:''}>${esc(c.label)}</button>`).join('')}</div></header>
      <div class="home-body"><section class="shortcuts" aria-label="快捷分类">${shortcuts}<button class="shortcut" type="button" data-action="category" data-id="food"><span class="shortcut-art">${categoryIllustration('all')}</span><span>全部分类</span></button></section>
      <div class="pdd-shelves">${shelfRow('鲜肉专区','草原精选',['m1','m2','m3','m4'],'meat')}${shelfRow('食品饮料','日常好物',['f1','f2','f3','f4'],'food')}</div>
      <section class="pdd-feed" aria-label="推荐商品"><div class="product-grid">${products.map(productCard).join('')}</div></section>
      <div class="info-strip"><div><strong>安心选购 · 群主确认</strong><span>选好商品加入购物车，群主联系确认</span></div><button type="button" data-action="guide">了解流程 ›</button></div><div class="end-note">— 已经到底啦 —</div></div>`;
  }
  function renderCategory() {
    const current = categories.find(c=>c.id===state.category) || categories[1];
    const list = state.category === 'hot' ? products.filter(p=>p.badge==='热销') : products.filter(p=>p.category===current.id);
    return `${pageHeader('商品分类',false,true)}<div class="category-layout"><aside class="category-side" aria-label="商品分类">${categories.map(c=>`<button type="button" data-action="category" data-id="${c.id}" class="${c.id===current.id?'is-active':''}">${esc(c.label)}</button>`).join('')}</aside><section class="category-panel"><div class="category-head"><h2>${esc(current.label)}</h2><span>${list.length} 件示例商品</span></div>${list.length?`<div class="product-grid">${list.map(productCard).join('')}</div>`:'<div class="empty-search">该分类暂未展示商品</div>'}</section></div>`;
  }
  function renderSearch() {
    const term = state.query.trim().toLowerCase();
    const list = term ? products.filter(p=>(p.name+p.sub+(categories.find(c=>c.id===p.category)?.label||'')).toLowerCase().includes(term)) : [];
    return `${pageHeader('搜索商品',true,true)}<div class="page-content"><p class="search-count">${term?`找到 ${list.length} 件相关商品`:'输入关键词查看商品'}</p>${list.length?`<div class="product-grid">${list.map(productCard).join('')}</div>`:`<div class="empty-search">${term?'没有找到相关商品，换个词试试':'搜索商品名称或分类'}</div>`}</div>`;
  }
  function renderDetail() {
    const p = products.find(item=>item.id===state.product) || products[0];
    return `${pageHeader('商品详情',true)}<div class="detail-content"><div class="detail-image">${productPhoto(p, 1024)}</div><section class="detail-panel"><h1>${esc(p.name)}</h1><p class="detail-description">${esc(p.sub)}。商品价格与库存为参考，具体信息由群主确认。</p><div class="detail-price price"><span class="currency">¥</span><span class="amount">${esc(p.price)}</span></div><div class="detail-stats"><span>库存：${esc(p.stock)}</span><span>已售 0</span></div></section><section class="detail-panel"><h1 style="font-size:16px">商品详情</h1><p class="detail-description">${esc(p.sub)}。选好商品后可加入购物车，与群主确认收款和发货信息。</p></section></div>`;
  }
  function renderReport() {
    const selected = state.report.map(id=>products.find(p=>p.id===id)).filter(Boolean);
    const content = selected.length ? `<div class="report-card">${selected.map(p=>`<div class="report-item"><div class="product-image">${productPhoto(p, 192)}</div><div><p class="report-name">${esc(p.name)}</p><span class="report-price">¥${esc(p.price)}</span></div><button class="remove-button" type="button" data-action="remove" data-id="${p.id}">移除</button></div>`).join('')}</div><div class="info-strip"><div><strong>商品信息仅供参考</strong><span>请与群主确认收款和发货</span></div><button type="button" data-action="guide">下单说明 ›</button></div>` : `<div class="report-card empty-report"><div class="empty-icon">${icon('cart')}</div><h2>购物车还是空的</h2><p>去分类页挑选商品，点「加入购物车」</p><button class="wide-button" type="button" data-action="category" data-id="food">去选购</button></div>`;
    return `${pageHeader('购物车')}<div class="page-content">${content}</div>`;
  }
  function renderMy() {
    return `${pageHeader('我的')}<div class="page-content"><section class="profile-card"><div class="profile-banner">${sprite(['my-buttons.png',26,357,746,276])}<div class="profile-overlay"><strong>蓝队超市</strong><span>欢迎回来，开启今日团购</span></div></div><div class="profile-actions"><button class="wide-button" type="button" data-action="demo">手机号登录</button><button class="wide-button wechat" type="button" data-action="demo">一键登录</button><p class="profile-hint">登录即表示已阅读并同意《下单说明》<br>已登记手机号 + 密码登录 · 新用户请走邀请链接</p></div></section><div class="profile-links"><button type="button" data-action="demo"><span>收货地址管理</span><span>›</span></button><button type="button" data-action="guide"><span>下单说明</span><span>›</span></button></div></div>`;
  }
  function renderGuide() {
    return `${pageHeader('下单说明',true)}<div class="page-content"><section class="guide-card"><h2 class="guide-title">展示型超市</h2><p>不在小程序里付款，由群主收款后转后台下单。</p><p><strong>① 浏览选品</strong><br>在首页或分类中查看商品，进入详情页后点「加入购物车」。</p><p><strong>② 登录与确认商品</strong><br>登录后在购物车中调整商品信息，并交由群主确认。</p><p><strong>③ 群主收款发货</strong><br>商品价格和库存为参考，具体信息以群主确认为准。</p></section></div>`;
  }
  function renderNav() {
    if (state.route === 'detail') {
      nav.className='detail-actions';
      nav.innerHTML=`<button class="wide-button" type="button" data-action="add-detail">加入购物车</button><button class="wide-button secondary" type="button" data-action="demo">分享</button>`;
      return;
    }
    nav.className='bottom-nav';
    const current = state.route==='search' || state.route==='guide' ? '' : state.route;
    const entries=[['home','首页','home'],['category','分类','grid'],['report','购物车','cart'],['my','我的','user']];
    nav.innerHTML=entries.map(([route,label,iconName])=>`<button type="button" class="nav-item ${route===current?'is-active':''}" data-action="${route}" ${route===current?'aria-current="page"':''}>${icon(iconName)}${route==='report'&&state.report.length?`<span class="nav-count">${state.report.length}</span>`:''}<span>${label}</span></button>`).join('');
  }
  function render(reset=true) {
    const pages={home:renderHome,category:renderCategory,search:renderSearch,detail:renderDetail,report:renderReport,my:renderMy,guide:renderGuide};
    screen.innerHTML=(pages[state.route]||renderHome)();
    renderNav();
    if(reset) screen.scrollTop=0;
  }
  function setRoute(route) { state.route=route; render(); }
  function notify(message) { clearTimeout(toastTimer); toast.textContent=message; toast.classList.add('show'); toastTimer=setTimeout(()=>toast.classList.remove('show'),1800); }
  function addItem(id) {
    if (!state.report.includes(id)) state.report.push(id);
    renderNav();
    notify('已加入购物车');
  }
  document.addEventListener('click', event=>{
    const button=event.target.closest('[data-action]');
    if(!button) return;
    const action=button.dataset.action, id=button.dataset.id;
    if(action==='home') return setRoute('home');
    if(action==='category') { state.category=id || 'food'; return setRoute('category'); }
    if(action==='report' || action==='my') return setRoute(action);
    if(action==='product') { state.previous=state.route; state.product=id; return setRoute('detail'); }
    if(action==='back') return setRoute(state.route==='detail'?state.previous:(state.route==='guide'?'my':'home'));
    if(action==='add') return addItem(id);
    if(action==='add-detail') return addItem(state.product);
    if(action==='remove') { state.report=state.report.filter(item=>item!==id); return render(false); }
    if(action==='guide') return setRoute('guide');
    if(action==='demo') return notify('界面预览');
  });
  document.addEventListener('submit', event=>{
    if(!event.target.matches('[data-search-form]')) return;
    event.preventDefault();
    state.query=new FormData(event.target).get('query').toString();
    setRoute('search');
  });
  render();
})();
