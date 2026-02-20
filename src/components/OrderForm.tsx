import React, { useState } from 'react';

const OrderForm: React.FC = () => {
    const [formData, setFormData] = useState({
        isFirstTime: null as boolean | null,
        name: '',
        deliveryDate: '',
        phone: '',
        occasion: '',
        tiers: '',
        shape: '' as string,
        shapeCustom: '',
        deliveryNeeded: null as boolean | null,
        address: '',
        cakeFlavor: [] as string[],
        cakeFlavorOther: '',
        specialFlavor: [] as string[],
        specialFlavorOther: '',
        filling: [] as string[],
        fillingOther: '',
        decorative: [] as string[],
        decorativeOther: '',
        size: '' as string,
        sizeOther: '',
        specialInstructions: '',
        date: new Date().toLocaleDateString(),
    });

    const toggleArray = (field: keyof typeof formData, value: string) => {
        const current = formData[field] as string[];
        setFormData(prev => ({
            ...prev,
            [field]: current.includes(value)
                ? current.filter(item => item !== value)
                : [...current, value]
        }));
    };

    return (
        <div className="paper-container">
            <div className="logo-script">Dídùn</div>
            <div className="header-title">CAKE ORDER FORM</div>

            {/* Header Fields */}
            <div style={{ display: 'flex', gap: '25px', alignItems: 'center', marginBottom: '20px' }}>
                <span style={{ fontSize: '15px' }}>First time order:</span>
                <label className="custom-checkbox">
                    <input type="checkbox" checked={formData.isFirstTime === true} onChange={() => setFormData(p => ({ ...p, isFirstTime: p.isFirstTime === true ? null : true }))} />
                    <div className="checkmark"></div>
                    <span>Yes</span>
                </label>
                <label className="custom-checkbox">
                    <input type="checkbox" checked={formData.isFirstTime === false} onChange={() => setFormData(p => ({ ...p, isFirstTime: p.isFirstTime === false ? null : false }))} />
                    <div className="checkmark"></div>
                    <span>No</span>
                </label>
            </div>

            <div className="field-group">
                <span>Name :</span>
                <input className="field-line" style={{ flex: 1, minWidth: 0 }} value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '15px', marginBottom: '15px' }}>
                <div className="field-group">
                    <span style={{ whiteSpace: 'nowrap' }}>Delivery Date:</span>
                    <input className="field-line" style={{ flex: 1, minWidth: 0 }} value={formData.deliveryDate} onChange={e => setFormData(p => ({ ...p, deliveryDate: e.target.value }))} />
                </div>
                <div className="field-group">
                    <span style={{ whiteSpace: 'nowrap' }}>Phone #:</span>
                    <input className="field-line" style={{ flex: 1, minWidth: 0 }} value={formData.phone} onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))} />
                </div>
                <div className="field-group">
                    <span style={{ whiteSpace: 'nowrap' }}>Occasion:</span>
                    <input className="field-line" style={{ flex: 1, minWidth: 0 }} value={formData.occasion} onChange={e => setFormData(p => ({ ...p, occasion: e.target.value }))} />
                </div>
            </div>

            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-end', marginBottom: '15px', fontSize: '15px' }}>
                <div className="field-group" style={{ marginBottom: 0 }}>
                    <span>Tiers requested:</span>
                    <input className="field-line" style={{ width: '80px' }} value={formData.tiers} onChange={e => setFormData(p => ({ ...p, tiers: e.target.value }))} />
                </div>
                {['Round', 'Square', 'Heart', 'Sheet'].map(s => (
                    <label key={s} className="custom-checkbox" style={{ marginBottom: 0 }}>
                        <input type="checkbox" checked={formData.shape === s} onChange={() => setFormData(p => ({ ...p, shape: p.shape === s ? '' : s }))} />
                        <div className="checkmark"></div>
                        <span>{s}</span>
                    </label>
                ))}
                <div className="field-group" style={{ marginBottom: 0 }}>
                    <span>Custom:</span>
                    <input className="field-line" style={{ width: '100px' }} value={formData.shapeCustom} onChange={e => setFormData(p => ({ ...p, shapeCustom: e.target.value }))} />
                </div>
            </div>

            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-end', marginBottom: '30px', fontSize: '15px' }}>
                <span>Delivery needed?</span>
                <label className="custom-checkbox" style={{ marginBottom: 0 }}>
                    <input type="checkbox" checked={formData.deliveryNeeded === true} onChange={() => setFormData(p => ({ ...p, deliveryNeeded: p.deliveryNeeded === true ? null : true }))} />
                    <div className="checkmark"></div>
                    <span>Yes</span>
                </label>
                <label className="custom-checkbox" style={{ marginBottom: 0 }}>
                    <input type="checkbox" checked={formData.deliveryNeeded === false} onChange={() => setFormData(p => ({ ...p, deliveryNeeded: p.deliveryNeeded === false ? null : false }))} />
                    <div className="checkmark"></div>
                    <span>No</span>
                </label>
                <div className="field-group" style={{ marginBottom: 0, flex: 1, minWidth: 0 }}>
                    <span style={{ whiteSpace: 'nowrap' }}>If yes, address:</span>
                    <input className="field-line" style={{ flex: 1, minWidth: 0 }} value={formData.address} onChange={e => setFormData(p => ({ ...p, address: e.target.value }))} />
                </div>
            </div>

            {/* Main Grid Section */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '15px', marginBottom: '25px' }}>
                {/* Cake Flavor */}
                <div className="section-box">
                    <div className="section-title">Cake Flavor</div>
                    {['Vanilla', 'Chocolate', 'Red Velvet'].map(f => (
                        <label key={f} className="custom-checkbox">
                            <input type="checkbox" checked={formData.cakeFlavor.includes(f)} onChange={() => toggleArray('cakeFlavor', f)} />
                            <div className="checkmark"></div>
                            <span>{f}</span>
                        </label>
                    ))}
                    <div className="sub-header">Special Flavor</div>
                    {['Cookies and cream', 'Carrot', 'Coconut'].map(f => (
                        <label key={f} className="custom-checkbox">
                            <input type="checkbox" checked={formData.specialFlavor.includes(f)} onChange={() => toggleArray('specialFlavor', f)} />
                            <div className="checkmark"></div>
                            <span>{f}</span>
                        </label>
                    ))}
                    <div className="field-group">
                        <span>Other:</span>
                        <input className="field-line" style={{ flex: 1, minWidth: 0 }} value={formData.specialFlavorOther} onChange={e => setFormData(p => ({ ...p, specialFlavorOther: e.target.value }))} />
                    </div>
                    <p style={{ fontSize: '11px', fontStyle: 'italic', marginTop: '10px' }}>• Extra N3,000 for special flavoured cakes</p>
                </div>

                {/* Filling */}
                <div className="section-box">
                    <div className="section-title">Filling</div>
                    {['Vanilla', 'Salted caramel', 'Raspberry', 'Strawberry', 'Crunchy peanut', 'Chocolate', 'Buttercream'].map(f => (
                        <label key={f} className="custom-checkbox">
                            <input type="checkbox" checked={formData.filling.includes(f)} onChange={() => toggleArray('filling', f)} />
                            <div className="checkmark"></div>
                            <span>{f}</span>
                        </label>
                    ))}
                    <div className="field-group">
                        <span>Other:</span>
                        <input className="field-line" style={{ flex: 1, minWidth: 0 }} value={formData.fillingOther} onChange={e => setFormData(p => ({ ...p, fillingOther: e.target.value }))} />
                    </div>
                </div>

                {/* Decorative additions */}
                <div className="section-box">
                    <div className="section-title">Decorative additions</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                        {['Chocchip', 'White chip', 'Almonds', 'Coconut flakes', 'Oreo', 'M&M', 'Topper', 'Full glitter', 'Ribbon'].map(f => (
                            <label key={f} className="custom-checkbox" style={{ marginBottom: '3px' }}>
                                <input type="checkbox" checked={formData.decorative.includes(f)} onChange={() => toggleArray('decorative', f)} />
                                <div className="checkmark"></div>
                                <span style={{ lineHeight: 1.1 }}>{f}</span>
                            </label>
                        ))}
                        <div className="field-group" style={{ marginTop: '8px', marginBottom: '5px' }}>
                            <span style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>Other:</span>
                            <input className="field-line" style={{ flex: 1, minWidth: 0 }} value={formData.decorativeOther} onChange={e => setFormData(p => ({ ...p, decorativeOther: e.target.value }))} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Grid Section */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '20px', marginBottom: '25px' }}>
                <div className="section-box">
                    <div className="section-title">Size</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '10px' }}>
                        {['Bento', '10"', '6"', '12"', '8"'].map(s => (
                            <label key={s} className="custom-checkbox">
                                <input type="checkbox" checked={formData.size === s} onChange={() => setFormData(p => ({ ...p, size: p.size === s ? '' : s }))} />
                                <div className="checkmark"></div>
                                <span>{s}</span>
                            </label>
                        ))}
                        <div className="field-group" style={{ gridColumn: 'span 2' }}>
                            <span>Other:</span>
                            <input className="field-line" style={{ flex: 1, minWidth: 0 }} value={formData.sizeOther} onChange={e => setFormData(p => ({ ...p, sizeOther: e.target.value }))} />
                        </div>
                    </div>
                </div>

                <div className="section-box">
                    <div className="section-title">PLEASE NOTE</div>
                    <ul className="note-list">
                        <li>For whipped cream there will be an additional cost of N5,000.</li>
                        <li>Customizable toppers come at an extra fee.</li>
                        <li>Any other special requests attract extra cost.</li>
                        <li>Please indicate if you have allergies or you'll prefer reduced sugar.</li>
                    </ul>
                </div>
            </div>

            {/* Special Instructions */}
            <div className="field-group" style={{ marginTop: '10px' }}>
                <span>Special Instructions :</span>
                <input className="field-line" style={{ flex: 1, minWidth: 0 }} value={formData.specialInstructions} onChange={e => setFormData(p => ({ ...p, specialInstructions: e.target.value }))} />
            </div>
            <div className="field-line" style={{ height: '30px', marginBottom: '10px' }}></div>
            <div className="field-line" style={{ height: '30px', marginBottom: '40px' }}></div>

            {/* Footer Branding */}
            <div style={{ marginTop: 'auto', borderTop: '2px solid #000', paddingTop: '15px', display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                <div style={{ fontFamily: 'sans-serif', fontWeight: 'bold', fontSize: '18px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    Date: <input className="field-line" style={{ width: '250px', fontSize: '18px' }} value={formData.date} onChange={e => setFormData(p => ({ ...p, date: e.target.value }))} />
                </div>
            </div>

            <div className="footer-handle">
                <a href="https://www.instagram.com/didun_ng/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                    @didun_ng
                </a>
            </div>

            <div className="no-print" style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
                <button onClick={() => window.print()} style={{ padding: '10px 20px', background: 'black', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>Print / Export PDF</button>
            </div>

            <style>{`
        @media print {
          .no-print { display: none !important; }
        }
      `}</style>
        </div>
    );
};

export default OrderForm;
