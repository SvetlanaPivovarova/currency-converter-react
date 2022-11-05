import React from 'react';
import "./CurrencyRates.css";

export const CurrencyRates = ({ ratesRef }) => {
    const CURRENCY_ARRAY = ["USD", "EUR", "RUB"];

    const [baseCurrency, setBaseCurrency] = React.useState("");
    const [currencyArray, setCurrencyArray] = React.useState([]);

    //const lang = window.navigator.language;

    React.useEffect(() => {
        if (/^en\b/.test(navigator.language)) {
            setBaseCurrency("USD");
            console.log("Базовая валюта", baseCurrency)
        }

        else if (/^ru\b/.test(navigator.language)) {
            setBaseCurrency("RUB");
            console.log("Базовая валюта", baseCurrency)
        }

    }, [baseCurrency]);

    const getCurrencyArray = () => {
        const newArray = CURRENCY_ARRAY.filter((c) => c !== baseCurrency);
        setCurrencyArray(newArray);
        console.log("new", newArray)
    }

    React.useEffect(() => {
        getCurrencyArray()
    }, [baseCurrency])

    const calculate = (cur) => {
        const price = 1 / ratesRef.current[cur];
        const result = price * ratesRef.current[baseCurrency]

        return result.toFixed(2);
    }

    return(
        <div className="content">
            <h2 className="content__heading">Курсы валют</h2>
            <span>Базовая валюта {baseCurrency}</span>
            <ul>
                {currencyArray.map((cur) => (
                    <li key={cur}>1 {cur} = {calculate(cur)} {baseCurrency}</li>
                ))
                }
            </ul>
        </div>

    )
}