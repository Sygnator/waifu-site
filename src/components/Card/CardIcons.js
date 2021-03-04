import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    card_icons: {
        margin: 0,
        padding: 0,
    },
}));

const CardIcons = (props) => {
  const {
    tags,
    value,
    isActive,
    isInCage,
    isUnique,
    affection,
    isTradable,
    isUltimate,
    isOnExpedition,
    hasCustomImage,
    hasCustomBorder,
  } = props.card;

  const classes = useStyles();

  return (
      <p className={classes.card_icons}>
        {`${tags.map((e)=> e.toLowerCase()).indexOf("wymiana") > -1 ? "🔃" : ""}`}
        {`${tags.map((e)=> e.toLowerCase()).indexOf("ulubione") > -1 ? "💗" : ""}`}
        {`${tags.map((e)=> e.toLowerCase()).indexOf("rezerwacja") > -1 ? "📝" : ""}`}
        {`${tags.map((e)=> e.toLowerCase()).indexOf("galeria") > -1 ? "📌" : ""}`}
        {`${isUnique ? "💠" : ""}`}
        {`${isUltimate ? "🎖️" : ""}`}
        {`${hasCustomImage ? "🖼️" : ""}`}
        {`${hasCustomBorder ? "✂️" : ""}`}
        {`${affection==="Pogarda" ? "💔" : ""}`}
        {`${isTradable ? "" : "⛔"}`}
        {`${isInCage ? "🔒" : ""}`}
        {`${isActive ? "☑️" : ""}`}
        {`${value==="high" ? "💰" : ""}`}
        {`${value==="low" ? "♻️" : ""}`}
        {`${isOnExpedition ? "✈️" : ""}`}
      </p>
  );
}

export default CardIcons;