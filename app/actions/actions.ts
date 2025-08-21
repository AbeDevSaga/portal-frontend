"use server";
import { auth } from "@/auth";
import { signOut } from "next-auth/react";
import { randomBytes } from 'crypto';
import bcrypt from 'bcryptjs';

const handleSignOut = () => {
    signOut({ callbackUrl: `/home` });
};

export async function fetchAction(endPoint: string, isPublic?: boolean) {
    console.log('end point', endPoint);
    try {
        const data = await fetchHelper(endPoint, isPublic);
        console.error("Fetch data status:", data?.status);
        console.error("Fetch data message:", data?.message);
        return data;
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
}

export async function createAction(
    param: any,
    endPoint: string,
    isPublic?: boolean
) {
    console.log('end point', endPoint, 'param', param);

    try {
        const data = await createHelper(param, endPoint, isPublic);
        console.error("Fetch data status:", data?.status);
        console.error("Fetch data message:", data?.message);
        return data;
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
}

export async function fetchByIdAction(
    param: any,
    endPoint: string,
    isPublic?: boolean
) {
    console.log('end point', endPoint, 'param', param);

    try {
        const data = await fetchByIdHelper(param, endPoint, isPublic);
        console.error("Fetch data status:", data?.status);
        console.error("Fetch data message:", data?.message);
        return data;
    } catch (error) {
        console.error("Fetch error for by id:", error);
        throw error;
    }
}

export async function updateAction(
    param: any,
    endPoint: string,
    isPublic?: boolean
) {
    console.log('end point', endPoint, 'param', param);

    try {
        const data = await updateHelper(param, endPoint, isPublic);
        console.error("Fetch data status:", data?.status);
        console.error("Fetch data message:", data?.message);
        return data;
    } catch (error) {
        console.error("Fetch error for by id:", error);
        throw error;
    }
}

export async function deleteAction(
    param: any,
    endPoint: string,
    isPublic?: boolean
) {
    console.log('end point', endPoint, 'param', param);

    try {
        const data = await deleteHelper(param, endPoint, isPublic);
        console.error("Fetch data status:", data?.status);
        console.error("Fetch data message:", data?.message);
        return data;
    } catch (error) {
        console.error("Fetch error for by id:", error);
        throw error;
    }
}

export async function filterAction(
    param: any,
    endPoint: string,
    isPublic?: boolean
) {
    console.log('end point', endPoint, 'param', param.request, "is public api", isPublic);

    try {
        const data = await filterHelper(param, endPoint, isPublic);
        console.error("Fetch data status:", data?.status);
        console.error("Fetch data message:", data?.message);
        return data;
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
}

export async function registerUserAction(param: any, endPoint: string, isPublic?: boolean) {
    console.log('end point', endPoint, 'param', param);
    try {

        const password = generateRandomPassword(12);
        // // TODO: Hash the password if necessary
        // const hashedPassword = await hashPassword(password);

        param.credentials = [{
            "type": "password",
            "value": password,
            "temporary": true
        }]

        console.log('register user', param)

        return
        const data = await registerUserHelper(param, endPoint, isPublic);
        console.log("Fetch data:", data);
        return data;
    } catch (error) {
        console.log("Fetch error:", error);
        throw error;
    }
}

async function fetchHelper(endPoint: string, isPublic?: boolean) {
    const session = await auth();
    const token = await session?.user.access_token;
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };
    if (!isPublic) {
        headers["Authorization"] = `Bearer ${token}`;
    }
    const response = await fetch(
        `${process.env.CRRSA_BACKEND_API_URL}${endPoint}`,
        { headers }
    );

    if (!response.ok) {
        if (response.status === 401) {
            handleSignOut();
            throw new Error("Unauthorized");
        }
        throw new Error("Network response was not ok");
    }

    return await response.json();
}

async function createHelper(param: any, endPoint: string, isPublic?: boolean) {
    const session = await auth();
    const token = await session?.user.access_token;
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };
    if (!isPublic) {
        headers["Authorization"] = `Bearer ${token}`;
    }
    const response = await fetch(
        `${process.env.CRRSA_BACKEND_API_URL}${endPoint}`,
        {
            method: "POST",
            headers,
            body: JSON.stringify(param),
        }
    );
    if (!response.ok) {
        if (response.status === 401) {
            signOut();
            throw new Error("Unauthorized");
        }
        throw new Error("Network response was not ok");
    }
    return await response.json();
}

async function fetchByIdHelper(
    param: any,
    endPoint: string,
    isPublic?: boolean
) {
    const session = await auth();
    const token = await session?.user.access_token;
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };
    if (!isPublic) {
        headers["Authorization"] = `Bearer ${token}`;
    }
    const response = await fetch(
        `${process.env.CRRSA_BACKEND_API_URL}${endPoint}`,
        {
            method: "POST",
            headers,
            body: JSON.stringify(param),
        }
    );
    if (!response.ok) {
        if (response.status === 401) {
            signOut();
            throw new Error("Unauthorized");
        }
        throw new Error("Network response was not ok");
    }
    return await response.json();
}

async function updateHelper(param: any, endPoint: string, isPublic?: boolean) {
    const session = await auth();
    const token = await session?.user.access_token;
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };
    if (!isPublic) {
        headers["Authorization"] = `Bearer ${token}`;
    }
    const response = await fetch(
        `${process.env.CRRSA_BACKEND_API_URL}${endPoint}`,
        {
            method: "PUT",
            headers,
            body: JSON.stringify(param),
        }
    );
    if (!response.ok) {
        if (response.status === 401) {
            signOut();
            throw new Error("Unauthorized");
        }
        throw new Error("Network response was not ok");
    }
    return await response.json();
}

async function deleteHelper(param: any, endPoint: string, isPublic?: boolean) {
    const session = await auth();
    const token = await session?.user.access_token;
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };
    if (!isPublic) {
        headers["Authorization"] = `Bearer ${token}`;
    }
    const response = await fetch(
        `${process.env.CRRSA_BACKEND_API_URL}${endPoint}`,
        {
            method: "POST",
            headers,
            body: JSON.stringify(param),
        }
    );
    if (!response.ok) {
        if (response.status === 401) {
            signOut();
            throw new Error("Unauthorized");
        }
        throw new Error("Network response was not ok");
    }
    return await response.json();
}

async function filterHelper(param: any, endPoint: string, isPublic?: boolean) {
    const session = await auth();
    const token = await session?.user.access_token;
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };
    if (!isPublic) {
        headers["Authorization"] = `Bearer ${token}`;
    }
    const response = await fetch(
        `${process.env.CRRSA_BACKEND_API_URL}${endPoint}`,
        {
            method: "POST",
            headers,
            body: JSON.stringify(param),
        }
    );
    if (!response.ok) {
        if (response.status === 401) {
            signOut();
            throw new Error("Unauthorized");
        }
        throw new Error("Network response was not ok");
    }
    return await response.json();
}



async function registerUserHelper(param: any, endPoint: string, isPublic?: boolean) {
    const session = await auth();
    const token = await session?.user.access_token;
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };
    if (!isPublic) {
        headers["Authorization"] = `Bearer ${token}`;
    }
    const response = await fetch(
        `${process.env.CRRSA_BACKEND_API_URL}${endPoint}`,
        {
            method: "POST",
            headers,
            body: JSON.stringify(param),
        }
    );
    if (!response.ok) {
        if (response.status === 401) {
            signOut();
            throw new Error("Unauthorized");
        }
        throw new Error("Network response was not ok");
    }
    return await response.json();
}

function generateRandomPassword(length: any) {
    return randomBytes(Math.ceil(length / 2))
        .toString('hex')
        .slice(0, length);
}

async function hashPassword(password: any) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}
