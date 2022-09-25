import React, { useState } from 'react';
import Table from './Table';
import Form from './Form';

function MyApp() {
    const [characters, setCharacters] = useState([]);
    /*The filter function works similar to a for loop, the first argument is the value of the
    current character being iterated over (not used in this case), the second parameter holds the
    index value of the current character being iterated over, which is why we are comparing i !== index*/

    function removeOneCharacter(index) {
        const updated = characters.filter((character, i) => {
            return i !== index
        });
        setCharacters(updated);
    }

    return (
        <div className="container">
            <Table characterData={characters} removeCharacter={removeOneCharacter} />
            <Form />
        </div>
    );


}

export default MyApp;