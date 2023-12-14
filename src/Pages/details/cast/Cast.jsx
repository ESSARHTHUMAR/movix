import React from "react";
import { useSelector } from "react-redux";

import "./cast.scss";
import avatar from "../../../assets/avatar.png";
import ContentWrapper from "../../../contentWrapper/ContentWrapper";
import Img from "../../../lazyLoadImage/Img";

const Cast = ({ data, loading }) => {
    const { url } = useSelector((state) => state.home);

    const skeleton = () => {
        return (
            <div className="skItem">
                <div className="circle skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };
    return (
        <div className="castSection">
            <ContentWrapper>
                <div className="sectionHeading">Top Cast</div>
                {!loading ? (
                    <div className="listItems">
                        {data?.map((d) => {
                            let imgUrl = d.profile_path ? url.profile + d.profile_path : avatar;
                            return (
                                <div key={d.id} className="listItem">
                                    <div className="profileImg">
                                        <Img src={imgUrl}/>
                                    </div>
                                    <div className="name">
                                        {d?.name}
                                    </div>
                                    <div className="character">
                                        {d?.character}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <div className="castSkeleton">
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                    </div>
                )}
            </ContentWrapper>
        </div>
    );
};

export default Cast;