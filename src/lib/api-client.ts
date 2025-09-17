import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

/**
 * Server-side API client that automatically handles authentication
 * Use this for server components and API routes
 */
export async function createServerApiClient() {
  const session = await getServerSession(authOptions);
  
  if (!session?.accessToken) {
    throw new Error("No valid session found");
  }

  return {
    async request(url: string, options: RequestInit = {}) {
      const response = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
          ...options.headers,
        },
      });

      if (response.status === 401) {
        throw new Error("Unauthorized - session may have expired");
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response;
    },

    async get(url: string) {
      const response = await this.request(url, { method: "GET" });
      return response.json();
    },

    async post(url: string, data: any) {
      const response = await this.request(url, {
        method: "POST",
        body: JSON.stringify(data),
      });
      return response.json();
    },

    async put(url: string, data: any) {
      const response = await this.request(url, {
        method: "PUT",
        body: JSON.stringify(data),
      });
      return response.json();
    },

    async delete(url: string) {
      const response = await this.request(url, { method: "DELETE" });
      return response.json();
    },
  };
}

/**
 * Client-side API client that uses the session from the client
 * Use this in client components
 */
export function createClientApiClient(accessToken: string) {
  return {
    async request(url: string, options: RequestInit = {}) {
      const response = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          ...options.headers,
        },
      });

      if (response.status === 401) {
        throw new Error("Unauthorized - session may have expired");
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response;
    },

    async get(url: string) {
      const response = await this.request(url, { method: "GET" });
      return response.json();
    },

    async post(url: string, data: any) {
      const response = await this.request(url, {
        method: "POST",
        body: JSON.stringify(data),
      });
      return response.json();
    },

    async put(url: string, data: any) {
      const response = await this.request(url, {
        method: "PUT",
        body: JSON.stringify(data),
      });
      return response.json();
    },

    async delete(url: string) {
      const response = await this.request(url, { method: "DELETE" });
      return response.json();
    },
  };
}
