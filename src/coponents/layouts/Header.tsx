import React, {SyntheticEvent, useContext, useState} from "react";
import './header.css';
import {Button} from '../common/Btn';
import {SearchContext} from "../../contexts/search.context";

export const Header = () => {

    const [inputVal, setInputVal] = useState<string>('');
    const {setSearch} = useContext(SearchContext);

    const setSearchFromLocal = (e: SyntheticEvent) => {
        e.preventDefault()
        setSearch(inputVal)
    }

    return (
        <header>
            <h1>
                <strong>Mega </strong> Ogłoszenia
            </h1>
            <Button text={'Dodaj ogłoszenie'}/>
            <form className="search" onSubmit={setSearchFromLocal}>
                <input type="text" value={inputVal} onChange={e => setInputVal(e.target.value)}/> <Button text={'Szukaj'}/>
            </form>
        </header>
    );
};
