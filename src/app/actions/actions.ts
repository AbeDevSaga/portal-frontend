import { createServerApiClient } from "@/lib/api-client";

// Legacy API helpers - consider migrating to createServerApiClient
async function fetchHelper(endPoint: string, isPublic?: boolean) {
    if (isPublic) {
        const response = await fetch(endPoint, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    }

    const apiClient = await createServerApiClient();
    return apiClient.get(endPoint);
}

async function createHelper(endPoint: string, data: any, isPublic?: boolean) {
    if (isPublic) {
        const response = await fetch(endPoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    }

    const apiClient = await createServerApiClient();
    return apiClient.post(endPoint, data);
}

async function updateHelper(endPoint: string, data: any, isPublic?: boolean) {
    if (isPublic) {
        const response = await fetch(endPoint, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    }

    const apiClient = await createServerApiClient();
    return apiClient.put(endPoint, data);
}

async function deleteHelper(endPoint: string, isPublic?: boolean) {
    if (isPublic) {
        const response = await fetch(endPoint, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    }

    const apiClient = await createServerApiClient();
    return apiClient.delete(endPoint);
}

export { fetchHelper, createHelper, updateHelper, deleteHelper };
