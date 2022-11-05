import React from 'react';
import "./Main.css";

export const Main = ({ onConvert, onChangeValue, value, result }) => {
    return(

        <div className="input__container">
            <h2>Конвертер из одной валюты в другую</h2>
            <form onSubmit={onConvert}>
                <input
                    className="input__text"
                    onChange={(e) => onChangeValue(e.target.value)}
                    value={value}
                    type="text"
                    placeholder="15 usd in rub"
                />
            </form>
            <p>Результат конвертации: {result}</p>
        </div>
    )
}