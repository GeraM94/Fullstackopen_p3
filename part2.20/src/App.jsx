import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import personServ from "./services/personService";
import Person from "./components/Person";
import Notificaction from "./components/Notificaction";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [filter, setFilter] = useState("");
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        personServ.getAll().then((response) => {
            setPersons(response);
        });
    }, []);

    const addPerson = (e) => {
        e.preventDefault();
        !newName || !newNumber ? alert("both fields must be filled") : null;
        const existPerson = persons.find(
            (person) => person.name.toLowerCase() === newName.toLowerCase()
        );

        if (existPerson) {
            const confirmed = window.confirm(
                `${existPerson.name} is already in phonebook, do you want to update the number?`
            );
            if (confirmed) {
                handleUpdate(existPerson.id);
            }
        } else {
            handleCreate();
        }
    };
    const handleFilter = (e) => {
        setFilter(e.target.value);
    };
    const handleNewName = (e) => {
        setNewName(e.target.value);
    };
    const handleNewNumber = (e) => {
        setNewNumber(e.target.value.replace(/[^0-9-]/g, ""));
    };
    const handleDelete = (id) => {
        const selectedPersonToDelete = persons.find(
            (person) => person.id === id
        );
        const confirmed = window.confirm(
            `Are you sure you want to delete ${selectedPersonToDelete.name}`
        );

        if (confirmed) {
            personServ
                .deleteObject(id)
                .then(() => {
                    setPersons(persons.filter((person) => person.id !== id));
                })
                .catch((error) => {
                    setErrorMessage({
                        status: error.response.status,
                        message: `Person ${selectedPersonToDelete.name} is already deleted from database`,
                    });
                    setTimeout(() => {
                        setErrorMessage(null);
                    }, 5000);
                    setPersons(
                        persons.filter((person) =>
                            person.id !== id ? person : null
                        )
                    );
                });
        }
    };
    const handleUpdate = (id) => {
        const selectedPersonToUpdate = persons.find(
            (person) => person.id === id
        );
        const newPerson = {
            ...selectedPersonToUpdate,
            number: newNumber,
        };
        personServ
            .update(selectedPersonToUpdate.id, newPerson)
            .then((newPersonResponse) => {
                setPersons(
                    persons.map((person) =>
                        person.id !== newPerson.id
                            ? person
                            : newPersonResponse[1]
                    )
                );
                setNewName("");
                setNewNumber("");
            })
            .catch((err) => {
                setErrorMessage({
                    status: err.response.status,
                    message: err.response.data.error,
                });
                setTimeout(() => {
                    setErrorMessage(null);
                }, 5000);
            });

    };
    const handleCreate = () => {
        const newPerson = {
            name: newName,
            number: newNumber,
        };
        personServ
            .create(newPerson)
            .then((response) => {
                setPersons(persons.concat(response[1]));
                setNewName("");
                setNewNumber("");
            })
            .catch((err) => {
                setErrorMessage({
                    status: err.response.status,
                    message: err.response.data.error,
                });
                setTimeout(() => {
                    setErrorMessage(null);
                }, 5000);
            });
    };

    return (
        <div>
            <h1>PhoneBook</h1>
            <Notificaction message={errorMessage} />
            <div>
                <div>
                    <Filter filter={filter} handleFilter={handleFilter} />
                </div>
                <PersonForm
                    persons={persons}
                    newName={newName}
                    newNumber={newNumber}
                    handleNewNumber={handleNewNumber}
                    handleNewName={handleNewName}
                    addPerson={addPerson}
                />
            </div>
            <h2>Number...</h2>

            <Person
                filter={filter}
                persons={persons}
                handleDelete={handleDelete}
            />
        </div>
    );
};

App.propTypes = {};

export default App;
