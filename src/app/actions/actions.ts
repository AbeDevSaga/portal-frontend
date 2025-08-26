import keycloak from '@/src/lib/keycloak';

const handleSignOut = () => {
    console.log("Sign out - implement Keycloak sign out");
    // This is handled by the KeycloakContext logout function
};

async function fetchHelper(endPoint: string, isPublic?: boolean) {
    let token = "placeholder-token";
    
    try {
        if (keycloak.authenticated && keycloak.token) {
            token = keycloak.token;
        }
    } catch (error) {
        console.error("Failed to get Keycloak token:", error);
    }

    const response = await fetch(endPoint, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (response.status === 401) {
        handleSignOut();
        throw new Error("Unauthorized");
    }

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}

async function createHelper(endPoint: string, data: any, isPublic?: boolean) {
    let token = "placeholder-token";
    
    try {
        if (keycloak.authenticated && keycloak.token) {
            token = keycloak.token;
        }
    } catch (error) {
        console.error("Failed to get Keycloak token:", error);
    }

    const response = await fetch(endPoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });

    if (response.status === 401) {
        handleSignOut();
        throw new Error("Unauthorized");
    }

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}

async function updateHelper(endPoint: string, data: any, isPublic?: boolean) {
    let token = "placeholder-token";
    
    try {
        if (keycloak.authenticated && keycloak.token) {
            token = keycloak.token;
        }
    } catch (error) {
        console.error("Failed to get Keycloak token:", error);
    }

    const response = await fetch(endPoint, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });

    if (response.status === 401) {
        handleSignOut();
        throw new Error("Unauthorized");
    }

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}

async function deleteHelper(endPoint: string, isPublic?: boolean) {
    let token = "placeholder-token";
    
    try {
        if (keycloak.authenticated && keycloak.token) {
            token = keycloak.token;
        }
    } catch (error) {
        console.error("Failed to get Keycloak token:", error);
    }

    const response = await fetch(endPoint, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (response.status === 401) {
        handleSignOut();
        throw new Error("Unauthorized");
    }

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}

export { fetchHelper, createHelper, updateHelper, deleteHelper };
