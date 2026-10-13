// DirectHarvest demo — no backend, localStorage only
const $=id=>document.getElementById(id);
const store={get:(k,d)=>{try{const v=localStorage.getItem('dh_'+k);return v?JSON.parse(v):d}catch(e){return d}},set:(k,v)=>localStorage.setItem('dh_'+k,JSON.stringify(v))};

// ---- i18n ----
const I={
en:{tagline:'Fair price. Direct deal. No middleman.',login:'Login',logout:'Logout',pilot:'Phase 1 Pilot demo • full clickable prototype',hero:'Farmers list. Shops compare. Deal directly.',herosub:'Public price board, listings, orders, chat with auto-translation, UPI + delivery mock, ratings. Kannada / Hindi / Malayalam / English.',transNote:'Chat demo: farmer in Kannada ↔ shop in English auto-translates. Try it in Orders → Chat.',asFarmer:'Enter as Farmer',asShop:'Enter as Shopkeeper',openDash:'Open dashboard',priceBoard:'Public Price Board',boardSub:'Live avg per crop per region (demo data)',trend:'Trend',f1t:'Farmer posts',f1d:'Crop, qty, ₹/kg, harvest date, photo. Sees mandi benchmark before pricing.',f2t:'Shop compares',f2d:'Filter by crop, price, distance, freshness, rating. Side-by-side compare.',f3t:'Direct deal',f3d:'Order → accept/counter → UPI escrow → delivery slot → rating. Fee 2% shown openly.',phone:'Phone',name:'Name',place:'Village / Shop place',continue:'Continue',back:'Back',newList:'New listing',publish:'Publish',myList:'My listings',earn:'Earnings',browse:'Browse & compare',compare:'Compare',viewCmp:'View',orders:'Orders',chat:'Chat',chatHint:'Demo translator: common words translate, rest shown with [→lang] tag. In real app plug Google/Bhashini API.',foot:'every rupee visible'},
kn:{tagline:'ನ್ಯಾಯ ಬೆಲೆ. ನೇರ ವ್ಯವಹಾರ. ಮಧ್ಯವರ್ತಿ ಇಲ್ಲ.',login:'ಲಾಗಿನ್',logout:'ಲಾಗ್ಔಟ್',pilot:'ಹಂತ 1 ಪೈಲಟ್ ಡೆಮೊ • ಪೂರ್ಣ ಕ್ಲಿಕ್ ಮೂಲಮಾದರಿ',hero:'ರೈತರು ಪಟ್ಟಿ ಮಾಡಿ. ಅಂಗಡಿಗಳು ಹೋಲಿಸಿ. ನೇರವಾಗಿ ವ್ಯವಹರಿಸಿ.',herosub:'ಸಾರ್ವಜನಿಕ ಬೆಲೆ ಪಟ್ಟಿ, ಪಟ್ಟಿಗಳು, ಆರ್ಡರ್‌ಗಳು, ಸ್ವಯಂ-ಅನುವಾದ ಚಾಟ್, UPI + ವಿತರಣೆ, ರೇಟಿಂಗ್. ಕನ್ನಡ / ಹಿಂದಿ / ಮಲಯಾಳಂ / ಇಂಗ್ಲಿಷ್.',transNote:'ಚಾಟ್ ಡೆಮೊ: ಕನ್ನಡದಲ್ಲಿ ರೈತ ↔ ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ ಅಂಗಡಿ ಸ್ವಯಂ-ಅನುವಾದ. ಆರ್ಡರ್ → ಚಾಟ್‌ನಲ್ಲಿ ಪ್ರಯತ್ನಿಸಿ.',asFarmer:'ರೈತರಾಗಿ ಪ್ರವೇಶಿಸಿ',asShop:'ಅಂಗಡಿಯಾಗಿ ಪ್ರವೇಶಿಸಿ',openDash:'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ತೆರೆಯಿರಿ',priceBoard:'ಸಾರ್ವಜನಿಕ ಬೆಲೆ ಪಟ್ಟಿ',boardSub:'ಪ್ರತಿ ಬೆಳೆಗೆ ಸರಾಸರಿ ಬೆಲೆ (ಡೆಮೊ)',trend:'ಪ್ರವೃತ್ತಿ',f1t:'ರೈತ ಪೋಸ್ಟ್',f1d:'ಬೆಳೆ, ಪ್ರಮಾಣ, ₹/ಕೆಜಿ, ಕೊಯ್ಲು ದಿನಾಂಕ. ಮಂಡಿ ಬೆಲೆ ನೋಡಿ ಬೆಲೆ ಇಡಿ.',f2t:'ಅಂಗಡಿ ಹೋಲಿಕೆ',f2d:'ಬೆಳೆ, ಬೆಲೆ, ದೂರ, ತಾಜಾತನ, ರೇಟಿಂಗ್‌ನಿಂದ ಫಿಲ್ಟರ್. ಪಕ್ಕ-ಪಕ್ಕ ಹೋಲಿಕೆ.',f3t:'ನೇರ ವ್ಯವಹಾರ',f3d:'ಆರ್ಡರ್ → ಒಪ್ಪು/ಪ್ರತಿ-ಬೆಲೆ → UPI → ವಿತರಣೆ → ರೇಟಿಂಗ್. ಶುಲ್ಕ 2% ಬಹಿರಂಗ.',phone:'ಫೋನ್',name:'ಹೆಸರು',place:'ಗ್ರಾಮ / ಅಂಗಡಿ ಸ್ಥಳ',continue:'ಮುಂದುವರಿಸಿ',back:'ಹಿಂದೆ',newList:'ಹೊಸ ಪಟ್ಟಿ',publish:'ಪ್ರಕಟಿಸಿ',myList:'ನನ್ನ ಪಟ್ಟಿಗಳು',earn:'ಆದಾಯ',browse:'ಹುಡುಕಿ & ಹೋಲಿಸಿ',compare:'ಹೋಲಿಸಿ',viewCmp:'ನೋಡಿ',orders:'ಆರ್ಡರ್‌ಗಳು',chat:'ಚಾಟ್',chatHint:'ಡೆಮೊ ಅನುವಾದಕ: ಸಾಮಾನ್ಯ ಪದಗಳು ಅನುವಾದ, ಉಳಿದವು [→lang] ಟ್ಯಾಗ್. ನಿಜವಾದ ಆ್ಯಪ್‌ನಲ್ಲಿ Google/Bhashini API.',foot:'ಪ್ರತಿ ರೂಪಾಯಿ ಗೋಚರ'},
hi:{tagline:'सही दाम. सीधा सौदा. बिचौलिया नहीं.',login:'लॉगिन',logout:'लॉगआउट',pilot:'फेज 1 पायलट डेमो • पूर्ण क्लिक प्रोटोटाइप',hero:'किसान लिस्ट करें. दुकान तुलना करें. सीधे सौदा करें.',herosub:'पब्लिक भाव बोर्ड, लिस्टिंग, ऑर्डर, ऑटो-अनुवाद चैट, UPI + डिलीवरी, रेटिंग. कन्नड़ / हिन्दी / मलयालम / English.',transNote:'चैट डेमो: किसान कन्नड़ में ↔ दुकानदार English में, ऑटो-अनुवाद. Orders → Chat में देखें.',asFarmer:'किसान बनकर प्रवेश',asShop:'दुकानदार बनकर प्रवेश',openDash:'डैशबोर्ड खोलें',priceBoard:'सार्वजनिक भाव बोर्ड',boardSub:'हर फसल का औसत भाव (डेमो)',trend:'रुझान',f1t:'किसान पोस्ट',f1d:'फसल, मात्रा, ₹/किलो, कटाई तिथि. मंडी भाव देखकर दाम रखें.',f2t:'दुकान तुलना',f2d:'फसल, दाम, दूरी, ताजगी, रेटिंग से फिल्टर. साथ-साथ तुलना.',f3t:'सीधा सौदा',f3d:'ऑर्डर → स्वीकार/काउंटर → UPI एस्क्रो → डिलीवरी → रेटिंग. फीस 2% खुली.',phone:'फोन',name:'नाम',place:'गाँव / दुकान पता',continue:'आगे बढ़ें',back:'वापस',newList:'नई लिस्टिंग',publish:'प्रकाशित करें',myList:'मेरी लिस्टिंग',earn:'कमाई',browse:'खोजें और तुलना करें',compare:'तुलना',viewCmp:'देखें',orders:'ऑर्डर',chat:'चैट',chatHint:'डेमो अनुवादक: आम शब्द अनूदित, बाकी [→lang] टैग के साथ. असली ऐप में Google/Bhashini API लगाएँ.',foot:'हर रुपया दिखेगा'},
ml:{tagline:'ന്യായമായ വില. നേരിട്ടുള്ള ഇടപാട്. ഇടനിലക്കാരില്ല.',login:'ലോഗിൻ',logout:'ലോഗ്ഔട്ട്',pilot:'ഫേസ് 1 പൈലറ്റ് ഡെമോ • പൂർണ്ണ ക്ലിക്ക് പ്രോട്ടോടൈപ്പ്',hero:'കർഷകർ ലിസ്റ്റ് ചെയ്യൂ. കടകൾ താരതമ്യം ചെയ്യൂ. നേരിട്ട് ഇടപാട്.',herosub:'പബ്ലിക് വില ബോർഡ്, ലിസ്റ്റിംഗ്, ഓർഡർ, ഓട്ടോ-വിവർത്തന ചാറ്റ്, UPI + ഡെലിവറി, റേറ്റിംഗ്.',transNote:'ചാറ്റ് ഡെമോ: കന്നഡയിൽ കർഷകൻ ↔ ഇംഗ്ലീഷിൽ കടക്കാരൻ, ഓട്ടോ-വിവർത്തനം. Orders → Chat ൽ നോക്കൂ.',asFarmer:'കർഷകനായി പ്രവേശിക്കൂ',asShop:'കടക്കാരനായി പ്രവേശിക്കൂ',openDash:'ഡാഷ്ബോർഡ് തുറക്കൂ',priceBoard:'പൊതു വില ബോർഡ്',boardSub:'വിളയ്ക്ക് ശരാശരി വില (ഡെമോ)',trend:'ട്രെൻഡ്',f1t:'കർഷക പോസ്റ്റ്',f1d:'വിള, അളവ്, ₹/കിലോ, വിളവെടുപ്പ് തീയതി. മണ്ഡി വില നോക്കി വിലയിടൂ.',f2t:'കട താരതമ്യം',f2d:'വിള, വില, ദൂരം, പുതുമ, റേറ്റിംഗ് ഫിൽട്ടർ. താരതമ്യം.',f3t:'നേരിട്ട് ഇടപാട്',f3d:'ഓർഡർ → സ്വീകരിക്കൂ/കൗണ്ടർ → UPI → ഡെലിവറി → റേറ്റിംഗ്. ഫീസ് 2% പരസ്യം.',phone:'ഫോൺ',name:'പേര്',place:'ഗ്രാമം / കട സ്ഥലം',continue:'തുടരൂ',back:'തിരികെ',newList:'പുതിയ ലിസ്റ്റിംഗ്',publish:'പ്രസിദ്ധീകരിക്കൂ',myList:'എന്റെ ലിസ്റ്റിംഗുകൾ',earn:'വരുമാനം',browse:'തിരയൂ & താരതമ്യം ചെയ്യൂ',compare:'താരതമ്യം',viewCmp:'കാണൂ',orders:'ഓർഡറുകൾ',chat:'ചാറ്റ്',chatHint:'ഡെമോ വിവർത്തകൻ: സാധാരണ വാക്കുകൾ വിവർത്തനം, ബാക്കി [→lang] ടാഗിൽ. യഥാർത്ഥ ആപ്പിൽ Google/Bhashini API.',foot:'ഓരോ രൂപയും ദൃശ്യം'}
};
let LANG=store.get('lang','en');
function t(k){return (I[LANG]&&I[LANG][k])||I.en[k]||k}
function setLang(l){LANG=l;store.set('lang',l);applyI();drawBoard();renderAll();
  document.querySelectorAll('#langs button').forEach(b=>b.classList.toggle('on',b.dataset.lang===l))}
function applyI(){document.querySelectorAll('[data-i]').forEach(el=>{const k=el.getAttribute('data-i');if(I[LANG][k])el.textContent=I[LANG][k]});document.querySelectorAll('#langs button').forEach(b=>b.classList.toggle('on',b.dataset.lang===LANG))}

// ---- demo data ----
const EMO={'Tomato 🍅':'🍅','Onion 🧅':'🧅','Potato 🥔':'🥔','Banana 🍌':'🍌','Mango 🥭':'🥭','Chilli 🌶':'🌶'};
let listings=store.get('listings',[
 {id:'L1',crop:'Tomato 🍅',farmer:'Ravi (Mandya)',phone:'***210',qty:200,price:22,dist:8,rate:4.6,fresh:'today',lang:'kn'},
 {id:'L2',crop:'Tomato 🍅',farmer:'Suresh (Mysuru)',phone:'***335',qty:150,price:20,dist:15,rate:4.2,fresh:'yesterday',lang:'kn'},
 {id:'L3',crop:'Onion 🧅',farmer:'Fatima (Belgaum)',phone:'***118',qty:500,price:28,dist:12,rate:4.8,fresh:'today',lang:'hi'},
 {id:'L4',crop:'Banana 🍌',farmer:'Joseph (Kochi)',phone:'***772',qty:100,price:35,dist:20,rate:4.5,fresh:'today',lang:'ml'},
 {id:'L5',crop:'Potato 🥔',farmer:'Ravi (Mandya)',phone:'***210',qty:300,price:24,dist:8,rate:4.6,fresh:'2 days',lang:'kn'}
]);
let orders=store.get('orders',[
 {id:'O101',listingId:'L1',crop:'Tomato 🍅',qty:50,price:22,status:'confirmed',farmer:'Ravi (Mandya)',shop:'Kumar Store',history:['placed 10:00','confirmed 10:20'],rating:0}
]);
let chats=store.get('chats',{'O101':[
 {me:false,text:'ನಮಸ್ಕಾರ, ಟೊಮೆಟೊ 50 ಕೆಜಿ ಬೇಕು',lang:'kn'},
 {me:true,text:'Yes, ready. Today evening delivery?',lang:'en'}
]});
let cmp=[]; let user=store.get('user',null);
function save(){store.set('listings',listings);store.set('orders',orders);store.set('chats',chats)}

// ---- phrasebook translator (demo) ----
const PB=[
 ['ನಮಸ್ಕಾರ','hello','नमस्ते','ഹലോ'],
 ['ಟೊಮೆಟೊ','tomato','टमाटर','തക്കാളി'],
 ['ಈರುಳ್ಳಿ','onion','प्याज','ഉള്ളി'],
 ['ಬೆಲೆ','price','कीमत','വില'],
 ['ಎಷ್ಟು','how much','कितना','എത്ര'],
 ['ಬೇಕு','want','चाहिए','വേണം'],
 ['ಕೆಜಿ','kg','किलो','കിലോ'],
 ['ವಿತರಣೆ','delivery','डिलीवरी','ഡെലിവറി'],
 ['ಸರಿ','ok','ठीक','ശരി'],
 ['ನಾಳೆ','tomorrow','कल','നാളെ'],
 ['ಇಂದು','today','आज','ഇന്ന്']
];
function detectLang(s){if(/[\u0C80-\u0CFF]/.test(s))return 'kn';if(/[\u0900-\u097F]/.test(s))return 'hi';if(/[\u0D00-\u0D7F]/.test(s))return 'ml';return 'en'}
function fakeTranslate(text,to){
  let out=text;
  PB.forEach(row=>{
    const cols={kn:0,en:1,hi:2,ml:3};
    row.forEach((w,i)=>{ if(to===['kn','en','hi','ml'][i]){ row.forEach(src=>{ if(src!==w) out=out.replace(new RegExp(src,'gi'),w) }) } });
  });
  const from=detectLang(text);
  if(from===to) return text;
  if(out===text) return text+` [→${to}]`;
  return out+` (auto ${from}→${to} demo)`;
}

// ---- nav ----
function show(id){['view-landing','view-auth','view-dash'].forEach(v=>$(v).style.display=v===id?'block':'none');window.scrollTo(0,0)}
function toast(m){const x=$('toast');x.textContent=m;x.style.display='block';setTimeout(()=>x.style.display='none',2600)}
function quickLogin(role){user={role,name:role==='farmer'?'Ravi (demo farmer)':'Kumar (demo shop)',place:role==='farmer'?'Mandya':'Gandhinagar'};store.set('user',user);enterDash()}
function doLogin(){user={role:$('a_role').value,name:$('a_name').value||'Demo user',place:$('a_place').value||'Mandya',phone:$('a_phone').value};store.set('user',user);enterDash();toast('Logged in (demo) ✅')}
function logout(){user=null;store.set('user',null);syncAuth();show('view-landing')}
function syncAuth(){$('loginBtn').style.display=user?'none':'';$('logoutBtn').style.display=user?'':'none'}
function enterDash(){syncAuth();show('view-dash');buildTabs();renderAll();
  $('meLine').textContent=(user.name||'')+' • '+(user.place||'');
  $('roleBadge').textContent=user.role}

// tabs per role
function buildTabs(){
  const r=user?user.role:'shop';
  const tabs=r==='farmer'?[['farmer','🚜 Listings'],['orders','🧾 Orders'],['chat','💬 Chat'],['more','⋯ More']]
    :r==='admin'?[['orders','🧾 Orders'],['chat','💬 Chat'],['more','🛡 Admin']]
    :[['shop','🏪 Browse'],['orders','🧾 Orders'],['chat','💬 Chat'],['more','⋯ More']];
  $('dashTabs').innerHTML=tabs.map((x,i)=>`<button data-t="${x[0]}" class="${i===0?'on':''}" onclick="openTab('${x[0]}')">${x[1]}</button>`).join('');
  openTab(tabs[0][0]);
}
function openTab(n){
  document.querySelectorAll('#dashTabs button').forEach(b=>b.classList.toggle('on',b.dataset.t===n));
  $('tab-farmer-listings').style.display=n==='farmer'?'grid':'none';
  $('tab-shop-browse').style.display=n==='shop'?'block':'none';
  $('tab-orders').style.display=n==='orders'?'block':'none';
  $('tab-chat').style.display=n==='chat'?'block':'none';
  $('tab-more').style.display=n==='more'?'grid':'none';
  if(n==='orders')renderOrders(); if(n==='chat')renderChat();
}

// ---- board + chart ----
function drawBoard(){
  const avg={}; const cnt={};
  listings.forEach(l=>{const c=l.crop;avg[c]=(avg[c]||0)+l.price;cnt[c]=(cnt[c]||0)+1});
  let h=`<tr><th>🥬</th><th>₹/kg</th><th>${t('trend')}</th></tr>`;
  Object.keys(avg).forEach(c=>{h+=`<tr><td>${c}</td><td><b>₹${(avg[c]/cnt[c]).toFixed(1)}</b></td><td>📈 +${(cnt[c]*2)%9}%</td></tr>`});
  $('boardTable').innerHTML=h;
  const cv=$('trendChart'); if(!cv)return; const x=cv.getContext('2d');
  x.clearRect(0,0,400,180); x.strokeStyle='#1b6b3a'; x.lineWidth=3; x.beginPath();
  const pts=[22,24,21,26,23,28,25]; pts.forEach((p,i)=>{const px=20+i*55,py=160-p*4; i?x.lineTo(px,py):x.moveTo(px,py)});
  x.stroke(); x.fillStyle='#12321f'; x.font='12px sans-serif'; x.fillText('Tomato 7-day ₹/kg (demo)',20,16);
}

// ---- farmer ----
function addListing(){
  const crop=$('f_crop').value,qty=+$('f_qty').value||0,price=+$('f_price').value||0,dist=+$('f_dist').value||5;
  if(!qty||!price)return toast('Enter qty + price');
  listings.unshift({id:'L'+Date.now(),crop,farmer:(user?user.name:'Farmer')+' ('+(user?user.place:'')+')',phone:'***new',qty,price,dist,rate:5.0,fresh:'today',lang:LANG});
  save();renderAll();toast('Listing published ✅');
}
function renderMine(){
  $('myListings').innerHTML=listings.slice(0,6).map(l=>`<div class="listing"><div class="emoji">${EMO[l.crop]||'🥬'}</div>
   <div><b>${l.crop}</b> <span class="badge">✔</span><br><span class="muted">${l.qty}kg • ${l.dist}km • ⭐${l.rate} • ${l.fresh}</span></div>
   <div style="text-align:right"><div class="price">₹${l.price}</div><button class="btn btn-ghost btn-sm" onclick="bump('${l.id}')">-₹1</button></div></div>`).join('')||'—';
  const inc=orders.filter(o=>o.status!=='delivered').length;
  $('earnBox').innerHTML=`Active: <b>${listings.length}</b> • Open orders: <b>${inc}</b> • Month income (demo): <b>₹18,400</b> • +22% vs middleman`;
}
function bump(id){const l=listings.find(x=>x.id===id);if(l){l.price=Math.max(1,l.price-1);save();renderAll()}}

// ---- shop ----
function renderShop(){
  const q=($('s_q').value||'').toLowerCase(),mx=+$('s_max').value||9999,s=$('s_sort').value;
  let arr=listings.filter(l=>l.crop.toLowerCase().includes(q)&&l.price<=mx);
  if(s==='price')arr.sort((a,b)=>a.price-b.price); if(s==='dist')arr.sort((a,b)=>a.dist-b.dist); if(s==='rate')arr.sort((a,b)=>b.rate-a.rate);
  $('shopList').innerHTML=arr.map(l=>`<div class="listing"><div class="emoji">${EMO[l.crop]||'🥬'}</div>
   <div><b>${l.crop}</b> <span class="badge">✔ ${l.farmer}</span><br><span class="muted">${l.qty}kg • ₹${l.price}/kg • ${l.dist}km • ⭐${l.rate} • ${l.fresh} • ${l.lang.toUpperCase()}</span></div>
   <div class="row"><button class="btn btn-ghost btn-sm" onclick="toggleCmp('${l.id}')">⚖</button>
   <button class="btn btn-ghost btn-sm" onclick="fav('${l.id}')">❤</button>
   <button class="btn btn-green btn-sm" onclick="order('${l.id}')">🛒 Order</button></div></div>`).join('')||'<p class="muted">No match. Try onion / tomato.</p>';
  $('cmpN').textContent=cmp.length; $('cmpBox').innerHTML=cmp.map(id=>{const l=listings.find(x=>x.id===id);return l?`<span class="badge">${l.crop} ₹${l.price}</span>`:''}).join('');
}
function toggleCmp(id){cmp.includes(id)?cmp=cmp.filter(x=>x!==id):(cmp.length<3?cmp.push(id):toast('Max 3 to compare'));renderShop()}
function showCompare(){
  if(!cmp.length)return toast('Tap ⚖ on listings first');
  $('cmpView').style.display='block';
  $('cmpTable').innerHTML=`<table><tr><th></th>${cmp.map(id=>{const l=listings.find(x=>x.id===id);return `<th>${l.crop}<br>₹${l.price}/kg</th>`}).join('')}</tr>
  <tr><td>Farmer</td>${cmp.map(id=>`<td>${listings.find(x=>x.id===id).farmer}</td>`).join('')}</tr>
  <tr><td>Distance</td>${cmp.map(id=>`<td>${listings.find(x=>x.id===id).dist} km</td>`).join('')}</tr>
  <tr><td>Rating</td>${cmp.map(id=>`<td>⭐${listings.find(x=>x.id===id).rate}</td>`).join('')}</tr>
  <tr><td></td>${cmp.map(id=>`<td><button class="btn btn-green btn-sm" onclick="order('${id}')">Order</button></td>`).join('')}</tr></table>`;
}
function fav(id){toast('Saved to favourites ❤ (demo)')}
function order(id){
  const l=listings.find(x=>x.id===id); if(!l)return;
  const qty=prompt(`Qty kg (avail ${l.qty})?`,'50'); if(!qty)return;
  const fee=Math.round(qty*l.price*0.02), o={id:'O'+Math.floor(100+Math.random()*900),listingId:id,crop:l.crop,qty:+qty,price:l.price,fee,del:50,total:qty*l.price+fee+50,status:'placed',farmer:l.farmer,shop:user?user.name:'Demo shop',history:['placed '+new Date().toLocaleTimeString()],rating:0};
  orders.unshift(o); chats[o.id]=[]; save(); renderAll(); openTab('orders'); toast('Order placed ✅ farmer notified');
}

// ---- orders ----
function renderOrders(){
  const sel=$('chatOrder'); sel.innerHTML=orders.map(o=>`<option>${o.id} • ${o.crop} • ${o.status}</option>`).join('');
  $('orderList').innerHTML=orders.map(o=>`<div class="listing"><div class="emoji">🧾</div>
   <div><b>${o.id} • ${o.crop} ${o.qty}kg</b><br><span class="muted">${o.farmer} → ${o.shop} • ${o.history.join(' → ')}</span>
   <div class="fee" style="margin-top:6px">Farmer ₹${o.qty*o.price} + fee 2% ₹${o.fee} + delivery ₹${o.del} = <b>₹${o.total}</b> • escrow ${o.status==='delivered'?'released ✅':'locked 🔒'}</div>
   <div class="timeline">${['placed','confirmed','shipped','delivered'].map(s=>`<div class="step ${stage(o.status)>=stage(s)?'done':''}">${s}</div>`).join('')}</div></div>
   <div class="row"><button class="btn btn-green btn-sm" onclick="setSt('${o.id}','confirmed')">✔ Accept</button>
   <button class="btn btn-ghost btn-sm" onclick="counter('${o.id}')">↔ Counter</button>
   <button class="btn btn-ghost btn-sm" onclick="setSt('${o.id}','shipped')">🚚 Ship</button>
   <button class="btn btn-ghost btn-sm" onclick="setSt('${o.id}','delivered')">📦 Delivered</button>
   <button class="btn btn-ghost btn-sm" onclick="openTab('chat')">💬 Chat</button></div></div>`).join('')||'No orders yet.';
}
function stage(s){return {placed:0,confirmed:1,shipped:2,delivered:3}[s]||0}
function setSt(id,s){const o=orders.find(x=>x.id===id);o.status=s;o.history.push(s+' '+new Date().toLocaleTimeString());save();renderOrders();toast('Order '+id+' → '+s)}
function counter(id){const p=prompt('Counter price ₹/kg?','21');if(!p)return;const o=orders.find(x=>x.id===id);o.price=+p;o.total=o.qty*o.price+o.fee+o.del;o.history.push('counter ₹'+p);save();renderOrders()}
function ratePrompt(){const s=prompt('Rate 1-5?','5');if(s)toast('Thanks! Rated ⭐'+s+' (demo)')}

// ---- chat ----
function curOrderId(){const v=$('chatOrder').value||'';return v.split(' ')[0]}
function renderChat(){
  renderOrdersLite();
  const id=curOrderId(); const arr=chats[id]||[];
  const mine=$('myLang').value||'en';
  $('chatBox').innerHTML=arr.map(m=>{const tr=fakeTranslate(m.text,mine);return `<div class="msg ${m.me?'me':'them'}">${m.text}<span class="trans">🌐 ${tr} • ${m.lang}→${mine}</span></div>`}).join('')||'<p class="muted">Say hello. Type in Kannada, Hindi, Malayalam or English.</p>';
  $('chatBox').scrollTop=9999;
}
function renderOrdersLite(){const sel=$('chatOrder');const cur=sel.value;sel.innerHTML=orders.map(o=>`<option>${o.id} • ${o.crop} • ${o.status}</option>`).join('');if(cur)sel.value=cur}
function sendChat(){
  const id=curOrderId(); if(!id)return toast('No order yet — place one first');
  const v=$('chatIn').value.trim(); if(!v)return;
  const mine=$('myLang').value||detectLang(v);
  (chats[id]=chats[id]||[]).push({me:true,text:v,lang:mine});
  // fake farmer auto-reply in Kannada
  setTimeout(()=>{(chats[id]=chats[id]||[]).push({me:false,text:demoReply(),lang:'kn'});save();renderChat()},700);
  $('chatIn').value='';save();renderChat();
}
function demoReply(){const r=['ಸರಿ, ನಾಳೆ ಬೆಳಿಗ್ಗೆ ವಿತರಣೆ ಮಾಡುತ್ತೇನೆ 🌾','ಬೆಲೆ ಸರಿ, 50 ಕೆಜಿ ರೆಡಿ ಇದೆ','ನಮಸ್ಕಾರ, ಟೊಮೆಟೊ ತಾಜಾ ಇದೆ 🍅'];return r[Math.floor(Math.random()*r.length)]}
function voiceDemo(){$('chatIn').value='ಟೊಮೆಟೊ ಬೆಲೆ ಎಷ್ಟು?';toast('🎤 Voice typed in Kannada (demo)');sendChat()}

function renderAll(){drawBoard();renderMine();renderShop();applyI();syncAuth();
  if(!$('f_date').value)$('f_date').valueAsDate=new Date();
  $('loginBtn').onclick=()=>show('view-auth'); $('logoutBtn').onclick=logout;
}
document.querySelectorAll('#langs button').forEach(b=>b.onclick=()=>setLang(b.dataset.lang));
$('myLang').onchange=renderChat; $('chatOrder').onchange=renderChat;
setLang(LANG); renderAll(); show('view-landing');
// ponytail: single-file demo logic, no framework. Add Bhashini/Google API + backend when pilot goes live.
