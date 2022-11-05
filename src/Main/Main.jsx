import React from 'react';
import "./Main.css";

export const Main = ({ onConvert, onChangeValue, value, result }) => {
    return(

        <div className="content">
            <h2 className="content__heading">Конвертер из одной валюты в другую</h2>
            <form className="form" onSubmit={onConvert}>

                <input
                    className="input__text"
                    onChange={(e) => onChangeValue(e.target.value)}
                    value={value}
                    type="text"
                    placeholder="15 usd in rub"
                />
                <p className="form__span">Результат конвертации: {result}</p>
            </form>
        </div>
    )
}