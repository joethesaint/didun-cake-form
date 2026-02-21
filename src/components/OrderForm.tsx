import React, { useState, useEffect, useRef } from 'react';

const STORAGE_KEY = 'didun_order_form_data';

interface OrderFormData {
    isFirstTime: boolean | null;
    name: string;
    deliveryDate: string;
    phone: string;
    occasion: string;
    tiers: string;
    shape: string;
    shapeCustom: string;
    deliveryNeeded: boolean | null;
    address: string;
    cakeFlavor: string[];
    cakeFlavorOther: string;
    specialFlavor: string[];
    specialFlavorOther: string;
    filling: string[];
    fillingOther: string;
    decorative: string[];
    decorativeOther: string;
    size: string;
    sizeOther: string;
    specialInstructions: string;
    date: string;
}

const OrderForm: React.FC = () => {
    const formRef = useRef<HTMLDivElement>(null);
    const printableRef = useRef<HTMLDivElement>(null);
    const [isExporting, setIsExporting] = useState(false);
    const [formData, setFormData] = useState<OrderFormData>(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error("Failed to parse saved form data", e);
            }
        }
        return {
            isFirstTime: null,
            name: '',
            deliveryDate: '',
            phone: '',
            occasion: '',
            tiers: '',
            shape: '',
            shapeCustom: '',
            deliveryNeeded: null,
            address: '',
            cakeFlavor: [],
            cakeFlavorOther: '',
            specialFlavor: [],
            specialFlavorOther: '',
            filling: [],
            fillingOther: '',
            decorative: [],
            decorativeOther: '',
            size: '',
            sizeOther: '',
            specialInstructions: '',
            date: new Date().toLocaleDateString(),
        };
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    }, [formData]);

    const exportImage = async () => {
        if (!isFormValid) {
            const missing = [];
            if (!formData.name.trim()) missing.push('Name');
            if (!formData.phone.trim()) missing.push('Phone');
            if (!formData.deliveryDate) missing.push('Delivery Date');
            alert(`Missing: ${missing.join(', ')}. Please fill these to export.`);
            return;
        }

        if (printableRef.current === null) return;
        
        setIsExporting(true);
        try {
            const { toPng } = await import('html-to-image');
            
            // Capture at 2.5x for 'Retina' quality with better speed than 3x
            const dataUrl = await toPng(printableRef.current, { 
                pixelRatio: 2.5, 
                backgroundColor: '#ffffff',
                width: 1080,
                useCORS: true, // Crucial for external fonts
                cacheBust: true,
                style: {
                    opacity: '1',
                }
            });
            
            if (navigator.share && navigator.canShare) {
                const blob = await (await fetch(dataUrl)).blob();
                const file = new File([blob], `cake-order-${formData.name.replace(/\s+/g, '-').toLowerCase()}.png`, { type: 'image/png' });
                
                if (navigator.canShare({ files: [file] })) {
                    try {
                        await navigator.share({
                            files: [file],
                            title: 'Cake Order Summary',
                            text: `New order from ${formData.name}`
                        });
                        return;
                    } catch (shareError) {
                        console.log('Share failed or cancelled', shareError);
                    }
                }
            }

            const link = document.createElement('a');
            link.download = `cake-order-${formData.name.replace(/\s+/g, '-').toLowerCase() || 'form'}.png`;
            link.href = dataUrl;
            link.click();
        } catch (err) {
            console.error('oops, something went wrong!', err);
            alert('Failed to generate image. Please try again.');
        } finally {
            setIsExporting(false);
        }
    };

    const isFormValid = formData.name.trim() !== '' && 
                       formData.phone.trim() !== '' && 
                       formData.deliveryDate !== '';

    const toggleArray = (field: keyof OrderFormData, value: string) => {
        const current = formData[field] as string[];
        setFormData((prev: OrderFormData) => ({
            ...prev,
            [field]: current.includes(value)
                ? current.filter(item => item !== value)
                : [...current, value]
        }));
    };

    const FormContent = ({ isPrint = false }) => (
        <div className="paper-container">
            <div className="logo-script">Dídùn</div>
            <div className="header-title">CAKE ORDER FORM</div>

            <div className="flex-responsive" style={{ gap: '25px', alignItems: 'center', marginBottom: '15px' }}>
                <span style={{ fontSize: '15px' }}>First time order:</span>
                <div className="checkbox-group">
                    <label className="custom-checkbox" style={{ marginBottom: 0 }}>
                        <input type="checkbox" checked={formData.isFirstTime === true} onChange={() => setFormData((p: any) => ({ ...p, isFirstTime: p.isFirstTime === true ? null : true }))} />
                        <div className="checkmark"></div>
                        <span>Yes</span>
                    </label>
                    <label className="custom-checkbox" style={{ marginBottom: 0 }}>
                        <input type="checkbox" checked={formData.isFirstTime === false} onChange={() => setFormData((p: any) => ({ ...p, isFirstTime: p.isFirstTime === false ? null : false }))} />
                        <div className="checkmark"></div>
                        <span>No</span>
                    </label>
                </div>
            </div>

            <div className="field-group">
                <span>Name :</span>
                <input className="field-line" style={{ flex: 1, minWidth: 0 }} value={formData.name} onChange={e => setFormData((p: any) => ({ ...p, name: e.target.value }))} />
            </div>

            <div className="responsive-grid-3" style={{ marginBottom: '12px' }}>
                <div className="field-group">
                    <span style={{ whiteSpace: 'nowrap' }}>Delivery Date:</span>
                    <input type={isPrint ? 'text' : 'date'} className="field-line" style={{ flex: 1, minWidth: 0 }} value={formData.deliveryDate} onChange={e => setFormData((p: any) => ({ ...p, deliveryDate: e.target.value }))} />
                </div>
                <div className="field-group">
                    <span style={{ whiteSpace: 'nowrap' }}>Phone #:</span>
                    <input className="field-line" style={{ flex: 1, minWidth: 0 }} value={formData.phone} onChange={e => setFormData((p: any) => ({ ...p, phone: e.target.value }))} />
                </div>
                <div className="field-group">
                    <span style={{ whiteSpace: 'nowrap' }}>Occasion:</span>
                    <input className="field-line" style={{ flex: 1, minWidth: 0 }} value={formData.occasion} onChange={e => setFormData((p: any) => ({ ...p, occasion: e.target.value }))} />
                </div>
            </div>

            <div className="flex-responsive" style={{ alignItems: 'flex-end', marginBottom: '12px', fontSize: '15px' }}>
                <div className="field-group" style={{ marginBottom: 0 }}>
                    <span>Tiers requested:</span>
                    <input className="field-line" style={{ width: '80px' }} value={formData.tiers} onChange={e => setFormData((p: any) => ({ ...p, tiers: e.target.value }))} />
                </div>
                <div className="checkbox-group">
                    {['Round', 'Square', 'Heart', 'Sheet'].map(s => (
                        <label key={s} className="custom-checkbox" style={{ marginBottom: 0 }}>
                            <input type="checkbox" checked={formData.shape === s} onChange={() => setFormData((p: any) => ({ ...p, shape: p.shape === s ? '' : s }))} />
                            <div className="checkmark"></div>
                            <span>{s}</span>
                        </label>
                    ))}
                </div>
                <div className="field-group" style={{ marginBottom: 0 }}>
                    <span>Custom:</span>
                    <input className="field-line" style={{ width: '100px' }} value={formData.shapeCustom} onChange={e => setFormData((p: any) => ({ ...p, shapeCustom: e.target.value }))} />
                </div>
            </div>

            <div className="flex-responsive" style={{ alignItems: 'flex-end', marginBottom: '20px', fontSize: '15px' }}>
                <div className="checkbox-group" style={{ alignItems: 'center' }}>
                    <span>Delivery needed?</span>
                    <label className="custom-checkbox" style={{ marginBottom: 0 }}>
                        <input type="checkbox" checked={formData.deliveryNeeded === true} onChange={() => setFormData((p: any) => ({ ...p, deliveryNeeded: p.deliveryNeeded === true ? null : true }))} />
                        <div className="checkmark"></div>
                        <span>Yes</span>
                    </label>
                    <label className="custom-checkbox" style={{ marginBottom: 0 }}>
                        <input type="checkbox" checked={formData.deliveryNeeded === false} onChange={() => setFormData((p: any) => ({ ...p, deliveryNeeded: p.deliveryNeeded === false ? null : false }))} />
                        <div className="checkmark"></div>
                        <span>No</span>
                    </label>
                </div>
                <div className="field-group" style={{ marginBottom: 0, flex: 1, minWidth: '200px' }}>
                    <span style={{ whiteSpace: 'nowrap' }}>If yes, address:</span>
                    <input className="field-line" style={{ flex: 1, minWidth: 0 }} value={formData.address} onChange={e => setFormData((p: any) => ({ ...p, address: e.target.value }))} />
                </div>
            </div>

            <div className="responsive-grid-3" style={{ marginBottom: '25px' }}>
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
                        <input className="field-line" style={{ flex: 1, minWidth: 0 }} value={formData.specialFlavorOther} onChange={e => setFormData((p: any) => ({ ...p, specialFlavorOther: e.target.value }))} />
                    </div>
                </div>

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
                        <input className="field-line" style={{ flex: 1, minWidth: 0 }} value={formData.fillingOther} onChange={e => setFormData((p: any) => ({ ...p, fillingOther: e.target.value }))} />
                    </div>
                </div>

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
                            <input className="field-line" style={{ flex: 1, minWidth: 0 }} value={formData.decorativeOther} onChange={e => setFormData((p: any) => ({ ...p, decorativeOther: e.target.value }))} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="responsive-grid-2" style={{ marginBottom: '15px' }}>
                <div className="section-box">
                    <div className="section-title">Size</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '10px' }}>
                        {['Bento', '10"', '6"', '12"', '8"'].map(s => (
                            <label key={s} className="custom-checkbox">
                                <input type="checkbox" checked={formData.size === s} onChange={() => setFormData((p: any) => ({ ...p, size: p.size === s ? '' : s }))} />
                                <div className="checkmark"></div>
                                <span>{s}</span>
                            </label>
                        ))}
                        <div className="field-group" style={{ gridColumn: 'span 2' }}>
                            <span>Other:</span>
                            <input className="field-line" style={{ flex: 1, minWidth: 0 }} value={formData.sizeOther} onChange={e => setFormData((p: any) => ({ ...p, sizeOther: e.target.value }))} />
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

            <div className="field-group" style={{ marginTop: '10px' }}>
                <span>Special Instructions :</span>
                <input className="field-line" style={{ flex: 1, minWidth: 0 }} value={formData.specialInstructions} onChange={e => setFormData((p: any) => ({ ...p, specialInstructions: e.target.value }))} />
            </div>

            <div style={{ marginTop: 'auto', borderTop: '2px solid #000', paddingTop: '15px', display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 'bold', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    Date: <input className="field-line" style={{ width: '250px', fontSize: '16px' }} value={formData.date} onChange={e => setFormData((p: any) => ({ ...p, date: e.target.value }))} />
                </div>
            </div>

            <div className="footer-handle">
                <a href="https://www.instagram.com/didun_ng/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                    @didun_ng
                </a>
            </div>
        </div>
    );

    return (
    <>
        {/* INTERACTIVE VIEW */}
        <div className="capture-anchor">
            <div ref={formRef}>
                <FormContent />
            </div>
        </div>

        {/* HIDDEN PRINT TEMPLATE (LOCKED TO DESKTOP) */}
        <div className="print-template" ref={printableRef}>
            <FormContent isPrint={true} />
        </div>

        <div className="no-print">
            <div className="action-buttons-container">
                <button 
                    onClick={exportImage}
                    disabled={isExporting}
                    className="btn-primary"
                    style={{ flex: '1 1 100%', marginBottom: '5px' }}
                >
                    {isExporting ? 'Generating Summary...' : 'Download Image Summary'}
                </button>
                
                <button 
                    onClick={() => { if(confirm('Clear all form data?')) { setFormData((p: any) => ({ ...p, name: '', deliveryDate: '', phone: '', occasion: '', tiers: '', shape: '', shapeCustom: '', address: '', cakeFlavor: [], cakeFlavorOther: '', specialFlavor: [], specialFlavorOther: '', filling: [], fillingOther: '', decorative: [], decorativeOther: '', size: '', sizeOther: '', specialInstructions: '' })); localStorage.removeItem(STORAGE_KEY); } }}
                    className="btn-tertiary"
                    style={{ flex: '1 1 100%' }}
                >
                    Clear Form
                </button>
            </div>
        </div>
    </>
    );
};

export default OrderForm;
