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
    {id:'m1', category:'meat', name:'锡盟肚包肉（3号）', sub:'草原好味 · 冷链配送', price:'139.00', badge:'冷链', stock:'300', image:['category.png',227,536,231,231]},
    {id:'f1', category:'food', name:'乐事薯片 混合口味', sub:'40g × 5袋 · 薄脆可口', price:'16.90', badge:'热销', stock:'120', image:['detail.png',100,154,535,535]},
    {id:'m2', category:'meat', name:'羔羊半排骨（A级）', sub:'内蒙草原 · 精选好物', price:'179.00', badge:'冷链', stock:'参考库存', image:['category.png',535,536,231,231]},
    {id:'f2', category:'food', name:'洽洽嘎吱脆薯片', sub:'35g × 6袋 · 休闲零食', price:'26.90', badge:'热销', stock:'参考库存', image:['food.png',535,536,231,231]},
    {id:'p1', category:'pet', name:'熙讯木薯猫砂', sub:'植物混合 · 5kg 多规格', price:'15.90', badge:'热销', stock:'参考库存', image:['search.png',105,335,200,302]},
    {id:'f3', category:'food', name:'葡萄干沙琪玛', sub:'良品铺子 · 500g', price:'15.90', badge:'新品', stock:'参考库存', image:['food.png',227,1137,204,204]},
    {id:'p2', category:'pet', name:'实木猫窝 创意拼搭', sub:'温暖猫窝 · 趣味生活', price:'49.00', badge:'新品', stock:'参考库存', image:['home-lower-3.png',60,969,200,200]},
    {id:'h1', category:'home', name:'四季亚麻拖鞋', sub:'软底静音 · 家居好物', price:'29.90', badge:'热销', stock:'参考库存', image:['home.png',90,620,610,350]},
    {id:'m3', category:'meat', name:'苏尼特羊肚包肉（1号）', sub:'草原精选 · 冷链配送', price:'159.00', badge:'冷链', stock:'参考库存', image:['home-lower-2.png',58,46,204,172]},
    {id:'p3', category:'pet', name:'智能宠物饮水机', sub:'无线不锈钢 · 宠物用品', price:'43.00', badge:'新品', stock:'参考库存', image:['home-lower-3.png',573,565,128,200]},
  ];
  const state = {route:'home', category:'food', query:'', product:null, previous:'home', report:[], homeFilter:'all'};
  const screen = document.getElementById('screen');
  const nav = document.getElementById('bottom-nav');
  const toast = document.getElementById('toast');
  let toastTimer;
  const esc = v => String(v).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');

  const icons = {
    home:'<path d="m3.2 10.5 8-6.8a1.25 1.25 0 0 1 1.6 0l8 6.8"/><path d="M5.4 9.3v9.6a1.6 1.6 0 0 0 1.6 1.6h10a1.6 1.6 0 0 0 1.6-1.6V9.3M9.7 20.5v-6h4.6v6"/>',
    grid:'<rect x="3.1" y="3.1" width="7.1" height="7.1" rx="2"/><rect x="13.8" y="3.1" width="7.1" height="7.1" rx="2"/><rect x="3.1" y="13.8" width="7.1" height="7.1" rx="2"/><rect x="13.8" y="13.8" width="7.1" height="7.1" rx="2"/>',
    bag:'<rect x="4" y="7" width="16" height="14" rx="2"/><path d="M8 7V4h8v3M8 10a4 4 0 0 0 8 0"/>',
    cart:'<path d="M3 4h2.1l1.8 10.4a2 2 0 0 0 2 1.7h8.2a2 2 0 0 0 2-1.6L20.6 8H5.9"/><circle cx="9.4" cy="19.4" r="1.25"/><circle cx="17.3" cy="19.4" r="1.25"/>',
    user:'<circle cx="12" cy="8.1" r="3.6"/><path d="M5 20.1c.4-3.5 3.1-5.7 7-5.7s6.6 2.2 7 5.7"/>',
    search:'<circle cx="10.5" cy="10.5" r="6.8"/><path d="m15.6 15.6 4.8 4.8"/>',
    back:'<path d="m15 5-7 7 7 7"/>',
    box:'<path d="M3 8.5 12 4l9 4.5v10L12 23l-9-4.5z"/><path d="m3 8.5 9 4.5 9-4.5M12 13v10M7.5 6.3l9 4.5"/>',
  };
  function icon(name, extra='') { return `<svg class="icon ${extra}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name]}</svg>`; }
  function sprite(image, cls='') {
    const [file,x,y,w,h] = image;
    return `<img class="sprite ${cls}" src="./assets/crops/${esc(file.replace(/\.png$/, ''))}--${x}-${y}-${w}-${h}.jpg" style="object-fit:cover" alt="" aria-hidden="true">`;
  }
  function categoryIllustration(id) {
    const allowed = ['meat','food','clean','pet','home','fruit','health','hot','all','cart'];
    const name = allowed.includes(id) ? id : 'all';
    return `<img class="category-illustration" src="./assets/v1-icons/${name}.svg" alt="" aria-hidden="true">`;
  }
  function showcaseCard(title, tag, ids) {
    const items = ids.map(id=>products.find(p=>p.id===id)).filter(Boolean);
    return `<article class="showcase-card"><div class="showcase-heading"><h3>${esc(title)}</h3><span>${esc(tag)}</span></div><div class="showcase-products">${items.map(p=>`<button class="showcase-product" type="button" data-action="product" data-id="${p.id}" aria-label="查看${esc(p.name)}"><span class="showcase-photo">${sprite(p.image)}</span><span class="showcase-price">¥<strong>${esc(p.price)}</strong></span></button>`).join('')}</div></article>`;
  }
  function statusBar() {
    return `<div class="status-bar"><span>9:41</span><span class="status-icons" aria-hidden="true"><svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="4" y="6" width="3" height="6" rx="1"/><rect x="8" y="3" width="3" height="9" rx="1"/><rect x="12" y="1" width="3" height="11" rx="1"/></svg><svg width="15" height="12" viewBox="0 0 15 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M1 4c3.5-3.5 9.5-3.5 13 0M3.5 6.5c2-2 6-2 8 0M6 9c.8-.8 2.2-.8 3 0"/></svg><svg width="23" height="12" viewBox="0 0 23 12" fill="none" stroke="currentColor"><rect x=".5" y="1" width="19" height="10" rx="3"/><rect x="2.5" y="3" width="14" height="6" rx="1" fill="currentColor" stroke="none"/><path d="M21 4v4" stroke-width="2"/></svg></span></div>`;
  }
  function capsule() { return `<span class="capsule" aria-hidden="true"><span class="capsule-dots">•••</span><span class="capsule-divider"></span><span class="capsule-ring"></span></span>`; }
  function searchForm(value='', extra='') {
    return `<form class="search-form ${extra}" data-search-form role="search">${icon('search')}<input type="search" name="query" value="${esc(value)}" placeholder="搜索本店好物" aria-label="搜索本店好物"><button class="search-submit" type="submit">搜索</button></form>`;
  }
  function pageHeader(title, back=false, withSearch=false) {
    return `<header class="page-header">${statusBar()}<div class="page-title-row">${back?`<button class="back-button" type="button" data-action="back" aria-label="返回">${icon('back')}</button>`:'<span class="spacer"></span>'}<h1>${esc(title)}</h1>${capsule()}</div>${withSearch?searchForm(state.query,'search-page-form'):''}</header>`;
  }
  function sectionHeading(title, right='', action='') {
    return `<div class="section-heading"><h2>${esc(title)}</h2>${action?`<button class="section-link" type="button" data-action="${action}">${esc(right)} ›</button>`:`<span class="minor">${esc(right)}</span>`}</div>`;
  }
  function productCard(product) {
    const badgeClass = product.badge === '冷链' ? '' : 'hot';
    return `<article class="product-card"><button class="product-open" type="button" data-action="product" data-id="${product.id}" aria-label="查看${esc(product.name)}"><div class="product-image">${sprite(product.image)}<span class="product-badge ${badgeClass}">${esc(product.badge)}</span></div><div class="product-body"><span class="product-name">${esc(product.name)}</span><span class="product-sub">${esc(product.sub)}</span></div></button><div class="product-bottom"><span class="price"><span class="currency">¥</span><span class="amount">${esc(product.price)}</span></span><button class="add-button" type="button" data-action="add" data-id="${product.id}" aria-label="将${esc(product.name)}加入购物车">+</button></div></article>`;
  }
  function flashPick(product) {
    return `<button class="flash-pick" type="button" data-action="product" data-id="${product.id}" aria-label="查看${esc(product.name)}"><span class="flash-pick-name">${esc(product.name)}</span><span class="flash-pick-image">${sprite(product.image)}</span><span class="flash-pick-price"><small>¥</small>${esc(product.price)}</span><span class="flash-pick-cta">看看好物</span></button>`;
  }
  function flashProduct(product) {
    const category = categories.find(item=>item.id===product.category);
    return `<article class="flash-product"><button class="flash-product-open" type="button" data-action="product" data-id="${product.id}" aria-label="查看${esc(product.name)}"><span class="flash-product-photo">${sprite(product.image)}</span><span class="flash-product-copy"><span class="flash-product-name">${esc(product.name)}</span><span class="flash-product-sub">${esc(product.sub)}</span><span class="flash-product-tags"><span>${esc(product.badge)}</span><span>${esc(category?.label || '精选好物')}</span></span><span class="flash-product-price"><small>¥</small>${esc(product.price)} <em>参考价</em></span></span></button><button class="flash-product-add" type="button" data-action="add" data-id="${product.id}" aria-label="将${esc(product.name)}加入购物车">+</button></article>`;
  }
  function renderHome() {
    const shortcuts = [
      {id:'meat',label:'鲜肉专区'}, {id:'food',label:'食品饮料'}, {id:'clean',label:'家清日化'},
      {id:'pet',label:'宠物用品'}, {id:'home',label:'家居百货'}, {id:'fruit',label:'水果'},
      {id:'health',label:'健康生活'}, {id:'hot',label:'网红爆品'},
      {id:'all',label:'全部分类',action:'category',target:'food'}, {id:'cart',label:'购物车',action:'report'}
    ];
    const filters = [{id:'all',label:'全部好物'},{id:'meat',label:'鲜肉专区'},{id:'food',label:'食品饮料'},{id:'pet',label:'宠物用品'},{id:'home',label:'家居百货'}];
    const shown = state.homeFilter === 'all' ? products : products.filter(product=>product.category===state.homeFilter);
    const picks = ['m1','f1','p1','m2'].map(id=>products.find(product=>product.id===id));
    return `<header class="home-header">${statusBar()}<div class="brand-row"><div class="flash-brand"><h1 class="brand-title"><span>向阳花</span><b>随心选</b></h1><span class="flash-brand-note">日常好物 · 随心挑</span></div>${capsule()}</div>${searchForm()}</header>
      <div class="home-body"><section class="shortcuts" aria-label="快捷分类">${shortcuts.map((item,index)=>`<button class="shortcut ${index>4?'shortcut-small':''}" type="button" data-action="${item.action || 'category'}" ${item.action==='report'?'':`data-id="${item.target || item.id}"`}><span class="shortcut-art">${categoryIllustration(item.id)}${index===0?'<span class="shortcut-tag">精选</span>':''}</span><span>${esc(item.label)}</span></button>`).join('')}</section>
      <section class="flash-curated" aria-label="今日精选"><div class="flash-section-heading"><h2>今日<span>精选</span></h2><button type="button" data-action="category" data-id="hot">更多好物 ›</button></div><div class="flash-picks">${picks.map(flashPick).join('')}</div></section>
      <section class="flash-feed" aria-label="推荐商品"><div class="flash-filters" aria-label="筛选推荐商品">${filters.map(item=>`<button type="button" class="flash-filter ${item.id===state.homeFilter?'is-active':''}" data-action="home-filter" data-id="${item.id}" aria-pressed="${item.id===state.homeFilter}">${esc(item.label)}</button>`).join('')}</div><div class="flash-product-list">${shown.map(flashProduct).join('')}</div></section>
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
    return `${pageHeader('商品详情',true)}<div class="detail-content"><div class="detail-image">${sprite(p.image)}</div><section class="detail-panel"><h1>${esc(p.name)}</h1><p class="detail-description">${esc(p.sub)}。商品价格与库存为参考，具体信息由群主确认。</p><div class="detail-price price"><span class="currency">¥</span><span class="amount">${esc(p.price)}</span></div><div class="detail-stats"><span>库存：${esc(p.stock)}</span><span>已售 0</span></div></section><section class="detail-panel"><h1 style="font-size:16px">商品详情</h1><p class="detail-description">${esc(p.sub)}。选好商品后可加入购物车，与群主确认收款和发货信息。</p></section></div>`;
  }
  function renderReport() {
    const selected = state.report.map(id=>products.find(p=>p.id===id)).filter(Boolean);
    const content = selected.length ? `<div class="report-card">${selected.map(p=>`<div class="report-item"><div class="product-image">${sprite(p.image)}</div><div><p class="report-name">${esc(p.name)}</p><span class="report-price">¥${esc(p.price)}</span></div><button class="remove-button" type="button" data-action="remove" data-id="${p.id}">移除</button></div>`).join('')}</div><div class="info-strip"><div><strong>商品信息仅供参考</strong><span>请与群主确认收款和发货</span></div><button type="button" data-action="guide">下单说明 ›</button></div>` : `<div class="report-card empty-report"><div class="empty-icon">${icon('cart')}</div><h2>购物车还是空的</h2><p>去分类页挑选商品，点「加入购物车」</p><button class="wide-button" type="button" data-action="category" data-id="food">去选购</button></div>`;
    return `${pageHeader('购物车')}<div class="page-content">${content}</div>`;
  }
  function renderMy() {
    return `${pageHeader('我的')}<div class="page-content"><section class="profile-card"><div class="profile-banner">${sprite(['my-buttons.png',26,357,746,276])}<div class="profile-overlay"><strong>蓝队超市</strong><span>欢迎回来，开启今日团购</span></div></div><div class="profile-actions"><button class="wide-button" type="button" data-action="demo">手机号登录</button><button class="wide-button wechat" type="button" data-action="demo">一键登录</button><p class="profile-hint">登录即表示已阅读并同意《下单说明》<br>已登记手机号 + 密码登录 · 新用户请走邀请链接</p></div></section><div class="profile-links"><button type="button" data-action="demo"><span>收货地址管理</span><span>›</span></button><button type="button" data-action="guide"><span>下单说明</span><span>›</span></button></div></div>`;
  }
  function renderGuide() {
    return `${pageHeader('下单说明',true)}<div class="page-content"><section class="guide-card"><h2 class="guide-title">展示型超市</h2><p>不在小程序里付款，由群主收款后转后台下单。</p><p><strong>① 浏览选品</strong><br>在首页或分类中查看商品，点「＋」或详情页的「加入购物车」。</p><p><strong>② 登录与确认商品</strong><br>登录后在购物车中调整商品信息，并交由群主确认。</p><p><strong>③ 群主收款发货</strong><br>商品价格和库存为参考，具体信息以群主确认为准。</p></section></div>`;
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
    if(action==='home-filter') { state.homeFilter=id || 'all'; return render(false); }
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
