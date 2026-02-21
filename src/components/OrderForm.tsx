import React, { useState, useEffect } from 'react';

const STORAGE_KEY = 'didun_order_form_data';

const OrderForm: React.FC = () => {
    const [formData, setFormData] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error("Failed to parse saved form data", e);
            }
        }
        return {
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
        };
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    }, [formData]);

    const isFormValid = formData.name.trim() !== '' && 
                       formData.phone.trim() !== '' && 
                       formData.deliveryDate !== '';

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
    <>
        <div className="paper-container">
            <div className="logo-script">Dídùn</div>
            <div className="header-title">CAKE ORDER FORM</div>

            {/* Header Fields */}
            <div className="flex-responsive" style={{ gap: '25px', alignItems: 'center', marginBottom: '15px' }}>
                <span style={{ fontSize: '15px' }}>First time order:</span>
                <div className="checkbox-group">
                    <label className="custom-checkbox" style={{ marginBottom: 0 }}>
                        <input type="checkbox" aria-label="First time order: Yes" checked={formData.isFirstTime === true} onChange={() => setFormData(p => ({ ...p, isFirstTime: p.isFirstTime === true ? null : true }))} />
                        <div className="checkmark"></div>
                        <span>Yes</span>
                    </label>
                    <label className="custom-checkbox" style={{ marginBottom: 0 }}>
                        <input type="checkbox" aria-label="First time order: No" checked={formData.isFirstTime === false} onChange={() => setFormData(p => ({ ...p, isFirstTime: p.isFirstTime === false ? null : false }))} />
                        <div className="checkmark"></div>
                        <span>No</span>
                    </label>
                </div>
            </div>

            <div className="field-group">
                <span>Name :</span>
                <input className="field-line" style={{ flex: 1, minWidth: 0 }} aria-label="Customer Name" value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} />
            </div>

            <div className="responsive-grid-3" style={{ marginBottom: '12px' }}>
                <div className="field-group">
                    <span style={{ whiteSpace: 'nowrap' }}>Delivery Date:</span>
                    <input type="date" className="field-line" style={{ flex: 1, minWidth: 0 }} aria-label="Delivery Date" value={formData.deliveryDate} onChange={e => setFormData(p => ({ ...p, deliveryDate: e.target.value }))} />
                </div>
                <div className="field-group">
                    <span style={{ whiteSpace: 'nowrap' }}>Phone #:</span>
                    <input className="field-line" style={{ flex: 1, minWidth: 0 }} aria-label="Phone Number" value={formData.phone} onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))} />
                </div>
                <div className="field-group">
                    <span style={{ whiteSpace: 'nowrap' }}>Occasion:</span>
                    <input className="field-line" style={{ flex: 1, minWidth: 0 }} aria-label="Occasion" value={formData.occasion} onChange={e => setFormData(p => ({ ...p, occasion: e.target.value }))} />
                </div>
            </div>

            <div className="flex-responsive" style={{ alignItems: 'flex-end', marginBottom: '12px', fontSize: '15px' }}>
                <div className="field-group" style={{ marginBottom: 0 }}>
                    <span>Tiers requested:</span>
                    <input className="field-line" style={{ width: '80px' }} aria-label="Tiers requested" value={formData.tiers} onChange={e => setFormData(p => ({ ...p, tiers: e.target.value }))} />
                </div>
                <div className="checkbox-group">
                    {['Round', 'Square', 'Heart', 'Sheet'].map(s => (
                        <label key={s} className="custom-checkbox" style={{ marginBottom: 0 }}>
                            <input type="checkbox" aria-label={`Shape: ${s}`} checked={formData.shape === s} onChange={() => setFormData(p => ({ ...p, shape: p.shape === s ? '' : s }))} />
                            <div className="checkmark"></div>
                            <span>{s}</span>
                        </label>
                    ))}
                </div>
                <div className="field-group" style={{ marginBottom: 0 }}>
                    <span>Custom:</span>
                    <input className="field-line" style={{ width: '100px' }} aria-label="Custom shape" value={formData.shapeCustom} onChange={e => setFormData(p => ({ ...p, shapeCustom: e.target.value }))} />
                </div>
            </div>

            <div className="flex-responsive" style={{ alignItems: 'flex-end', marginBottom: '20px', fontSize: '15px' }}>
                <div className="checkbox-group" style={{ alignItems: 'center' }}>
                    <span>Delivery needed?</span>
                    <label className="custom-checkbox" style={{ marginBottom: 0 }}>
                        <input type="checkbox" aria-label="Delivery needed: Yes" checked={formData.deliveryNeeded === true} onChange={() => setFormData(p => ({ ...p, deliveryNeeded: p.deliveryNeeded === true ? null : true }))} />
                        <div className="checkmark"></div>
                        <span>Yes</span>
                    </label>
                    <label className="custom-checkbox" style={{ marginBottom: 0 }}>
                        <input type="checkbox" aria-label="Delivery needed: No" checked={formData.deliveryNeeded === false} onChange={() => setFormData(p => ({ ...p, deliveryNeeded: p.deliveryNeeded === false ? null : false }))} />
                        <div className="checkmark"></div>
                        <span>No</span>
                    </label>
                </div>
                <div className="field-group" style={{ marginBottom: 0, flex: 1, minWidth: '200px' }}>
                    <span style={{ whiteSpace: 'nowrap' }}>If yes, address:</span>
                    <input className="field-line" style={{ flex: 1, minWidth: 0 }} aria-label="Delivery Address" value={formData.address} onChange={e => setFormData(p => ({ ...p, address: e.target.value }))} />
                </div>
            </div>

            {/* Main Grid Section */}
            <div className="responsive-grid-3" style={{ marginBottom: '25px' }}>
                {/* Cake Flavor */}
                <div className="section-box">
                    <div className="section-title">Cake Flavor</div>
                    {['Vanilla', 'Chocolate', 'Red Velvet'].map(f => (
                        <label key={f} className="custom-checkbox">
                            <input type="checkbox" aria-label={`Cake Flavor: ${f}`} checked={formData.cakeFlavor.includes(f)} onChange={() => toggleArray('cakeFlavor', f)} />
                            <div className="checkmark"></div>
                            <span>{f}</span>
                        </label>
                    ))}
                    <div className="sub-header">Special Flavor</div>
                    {['Cookies and cream', 'Carrot', 'Coconut'].map(f => (
                        <label key={f} className="custom-checkbox">
                            <input type="checkbox" aria-label={`Special Flavor: ${f}`} checked={formData.specialFlavor.includes(f)} onChange={() => toggleArray('specialFlavor', f)} />
                            <div className="checkmark"></div>
                            <span>{f}</span>
                        </label>
                    ))}
                    <div className="field-group">
                        <span>Other:</span>
                        <input className="field-line" style={{ flex: 1, minWidth: 0 }} aria-label="Other special flavor" value={formData.specialFlavorOther} onChange={e => setFormData(p => ({ ...p, specialFlavorOther: e.target.value }))} />
                    </div>
                    <p style={{ fontSize: '11px', fontStyle: 'italic', marginTop: '10px' }}>• Extra N3,000 for special flavoured cakes</p>
                </div>

                {/* Filling */}
                <div className="section-box">
                    <div className="section-title">Filling</div>
                    {['Vanilla', 'Salted caramel', 'Raspberry', 'Strawberry', 'Crunchy peanut', 'Chocolate', 'Buttercream'].map(f => (
                        <label key={f} className="custom-checkbox">
                            <input type="checkbox" aria-label={`Filling: ${f}`} checked={formData.filling.includes(f)} onChange={() => toggleArray('filling', f)} />
                            <div className="checkmark"></div>
                            <span>{f}</span>
                        </label>
                    ))}
                    <div className="field-group">
                        <span>Other:</span>
                        <input className="field-line" style={{ flex: 1, minWidth: 0 }} aria-label="Other filling" value={formData.fillingOther} onChange={e => setFormData(p => ({ ...p, fillingOther: e.target.value }))} />
                    </div>
                </div>

                {/* Decorative additions */}
                <div className="section-box">
                    <div className="section-title">Decorative additions</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                        {['Chocchip', 'White chip', 'Almonds', 'Coconut flakes', 'Oreo', 'M&M', 'Topper', 'Full glitter', 'Ribbon'].map(f => (
                            <label key={f} className="custom-checkbox" style={{ marginBottom: '3px' }}>
                                <input type="checkbox" aria-label={`Decorative addition: ${f}`} checked={formData.decorative.includes(f)} onChange={() => toggleArray('decorative', f)} />
                                <div className="checkmark"></div>
                                <span style={{ lineHeight: 1.1 }}>{f}</span>
                            </label>
                        ))}
                        <div className="field-group" style={{ marginTop: '8px', marginBottom: '5px' }}>
                            <span style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>Other:</span>
                            <input className="field-line" style={{ flex: 1, minWidth: 0 }} aria-label="Other decorative addition" value={formData.decorativeOther} onChange={e => setFormData(p => ({ ...p, decorativeOther: e.target.value }))} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Grid Section */}
            <div className="responsive-grid-2" style={{ marginBottom: '15px' }}>
                <div className="section-box">
                    <div className="section-title">Size</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '10px' }}>
                        {['Bento', '10"', '6"', '12"', '8"'].map(s => (
                            <label key={s} className="custom-checkbox">
                                <input type="checkbox" aria-label={`Size: ${s}`} checked={formData.size === s} onChange={() => setFormData(p => ({ ...p, size: p.size === s ? '' : s }))} />
                                <div className="checkmark"></div>
                                <span>{s}</span>
                            </label>
                        ))}
                        <div className="field-group" style={{ gridColumn: 'span 2' }}>
                            <span>Other:</span>
                            <input className="field-line" style={{ flex: 1, minWidth: 0 }} aria-label="Other size" value={formData.sizeOther} onChange={e => setFormData(p => ({ ...p, sizeOther: e.target.value }))} />
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
                <input className="field-line" style={{ flex: 1, minWidth: 0 }} aria-label="Special Instructions" value={formData.specialInstructions} onChange={e => setFormData(p => ({ ...p, specialInstructions: e.target.value }))} />
            </div>
            <div className="field-line" style={{ height: '15px' }}></div>

            {/* Footer Branding */}
            <div style={{ marginTop: 'auto', borderTop: '2px solid #000', paddingTop: '15px', display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                <div style={{ fontFamily: 'sans-serif', fontWeight: 'bold', fontSize: '18px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    Date: <input className="field-line" style={{ width: '250px', fontSize: '18px' }} aria-label="Order Date" value={formData.date} onChange={e => setFormData(p => ({ ...p, date: e.target.value }))} />
                </div>
            </div>

            <div className="footer-handle">
                <a href="https://www.instagram.com/didun_ng/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                    @didun_ng
                </a>
            </div>

            <style>{`
        @media print {
          .no-print { display: none !important; }
        }
      `}</style>
        </div>

        <div className="no-print">
            {!isFormValid && (
                <span style={{ 
                    color: '#d32f2f', 
                    fontSize: '13px', 
                    fontWeight: '600',
                    textAlign: 'center',
                    padding: '4px 10px',
                    background: '#ffebee',
                    borderRadius: '4px',
                    width: '100%',
                    maxWidth: '300px',
                    marginBottom: '5px'
                }}>
                    ⚠️ Fill Name, Phone & Date to Print
                </span>
            )}
            <div style={{ display: 'flex', gap: '10px', width: '100%', justifyContent: 'center', maxWidth: '400px' }}>
                <button 
                    disabled={!isFormValid}
                    onClick={() => window.print()} 
                    style={{ 
                        flex: 2,
                        padding: '12px 20px', 
                        background: isFormValid ? 'black' : '#ccc', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '4px', 
                        cursor: isFormValid ? 'pointer' : 'not-allowed', 
                        fontFamily: 'var(--font-sans)', 
                        fontWeight: 600,
                        fontSize: '15px'
                    }}
                >
                    Print / Export PDF
                </button>
                <button 
                    onClick={() => { if(confirm('Clear all form data?')) { setFormData({ ...formData, name: '', deliveryDate: '', phone: '', occasion: '', tiers: '', shape: '', shapeCustom: '', address: '', cakeFlavor: [], cakeFlavorOther: '', specialFlavor: [], specialFlavorOther: '', filling: [], fillingOther: '', decorative: [], decorativeOther: '', size: '', sizeOther: '', specialInstructions: '' }); localStorage.removeItem(STORAGE_KEY); } }}
                    style={{ 
                        flex: 1,
                        padding: '12px 10px', 
                        background: 'white', 
                        color: '#666', 
                        border: '1px solid #ccc', 
                        borderRadius: '4px', 
                        cursor: 'pointer', 
                        fontSize: '13px',
                        fontWeight: 500
                    }}
                >
                    Clear
                </button>
            </div>
        </div>
    </>
    );
};

export default OrderForm;
