import React, { useState, useEffect } from 'react';
import './IngredientForm.css';

// Define the ingredient type
interface Ingredient {
    title: string;
    ratio: number;
    units: string;
}

// Define the list of ingredients
const ingredientMaps: Ingredient[] = [
    {
        title: 'Raw chicken thighs with bone',
        ratio: 1,
        units: 'kg'
    },
    {
        title: 'Raw chicken liver',
        ratio: 97,
        units: 'g'
    },
    {
        title: 'Second secreting organ',
        ratio: 97,
        units: 'g'
    },
    {
        title: 'Raw chicken hearts',
        ratio: 194.5,
        units: 'g'
    },
    {
        title: 'Water',
        ratio: 116.1,
        units: 'ml'
    },
    {
        title: 'Raw eggs',
        ratio: 2,
        units: 'eggs'
    },
    {
        title: 'Taurine',
        ratio: 980,
        units: 'mg'
    },
    {
        title: 'Salmon or fish oil',
        ratio: 1960,
        units: 'mg'
    },
    {
        title: 'Vitamin E',
        ratio: 98,
        units: 'IU'
    },
    {
        title: 'Vitamin B Complex',
        ratio: 98,
        units: 'mg'
    },
]

// Main component
const IngredientForm: React.FC = () => {
    const [amount, setAmount] = useState<number>(1);
    const [amounts, setAmounts] = useState<{ title: string; amount: string }[]>([]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputAmount = parseFloat(event.target.value);
        setAmount(inputAmount);

        // Calculate the amounts for other ingredients based on the ratio
        const calculatedAmounts = ingredientMaps.map(ingredient => ({
            title: ingredient.title,
            amount: (ingredient.ratio * inputAmount).toFixed(1)
        }));

        setAmounts(calculatedAmounts);
    };

    return (
        <div className="ingredient-form">
            <h1>Ingredient Calculator</h1>
            <table>
                <thead>
                    <tr>
                        <th>Ingredient</th>
                        <th>Amount</th>
                        <th>Units</th>
                    </tr>
                </thead>
                <tbody>
                    {ingredientMaps.map((ingredient, index) => (
                        <tr key={ingredient.title}>
                            <td>{ingredient.title}</td>
                            <td>
                                {index === 0 ? (
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={handleChange}
                                        step="0.001"
                                    />
                                ) : (
                                    amounts.find(a => a.title === ingredient.title)?.amount || '0'
                                )}
                            </td>
                            <td>{ingredient.units}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default IngredientForm;