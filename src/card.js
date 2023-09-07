import React from "react";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import "./card.css";

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
const WeatherCard = ({ city, temperature, description, onDelete }) => {
  return (
    <div className="card-body">
      <h1>{capitalizeFirstLetter(city)}</h1>
      <p>{Math.floor(temperature)} °</p>
      <p>{description}</p>
      <IconButton onClick={onDelete}>
        <Delete />
      </IconButton>
    </div>
  );
};

export default WeatherCard;
