import React from 'react';
import { CAKE_FLAVORS, SPECIAL_FLAVORS, FILLINGS, DECORATIVE, SIZES, SHAPES, NOTES, INSTAGRAM_URL, INSTAGRAM_HANDLE } from '../data/menu';

const ORDER_HREF = '#/order';

const MenuBox: React.FC<{ title: string; items: string[] }> = ({ title, items }) => (
    <div className="section-box">
        <div className="section-title">{title}</div>
        <ul className="site-list">
            {items.map(i => <li key={i}>{i}</li>)}
        </ul>
    </div>
);

const Site: React.FC = () => (
    <div className="site">
        <nav className="site-nav">
            <a href="#/" className="site-nav-logo">Dídùn</a>
            <div className="site-nav-links">
                <a href="#menu">Menu</a>
                <a href="#how">How to order</a>
                <a href={ORDER_HREF} className="site-nav-cta">Order</a>
            </div>
        </nav>

        <div className="capture-anchor">
        <main className="paper-container site-paper">
            <header className="site-hero">
                <div className="logo-script">Dídùn</div>
                <div className="header-title">CAKES MADE TO ORDER</div>
                <p className="site-lede">
                    Custom cakes for birthdays, weddings and every occasion in between.
                    Pick your flavour, filling and finish, and we'll bake it for you.
                </p>
                <a href={ORDER_HREF} className="btn-primary site-btn">Order a cake</a>
            </header>

            <section id="menu" className="site-section">
                <h2 className="site-heading">Menu</h2>
                <div className="responsive-grid-3">
                    <div className="section-box">
                        <div className="section-title">Cake Flavor</div>
                        <ul className="site-list">
                            {CAKE_FLAVORS.map(i => <li key={i}>{i}</li>)}
                        </ul>
                        <div className="sub-header">Special Flavor</div>
                        <ul className="site-list">
                            {SPECIAL_FLAVORS.map(i => <li key={i}>{i}</li>)}
                        </ul>
                    </div>
                    <MenuBox title="Filling" items={FILLINGS} />
                    <MenuBox title="Decorative additions" items={DECORATIVE} />
                </div>
                <div className="responsive-grid-2 site-row">
                    <MenuBox title="Size" items={SIZES} />
                    <MenuBox title="Shape" items={[...SHAPES, 'Custom (tell us)']} />
                </div>
            </section>

            <section id="how" className="site-section">
                <h2 className="site-heading">How to order</h2>
                <ol className="site-steps">
                    <li>
                        <span className="site-step-num">1</span>
                        <div>
                            <strong>Fill the order form.</strong>
                            <p>Your name, phone number, delivery date and the cake you want.</p>
                        </div>
                    </li>
                    <li>
                        <span className="site-step-num">2</span>
                        <div>
                            <strong>Download your summary.</strong>
                            <p>The form makes a picture of your order slip.</p>
                        </div>
                    </li>
                    <li>
                        <span className="site-step-num">3</span>
                        <div>
                            <strong>Send it to us.</strong>
                            <p>
                                Share the picture with us on Instagram at{' '}
                                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">{INSTAGRAM_HANDLE}</a>.
                            </p>
                        </div>
                    </li>
                </ol>
            </section>

            <section className="site-section">
                <div className="section-box">
                    <div className="section-title">PLEASE NOTE</div>
                    <ul className="note-list">
                        {NOTES.map(n => <li key={n}>{n}</li>)}
                    </ul>
                </div>
            </section>

            <div className="site-cta-row">
                <a href={ORDER_HREF} className="btn-primary site-btn">Start your order</a>
            </div>

            <footer className="footer-handle site-footer">
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">{INSTAGRAM_HANDLE}</a>
            </footer>
        </main>
        </div>
    </div>
);

export default Site;
