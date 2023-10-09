import React from "react";
import PropTypes from "prop-types";

const Persons = ({ persons, filter,handleDelete }) => {
    return (
        <div>
            {persons
                .filter((person) =>
                    person.name.toLowerCase().includes(filter.toLowerCase())
                )
                .map((person) => (
                    <div key={person.id}>
                        {person.name} {person.number}
                        <button onClick={() => handleDelete(person.id)}>delete</button>
                    </div>
                ))}
        </div>
    );
};

Persons.propTypes = {};

export default Persons;
