import React from "react";
import PropTypes from "prop-types";

const PersonsForm = ({
    newName,
    newNumber,
    handleNewName,
    handleNewNumber,
    addPerson,
}) => {
    return (
        <div>
            <h2>Add a new</h2>
            <form onSubmit={addPerson}>
                <div>
                    name: <input value={newName} onChange={handleNewName} />
                </div>
                <div>
                    number:{" "}
                    <input value={newNumber} onChange={handleNewNumber} />
                </div>
                <button type="submit">add</button>
            </form>
        </div>
    );
};

PersonsForm.propTypes = {};

export default PersonsForm;
