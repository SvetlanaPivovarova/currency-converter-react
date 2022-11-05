import { useState, useEffect, useRef } from 'react';
import { Route } from 'react-router-dom';
import { Header } from './Header/Header';
import { Main } from './Main/Main';
import { CurrencyRates } from './CurrencyRates/CurrencyRates';
import './index.scss';

function App() {
    const [currencyValue, setCurrencyValue] = useState("");
    const [convertingResult, setConvertingResult] = useState(0);

    const ratesRef = useRef({});

    useEffect(() => {
        fetch('https://cdn.cur.su/api/latest.json')
            .then((res) => res.json())
            .then((json) => {
                ratesRef.current = json.rates;
            })
            .catch((err) => {
                console.warn(err);
                alert('Ну удалось получить информацию')
            });
    }, [])

    const onCalculateValue = (value) => {
        setCurrencyValue(value);
    }

    const onConvert = (e) => {
        e.preventDefault();
        const arr = currencyValue.toUpperCase().split(' ');
        const price = arr[0];
        const currencyFrom = arr[1];
        const currencyTo = arr[3];
        const result = (price * ratesRef.current[currencyTo]) / ratesRef.current[currencyFrom]
        setConvertingResult(result.toFixed(3));
    }

  return (
    <div className="page content">
        <Header />
        <Route exact path="/">
            <Main
                onConvert={onConvert}
                value={currencyValue}
                onChangeValue={onCalculateValue}
                result={convertingResult}
            />
        </Route>
        <Route path="/rates">
            <CurrencyRates
                ratesRef={ratesRef}
            />
        </Route>
    </div>
  );
}

export default App;
