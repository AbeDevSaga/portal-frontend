# InputSearch BaseURL Configuration

The `inputSearch` field type now supports a custom `baseUrl` property that allows you to override the default environment variable base URL for API calls.

## Usage

### 1. Using Custom Base URL

```typescript
{
    type: "inputSearch",
    key: "hospitalNotificationId",
    label: "Hospital Notification ID",
    inputSearchConfig: {
        isExternal: true,
        baseUrl: "https://api.example.com", // Custom base URL
        apiEndpoint: "/resident/residents",
        method: "GET",
        searchKey: "search",
        valueKey: "id",
        labelKey: "name",
        // ... other config
    }
}
```

**Result:** API calls will be made to `https://api.example.com/resident/residents`

### 2. Using Environment Variable (Default Behavior)

```typescript
{
    type: "inputSearch",
    key: "hospitalNotificationId",
    label: "Hospital Notification ID",
    inputSearchConfig: {
        isExternal: true,
        // baseUrl not specified - will use NEXT_PUBLIC_CRRSA_BACKEND_API_URL
        apiEndpoint: "/resident/residents",
        method: "GET",
        // ... other config
    }
}
```

**Result:** API calls will be made to `${process.env.NEXT_PUBLIC_CRRSA_BACKEND_API_URL}/resident/residents`

### 3. Using Local API Routes

```typescript
{
    type: "inputSearch",
    key: "localSearch",
    label: "Local Search",
    inputSearchConfig: {
        isExternal: false, // Local API route
        apiEndpoint: "search/users", // Will become /api/search/users
        method: "GET",
        // ... other config
    }
}
```

**Result:** API calls will be made to `/api/search/users`

## Priority Order

1. **Custom baseUrl** (if specified in inputSearchConfig)
2. **Environment variable** (NEXT_PUBLIC_CRRSA_BACKEND_API_URL)
3. **Local API route** (/api/...)

## Examples

### External API with Custom Base URL
```typescript
inputSearchConfig: {
    isExternal: true,
    baseUrl: "https://jsonplaceholder.typicode.com",
    apiEndpoint: "/users",
    method: "GET",
    searchKey: "q",
    valueKey: "id",
    labelKey: "name"
}
```

### External API with Environment Variable
```typescript
inputSearchConfig: {
    isExternal: true,
    // baseUrl not specified - uses NEXT_PUBLIC_CRRSA_BACKEND_API_URL
    apiEndpoint: "/resident/residents",
    method: "GET",
    searchKey: "search",
    valueKey: "id",
    labelKey: "name"
}
```

### Local API Route
```typescript
inputSearchConfig: {
    isExternal: false,
    apiEndpoint: "search/residents",
    method: "GET",
    searchKey: "q",
    valueKey: "id",
    labelKey: "name"
}
```

## Benefits

1. **Flexibility**: Use different base URLs for different fields
2. **Environment Independence**: Override environment variables when needed
3. **Backward Compatibility**: Existing configurations continue to work
4. **Multiple APIs**: Connect to different external services from the same form

## Notes

- The `baseUrl` property only affects external API calls (`isExternal: true`)
- Local API routes (`isExternal: false`) always use `/api/` prefix
- If `baseUrl` is not specified, the system falls back to the environment variable
- The `baseUrl` should not include trailing slashes (they are automatically handled)
- The `apiEndpoint` should not include leading slashes (they are automatically handled)
