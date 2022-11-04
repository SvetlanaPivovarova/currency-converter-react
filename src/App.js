import { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { Block } from './Block';
import { Main } from './Main';
import { CurrencyRates } from './CurrencyRates';
import './index.scss';

function App() {
    const [fromCurrency, setFromCurrency] = useState("RUB");
    const [convertedCurrency, setConvertedCurrency] = useState("USD");
    const [toPrice, setToPrice] = useState(0);
    const [fromPrice, setFromPrice] = useState(0);

    const [rates, setRates] = useState({});

    useEffect(() => {
        fetch('https://cdn.cur.su/api/latest.json')
            .then((res) => res.json())
            .then((json) => {
                setRates(json.rates);
                console.log(json.rates);
            })
            .catch((err) => {
                console.warn(err);
                alert('Ну удалось получить информацию')
            });
    }, [])

    const onChangeFromPrice = (value) => {
        setFromPrice(value)
    }

    const onChangeToPrice = (value) => {
        setToPrice(value)
    }

  return (
    <div className="App">
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

        <Route exact path="/">
            <Main />
        </Route>
        <Route>
            <CurrencyRates />
        </Route>

    </div>
  );
}

export default App;
