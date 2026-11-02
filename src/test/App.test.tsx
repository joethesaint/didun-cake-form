import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import App from '../App';
import '@testing-library/jest-dom';

describe('App routes', () => {
    beforeEach(() => {
        localStorage.clear();
        window.location.hash = '';
    });

    it('shows the website at #/', () => {
        render(<App />);
        expect(screen.getByRole('heading', { name: /Menu/i })).toBeInTheDocument();
        expect(screen.queryByRole('heading', { name: /CAKE ORDER FORM/i })).not.toBeInTheDocument();
    });

    it('switches to the order form at #/order and back', () => {
        render(<App />);
        act(() => {
            window.location.hash = '#/order';
            window.dispatchEvent(new HashChangeEvent('hashchange'));
        });
        expect(screen.getByRole('heading', { name: /CAKE ORDER FORM/i })).toBeInTheDocument();

        act(() => {
            window.location.hash = '#/';
            window.dispatchEvent(new HashChangeEvent('hashchange'));
        });
        expect(screen.getByRole('heading', { name: /Menu/i })).toBeInTheDocument();
    });
});
