import React, {useState} from 'react';
import {Header} from "./coponents/layouts/Header";
import {Map} from "./coponents/Map/Map";
import {SearchContext} from "./contexts/search.context";

function App() {

    const [search, setSearch] = useState<string>('');

  return (
        <SearchContext.Provider value={{search, setSearch}}>
            <Header/>
            <Map/>
        </SearchContext.Provider>
  );
}

export default App;
