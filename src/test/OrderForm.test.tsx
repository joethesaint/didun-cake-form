import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
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

    it('is always enabled but would show alert if invalid (manual check)', () => {
        render(<OrderForm />);
        const saveBtn = screen.getByRole('button', { name: /Download Image Summary/i });
        
        // Should be enabled now
        expect(saveBtn).toBeEnabled();
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
