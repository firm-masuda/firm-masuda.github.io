const MENU_ITEMS = [
  // 珈琲・紅茶 (coffee)
  {
    id: 'kohaku-blend',
    category: 'coffee',
    categoryLabel: '珈琲・紅茶',
    name: '琥珀ブレンド（サイフォン抽出）',
    enName: 'KOHAKU SIGNATURE SYPHON BLEND',
    price: '¥750',
    badge: '看板珈琲',
    subTag: '自家焙煎・深煎り',
    shortDesc: 'コロンビア・ブラジル・マンデリンを黄金比で配合。光サイフォンで香り高く抽出した創業以来の代表作。',
    fullDesc: '昭和四十九年の創業当時から受け継ぐ当店看板ブレンド。直火焙煎機でフルシティローストに焼き上げ、サイフォンならではの澄んだ琥珀色の液色と、芳醇なアロマ、奥行きのある甘い余韻を引き出しました。',
    spec: '抽出：光サイフォン ｜ 焙煎度：深煎り（フルシティ） ｜ 提供温度：熱め（86℃）',
    image: 'images/signature_coffee.png'
  },
  {
    id: 'kohaku-vintage-nel',
    category: 'coffee',
    categoryLabel: '珈琲・紅茶',
    name: '琥珀ヴィンテージ（熟成ネルドリップ）',
    enName: 'AGED FLANNEL DRIP COFFEE',
    price: '¥880',
    badge: '看板珈琲',
    subTag: '極深煎り・ネル抽出',
    shortDesc: '通常の1.5倍の深煎り豆を贅沢に使用し、フランネル布フィルターで一滴ずつ点てる重厚な一杯。',
    fullDesc: '3ヶ月間低温熟成させたオールドビーンズをフレンチローストに。手縫いのフランネルフィルターでお湯を置くように点てることで、とろりとした滑らかな舌触りと深い苦味・甘みの調和をご堪能いただけます。',
    spec: '抽出：手縫いフランネルドリップ ｜ 焙煎度：極深煎り（フレンチ） ｜ 数量限定',
    image: 'images/signature_coffee.png'
  },
  {
    id: 'mandheling-single',
    category: 'coffee',
    categoryLabel: '珈琲・紅茶',
    name: 'スマトラ・マンデリン G1（ストレート）',
    enName: 'SUMATRA MANDHELING GRADE 1',
    price: '¥820',
    badge: '',
    subTag: '自家焙煎・ストレート',
    shortDesc: '大地を思わせる力強いコクと、ハーブやビターチョコレートのような芳醇な香りの深煎りストレート。',
    fullDesc: 'インドネシア・スマトラ島産の厳選グレード1生豆を店内直火焙煎。酸味を抑え、重厚なボディと長い余韻を際立たせました。固めプリンやチョコレートケーキとの相性も抜群です。',
    spec: '抽出：サイフォンまたはネル選択可 ｜ 焙煎度：深煎り',
    image: 'images/signature_coffee.png'
  },
  {
    id: 'viennese-coffee',
    category: 'coffee',
    categoryLabel: '珈琲・紅茶',
    name: '琥珀のウインナー珈琲',
    enName: 'CLASSIC VIENNESE COFFEE',
    price: '¥850',
    badge: '人気',
    subTag: '純生クリーム使用',
    shortDesc: '熱々の深煎り珈琲の上に、注文ごとに泡立てる濃厚な純生クリームをたっぷりと浮かべました。',
    fullDesc: '冷たい七分立ての純生クリームと、その下の熱くほろ苦い深煎りブレンドを混ぜずにそのままお召し上がりください。口の中で溶け合う温度差とコントラストが純喫茶ならではの贅沢です。',
    spec: 'ベース：琥珀深煎りブレンド ｜ トッピング：北海道産純生クリーム',
    image: 'images/signature_coffee.png'
  },
  {
    id: 'dutch-iced-coffee',
    category: 'coffee',
    categoryLabel: '珈琲・紅茶',
    name: '水出しダッチアイス珈琲（銅マグ）',
    enName: 'COLD BREW DUTCH COFFEE IN COPPER MUG',
    price: '¥780',
    badge: '',
    subTag: '8時間水出し抽出',
    shortDesc: 'ウォータードリッパーで8時間かけて一滴ずつ水出し。鎚目入りの純銅マグカップでキンと冷やして提供。',
    fullDesc: '熱を加えず冷水のみで8時間かけて抽出するため、深煎り豆本来の芳醇な香りとワインのような芳しいコクがそのまま閉じ込められています。氷も珈琲で作った氷を使用しており、最後まで薄まりません。',
    spec: '抽出：水出しダッチ式（8時間） ｜ 器：純銅製マグカップ',
    image: 'images/signature_coffee.png'
  },
  {
    id: 'royal-milk-tea',
    category: 'coffee',
    categoryLabel: '珈琲・紅茶',
    name: '手鍋仕立てのロイヤルミルクティー',
    enName: 'STOVETOP ROYAL MILK TEA',
    price: '¥800',
    badge: '',
    subTag: 'アッサム茶葉使用',
    shortDesc: '芳醇なアッサム・セカンドフラッシュを銅手鍋でじっくり煮出した、濃厚で香り高いミルクティー。',
    fullDesc: '茶葉を惜しみなく使い、少量の熱湯で蒸らしてから低温殺菌牛乳を加えて手鍋で丁寧に煮出します。仕上げに琥珀糖をひと粒添えてご提供いたします。',
    spec: '茶葉：インド・アッサムCTC ｜ ポットサービス（約2杯分）',
    image: 'images/signature_coffee.png'
  },

  // 甘味 (sweets)
  {
    id: 'classic-pudding',
    category: 'sweets',
    categoryLabel: '甘味',
    name: '昔ながらの固めカスタードプリン',
    enName: 'CLASSIC FIRM CUSTARD PUDDING',
    price: '¥680',
    badge: '名物甘味',
    subTag: '自家製ほろ苦カラメル',
    shortDesc: '銀の脚付きコンポート皿に佇む、しっかり固めの自家製プリン。焦がしカラメルが深煎り珈琲と調和します。',
    fullDesc: '新鮮な地養卵とマダガスカル産バニラビーンズを使い、低温のオーブンでじっくり湯煎焼きにした昔ながらの固め食感。銅鍋で焦がしたビターなカラメルソースに、純生ホイップと真っ赤なさくらんぼを添えました。',
    spec: '器：洋白銀器コンポート皿 ｜ 珈琲セット割対象（150円引）',
    image: 'images/menu_sweets.png'
  },
  {
    id: 'melon-cream-soda',
    category: 'sweets',
    categoryLabel: '甘味',
    name: '純喫茶の琥珀・メロンクリームソーダ',
    enName: 'EMERALD MELON CREAM SODA',
    price: '¥780',
    badge: '人気',
    subTag: '自家製バニラアイス添え',
    shortDesc: 'カットグラスの中で煌めく翠色のメロンソーダに、濃厚なバニラアイスクリームとさくらんぼを浮かべて。',
    fullDesc: 'ステンドグラスの光を映すエメラルドグリーンのソーダに、卵黄のコク豊かなクラシックバニラアイスを贅沢にトッピング。ソーダとアイスが溶け合う境界線のシャリッとした食感をお愉しみください。',
    spec: '器：ヴィンテージカットグラス ｜ 通年提供',
    image: 'images/menu_sweets.png'
  },
  {
    id: 'coffee-jelly',
    category: 'sweets',
    categoryLabel: '甘味',
    name: '自家焙煎ネルドリップ珈琲ゼリー',
    enName: 'NEL-DRIP COFFEE JELLY PARFAIT',
    price: '¥720',
    badge: '',
    subTag: '無糖ゼリー・練乳添え',
    shortDesc: '「琥珀ヴィンテージ」をそのまま閉じ込めた無糖の珈琲ゼリー。濃厚バニラアイスと練乳をかけて。',
    fullDesc: '深煎りネルドリップ珈琲を抽出直後にゼラチンで固めた、香り立つ大人の甘味。ゼリー自体はあえて無糖に仕立て、別添えの特製練乳とバニラアイスの甘みで味わいの変化を愉しめます。',
    spec: '使用豆：琥珀ヴィンテージ極深煎り ｜ 珈琲セット割対象',
    image: 'images/menu_sweets.png'
  },
  {
    id: 'ogura-butter-toast',
    category: 'sweets',
    categoryLabel: '甘味',
    name: '厚切り小倉バタートースト',
    enName: 'THICK OGURA RED BEAN & BUTTER TOAST',
    price: '¥700',
    badge: '',
    subTag: '北海道十勝産小豆',
    shortDesc: '4cm厚のイギリス食パンに十字の切り込みを入れ、発酵バターと自家炊き粒あんをたっぷり乗せました。',
    fullDesc: '外はカリッと香ばしく、中はもっちり焼き上げた厚切りトーストに、有塩発酵バターがじゅわっと染み込みます。甘さ控えめに炊き上げた十勝産小豆の粒あんとの甘じょっぱいハーモニーが絶品です。',
    spec: 'パン厚：約40mm ｜ 蜂蜜添え ｜ 珈琲セット割対象',
    image: 'images/menu_sweets.png'
  },

  // 軽食 (food)
  {
    id: 'golden-butter-toast',
    category: 'food',
    categoryLabel: '軽食',
    name: '黄金の厚切りバタートースト',
    enName: 'GOLDEN THICK-CUT BUTTER TOAST',
    price: '¥580',
    badge: '定番',
    subTag: '発酵有塩バター',
    shortDesc: '老舗ベーカリー特注の山形食パンを4cm厚にカット。切り込みの奥まで黄金の発酵バターが染み渡ります。',
    fullDesc: '創業以来付き合いのある神田の老舗パン工房から毎朝届く山形食パンを使用。高温のオーブントースターで表面を一気に焼き上げ、カルピス発酵バターを贅沢に溶かし込みました。',
    spec: '提供時間：終日（モーニング 9:00〜11:00 は珈琲注文で＋¥250）',
    image: 'images/menu_food.png'
  },
  {
    id: 'kissaten-neapolitan',
    category: 'food',
    categoryLabel: '軽食',
    name: '昔懐かし純喫茶のナポリタン',
    enName: 'NOSTALGIC KISSATEN NEAPOLITAN SPAGHETTI',
    price: '¥980',
    badge: '看板軽食',
    subTag: '太麺2.2mm・自家製ソース',
    shortDesc: '一晩寝かせたモチモチの太麺を、完熟トマトケチャップとバターで香ばしく炒めた王道ナポリタン。',
    fullDesc: '茹で置きして一晩熟成させた2.2mmの極太スパゲッティに、厚切りベーコン、玉ねぎ、ピーマン、マッシュルームを合わせ、自家製トマトソースと焦がしケチャップでしっかり焼き付けました。粉チーズとタバスコを添えて。',
    spec: '麺：2.2mm太麺 ｜ ミニサラダ付 ｜ 珈琲セット割対象（150円引）',
    image: 'images/menu_food.png'
  },
  {
    id: 'fluffy-egg-sandwich',
    category: 'food',
    categoryLabel: '軽食',
    name: '琥珀の厚焼き・たまごサンド',
    enName: 'FLUFFY WARM EGG SANDWICH',
    price: '¥860',
    badge: '人気',
    subTag: '注文ごと調理',
    shortDesc: '生クリームを加えてふんわり焼き上げた温かい厚焼きたまごと、特製からしマヨネーズのサンドイッチ。',
    fullDesc: '卵3個分を銅の玉子焼き器でふんわりとジューシーに焼き上げ、ほんのり温かいうちにきゅうりとからしバターマヨネーズを塗った耳なし食パンで挟みました。深煎り珈琲と相性抜群の一皿です。',
    spec: '卵3個使用 ｜ からし抜き変更可 ｜ 珈琲セット割対象（150円引）',
    image: 'images/menu_food.png'
  },
  {
    id: 'pizza-toast',
    category: 'food',
    categoryLabel: '軽食',
    name: '純喫茶の元祖ピザトースト',
    enName: 'CLASSIC MELTED CHEESE PIZZA TOAST',
    price: '¥820',
    badge: '',
    subTag: 'ゴーダ＆モッツァレラ',
    shortDesc: '厚切り食パンに自家製ピザソース、サラミ、ピーマン、2種のとろけるチーズをたっぷり重ねて焼き上げ。',
    fullDesc: 'オレガノが香る特製トマトソースの上に、輪切りピーマンとソフトサラミ、マッシュルーム、そしてゴーダとモッツァレラを溢れるほど乗せてこんがり焼き上げました。',
    spec: 'パン厚：35mm ｜ 珈琲セット割対象（150円引）',
    image: 'images/menu_food.png'
  }
];

document.addEventListener('DOMContentLoaded', () => {
  const menuGrid = document.getElementById('menu-grid');
  const tabButtons = document.querySelectorAll('.menu-tab');
  const showcaseCards = document.querySelectorAll('.showcase-card');

  const modal = document.getElementById('menu-modal');
  const modalClose = document.getElementById('modal-close');
  const modalImg = document.getElementById('modal-img');
  const modalTags = document.getElementById('modal-tags');
  const modalTitle = document.getElementById('modal-title');
  const modalEn = document.getElementById('modal-en');
  const modalPrice = document.getElementById('modal-price');
  const modalDesc = document.getElementById('modal-desc');
  const modalSpec = document.getElementById('modal-spec');

  function renderMenu(category = 'all') {
    const filtered = category === 'all'
      ? MENU_ITEMS
      : MENU_ITEMS.filter(item => item.category === category);

    menuGrid.innerHTML = '';

    filtered.forEach(item => {
      const card = document.createElement('article');
      card.className = 'menu-item-card';
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `${item.name} ${item.price} の詳細を見る`);

      const badgeHtml = item.badge
        ? `<span class="badge badge-signature">${item.badge}</span>`
        : '';

      card.innerHTML = `
        <div>
          <div class="menu-item-top">
            <div class="menu-badges">
              ${badgeHtml}
              <span class="badge badge-cat">${item.categoryLabel}</span>
              <span class="badge badge-sub">${item.subTag}</span>
            </div>
          </div>
          <div class="menu-item-header">
            <h3 class="menu-item-title">${item.name}</h3>
            <span class="menu-item-dots" aria-hidden="true"></span>
            <span class="menu-item-price">${item.price}</span>
          </div>
          <p class="menu-item-desc">${item.shortDesc}</p>
        </div>
        <div class="menu-item-footer">
          <span>${item.enName}</span>
          <span class="menu-detail-Trigger">こだわりを見る ▸</span>
        </div>
      `;

      card.addEventListener('click', () => openModal(item));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openModal(item);
        }
      });

      menuGrid.appendChild(card);
    });

    // カテゴリ別ショーケースのハイライト連動
    showcaseCards.forEach(sc => {
      const scCat = sc.dataset.showcase;
      if (category === 'all') {
        sc.classList.remove('dimmed', 'highlighted');
      } else if (scCat === category) {
        sc.classList.remove('dimmed');
        sc.classList.add('highlighted');
      } else {
        sc.classList.add('dimmed');
        sc.classList.remove('highlighted');
      }
    });
  }

  function openModal(item) {
    modalImg.src = item.image;
    modalImg.alt = item.name;
    modalTitle.textContent = item.name;
    modalEn.textContent = item.enName;
    modalPrice.textContent = `${item.price}（税込）`;
    modalDesc.textContent = item.fullDesc;
    modalSpec.textContent = item.spec;

    modalTags.innerHTML = `
      ${item.badge ? `<span class="badge badge-signature">${item.badge}</span>` : ''}
      <span class="badge badge-cat">${item.categoryLabel}</span>
      <span class="badge badge-sub" style="background: rgba(197,155,78,0.2); color: #f5efe6;">${item.subTag}</span>
    `;

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const category = btn.dataset.category;
      renderMenu(category);
    });
  });

  // ショーケース写真クリックでもカテゴリ切り替え可能に
  showcaseCards.forEach(sc => {
    sc.style.cursor = 'pointer';
    sc.addEventListener('click', () => {
      const targetCat = sc.dataset.showcase;
      const targetBtn = Array.from(tabButtons).find(b => b.dataset.category === targetCat);
      if (targetBtn) {
        targetBtn.click();
      }
    });
  });

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  // 初期描画
  renderMenu('all');
});
