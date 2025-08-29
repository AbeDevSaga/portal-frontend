import React from "react";
import { useGetResidentDataQuery } from "../api/marriageApi";

const MarriageDetailComponent = ({ id }: { id: string }) => {
    const { isLoading, isError, data } = useGetResidentDataQuery({
        id: id,
    });

    console.log("husaband", data);
    return <div>MarriageDetailComponent</div>;
};

export default MarriageDetailComponent;
