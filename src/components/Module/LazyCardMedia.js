import React, { useState, useEffect, useRef } from 'react'
import { CardMedia } from '@material-ui/core'

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
cardMedia: {
    width: "190px", 
    margin: "auto"
},
}));

export default (props) => {
    const [visible, setVisible] = useState(false);
    const placeholderRef = useRef(null);
    const classes = useStyles();
    useEffect(() => {

        if (!visible && placeholderRef.current) {
            const observer = new IntersectionObserver(([{ intersectionRatio }]) => {
                if (intersectionRatio > 0) {
                    setVisible(true);
                }
            });
            observer.observe(placeholderRef.current);
            return () => observer.disconnect();
        }
    }, [visible, placeholderRef]);

    return (visible
        ?
        <CardMedia
            component='img'
            image={props.image}
            className={classes.cardMedia}
            alt={props.alt}
            // height={props.height}
        />
        :
        <div style={{ height: props.height, backgroundColor: '#EEE' }} aria-label={props.alt} ref={placeholderRef} />
    );
};