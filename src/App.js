import { useState, useEffect, useRef } from 'react';
import { Route } from 'react-router-dom';
import { Block } from './Block';
import { Main } from './Main';
import { CurrencyRates } from './CurrencyRates';
import './index.scss';

function App() {
    const [fromCurrency, setFromCurrency] = useState("RUB");
    const [convertedCurrency, setConvertedCurrency] = useState("USD");
    const [toPrice, setToPrice] = useState(1);
    const [fromPrice, setFromPrice] = useState(0);

    // const [rates, setRates] = useState({});
    const ratesRef = useRef({});

    useEffect(() => {
        fetch('https://cdn.cur.su/api/latest.json')
            .then((res) => res.json())
            .then((json) => {
                ratesRef.current = json.rates;
                onChangeToPrice(1);
            })
            .catch((err) => {
                console.warn(err);
                alert('Ну удалось получить информацию')
            });
    }, [])

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

    <div className="App">
        <Route path="/">
            <Main />
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

    </div>
  );
}

export default App;
