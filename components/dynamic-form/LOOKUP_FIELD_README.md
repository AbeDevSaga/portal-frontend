# Lookup Field Type

The lookup field type is a new addition to the dynamic form system that allows you to create dropdown fields with options dynamically fetched from API endpoints. This is perfect for scenarios where you need to populate dropdown options from external data sources.

## Features

- **Dynamic API Integration**: Fetches options from configurable API endpoints
- **Debounced Search**: Configurable search delay to reduce API calls
- **Result Caching**: Optional caching for improved performance
- **Customizable Mapping**: Configurable value and label field mappings
- **Error Handling**: Built-in error handling and loading states
- **Search Requirements**: Configurable minimum search length
- **Custom Transformations**: Support for custom response transformation functions

## Basic Usage

### 1. Add to Form Configuration

```typescript
{
    type: "lookup",
    key: "country",
    label: "Country",
    placeholder: "Search for a country...",
    description: "Select your country of residence",
    validators: [
        { type: "required", message: "Country is required" },
    ],
    required: true,
    lookupConfig: {
        apiEndpoint: "countries",
        method: "GET",
        valueKey: "id",
        labelKey: "name",
        searchKey: "name",
        debounceMs: 300,
        minSearchLength: 0,
        cacheResults: true,
    },
}
```

### 2. Configuration Options

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `apiEndpoint` | string | - | The API endpoint to fetch options from |
| `method` | 'GET' \| 'POST' | 'GET' | HTTP method for the API call |
| `valueKey` | string | 'id' | Field name in API response to use as value |
| `labelKey` | string | 'name' | Field name in API response to use as label |
| `searchKey` | string | 'name' | Field name to search against |
| `debounceMs` | number | 300 | Search debounce delay in milliseconds |
| `minSearchLength` | number | 0 | Minimum characters required before searching |
| `cacheResults` | boolean | true | Whether to cache API results |
| `transformResponse` | function | - | Custom function to transform API response |

## Advanced Configuration

### Custom Response Transformation

If your API returns data in a different format, you can use a custom transformation function:

```typescript
{
    type: "lookup",
    key: "customField",
    label: "Custom Field",
    lookupConfig: {
        apiEndpoint: "custom-endpoint",
        transformResponse: (data) => {
            return data.items.map(item => ({
                label: `${item.firstName} ${item.lastName}`,
                value: item.userId
            }));
        }
    }
}
```

### Different API Methods

```typescript
// GET request
{
    lookupConfig: {
        apiEndpoint: "countries",
        method: "GET"
    }
}

// POST request with body
{
    lookupConfig: {
        apiEndpoint: "search-users",
        method: "POST",
        requestBody: {
            active: true,
            role: "user"
        }
    }
}
```

### Search Behavior Configuration

```typescript
{
    lookupConfig: {
        apiEndpoint: "hospitals",
        debounceMs: 500,        // Wait 500ms after user stops typing
        minSearchLength: 3,     // Require at least 3 characters
        cacheResults: false     // Don't cache results (always fresh data)
    }
}
```

## Mock API Service

For development and testing, a mock API service is provided with the following endpoints:

- **countries**: List of countries with codes and regions
- **regions**: Ethiopian regions with population data
- **hospitals**: Hospitals in Addis Ababa with types
- **religions**: Religious affiliations with follower counts
- **occupations**: Job categories with income levels
- **education-levels**: Education levels with years and categories

### Using Mock API

```typescript
import { mockApiService } from "@/utils/mockApiService";

// Direct function calls
const countries = await mockApiService.getCountries();
const regions = await mockApiService.getRegions({ country: "ET" });

// Generic lookup
const results = await mockApiService.lookup("countries", { search: "Eth" });
```

## Real API Integration

When you're ready to use real APIs, simply replace the mock service calls with actual HTTP requests:

```typescript
// In your API service
export const realApiService = {
    async lookup(endpoint: string, params: any) {
        const response = await fetch(`/api/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params)
        });
        
        if (!response.ok) {
            throw new Error(`API call failed: ${response.statusText}`);
        }
        
        return response.json();
    }
};
```

## Performance Considerations

### Caching Strategy

- **Enabled by default**: Results are cached in sessionStorage
- **Cache key format**: `${apiEndpoint}_${searchTerm}`
- **Cache invalidation**: Automatically handled per search term

### Debouncing

- **Default delay**: 300ms
- **Configurable**: Adjust based on your API performance
- **User experience**: Prevents excessive API calls while typing

### Search Requirements

- **Minimum length**: Configure to reduce unnecessary API calls
- **Example**: Set `minSearchLength: 2` for better performance

## Error Handling

The lookup field automatically handles:

- **Network errors**: Displays error messages to users
- **Loading states**: Shows loading indicators during API calls
- **Empty results**: Provides appropriate "no results" messages
- **Validation errors**: Integrates with Formik validation

## Examples

### Simple Country Selection

```typescript
{
    type: "lookup",
    key: "country",
    label: "Country",
    required: true,
    lookupConfig: {
        apiEndpoint: "countries"
    }
}
```

### Advanced Hospital Search

```typescript
{
    type: "lookup",
    key: "hospital",
    label: "Hospital",
    description: "Search for hospitals in your area",
    lookupConfig: {
        apiEndpoint: "hospitals",
        debounceMs: 500,
        minSearchLength: 3,
        cacheResults: true
    }
}
```

### Custom Response Format

```typescript
{
    type: "lookup",
    key: "user",
    label: "User",
    lookupConfig: {
        apiEndpoint: "users",
        transformResponse: (data) => 
            data.users.map(user => ({
                label: `${user.name} (${user.email})`,
                value: user.id
            }))
    }
}
```

## Migration from Select Fields

If you're currently using static select fields, you can easily migrate to lookup fields:

### Before (Static Options)

```typescript
{
    type: "select",
    key: "country",
    label: "Country",
    options: [
        { label: "Ethiopia", value: "ET" },
        { label: "United States", value: "US" }
    ]
}
```

### After (Dynamic Lookup)

```typescript
{
    type: "lookup",
    key: "country",
    label: "Country",
    lookupConfig: {
        apiEndpoint: "countries"
    }
}
```

## Troubleshooting

### Common Issues

1. **Options not loading**: Check API endpoint and network connectivity
2. **Search not working**: Verify `searchKey` matches API response structure
3. **Performance issues**: Adjust debounce delay and enable caching
4. **Type errors**: Ensure `valueKey` and `labelKey` exist in API response

### Debug Mode

Enable console logging to debug API calls:

```typescript
// In your API service
console.log('API Request:', { endpoint, params });
console.log('API Response:', response);
```

## Best Practices

1. **Use appropriate debounce delays** based on your API performance
2. **Implement proper error handling** in your API endpoints
3. **Cache results** when data doesn't change frequently
4. **Set minimum search lengths** to reduce unnecessary API calls
5. **Provide meaningful placeholders** and descriptions
6. **Test with various network conditions** and error scenarios

## Future Enhancements

Planned features for upcoming versions:

- **Pagination support** for large datasets
- **Multi-select lookup fields**
- **Dependent lookup fields** (cascading dropdowns)
- **Advanced filtering options**
- **Real-time updates** via WebSocket
- **Offline support** with local storage fallback

