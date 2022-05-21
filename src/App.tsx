import React, {useState} from 'react';
import {Header} from "./coponents/layouts/Header";
import {Map} from "./coponents/Map/Map";
import {SearchContext} from "./contexts/search.context";
import {Route, Routes} from "react-router-dom";
import {AddForm} from "./coponents/Form/AddForm";

function App() {

    const [search, setSearch] = useState<string>('');

  return (
        <SearchContext.Provider value={{search, setSearch}}>
            <Header/>
            <Routes>
                <Route path='/' element={<Map/>}/>
                <Route path='/add' element={<AddForm/>}/>
            </Routes>
        </SearchContext.Provider>
  );
}

export default App;
