/**
 * AgriDirect B2B Exchange - Pure Vanilla JavaScript Engine
 * Runs completely standalone without any node_modules, build steps, or external JS libraries.
 */

(function () {
  'use strict';

  // --- DATA & ASSETS ---
  const BRAND_LOGO = 'https://lh3.googleusercontent.com/aida/AEtjO1V5TFcGHeVA9e7qV-VW-ONHQXlp3ADAC7A6CmlKVrOEZ3C7hkcjAHM2N38sAhzUG2a7T549JrOSXtzsggGgxpbKPRmWvoBNkgnzqWOGDOABhb4TzW1zR02-JcgO7DtKOHl-Ybq8TtZFehuA6ggXNPRTss_mR7d3MeIcsoO_4kjkZtoBevXLQzY3j6MLihqu7pP5GfGjNzVLIEO66DUQPIiEHs7J7hCsHXE4ixq9I3CMBgMMNTZIaHsVgx4';
  const USER_AVATAR = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTJtg-Lj_TBKX4m2ksjyPD3WXdboJdPHGZ6MegYeMScPmK9TEVtMBCuvmDDAoEi66VhIrY7ar0fm7aNnBD5EMq3qwZfnqdkchYO4bSAjgxUK633AZ1eVT7VAoN8KfFl8572aoYWkB-l1EFL2-rxgdcAzg_gr4WRmT7a9iVbJW-0Da7yuDoXf17HcOxEBBwvp-9SB_iAmxsOyi5DGo_dUm101mCm7hDKYwtUvVEEZ2mXroYiT7z8ub2';

  const COMMODITIES = [
    { id: 'onion', name: 'Nashik Red Onion', directRate: 38.4, mandiRate: 52.0, farmerPayout: 29.1, savingsPct: 26.1, icon: 'eco' },
    { id: 'potato', name: 'Potato (Jyoti Fresh)', directRate: 28.8, mandiRate: 38.0, farmerPayout: 21.84, savingsPct: 24.2, icon: 'nutrition' },
    { id: 'tomato', name: 'Hybrid Roma Tomatoes', directRate: 33.6, mandiRate: 48.0, farmerPayout: 25.5, savingsPct: 30.0, icon: 'yard' },
    { id: 'wheat', name: 'Wheat (Sharbati Golden)', directRate: 32.5, mandiRate: 42.0, farmerPayout: 27.2, savingsPct: 22.6, icon: 'grain' },
    { id: 'apple', name: 'Royal Delicious Apple', directRate: 138.0, mandiRate: 190.0, farmerPayout: 112.0, savingsPct: 27.3, icon: 'energy_savings_leaf' }
  ];

  let harvestLots = [
    {
      id: 'lot-1',
      lotNumber: 'LOT #ON-8821',
      commodity: 'Nashik Red Onions',
      variety: 'Export Sort Garwa',
      grade: 'GRADE A AGMARK',
      producerName: 'Ramesh Gaikwad',
      location: 'Satana Hub, Nashik',
      distanceKm: 42,
      availableQuantity: 45,
      quantityUnit: 'Quintals',
      directRateNum: 34.0,
      mandiRateFormatted: '₹48.5/kg',
      directRateFormatted: '₹34.0/kg',
      savingsPct: 29.8,
      fulfillmentRate: 98.4,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTXm-Z7Nknc-7gO_vN-v5h4UvP-y8UuD5hP2-H1C42lXzZ7YfN1e7Dk4X1X3yqP1p7V9bUq4oGv9G3iZ1tYp_Jk_1Ww_1L=w800',
      coldChainReady: true
    },
    {
      id: 'lot-2',
      lotNumber: 'LOT #TM-4419',
      commodity: 'Hybrid Roma Tomatoes',
      variety: 'Firm Crimson Crated',
      grade: 'GRADE A+ SORTED',
      producerName: 'Sunita Verma',
      location: 'Kolar Valley Hub',
      distanceKm: 85,
      availableQuantity: 60,
      quantityUnit: 'Crates',
      directRateNum: 28.0,
      mandiRateFormatted: '₹44.0/kg',
      directRateFormatted: '₹28.0/kg',
      savingsPct: 36.3,
      fulfillmentRate: 99.1,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYFh9GZJz8-lB-vX_zK4wH0rJ7R4zR-9kQ1J9tY5W3_gK2U0bC7pD4gE5-8oK9sU3_7Q0zW1mN9oP5tY7xJ2lH=w800',
      coldChainReady: true
    },
    {
      id: 'lot-3',
      lotNumber: 'LOT #PT-5520',
      commodity: 'Kufri Jyoti Potatoes',
      variety: 'Agra Cold Storage Bypass',
      grade: '45MM+ SORTED',
      producerName: 'Harish Chandra',
      location: 'Agra South Hub',
      distanceKm: 120,
      availableQuantity: 80,
      quantityUnit: 'Bags',
      directRateNum: 23.5,
      mandiRateFormatted: '₹34.0/kg',
      directRateFormatted: '₹23.5/kg',
      savingsPct: 30.8,
      fulfillmentRate: 97.8,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4V1N4YwJ-r8W_vL1kH0_mN4pQ9yU3zR7oK2-8jH1_pQ6tY9xW3-0bE7gN1zM5-vL8kR2_4W0zN9pQ=w800',
      coldChainReady: false
    }
  ];

  let orders = [
    {
      id: 'ord-4491',
      orderNumber: '#ORD-4491',
      lotNumber: '#LOT-ON-8821',
      commodity: 'Nashik Cured Red Onions',
      quantityStr: '15 Quintals (1,500 kg)',
      farmerName: 'Ramesh Gaikwad',
      cluster: 'Satana Farm Cluster, Nashik',
      escrowAmount: 51000,
      status: 'In Cold Transit',
      chillerTemp: '4.2°C (Optimal)',
      truckNumber: 'MH-04-8921',
      eta: '05:00 AM (1h 15m)',
      driverName: 'Santosh Yadav',
      tokenHash: '0x8841F9A2c4189'
    },
    {
      id: 'ord-4482',
      orderNumber: '#ORD-4482',
      lotNumber: '#LOT-TM-4419',
      commodity: 'Hybrid Roma Tomatoes',
      quantityStr: '20 Crates (500 kg)',
      farmerName: 'Sunita Verma',
      cluster: 'Kolar Valley Cooperative',
      escrowAmount: 14000,
      status: 'Delivered & QC Verified',
      chillerTemp: '11.2°C',
      truckNumber: 'KA-07-TR-1192',
      eta: 'Delivered 04:45 AM',
      driverName: 'Anil Kumar',
      tokenHash: '0x4482A1B79E104',
      utrNumber: 'HDFC20250224901'
    }
  ];

  // --- STATE ---
  let currentRoute = 'produce-marketplace';
  let persona = 'shopkeeper';
  let selectedSimCrop = COMMODITIES[0];
  let simVolume = 30;

  // --- ROOT APP RENDERER ---
  function renderApp() {
    const root = document.getElementById('root');
    if (!root) return;

    root.innerHTML = `
      <div class="app-container">
        <!-- Mandi Ticker -->
        <div class="ticker-bar">
          <div><span class="ticker-pulse"></span><strong>MANDI SPOT TICKER:</strong> Wheat ₹2,240/Q (+3.2%) • Nashik Onion ₹1,850/Q (-1.4%) • Tomato ₹940/Crate (+5.1%) • Potato ₹1,220/Q (Stable)</div>
          <div>Public Node #AD-9812 • RBI Regulated Escrow</div>
        </div>

        <!-- Header -->
        <header class="header">
          <div class="header-inner">
            <button class="brand" id="brand-home-btn">
              <img src="${BRAND_LOGO}" alt="AgriDirect" />
              <div class="brand-text">
                <h1>AgriDirect</h1>
                <span>Direct Farmer Mandi</span>
              </div>
            </button>

            <nav class="nav-links">
              <button class="nav-btn ${currentRoute === 'produce-marketplace' ? 'active' : ''}" data-route="produce-marketplace">Marketplace</button>
              <button class="nav-btn ${currentRoute === 'price-index-&-savings' ? 'active' : ''}" data-route="price-index-&-savings">Price Index & Savings</button>
              <button class="nav-btn ${currentRoute === 'farmer-selling-portal' ? 'active' : ''}" data-route="farmer-selling-portal">For Farmers</button>
              <button class="nav-btn ${currentRoute === 'shopkeeper-procurement' ? 'active' : ''}" data-route="shopkeeper-procurement">For Shopkeepers</button>
              <button class="nav-btn ${currentRoute === 'orders-&-escrow' ? 'active' : ''}" data-route="orders-&-escrow">Orders & Escrow</button>
            </nav>

            <div class="header-actions">
              <button class="btn-secondary" id="btn-list-harvest">
                <span class="material-symbols-outlined">add</span> List Harvest
              </button>
              <button class="btn-outline" id="btn-toggle-persona">
                <span class="material-symbols-outlined">${persona === 'shopkeeper' ? 'storefront' : 'agriculture'}</span>
                <span style="text-transform: capitalize;">${persona}</span>
              </button>
              <img src="${USER_AVATAR}" class="avatar-pill" alt="User" />
            </div>
          </div>
        </header>

        <!-- Screen Navigator -->
        <div class="screen-navigator">
          <div class="navigator-inner">
            <span class="nav-tag">Screens:</span>
            <button class="pill-btn ${currentRoute === 'produce-marketplace' ? 'active' : ''}" data-route="produce-marketplace">1 & 2. Marketplace</button>
            <button class="pill-btn ${currentRoute === 'price-index-&-savings' ? 'active' : ''}" data-route="price-index-&-savings">3 & 5. Mandi Index & Savings</button>
            <button class="pill-btn ${currentRoute === 'farmer-selling-portal' ? 'active' : ''}" data-route="farmer-selling-portal">4 & 6. Farmer Portal</button>
            <button class="pill-btn ${currentRoute === 'shopkeeper-procurement' ? 'active' : ''}" data-route="shopkeeper-procurement">7. Procurement Hub</button>
            <button class="pill-btn ${currentRoute === 'orders-&-escrow' ? 'active' : ''}" data-route="orders-&-escrow">8. Orders & Escrow</button>
          </div>
        </div>

        <!-- Main View Router -->
        <main class="main-content" id="main-view-container"></main>

        <!-- Footer -->
        <footer class="footer">
          <div class="footer-inner">
            <div style="display: flex; align-items: center; gap: 8px;">
              <img src="${BRAND_LOGO}" style="height: 20px; border-radius: 4px;" alt="Logo" />
              <strong>AgriDirect B2B Exchange</strong> — Disintermediating APMC middleman commissions with institutional escrow.
            </div>
            <div>© 2026 AgriDirect Inc. • All Rights Reserved</div>
          </div>
        </footer>
      </div>
      <div id="modal-container"></div>
    `;

    bindHeaderEvents();
    renderRouteView();
  }

  function bindHeaderEvents() {
    document.getElementById('brand-home-btn')?.addEventListener('click', () => {
      currentRoute = 'produce-marketplace';
      renderApp();
    });

    document.querySelectorAll('[data-route]').forEach(btn => {
      btn.addEventListener('click', e => {
        const route = e.currentTarget.getAttribute('data-route');
        if (route) {
          currentRoute = route;
          renderApp();
        }
      });
    });

    document.getElementById('btn-list-harvest')?.addEventListener('click', () => {
      openListingModal();
    });

    document.getElementById('btn-toggle-persona')?.addEventListener('click', () => {
      persona = persona === 'shopkeeper' ? 'farmer' : 'shopkeeper';
      renderApp();
    });
  }

  function renderRouteView() {
    const container = document.getElementById('main-view-container');
    if (!container) return;

    if (currentRoute === 'produce-marketplace') {
      renderProduceMarketplace(container);
    } else if (currentRoute === 'price-index-&-savings') {
      renderPriceIndexSavings(container);
    } else if (currentRoute === 'farmer-selling-portal') {
      renderFarmerSellingPortal(container);
    } else if (currentRoute === 'shopkeeper-procurement') {
      renderShopkeeperProcurement(container);
    } else if (currentRoute === 'orders-&-escrow') {
      renderOrdersEscrow(container);
    }
  }

  // --- SCREEN 1 & 2: PRODUCE MARKETPLACE ---
  function renderProduceMarketplace(container) {
    container.innerHTML = `
      <section class="hero-card">
        <div class="hero-badge"><span class="material-symbols-outlined" style="font-size: 16px;">verified_user</span> Zero APMC Middleman Brokerage • Tripartite Escrow</div>
        <h2 class="hero-title">Direct Farm-to-Shop Wholesale Exchange</h2>
        <p class="hero-subtitle">
          Eliminate traditional arthiya commission cuts. Kirana grocers save 24–36% while sovereign producers gain +39% higher net payouts upon Door QC confirmation.
        </p>
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <button class="btn-secondary" id="hero-scroll-btn"><span class="material-symbols-outlined">shopping_cart</span> Explore Active Harvest Lots</button>
          <button class="btn-outline" style="color: #fff; background: rgba(255,255,255,0.15); border-color: rgba(255,255,255,0.3);" id="hero-list-btn"><span class="material-symbols-outlined">add_circle</span> List Farmgate Harvest</button>
        </div>
        <div class="hero-stats-grid">
          <div class="hero-stat">
            <span class="hero-stat-label">Aggregated Weekly Savings</span>
            <span class="hero-stat-value">₹4.82 Crore</span>
            <span class="hero-stat-desc">Bypassed from APMC cuts</span>
          </div>
          <div class="hero-stat">
            <span class="hero-stat-label">Avg. Farmgate Transit</span>
            <span class="hero-stat-value" style="color: #fff;">4.8 Hours</span>
            <span class="hero-stat-desc">Harvest to shop unloading</span>
          </div>
          <div class="hero-stat">
            <span class="hero-stat-label">Cold-Chain Spoilage</span>
            <span class="hero-stat-value">&lt; 0.8%</span>
            <span class="hero-stat-desc">vs 18% APMC mandi rot</span>
          </div>
          <div class="hero-stat">
            <span class="hero-stat-label">Direct Settlement</span>
            <span class="hero-stat-value" style="color: #fff;">&lt; 2 Hours</span>
            <span class="hero-stat-desc">Instant IMPS bank payout</span>
          </div>
        </div>
      </section>

      <section id="catalog-section">
        <div class="section-header">
          <div>
            <h3 class="section-title">Verified Farmgate Harvest Lots</h3>
            <p class="section-subtitle">Real-time availability from sorted clusters. 1-click escrow lock & cold transit dispatch.</p>
          </div>
        </div>

        <div class="cards-grid">
          ${harvestLots.map(lot => `
            <div class="produce-card">
              <div>
                <div class="card-img-wrapper">
                  <img src="${lot.imageUrl}" alt="${lot.commodity}" />
                  <div class="badge-float">
                    <span class="badge-lot">${lot.lotNumber}</span>
                    <span class="badge-grade">${lot.grade}</span>
                  </div>
                  ${lot.coldChainReady ? `<div class="badge-reefer"><span class="material-symbols-outlined" style="font-size: 13px;">ac_unit</span> Reefer Ready</div>` : ''}
                </div>
                <div class="card-body">
                  <div>
                    <h4 class="card-commodity">${lot.commodity}</h4>
                    <p class="card-origin">${lot.variety} • <strong>${lot.location}</strong> (${lot.distanceKm} km)</p>
                  </div>
                  <div class="rate-box">
                    <div>
                      <div class="rate-direct">${lot.directRateFormatted}</div>
                      <div class="rate-mandi">Mandi: ${lot.mandiRateFormatted}</div>
                    </div>
                    <div style="text-align: right;">
                      <span class="rate-savings">Save ${lot.savingsPct}%</span>
                      <div style="font-size: 10px; color: var(--on-surface-variant); margin-top: 4px;">Qty: ${lot.availableQuantity} ${lot.quantityUnit}</div>
                    </div>
                  </div>
                  <div style="display: flex; justify-content: space-between; font-size: 11px; color: var(--on-surface-variant);">
                    <span>Producer: <strong>${lot.producerName}</strong></span>
                    <span style="color: var(--secondary); font-weight: 700;">★ ${lot.fulfillmentRate}% Fill</span>
                  </div>
                </div>
              </div>
              <div class="card-actions">
                <button class="btn-secondary" style="flex: 1;" onclick="window.agriDirect.openOrderModal('${lot.id}')">
                  <span class="material-symbols-outlined">lock_clock</span> Direct Escrow Lock
                </button>
                <button class="btn-outline" style="padding: 8px 10px;" title="View Assay" onclick="window.agriDirect.openAssayModal('${lot.lotNumber}')">
                  <span class="material-symbols-outlined">verified</span>
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    `;

    document.getElementById('hero-scroll-btn')?.addEventListener('click', () => {
      document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
    });
    document.getElementById('hero-list-btn')?.addEventListener('click', () => {
      openListingModal();
    });
  }

  // --- SCREEN 3 & 5: PRICE INDEX & SAVINGS SIMULATOR ---
  function renderPriceIndexSavings(container) {
    const totalDirect = Math.round(simVolume * selectedSimCrop.directRate * 100);
    const totalMandi = Math.round(simVolume * selectedSimCrop.mandiRate * 100);
    const middlemanBypassed = totalMandi - totalDirect;
    const farmerBonus = Math.round(simVolume * (selectedSimCrop.farmerPayout - (selectedSimCrop.mandiRate * 0.6)) * 100);

    container.innerHTML = `
      <section style="background: #fff; border-radius: var(--radius-xl); border: 1px solid var(--outline-variant); padding: 32px; box-shadow: var(--shadow-sm);">
        <div class="section-header" style="border-bottom: 1px solid var(--outline-variant); padding-bottom: 16px;">
          <div>
            <h2 class="section-title" style="display: flex; align-items: center; gap: 8px;">
              <span class="material-symbols-outlined" style="color: var(--secondary); font-size: 28px;">query_stats</span>
              Mandi Price Index & Disintermediation Simulator
            </h2>
            <p class="section-subtitle">Real-time mathematical audit of traditional APMC middleman cuts vs AgriDirect farmgate bypass.</p>
          </div>
          <button class="btn-outline" onclick="alert('APMC Disintermediation Audit Report (PDF, ₹4.82 Cr savings) prepared for download.');">
            <span class="material-symbols-outlined">download</span> Download Audit PDF
          </button>
        </div>

        <!-- Crop Selector Tabs -->
        <div style="display: flex; gap: 8px; flex-wrap: wrap; margin: 20px 0;">
          ${COMMODITIES.map(c => `
            <button class="pill-btn ${selectedSimCrop.id === c.id ? 'active' : ''}" style="padding: 8px 14px; font-size: 12px; display: flex; align-items: center; gap: 6px;" onclick="window.agriDirect.selectCrop('${c.id}')">
              <span class="material-symbols-outlined" style="font-size: 16px;">${c.icon}</span> ${c.name}
            </button>
          `).join('')}
        </div>

        <!-- Interactive Volume Slider -->
        <div style="background: var(--surface-container); padding: 20px; border-radius: var(--radius-md); border: 1px solid var(--outline-variant); margin-bottom: 28px;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px;">
            <label style="font-size: 12px; font-weight: 800; text-transform: uppercase;">
              Procurement Volume: <strong style="font-size: 16px; color: var(--on-surface);">${simVolume} Quintals</strong> (${simVolume * 100} kg)
            </label>
            <span style="font-size: 12px; font-weight: 800; color: var(--secondary);">Save ${selectedSimCrop.savingsPct}% Direct</span>
          </div>
          <input type="range" min="5" max="150" value="${simVolume}" id="sim-volume-range" style="width: 100%; accent-color: var(--secondary); cursor: pointer;" />
          <div style="display: flex; justify-content: space-between; font-size: 11px; color: var(--on-surface-variant); margin-top: 6px;">
            <span>Min: 5 Q (500 kg)</span>
            <span>Kirana Avg: 30 Q (3 MT)</span>
            <span>Full Truckload: 150 Q (15 MT)</span>
          </div>
        </div>

        <!-- Side-by-Side Comparison -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">
          <!-- Traditional Mandi -->
          <div style="background: rgba(186, 26, 26, 0.04); border: 1px solid rgba(186, 26, 26, 0.2); border-radius: var(--radius-lg); padding: 24px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
              <strong style="color: var(--error); font-size: 16px;">Traditional APMC Mandi</strong>
              <span style="background: rgba(186, 26, 26, 0.15); color: var(--error); font-size: 10px; font-weight: 800; padding: 2px 8px; border-radius: 6px;">Multi-Tier Cuts</span>
            </div>
            <div style="font-size: 32px; font-weight: 900; color: var(--on-surface);">₹${totalMandi.toLocaleString()}</div>
            <div style="font-size: 12px; color: var(--on-surface-variant); margin-bottom: 16px;">Rate: ₹${selectedSimCrop.mandiRate}/kg</div>
            <div style="font-size: 12px; border-top: 1px solid rgba(186, 26, 26, 0.2); padding-top: 12px; display: flex; flex-direction: column; gap: 6px; color: var(--on-surface-variant);">
              <div style="display: flex; justify-content: space-between;"><span>Arthiya Commission (8.5%):</span><strong style="color: var(--error);">+₹${Math.round(totalMandi * 0.085).toLocaleString()}</strong></div>
              <div style="display: flex; justify-content: space-between;"><span>Mandi Cess & Market Tax (3.2%):</span><strong style="color: var(--error);">+₹${Math.round(totalMandi * 0.032).toLocaleString()}</strong></div>
              <div style="display: flex; justify-content: space-between;"><span>Hamali Loading/Unloading:</span><strong style="color: var(--error);">+₹${Math.round(simVolume * 45).toLocaleString()}</strong></div>
              <div style="display: flex; justify-content: space-between;"><span>Transit Spoilage & Shrinkage:</span><strong style="color: var(--error);">~12% Uninsured</strong></div>
            </div>
          </div>

          <!-- AgriDirect Direct -->
          <div style="background: rgba(0, 110, 47, 0.08); border: 1px solid rgba(0, 110, 47, 0.3); border-radius: var(--radius-lg); padding: 24px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
              <strong style="color: var(--secondary); font-size: 16px;">AgriDirect Farmgate Direct</strong>
              <span style="background: rgba(0, 110, 47, 0.2); color: var(--secondary); font-size: 10px; font-weight: 800; padding: 2px 8px; border-radius: 6px;">0% Brokerage</span>
            </div>
            <div style="font-size: 32px; font-weight: 900; color: var(--secondary);">₹${totalDirect.toLocaleString()}</div>
            <div style="font-size: 12px; color: var(--on-surface-variant); margin-bottom: 16px;">Rate: ₹${selectedSimCrop.directRate}/kg</div>
            <div style="font-size: 12px; border-top: 1px solid rgba(0, 110, 47, 0.2); padding-top: 12px; display: flex; flex-direction: column; gap: 6px;">
              <div style="display: flex; justify-content: space-between; font-weight: 800; color: var(--secondary);"><span>Middleman Cut Bypassed:</span><span>Save ₹${middlemanBypassed.toLocaleString()}</span></div>
              <div style="display: flex; justify-content: space-between;"><span>Farmer Direct Bonus:</span><strong style="color: var(--secondary);">+₹${farmerBonus.toLocaleString()} higher pay</strong></div>
              <div style="display: flex; justify-content: space-between;"><span>Reefer Cold Transit:</span><strong style="color: var(--secondary);">Included (&lt;0.8% rot)</strong></div>
              <div style="display: flex; justify-content: space-between;"><span>Protocol Escrow Fee:</span><strong>Fixed 2.0% Tripartite</strong></div>
            </div>
            <button class="btn-secondary" style="width: 100%; margin-top: 18px; justify-content: center; padding: 12px;" onclick="window.agriDirect.goToCatalog()">
              <span class="material-symbols-outlined">lock_clock</span> Lock ${selectedSimCrop.name} at ₹${selectedSimCrop.directRate}/kg
            </button>
          </div>
        </div>
      </section>
    `;

    document.getElementById('sim-volume-range')?.addEventListener('input', e => {
      simVolume = Number(e.target.value);
      renderRouteView();
    });
  }

  // --- SCREEN 4 & 6: FARMER SELLING PORTAL ---
  function renderFarmerSellingPortal(container) {
    container.innerHTML = `
      <section style="background: #fff; border-radius: var(--radius-xl); border: 1px solid var(--outline-variant); padding: 32px; box-shadow: var(--shadow-sm);">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; border-bottom: 1px solid var(--outline-variant); padding-bottom: 20px;">
          <div style="display: flex; align-items: center; gap: 16px;">
            <div style="width: 60px; height: 60px; border-radius: var(--radius-md); background: rgba(0, 110, 47, 0.12); color: var(--secondary); display: flex; align-items: center; justify-content: center; font-size: 28px;">
              <span class="material-symbols-outlined" style="font-size: 32px;">agriculture</span>
            </div>
            <div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <h2 style="font-size: 22px; font-weight: 900;">Rajesh Patil</h2>
                <span class="badge-grade">Verified Sovereign Producer</span>
              </div>
              <p style="font-size: 12px; color: var(--on-surface-variant); margin-top: 2px;">Satana Farm Cluster, Nashik • 22 Acres Red Onion & Pomegranate • Sovereign ID #AG-PATIL-9912</p>
            </div>
          </div>
          <div style="background: var(--surface-container); padding: 10px 16px; border-radius: var(--radius-md); text-align: right;">
            <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: var(--on-surface-variant);">Net Earnings Gain</div>
            <div style="font-size: 20px; font-weight: 900; color: var(--secondary);">+39.4% Net</div>
            <div style="font-size: 10px; font-weight: 700; color: var(--secondary);">+₹1,42,800 vs Mandi Drafts</div>
          </div>
        </div>

        <!-- 2-Min Listing CTA Banner -->
        <div style="background: linear-gradient(90deg, rgba(0, 110, 47, 0.12), rgba(0, 59, 27, 0.08)); border: 1px solid rgba(0, 110, 47, 0.3); border-radius: var(--radius-lg); padding: 20px; margin: 24px 0; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
          <div>
            <h3 style="font-size: 16px; font-weight: 900;">Have fresh harvest ready at your farmgate?</h3>
            <p style="font-size: 12px; color: var(--on-surface-variant); margin-top: 2px;">Broadcast harvest lot directly to 450+ verified grocers in Mumbai & Pune with zero broker deductions.</p>
          </div>
          <button class="btn-secondary" onclick="window.agriDirect.openListingModal()">
            <span class="material-symbols-outlined">add_box</span> Create 2-Min Harvest Listing
          </button>
        </div>

        <!-- Active Lots Queue -->
        <h4 style="font-size: 13px; font-weight: 800; text-transform: uppercase; margin-bottom: 12px;">Your Active Exchange Lots</h4>
        <div style="background: var(--surface-container); border: 1px solid var(--outline-variant); border-radius: var(--radius-md); padding: 16px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <span style="background: rgba(0, 110, 47, 0.2); color: var(--secondary); font-weight: 900; padding: 6px 12px; border-radius: 8px;">40 Q</span>
            <div>
              <strong style="font-size: 14px;">Nashik Red Onions (Export Garwa)</strong>
              <div style="font-size: 11px; color: var(--on-surface-variant);">Escrow Locked: ₹1,14,000 by Apna Bazar & FreshMart</div>
            </div>
          </div>
          <span style="background: rgba(82, 99, 80, 0.15); color: var(--tertiary); font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 20px;">
            Reefer Transit Dispatched (04:30 AM Drop)
          </span>
        </div>
      </section>
    `;
  }

  // --- SCREEN 7: SHOPKEEPER PROCUREMENT HUB ---
  function renderShopkeeperProcurement(container) {
    const replenishmentList = [
      { name: 'Nashik Red Onions (Garwa)', qty: 15, unit: 'Quintals', rate: 34, mandi: 48.5 },
      { name: 'Hybrid Crimson Roma Tomatoes', qty: 20, unit: 'Crates', rate: 28, mandi: 44.0 },
      { name: 'Kufri Jyoti Potatoes', qty: 10, unit: 'Bags', rate: 23.5, mandi: 34.0 },
      { name: 'Nagpur Mandarin Oranges', qty: 8, unit: 'Crates', rate: 46, mandi: 68.0 }
    ];

    container.innerHTML = `
      <section style="background: #fff; border-radius: var(--radius-xl); border: 1px solid var(--outline-variant); padding: 32px; box-shadow: var(--shadow-sm);">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; border-bottom: 1px solid var(--outline-variant); padding-bottom: 20px;">
          <div style="display: flex; align-items: center; gap: 16px;">
            <div style="width: 60px; height: 60px; border-radius: var(--radius-md); background: rgba(0, 110, 47, 0.12); color: var(--secondary); display: flex; align-items: center; justify-content: center; font-size: 28px;">
              <span class="material-symbols-outlined" style="font-size: 32px;">storefront</span>
            </div>
            <div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <h2 style="font-size: 22px; font-weight: 900;">Patel Fresh Mart</h2>
                <span class="badge-grade">Store #12 Dadar East</span>
              </div>
              <p style="font-size: 12px; color: var(--on-surface-variant); margin-top: 2px;">Direct Farmgate Dock: Bay 4 (04:30 AM Daily) • MTD Bypass Savings: <strong style="color: var(--secondary);">₹1,18,450</strong></p>
            </div>
          </div>
          <div style="background: var(--surface-container); padding: 10px 16px; border-radius: var(--radius-md); text-align: right;">
            <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: var(--on-surface-variant);">AgriPay Net-15 Line</div>
            <div style="font-size: 18px; font-weight: 900; color: var(--secondary);">₹1,65,800 Available</div>
            <div style="font-size: 10px; color: var(--on-surface-variant);">0% APR (15-Day Auto-Revolve)</div>
          </div>
        </div>

        <!-- Morning Replenishment Planner -->
        <div style="margin: 24px 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
            <div>
              <h3 style="font-size: 18px; font-weight: 900;">Morning Replenishment Planner</h3>
              <p style="font-size: 12px; color: var(--on-surface-variant);">Direct farmgate batch ordering with 04:30 AM storefront arrival.</p>
            </div>
            <button class="btn-secondary" onclick="window.agriDirect.lockBatchOrder()">
              <span class="material-symbols-outlined">lock_clock</span> 1-Click Batch Escrow Lock
            </button>
          </div>

          <div style="background: var(--surface-container); border: 1px solid var(--outline-variant); border-radius: var(--radius-lg); padding: 16px;">
            ${replenishmentList.map(item => `
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid var(--outline-variant);">
                <div>
                  <strong style="font-size: 14px;">${item.name}</strong>
                  <div style="font-size: 11px; color: var(--on-surface-variant);">Direct: <strong style="color: var(--secondary);">₹${item.rate}/kg</strong> • APMC Mandi: <span style="text-decoration: line-through;">₹${item.mandi}/kg</span></div>
                </div>
                <div style="text-align: right;">
                  <strong style="font-size: 13px;">${item.qty} ${item.unit}</strong>
                  <div style="font-size: 12px; font-weight: 900; color: var(--secondary);">₹${(item.qty * item.rate * 100).toLocaleString()}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Cooperative Neighborhood Group Pooling -->
        <div style="background: rgba(0, 110, 47, 0.08); border: 1px solid rgba(0, 110, 47, 0.3); border-radius: var(--radius-lg); padding: 20px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
          <div>
            <span style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: var(--secondary);">Cooperative Neighborhood Group Pooling</span>
            <div style="font-size: 15px; font-weight: 900; margin: 4px 0;">Dadar-Matunga Cluster: 4.85 / 6.0 MT Full-Truck-Load</div>
            <p style="font-size: 12px; color: var(--on-surface-variant);">Pool with 3 nearby stores to waive ₹850 split-dock fee. Cutoff in 01h 42m.</p>
          </div>
          <button class="btn-secondary" onclick="alert('Batch locked into Dadar-Matunga Group Pool. ₹850 split-dock fee waived!');">
            Lock Into Group Pool (Save ₹850)
          </button>
        </div>
      </section>
    `;
  }

  // --- SCREEN 8: ORDERS & ESCROW COMMAND CENTER ---
  function renderOrdersEscrow(container) {
    container.innerHTML = `
      <section style="background: #fff; border-radius: var(--radius-xl); border: 1px solid var(--outline-variant); padding: 32px; box-shadow: var(--shadow-sm);">
        <div class="section-header" style="border-bottom: 1px solid var(--outline-variant); padding-bottom: 16px;">
          <div>
            <h2 class="section-title" style="display: flex; align-items: center; gap: 8px;">
              <span class="material-symbols-outlined" style="color: var(--secondary); font-size: 28px;">lock_clock</span>
              Institutional Escrow & Cold Custody Dashboard
            </h2>
            <p class="section-subtitle">Tripartite Escrow Protocol #AD-ESCROW-2026. Funds remain held in trust until physical Door QC scan.</p>
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 16px; margin-top: 20px;">
          ${orders.map(order => `
            <div style="background: var(--surface-container); border: 1px solid var(--outline-variant); border-radius: var(--radius-lg); padding: 20px; display: flex; flex-direction: column; gap: 14px;">
              <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
                <div>
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <strong style="font-family: monospace; font-size: 14px;">${order.orderNumber}</strong>
                    <span class="badge-grade">${order.status}</span>
                  </div>
                  <h4 style="font-size: 16px; font-weight: 800; margin-top: 4px;">${order.commodity}</h4>
                  <div style="font-size: 12px; color: var(--on-surface-variant);">${order.quantityStr} • Producer: <strong>${order.farmerName}</strong> (${order.cluster})</div>
                </div>
                <div style="text-align: right;">
                  <span style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: var(--on-surface-variant); display: block;">Escrow Locked</span>
                  <span style="font-size: 22px; font-weight: 900; color: var(--secondary);">₹${order.escrowAmount.toLocaleString()}</span>
                </div>
              </div>

              <!-- Telemetry -->
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 8px; background: rgba(255,255,255,0.7); padding: 12px; border-radius: var(--radius-md); font-size: 11px;">
                <div><span style="color: var(--on-surface-variant);">CHILLER TEMP:</span> <strong style="color: #006e2f;">${order.chillerTemp}</strong></div>
                <div><span style="color: var(--on-surface-variant);">TRUCK NO:</span> <strong style="font-family: monospace;">${order.truckNumber}</strong></div>
                <div><span style="color: var(--on-surface-variant);">ETA:</span> <strong>${order.eta}</strong></div>
                <div><span style="color: var(--on-surface-variant);">TOKEN:</span> <strong style="font-family: monospace;">${order.tokenHash}</strong></div>
              </div>

              <!-- Actions -->
              <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                ${order.status !== 'Delivered & QC Verified' ? `
                  <button class="btn-secondary" onclick="window.agriDirect.openQCModal('${order.id}')">
                    <span class="material-symbols-outlined">qr_code_scanner</span> Door QC Scan & Release Escrow
                  </button>
                ` : `
                  <span style="background: rgba(0, 110, 47, 0.12); color: var(--secondary); font-size: 12px; font-weight: 800; padding: 6px 12px; border-radius: var(--radius-md); display: inline-flex; align-items: center; gap: 6px;">
                    <span class="material-symbols-outlined">payments</span> Released (UTR: ${order.utrNumber})
                  </span>
                `}
                <button class="btn-outline" onclick="window.agriDirect.openAssayModal('${order.lotNumber}')">
                  <span class="material-symbols-outlined">verified</span> View Lab Assay
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  }

  // --- MODALS ---
  function openOrderModal(lotId) {
    const lot = harvestLots.find(l => l.id === lotId) || harvestLots[0];
    const total = Math.round(10 * lot.directRateNum * (lot.quantityUnit === 'Quintals' ? 100 : 25));

    showModal(`
      <div class="modal-dialog">
        <div class="modal-header">
          <div class="modal-title"><span class="material-symbols-outlined" style="color: var(--secondary);">lock_clock</span> Lock Tripartite Escrow</div>
          <button class="close-btn" onclick="window.agriDirect.closeModal()">✕</button>
        </div>
        <div style="display: flex; flex-direction: column; gap: 12px; font-size: 12px;">
          <div style="background: var(--surface-container); padding: 12px; border-radius: var(--radius-md);">
            <strong style="font-size: 14px;">${lot.commodity}</strong>
            <div style="color: var(--on-surface-variant);">${lot.variety} • ${lot.location}</div>
            <div style="font-size: 16px; font-weight: 900; color: var(--secondary); margin-top: 4px;">${lot.directRateFormatted}</div>
          </div>
          <div>
            <label style="font-weight: 800; text-transform: uppercase;">Quantity (${lot.quantityUnit}):</label>
            <input type="number" value="10" min="1" id="order-qty-input" style="width: 100%; padding: 10px; margin-top: 4px; border-radius: 8px; border: 1px solid var(--outline-variant); font-weight: bold;" />
          </div>
          <div style="background: rgba(0, 110, 47, 0.1); padding: 12px; border-radius: var(--radius-md); display: flex; justify-content: space-between; align-items: center;">
            <strong>Escrow Deposit:</strong>
            <span style="font-size: 18px; font-weight: 900; color: var(--secondary);" id="order-total-preview">₹${total.toLocaleString()}</span>
          </div>
          <button class="btn-secondary" style="width: 100%; justify-content: center; padding: 12px;" onclick="window.agriDirect.confirmOrder('${lot.id}')">
            <span class="material-symbols-outlined">lock</span> Confirm & Lock Escrow
          </button>
        </div>
      </div>
    `);

    document.getElementById('order-qty-input')?.addEventListener('input', e => {
      const q = Number(e.target.value) || 1;
      const t = Math.round(q * lot.directRateNum * (lot.quantityUnit === 'Quintals' ? 100 : 25));
      const el = document.getElementById('order-total-preview');
      if (el) el.innerText = '₹' + t.toLocaleString();
    });
  }

  function openQCModal(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    showModal(`
      <div class="modal-dialog">
        <div class="modal-header">
          <div class="modal-title"><span class="material-symbols-outlined" style="color: var(--secondary);">qr_code_scanner</span> Door QC Scan & Release</div>
          <button class="close-btn" onclick="window.agriDirect.closeModal()">✕</button>
        </div>
        <div style="display: flex; flex-direction: column; gap: 14px; font-size: 12px;">
          <div style="background: var(--surface-container); padding: 12px; border-radius: var(--radius-md);">
            <div style="display: flex; justify-content: space-between;"><strong>${order.commodity}</strong><span style="font-weight: 900; color: var(--secondary);">₹${order.escrowAmount.toLocaleString()}</span></div>
            <div style="color: var(--on-surface-variant); margin-top: 4px;">Truck: ${order.truckNumber} • Driver: ${order.driverName}</div>
          </div>
          <div style="background: rgba(0, 110, 47, 0.08); padding: 10px; border-radius: 8px; color: var(--secondary); font-weight: 600;">
            ✓ Tare weighbridge verified • Temperature 4.2°C maintained • 0% transit rot.
          </div>
          <button class="btn-secondary" style="width: 100%; justify-content: center; padding: 12px;" onclick="window.agriDirect.confirmRelease('${order.id}')">
            <span class="material-symbols-outlined">payments</span> Approve & Release ₹${order.escrowAmount.toLocaleString()} to Farmer
          </button>
        </div>
      </div>
    `);
  }

  function openAssayModal(lotNumber) {
    showModal(`
      <div class="modal-dialog">
        <div class="modal-header">
          <div class="modal-title"><span class="material-symbols-outlined" style="color: var(--secondary);">verified</span> NABL Quality Assay Sheet</div>
          <button class="close-btn" onclick="window.agriDirect.closeModal()">✕</button>
        </div>
        <div style="font-size: 12px; display: flex; flex-direction: column; gap: 10px;">
          <div style="display: flex; justify-content: space-between; font-family: monospace;">
            <strong>${lotNumber}</strong>
            <span style="color: var(--secondary); font-weight: 800;">AGMARK GRADE A+</span>
          </div>
          <table class="assay-table">
            <thead><tr><th>Parameter</th><th>Lab Measured</th><th>Standard</th></tr></thead>
            <tbody>
              <tr><td>Moisture Content</td><td style="color: var(--secondary); font-weight: bold;">9.4%</td><td>Max 12.0%</td></tr>
              <tr><td>Size Uniformity</td><td style="color: var(--secondary); font-weight: bold;">50-65mm (96.4%)</td><td>Min 80%</td></tr>
              <tr><td>Brix Sugar Index</td><td style="color: var(--secondary); font-weight: bold;">11.8° Brix</td><td>Min 9.0°</td></tr>
              <tr><td>Pesticide Residue</td><td style="color: var(--secondary); font-weight: bold;">0.00 ppm</td><td>FSSAI MRL</td></tr>
            </tbody>
          </table>
          <p style="font-size: 11px; color: var(--on-surface-variant);">Certified by NABL Testing Node #4 • Cryptographically signed on AgriDirect ledger.</p>
          <button class="btn-outline" style="width: 100%; justify-content: center;" onclick="window.agriDirect.closeModal()">Close</button>
        </div>
      </div>
    `);
  }

  function openListingModal() {
    showModal(`
      <div class="modal-dialog">
        <div class="modal-header">
          <div class="modal-title"><span class="material-symbols-outlined" style="color: var(--secondary);">add_box</span> 2-Min Harvest Listing</div>
          <button class="close-btn" onclick="window.agriDirect.closeModal()">✕</button>
        </div>
        <div style="display: flex; flex-direction: column; gap: 12px; font-size: 12px;">
          <div>
            <label style="font-weight: 800; text-transform: uppercase;">Commodity:</label>
            <input type="text" id="listing-crop-name" value="Nashik Red Onions" style="width: 100%; padding: 8px; margin-top: 4px; border-radius: 8px; border: 1px solid var(--outline-variant); font-weight: bold;" />
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            <div>
              <label style="font-weight: 800; text-transform: uppercase;">Quantity (Quintals):</label>
              <input type="number" id="listing-qty" value="25" min="1" style="width: 100%; padding: 8px; margin-top: 4px; border-radius: 8px; border: 1px solid var(--outline-variant); font-weight: bold;" />
            </div>
            <div>
              <label style="font-weight: 800; text-transform: uppercase;">Target Rate (₹/kg):</label>
              <input type="number" id="listing-rate" value="32" min="1" style="width: 100%; padding: 8px; margin-top: 4px; border-radius: 8px; border: 1px solid var(--outline-variant); font-weight: bold;" />
            </div>
          </div>
          <button class="btn-secondary" style="width: 100%; justify-content: center; padding: 12px;" onclick="window.agriDirect.submitListing()">
            <span class="material-symbols-outlined">publish</span> Broadcast to Retail Network
          </button>
        </div>
      </div>
    `);
  }

  function showModal(contentHtml) {
    const container = document.getElementById('modal-container');
    if (!container) return;
    container.innerHTML = `<div class="modal-overlay">${contentHtml}</div>`;
  }

  function closeModal() {
    const container = document.getElementById('modal-container');
    if (container) container.innerHTML = '';
  }

  // --- GLOBAL CONTROLLER API ---
  window.agriDirect = {
    openOrderModal,
    openQCModal,
    openAssayModal,
    openListingModal,
    closeModal,
    selectCrop: function(cropId) {
      selectedSimCrop = COMMODITIES.find(c => c.id === cropId) || COMMODITIES[0];
      renderRouteView();
    },
    goToCatalog: function() {
      currentRoute = 'produce-marketplace';
      renderApp();
    },
    confirmOrder: function(lotId) {
      const lot = harvestLots.find(l => l.id === lotId) || harvestLots[0];
      const newOrder = {
        id: 'ord-' + Date.now(),
        orderNumber: '#ORD-' + Math.floor(Math.random() * 8999 + 1000),
        lotNumber: lot.lotNumber,
        commodity: lot.commodity,
        quantityStr: '10 ' + lot.quantityUnit,
        farmerName: lot.producerName,
        cluster: lot.location,
        escrowAmount: Math.round(10 * lot.directRateNum * (lot.quantityUnit === 'Quintals' ? 100 : 25)),
        status: 'In Cold Transit',
        chillerTemp: '4.2°C (Optimal)',
        truckNumber: 'MH-04-TR-8812',
        eta: '04:30 AM Drop',
        driverName: 'Santosh Yadav',
        tokenHash: '0x' + Math.random().toString(16).substring(2, 8).toUpperCase()
      };
      orders.unshift(newOrder);
      closeModal();
      currentRoute = 'orders-&-escrow';
      renderApp();
      alert(`Escrow Locked! ₹${newOrder.escrowAmount.toLocaleString()} secured. Dispatched via reefer.`);
    },
    confirmRelease: function(orderId) {
      orders = orders.map(o => {
        if (o.id === orderId) {
          return {
            ...o,
            status: 'Delivered & QC Verified',
            utrNumber: 'HDFC' + Math.floor(Math.random() * 89999999 + 10000000)
          };
        }
        return o;
      });
      closeModal();
      renderRouteView();
      alert('Payment Released to Farmer via IMPS! UTR token generated.');
    },
    submitListing: function() {
      const name = document.getElementById('listing-crop-name')?.value || 'Nashik Red Onions';
      const qty = Number(document.getElementById('listing-qty')?.value) || 25;
      const rate = Number(document.getElementById('listing-rate')?.value) || 32;

      const newLot = {
        id: 'lot-' + Date.now(),
        lotNumber: 'LOT #AG-' + Math.floor(Math.random() * 8999 + 1000),
        commodity: name,
        variety: 'Freshly Harvested',
        grade: 'GRADE A AGMARK',
        producerName: 'Rajesh Patil',
        location: 'Satana Hub, Nashik',
        distanceKm: 42,
        availableQuantity: qty,
        quantityUnit: 'Quintals',
        directRateNum: rate,
        mandiRateFormatted: `₹${(rate * 1.35).toFixed(1)}/kg`,
        directRateFormatted: `₹${rate}/kg`,
        savingsPct: 26,
        fulfillmentRate: 100,
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTXm-Z7Nknc-7gO_vN-v5h4UvP-y8UuD5hP2-H1C42lXzZ7YfN1e7Dk4X1X3yqP1p7V9bUq4oGv9G3iZ1tYp_Jk_1Ww_1L=w800',
        coldChainReady: true
      };

      harvestLots.unshift(newLot);
      closeModal();
      currentRoute = 'produce-marketplace';
      renderApp();
      alert(`Harvest Broadcasted! ${name} (${qty} Q) is now live on the exchange.`);
    },
    lockBatchOrder: function() {
      const newOrder = {
        id: 'ord-' + Date.now(),
        orderNumber: '#ORD-' + Math.floor(Math.random() * 8999 + 1000),
        lotNumber: '#LOT-BATCH-MORNING',
        commodity: 'Morning Replenishment Batch (4 Produce Lines)',
        quantityStr: '4.85 MT Consolidated',
        farmerName: 'Satana & Kolar Clusters',
        cluster: 'Consolidated Reefer Cargo',
        escrowAmount: 142000,
        status: 'In Cold Transit',
        chillerTemp: '4.2°C (Optimal)',
        truckNumber: 'MH-04-TR-8812',
        eta: '04:30 AM Drop',
        driverName: 'Santosh Yadav',
        tokenHash: '0x' + Math.random().toString(16).substring(2, 8).toUpperCase()
      };
      orders.unshift(newOrder);
      currentRoute = 'orders-&-escrow';
      renderApp();
      alert('Batch Escrow Locked (₹1,42,000)! Charged to AgriPay Net-15 Line. Reefer en route.');
    }
  };

  // Initial Run on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderApp);
  } else {
    renderApp();
  }
})();
