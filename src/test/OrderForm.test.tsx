import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import OrderForm from '../components/OrderForm';
import '@testing-library/jest-dom';

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

    it('validates required fields for the print button', () => {
        render(<OrderForm />);
        const printBtn = screen.getByRole('button', { name: /Print \/ Export PDF/i });
        
        // Initially disabled
        expect(printBtn).toBeDisabled();
        expect(screen.getByText(/Fill Name, Phone & Date to Print/i)).toBeInTheDocument();

        // Fill fields
        fireEvent.change(screen.getByLabelText(/Customer Name/i), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: '123456789' } });
        fireEvent.change(screen.getByLabelText(/Delivery Date/i), { target: { value: '2026-12-25' } });

        // Should be enabled now
        expect(printBtn).toBeEnabled();
        expect(screen.queryByText(/Fill Name, Phone & Date to Print/i)).not.toBeInTheDocument();
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

    it('clears the form on clicking Clear', () => {
        // Mock confirm
        window.confirm = vi.fn(() => true);
        
        render(<OrderForm />);
        const nameInput = screen.getByLabelText(/Customer Name/i);
        fireEvent.change(nameInput, { target: { value: 'Jane Smith' } });
        
        const clearBtn = screen.getByRole('button', { name: /Clear/i });
        fireEvent.click(clearBtn);

        expect(nameInput).toHaveValue('');
        const savedData = JSON.parse(localStorage.getItem('didun_order_form_data') || '{}');
        expect(savedData.name).toBe('');
    });

    it('calls window.print when the print button is clicked', () => {
        render(<OrderForm />);
        
        // Fill required fields
        fireEvent.change(screen.getByLabelText(/Customer Name/i), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: '123456789' } });
        fireEvent.change(screen.getByLabelText(/Delivery Date/i), { target: { value: '2026-12-25' } });

        const printBtn = screen.getByRole('button', { name: /Print \/ Export PDF/i });
        fireEvent.click(printBtn);

        expect(window.print).toHaveBeenCalled();
    });
});
