import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import IngredientForm from '../IngredientForm';

describe('IngredientForm', () => {
    test('renders the ingredient form with initial values', () => {
        render(<IngredientForm />);

        // Check for headers
        expect(screen.getByText('Ingredient Calculator')).toBeInTheDocument();
        expect(screen.getByText('Ingredient')).toBeInTheDocument();
        expect(screen.getByText('Amount')).toBeInTheDocument();
        expect(screen.getByText('Units')).toBeInTheDocument();

        // Check for initial values (Chicken Thighs = 1, Liver = 97)
        const chickenInput = screen.getByDisplayValue('1');
        expect(chickenInput).toBeInTheDocument();

        // Liver should be 97 * 1 = 97
        const liverRow = screen.getByText('Raw chicken liver').closest('tr');
        const liverInput = liverRow?.querySelector('input');
        if (!liverInput) throw new Error('Liver input not found');
        expect(liverInput).toHaveValue(97);
    });

    test('updates calculations when base ingredient changes', () => {
        render(<IngredientForm />);

        const chickenRow = screen.getByText('Raw chicken thighs with bone').closest('tr');
        const chickenInput = chickenRow?.querySelector('input');

        if (!chickenInput) throw new Error('Chicken input not found');

        // Change value to 2
        fireEvent.change(chickenInput, { target: { value: '2' } });

        // Verify Liver updates to 97 * 2 = 194
        const liverRow = screen.getByText('Raw chicken liver').closest('tr');
        const liverInput = liverRow?.querySelector('input');
        if (!liverInput) throw new Error('Liver input not found');
        expect(liverInput).toHaveValue(194);
    });

    test('updates calculations when a secondary ingredient changes (reverse calculation)', () => {
        render(<IngredientForm />);

        const liverRow = screen.getByText('Raw chicken liver').closest('tr');
        const liverInput = liverRow?.querySelector('input');

        if (!liverInput) throw new Error('Liver input not found');

        // Change Liver to 194 (2x)
        fireEvent.change(liverInput, { target: { value: '194' } });

        // Verify Chicken Thighs updates to 2
        const chickenRow = screen.getByText('Raw chicken thighs with bone').closest('tr');
        const chickenInput = chickenRow?.querySelector('input');
        if (!chickenInput) throw new Error('Chicken input not found');
        expect(chickenInput).toHaveValue(2);
    });

    test('preserves input precision while typing', () => {
        render(<IngredientForm />);

        const chickenRow = screen.getByText('Raw chicken thighs with bone').closest('tr');
        const chickenInput = chickenRow?.querySelector('input');

        if (!chickenInput) throw new Error('Chicken input not found');

        // Type "2.500" - this checks if we preserve trailing zeros which would be lost if we parsed to number
        fireEvent.focus(chickenInput);
        fireEvent.change(chickenInput, { target: { value: '2.500' } });

        // Check value directly as string
        expect((chickenInput as HTMLInputElement).value).toBe('2.500');

        fireEvent.change(chickenInput, { target: { value: '2.0' } });
        expect((chickenInput as HTMLInputElement).value).toBe('2.0');
    });

    test('displays values with 3 decimal precision', () => {
        render(<IngredientForm />);

        const chickenRow = screen.getByText('Raw chicken thighs with bone').closest('tr');
        const chickenInput = chickenRow?.querySelector('input');

        if (!chickenInput) throw new Error('Chicken input not found');

        // Set chicken to 1.1234
        fireEvent.change(chickenInput, { target: { value: '1.1234' } });

        // Liver ratio is 97. 1.1234 * 97 = 108.9698
        // Should round to 108.97 (3 decimals, trailing zeros removed by parseFloat)

        const liverRow = screen.getByText('Raw chicken liver').closest('tr');
        const liverInput = liverRow?.querySelector('input');

        if (!liverInput) throw new Error('Liver input not found');

        expect(liverInput).toHaveValue(108.97);
    });
});

