import { useState, useEffect, useRef } from 'react';
import { Route } from 'react-router-dom';
import { Header } from './Header/Header';
import { Block } from './Block';
import { Main } from './Main/Main';
import { CurrencyRates } from './CurrencyRates/CurrencyRates';
import './index.scss';

function App() {
    const [fromCurrency, setFromCurrency] = useState("RUB");
    const [convertedCurrency, setConvertedCurrency] = useState("USD");
    const [toPrice, setToPrice] = useState(1);
    const [fromPrice, setFromPrice] = useState(0);

    const [currencyValue, setCurrencyValue] = useState("");
    const [convertingResult, setConvertingResult] = useState(0);

    // const [rates, setRates] = useState({});
    const ratesRef = useRef({});

    useEffect(() => {
        fetch('https://cdn.cur.su/api/latest.json')
            .then((res) => res.json())
            .then((json) => {
                ratesRef.current = json.rates;
                onChangeToPrice(1);
                console.log(json.rates);
            })
            .catch((err) => {
                console.warn(err);
                alert('Ну удалось получить информацию')
            });
    }, [])

    const onCalculateValue = (value) => {
        //const arr = value.split(' ');
        setCurrencyValue(value);
        console.log(currencyValue);
    }

    const onConvert = (e) => {
        e.preventDefault();
        const arr = currencyValue.toUpperCase().split(' ');
        const price = arr[0];
        const currencyFrom = arr[1];
        const currencyTo = arr[3];
        const result = (price * ratesRef.current[currencyTo]) / ratesRef.current[currencyFrom]
        setConvertingResult(result.toFixed(3));
        console.log("calculate", result);
    }

    const onChangeFromPrice = (value) => {
        const price = value / ratesRef.current[fromCurrency];
        const result = price * ratesRef.current[convertedCurrency]
        setFromPrice(value);
        setToPrice(result.toFixed(3));
    }

    const onChangeToPrice = (value) => {
        const result = (ratesRef.current[fromCurrency] / ratesRef.current[convertedCurrency]) * value;
        setFromPrice(result.toFixed(3));
        setToPrice(value)
    }

    useEffect(() => {
        onChangeFromPrice(fromPrice);
    }, [fromCurrency]);

    useEffect(() => {
        onChangeToPrice(toPrice);
    }, [convertedCurrency]);

  return (

    <div className="page content">
        <Header />
        <Route path="/">
            <Main
                onConvert={onConvert}
                value={currencyValue}
                onChangeValue={onCalculateValue}
                result={convertingResult}
            />
        </Route>
        <Route path="/convert">
            <Block
                value={fromPrice}
                currency={fromCurrency}
                onChangeCurrency={setFromCurrency}
                onChangeValue={onChangeFromPrice}
            />
            <Block
                value={toPrice}
                currency={convertedCurrency}
                onChangeCurrency={setConvertedCurrency}
                onChangeValue={onChangeToPrice}
            />
        </Route>
        <Route path="/rates">
            <CurrencyRates />
        </Route>

    </div>
  );
}

export default App;
