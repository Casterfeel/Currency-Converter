import React, { useState, useEffect } from 'react';
import './CurrencyConverter.css'; 

const CurrencyConverter = () => {
    const [rates, setRates] = useState({});
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('EUR');
    const [amount, setAmount] = useState(1);
    const [result, setResult] = useState(0);

    useEffect(() => {
        const fetchRates = async () => {
            try {
                const response = await fetch(`https://open.er-api.com/v6/latest/${fromCurrency}`);
                const data = await response.json();
                setRates(data.rates);
            } catch (error) {
                console.error('Ошибка получения курсов валют:', error);
            }
        };

        fetchRates();   
    }, [fromCurrency]);

    const convertCurrency = () => {
        const rate = rates[toCurrency];
        setResult((amount * rate).toFixed(2));
    };

    return (
        <div className="currency-converter">
            <h1>Калькулятор курса валют</h1>
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="amount-input"
            />
            <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)} className="currency-select">
                {Object.keys(rates).map((currency) => (
                    <option key={currency} value={currency}>{currency}</option>
                ))}
            </select>
            <span className="arrow"> </span>
            <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)} className="currency-select">
                {Object.keys(rates).map((currency) => (
                    <option key={currency} value={currency}>{currency}</option>
                ))}
            </select>
            <button onClick={convertCurrency} className="convert-button">Конвертировать</button>
            <h2 className="result">Результат: {result} {toCurrency}</h2>
        </div>
    );
};

export default CurrencyConverter;