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
    // baseFactor represents the multiplier for the entire recipe.
    // Initially 1, corresponding to 1 unit of the first ingredient (ratio 1).
    const [baseFactor, setBaseFactor] = useState<number>(1);

    // Track the currently active input to preserve user's typing (e.g. "2.0")
    const [activeInputTitle, setActiveInputTitle] = useState<string | null>(null);
    const [activeInputValue, setActiveInputValue] = useState<string>('');

    const handleAmountChange = (ratio: number, value: string, title: string) => {
        // Always update the active input value directly to what the user typed
        if (title === activeInputTitle) {
            setActiveInputValue(value);
        }

        const inputAmount = parseFloat(value);
        if (!isNaN(inputAmount)) {
            // Calculate the new base factor: value / ratio
            setBaseFactor(inputAmount / ratio);
        } else if (value === '') {
            setBaseFactor(0);
        }
    };

    const handleFocus = (title: string, currentAmount: string) => {
        setActiveInputTitle(title);
        setActiveInputValue(currentAmount);
    };

    const handleBlur = () => {
        setActiveInputTitle(null);
        setActiveInputValue('');
    };

    return (
        <div className="max-w-2xl mx-auto my-20 bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
            <h1 className="text-center text-2xl font-bold py-6 bg-gray-50 border-b border-gray-200 text-gray-800">Ingredient Calculator</h1>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 font-semibold">Ingredient</th>
                            <th className="py-3 px-6 font-semibold">Amount</th>
                            <th className="py-3 px-6 font-semibold">Units</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {ingredientMaps.map((ingredient) => {
                            // Calculate display amount based on current baseFactor
                            const displayAmount = (ingredient.ratio * baseFactor);

                            // Determine what to show: active input value or calculated formatted value
                            let valueToShow: string | number;
                            if (activeInputTitle === ingredient.title) {
                                valueToShow = activeInputValue;
                            } else {
                                valueToShow = baseFactor === 0 ? '' : parseFloat(displayAmount.toFixed(2)).toString();
                            }

                            return (
                                <tr key={ingredient.title} className="border-b border-gray-200 hover:bg-gray-100 transition-colors duration-200">
                                    <td className="py-3 px-6 text-left whitespace-nowrap font-medium">
                                        {ingredient.title}
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        <input
                                            type="number"
                                            value={valueToShow}
                                            onChange={(e) => handleAmountChange(ingredient.ratio, e.target.value, ingredient.title)}
                                            onFocus={() => handleFocus(ingredient.title, baseFactor === 0 ? '' : parseFloat(displayAmount.toFixed(2)).toString())}
                                            onBlur={handleBlur}
                                            step="any"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow duration-200"
                                        />
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        <span className="bg-gray-200 text-gray-600 py-1 px-3 rounded-full text-xs">
                                            {ingredient.units}
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default IngredientForm;