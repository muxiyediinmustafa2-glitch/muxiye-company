import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const products = [
  {
    id: 1,
    name: 'Aero Pulse Hoodie',
    category: 'Hoodies',
    price: 180,
    colors: ['Black', 'Lime'],
    sizes: ['S', 'M', 'L', 'XL'],
    image:
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
    description: 'Insulated street layer with a sharp silhouette and futuristic texture.',
  },
  {
    id: 2,
    name: 'Vector Grid Jacket',
    category: 'Jackets',
    price: 240,
    colors: ['Stone', 'Black'],
    sizes: ['S', 'M', 'L'],
    image:
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80',
    description: 'Weather-ready premium shell designed for movement and urban impact.',
  },
  {
    id: 3,
    name: 'Luma Core Tee',
    category: 'T-Shirts',
    price: 95,
    colors: ['White', 'Ash'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    image:
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=80',
    description: 'Minimal staple cotton tee engineered with elevated streetwear finish.',
  },
  {
    id: 4,
    name: 'Drift Cargo Vest',
    category: 'Vests',
    price: 165,
    colors: ['Forest', 'Black'],
    sizes: ['S', 'M', 'L'],
    image:
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80',
    description: 'Layered utility shape built for fast movement and clean daily wear.',
  },
  {
    id: 5,
    name: 'Atlas Zip Shell',
    category: 'Jackets',
    price: 220,
    colors: ['Silver', 'Black'],
    sizes: ['M', 'L', 'XL'],
    image:
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
    description: 'Structured outer layer with zip detail and a polished technical finish.',
  },
  {
    id: 6,
    name: 'Signal Overshirt',
    category: 'Overshirts',
    price: 190,
    colors: ['Cream', 'Black'],
    sizes: ['S', 'M', 'L', 'XL'],
    image:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
    description: 'Lightweight statement layer designed for transitional city wear.',
  },
];

const filters = ['All', 'Hoodies', 'Jackets', 'T-Shirts', 'Vests', 'Overshirts'];

const highlights = [
  { label: 'New', value: '2028' },
  { label: 'Drops', value: '18' },
  { label: 'Limited', value: '4 x' },
];

const socialLinks = [
  { name: 'Instagram', url: 'https://instagram.com' },
  { name: 'TikTok', url: 'https://tiktok.com' },
  { name: 'Email', url: 'mailto:hello@muxiye.company' },
];

export default function App() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        activeCategory === 'All' || product.category === activeCategory;
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.trim().toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existing = currentCart.find((item) => item.id === product.id);
      if (existing) {
        return currentCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...currentCart, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, change) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + change } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="page-shell">
      <header className="topbar">
        <div className="brand-block">
          <span className="brand-mark">M</span>
          <div>
            <p className="brand-name">MUXIYE</p>
            <p className="brand-sub">COMPANY</p>
          </div>
        </div>

        <nav className="nav desktop-nav">
          <a href="#collection">Collection</a>
          <a href="#new-arrivals">New Arrivals</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="header-actions">
          <div className="search-box">
            <span>⌕</span>
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="cart-pill" aria-label="Shopping cart">
            Cart <span>{itemCount}</span>
          </button>
        </div>
      </header>

      <main>
        <section className="hero section-grid">
          <div className="hero-copy">
            <motion.p
              className="eyebrow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              FUTURE / STREET / LUXE
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              LAYERS THAT HANG RIGHT.
            </motion.h1>
            <motion.p
              className="hero-sub"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Futuristic Fashion. Premium Streetwear.
            </motion.p>
            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <a href="#collection" className="primary-btn">
                Shop Collection
              </a>
              <button className="ghost-btn" onClick={() => setSelectedProduct(products[0])}>
                View Drop
              </button>
            </motion.div>

            <div className="stat-row">
              {highlights.map((item) => (
                <div key={item.label} className="stat-box">
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-visual">
            <div className="rack-scene">
              <div className="rack-track">
                {products.map((product, index) => (
                  <motion.div
                    key={product.id}
                    className="rack-card"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    whileHover={{ scale: 1.08, y: -10 }}
                    onClick={() => setSelectedProduct(product)}
                  >
                    <img src={product.image} alt={product.name} />
                    <div className="rack-card-copy">
                      <h3>{product.name}</h3>
                      <p>${product.price}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="new-arrivals" className="featured-section">
          <div className="section-header">
            <div>
              <p className="section-tag">New Collection 2028</p>
              <h2>Curated for movement.</h2>
            </div>
            <a href="#collection" className="text-link">
              Explore all →
            </a>
          </div>

          <div className="mini-grid">
            {products.slice(0, 4).map((product) => (
              <motion.article
                key={product.id}
                className="mini-product"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.28 }}
              >
                <button className="mini-image-btn" onClick={() => setSelectedProduct(product)}>
                  <img src={product.image} alt={product.name} />
                </button>
                <div className="mini-meta">
                  <div>
                    <p>{product.category}</p>
                    <h3>{product.name}</h3>
                  </div>
                  <span>${product.price}</span>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="collection" className="catalog-section">
          <div className="section-header compact">
            <div>
              <p className="section-tag">Shop</p>
              <h2>Premium streetwear.</h2>
            </div>

            <div className="filter-row">
              {filters.map((filter) => (
                <button
                  key={filter}
                  className={filter === activeCategory ? 'filter active' : 'filter'}
                  onClick={() => setActiveCategory(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="product-grid">
            {filteredProducts.map((product) => (
              <motion.article
                key={product.id}
                className="product-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, scale: 1.01 }}
                transition={{ duration: 0.28 }}
              >
                <button className="image-wrap" onClick={() => setSelectedProduct(product)}>
                  <img src={product.image} alt={product.name} />
                </button>
                <div className="product-info">
                  <div className="info-head">
                    <span>{product.category}</span>
                    <strong>${product.price}</strong>
                  </div>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <div className="meta-row">
                    <span>{product.colors.join(' / ')}</span>
                    <span>{product.sizes.length} sizes</span>
                  </div>
                  <div className="card-actions">
                    <button className="secondary-btn" onClick={() => setSelectedProduct(product)}>
                      View Details
                    </button>
                    <button className="primary-btn small" onClick={() => addToCart(product)}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="about" className="about-section">
          <div className="about-copy">
            <p className="section-tag">About MUXIYE COMPANY</p>
            <h2>Built for motion, culture, and detail.</h2>
            <p>
              MUXIYE COMPANY merges premium streetwear with futuristic design language.
              Each piece is built to move fluidly through urban life while delivering a
              polished, elevated presence.
            </p>
            <p>
              From layered silhouettes to technical fabrics and clean silhouettes, our 2028
              collection is designed for everyday presence, whether on city blocks, studio
              floors, or late-night scenes.
            </p>
          </div>
          <div className="about-panel">
            <div className="panel-card">
              <span>01</span>
              <strong>Streetwear</strong>
            </div>
            <div className="panel-card">
              <span>02</span>
              <strong>Futuristic</strong>
            </div>
            <div className="panel-card">
              <span>03</span>
              <strong>Premium finish</strong>
            </div>
          </div>
        </section>
      </main>

      <aside className="cart-panel">
        <div className="cart-head">
          <h3>Shopping Cart</h3>
          <span>{itemCount} items</span>
        </div>

        {cart.length === 0 ? (
          <p className="empty-cart">Your cart is empty.</p>
        ) : (
          <div className="cart-list">
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div className="cart-item-copy">
                  <h4>{item.name}</h4>
                  <p>${item.price}</p>
                  <div className="quantity-row">
                    <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="checkout-box">
          <div className="totals">
            <span>Subtotal</span>
            <strong>${subtotal.toFixed(2)}</strong>
          </div>
          <button className="primary-btn full">Checkout</button>
        </div>
      </aside>

      <footer id="contact" className="site-footer">
        <div>
          <p className="section-tag">MUXIYE COMPANY</p>
          <h3>LAYERS THAT HANG RIGHT.</h3>
        </div>

        <div className="footer-links">
          <div>
            <p>Contact</p>
            <a href="mailto:hello@muxiye.company">hello@muxiye.company</a>
            <a href="tel:+1234567890">+1 (234) 567-890</a>
          </div>
          <div>
            <p>Follow</p>
            {socialLinks.map((link) => (
              <a key={link.name} href={link.url} target="_blank" rel="noreferrer">
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              className="product-modal"
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.96 }}
              transition={{ duration: 0.28 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-btn" onClick={() => setSelectedProduct(null)}>
                ✕
              </button>
              <img src={selectedProduct.image} alt={selectedProduct.name} />
              <div className="modal-copy">
                <p className="section-tag">{selectedProduct.category}</p>
                <h3>{selectedProduct.name}</h3>
                <p className="modal-price">${selectedProduct.price}</p>
                <p>{selectedProduct.description}</p>
                <div className="size-row">
                  {selectedProduct.sizes.map((size) => (
                    <span key={size}>{size}</span>
                  ))}
                </div>
                <button className="primary-btn full" onClick={() => addToCart(selectedProduct)}>
                  Add to Cart
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
