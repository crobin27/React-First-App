import React, { useState, useEffect } from 'react';
import Table from './Table';
import Form from './Form';
import axios from 'axios'

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
        const idUrl = 'http://localhost:5000/users/' + characters[index]._id;
        makeDeleteCall(idUrl);

    }

    function updateList(person) {
        makePostCall(person).then( result => {
            if(result && result.status === 201) {
                const userToAdd = person;
                userToAdd.id = result.data.id;
                setCharacters([...characters, userToAdd]);
            }
        });
    }

    async function fetchAll(){
        try {
           const response = await axios.get('http://localhost:5000/users');
           return response.data.users_list;     
        }
        catch (error){
           //We're not handling errors. Just logging into the console.
           console.log(error); 
           return false;         
        }
     }

     useEffect(() => {
        fetchAll().then( result => {
           if (result)
              setCharacters(result);
         });
     }, [] );

     async function makePostCall(person){
        try {
            const response = await axios.post('http://localhost:5000/users', person);
            return response;
        }
        catch (error) {
            console.log(error);
            return false;
        }
     }

     async function makeDeleteCall(urlWithId){
        try {
            //send a delete request of form http://localhost/5000/xyz567
            const response = await axios.delete(urlWithId);
            return response;
        }
        catch (error) {
            console.log(error);
            return false;
        }
     }

     return (
        <div className="container">
            <Table characterData={characters} removeCharacter={removeOneCharacter} />
            <Form handleSubmit={updateList} />
        </div>
    );
}

export default MyApp;