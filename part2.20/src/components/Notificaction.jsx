import React from "react";
import PropTypes from "prop-types";

const Notificaction = ({ message }) => {
    const errorStyle = {
        color: "red",
        background: "lightgrey",
        fontSize: "20px",
        borderStyle: "solid",
        borderRadius: "5px",
        padding: "10px",
        marginBottom: "10px",
    };
    const succesStyle = {
        color: "green",
        background: "lightgrey",
        fontSize: "20px",
        borderStyle: "solid",
        borderRadius: "5px",
        padding: "10px",
        marginBottom: "10px",
    };
    if (message === null) {
        return null;
    }

    return message.status === 400 ? (
        <div style={errorStyle}>{message.message}</div>
    ) : message.status === 200 ? (
        <div style={succesStyle}>{message.message}</div>
    ) : null;
};

Notificaction.propTypes = {};

export default Notificaction;
