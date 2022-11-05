import React from 'react';
import "./CurrencyRates.css";

export const CurrencyRates = () => {
    const [baseCurrency, setBaseCurrency] = React.useState("");

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
    }, [baseCurrency])




    return(
        <div>
            <h2>Курсы валют</h2>
            <span>Базовая валюта</span>
        </div>

    )
}