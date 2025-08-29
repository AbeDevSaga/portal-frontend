import React from "react";
import { useGetResidentDataQuery } from "../api/marriageApi";

const MarriageDetailComponent = ({
    id,
    title,
}: {
    id: string;
    title: string;
}) => {
    const { isLoading, isError, data } = useGetResidentDataQuery({
        id: id,
        type: "id",
    });

    const displayData = {
        age: data?.content[0].age || null,
        bloodType: data?.content[0].bloodType || null,
        dateOfBirth: data?.content[0].dateOfBirth || null,
        educationLevel: data?.content[0].educationLevel || null,
        email: data?.content[0].email || null,
        ethnicity: data?.content[0].ethnicity || null,
        firstName: data?.content[0].firstName || null,
        gender: data?.content[0].gender || null,
        id: data?.content[0].id || null,
        lastName: data?.content[0].lastName || null,
        maritalStatus: data?.content[0].maritalStatus || null,
        middleName: data?.content[0].middleName || null,
        mobileNumber: data?.content[0].mobileNumber || null,
        nationality: data?.content[0].nationality || null,
        occupation: data?.content[0].occupation || null,
        registeredAt: data?.content[0].registeredAt || null,
        religion: data?.content[0].religion || null,
        status: data?.content[0].status || null,
        urid: data?.content[0].urid || null,
    };
    return (
        <div>
            {!isError &&
            !isLoading &&
            data.content.length !== 0 &&
            data.content !== null &&
            data.content !== undefined ? (
                <div>
                    <p className='text-xl font-semibold mb-2'>{title}</p>
                    <div className='grid grid-cols-5 gap-2'>
                        <p className='text-sm col-span-2'>URID</p>
                        <p className='font-semibold col-span-3'>
                            {displayData.urid}
                        </p>
                    </div>
                    <div className='grid grid-cols-5 gap-2'>
                        <p className='text-sm col-span-2'>Full Name</p>
                        <p className='font-semibold col-span-3'>
                            {displayData.firstName +
                                displayData.middleName +
                                displayData.lastName}
                        </p>
                    </div>{" "}
                    <div className='grid grid-cols-5 gap-2'>
                        <p className='text-s col-span-2'>Age</p>
                        <p className='font-semibold col-span-3'>
                            {displayData.age}
                        </p>
                    </div>
                    <div className='grid grid-cols-5 gap-2'>
                        <p className='text-sm col-span-2'>Date Of Birth</p>
                        <p className='font-semibold col-span-3'>
                            {displayData.dateOfBirth}
                        </p>
                    </div>{" "}
                    <div className='grid grid-cols-5 gap-2'>
                        <p className='text-sm col-span-2'>Nationality</p>
                        <p className='font-semibold col-span-3'>
                            {displayData.nationality}
                        </p>
                    </div>{" "}
                    <div className='grid grid-cols-5 gap-2'>
                        <p className='text-sm col-span-2'>Occupation</p>
                        <p className='font-semibold col-span-3'>
                            {displayData.occupation}
                        </p>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default MarriageDetailComponent;
