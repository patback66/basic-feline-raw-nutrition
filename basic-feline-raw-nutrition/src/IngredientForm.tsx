import React, { useState } from 'react';

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
        ratio: 0.097,
        units: 'g'
    },
    {
        title: 'Raw chicken hearts',
        ratio: 0.1945,
        units: 'g'
    },
    {
        title: 'Water',
        ratio: 0.1161,
        units: 'ml'
    },
    {
        title: 'Raw eggs',
        ratio: 2,
        units: 'eggs'
    },
    {
        title: 'Taurine',
        ratio: 0.00098,
        units: 'mg'
    },
    {
        title: 'Salmon or fish oil',
        ratio: 0.00196,
        units: 'mg'
    },
    {
        title: 'Vitamin E',
        ratio: 98,
        units: 'IU'
    },
    {
        title: 'Vitamin B Complex',
        ratio: 0.000098,
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
            amount: (ingredient.ratio * inputAmount).toFixed(2)
        }));

        setAmounts(calculatedAmounts);
    };

    return (
        <div>
            <h1>Ingredient Calculator</h1>
            <table>
                <thead>
                    <tr>
                        <th>Ingredient</th>
                        <th>Amount</th>
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