import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import OrderForm from '../components/OrderForm';
import '@testing-library/jest-dom';

// Mock html-to-image
vi.mock('html-to-image', () => ({
    toPng: vi.fn().mockResolvedValue('data:image/png;base64,dummy'),
}));

describe('OrderForm', () => {
    beforeEach(() => {
        localStorage.clear();
        // Mock window.print
        window.print = vi.fn();
    });

    it('renders the form title', () => {
        render(<OrderForm />);
        expect(screen.getByText(/CAKE ORDER FORM/i)).toBeInTheDocument();
    });

    it('validates required fields for the save button', () => {
        render(<OrderForm />);
        const saveBtn = screen.getByRole('button', { name: /Download Order Summary/i });
        
        // Initially disabled style (using background color or just checking if it reports missing)
        expect(screen.getByText(/Fill Name, Phone & Date to Download/i)).toBeInTheDocument();

        // Fill fields
        fireEvent.change(screen.getByLabelText(/Customer Name/i), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: '123456789' } });
        fireEvent.change(screen.getByLabelText(/Delivery Date/i), { target: { value: '2026-12-25' } });

        // Warning should be gone
        expect(screen.queryByText(/Fill Name, Phone & Date to Download/i)).not.toBeInTheDocument();
    });

    it('toggles cake flavors correctly', () => {
        render(<OrderForm />);
        const vanillaCheckbox = screen.getByLabelText(/Cake Flavor: Vanilla/i);
        
        fireEvent.click(vanillaCheckbox);
        expect(vanillaCheckbox).toBeChecked();

        fireEvent.click(vanillaCheckbox);
        expect(vanillaCheckbox).not.toBeChecked();
    });

    it('persists data to localStorage', () => {
        render(<OrderForm />);
        const nameInput = screen.getByLabelText(/Customer Name/i);
        fireEvent.change(nameInput, { target: { value: 'Jane Smith' } });

        const savedData = JSON.parse(localStorage.getItem('didun_order_form_data') || '{}');
        expect(savedData.name).toBe('Jane Smith');
    });

    it('clears the form on clicking Clear Form', () => {
        // Mock confirm
        window.confirm = vi.fn(() => true);
        
        render(<OrderForm />);
        const nameInput = screen.getByLabelText(/Customer Name/i);
        fireEvent.change(nameInput, { target: { value: 'Jane Smith' } });
        
        const clearBtn = screen.getByRole('button', { name: /Clear Form/i });
        fireEvent.click(clearBtn);

        expect(nameInput).toHaveValue('');
        const savedData = JSON.parse(localStorage.getItem('didun_order_form_data') || '{}');
        expect(savedData.name).toBe('');
    });
});
