import { LazyLoadImage } from "react-lazy-load-image-component";
import React from "react";
import "react-lazy-load-image-component/src/effects/blur.css";

const Img = ({ src, className }) => {
    return (
        <LazyLoadImage
            className={className || ""}
            alt=""
            effect="blur"
            src={src}
        />
    );
};

export default Img;