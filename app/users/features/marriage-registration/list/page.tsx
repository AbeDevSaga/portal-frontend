"use client";
import { useEffect } from "react";

export default function Page() {
    const fetchData = async () => {
        const res = await fetch("/api/marriage");
        const marriages = await res.json();
        console.log("Fetched marriages:", marriages);
        return marriages;
    };
    useEffect(() => {
        fetchData();
    }, []);
    return <div>Marriage list page is working!</div>;
}
