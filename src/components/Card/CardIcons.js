import React from 'react';

import Tooltip from '@material-ui/core/Tooltip';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    card_icons: {
        margin: 0,
        padding: 0,
        fontFamily: "Arial",
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
    whoWantsCount,
    isOnExpedition,
    hasCustomImage,
    hasCustomBorder,
  } = props.card;

  const classes = useStyles();

  return (
      <p className={classes.card_icons}>
        <Tooltip title={`Otagowana jako wymiana`} arrow><a>{`${tags.map((e)=> e.toLowerCase()).indexOf("wymiana") > -1 ? "🔃" : ""}`}</a></Tooltip>
        <Tooltip title={`Otagowana jako ulubione`} arrow><a>{`${tags.map((e)=> e.toLowerCase()).indexOf("ulubione") > -1 ? "💗" : ""}`}</a></Tooltip>
        <Tooltip title={`Otagowana jako rezerwowacja`} arrow><a>{`${tags.map((e)=> e.toLowerCase()).indexOf("rezerwacja") > -1 ? "📝" : ""}`}</a></Tooltip>
        <Tooltip title={`Otagowana jako galeria`} arrow><a>{`${tags.map((e)=> e.toLowerCase()).indexOf("galeria") > -1 ? "📌" : ""}`}</a></Tooltip>
        <Tooltip title={`Otagowana jako galeria`} arrow><a>{`${tags.map((e)=> e.toLowerCase()).indexOf("kosz") > -1 ? "🗑️" : ""}`}</a></Tooltip>
        <Tooltip title={`Karta unikatowa`} arrow><a>{`${isUnique ? "💠" : ""}`}</a></Tooltip>
        <Tooltip title={`Karta ultimate`} arrow><a>{`${isUltimate ? "🎖️" : ""}`}</a></Tooltip>
        <Tooltip title={`Na karcie został użyty skalpel`} arrow><a>{`${hasCustomImage ? "🖼️" : ""}`}</a></Tooltip>
        <Tooltip title={`Na karcie zostały użyte nożyczki`} arrow><a>{`${hasCustomBorder ? "✂️" : ""}`}</a></Tooltip>
        <Tooltip title={`Pogarda`} arrow><a>{`${affection==="Pogarda" ? "💔" : ""}`}</a></Tooltip>
        <Tooltip title={`Zablokowana`} arrow><a>{`${isTradable ? "" : "⛔"}`}</a></Tooltip>
        <Tooltip title={`Karta w klatce`} arrow><a>{`${isInCage ? "🔒" : ""}`}</a></Tooltip>
        <Tooltip title={`Karta w talii`} arrow><a>{`${isActive ? "☑️" : ""}`}</a></Tooltip>
        <Tooltip title={`Wysoka wartość rynkowa`} arrow><a>{`${value==="high" ? "💰" : ""}`}</a></Tooltip>
        <Tooltip title={`Niska wartość rynkowa`} arrow><a>{`${value==="low" ? "♻️" : ""}`}</a></Tooltip>
        <Tooltip title={`Karta jest na wyprawie`} arrow><a>{`${isOnExpedition ? "✈️" : ""}`}</a></Tooltip>
        {/* <Tooltip title={`Liczba KC`} arrow><a className={classes.kc}>{`${whoWantsCount > 0 ? `(${whoWantsCount})` : ""}`}</a></Tooltip> */}
      </p>
  );
}

export default CardIcons;