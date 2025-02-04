# usePermission

This React hook enables simple hook-based interaction with the browser Navigator Permissions API.

Easily check the status of a permission grant from a user for a particular API.

See MDN for detailed docs on the Permissions API: https://developer.mozilla.org/en-US/docs/Web/API/Permissions

## tldr;

```jsx
import { usePermission } from 'use-permission';

function Component() {
    const {
        isLoading,
        state,
        isGranted,
        isDenied,
        isPrompt,
        error,
        isError,
        reset,
    } = usePermission({ name: 'microphone' });

    return <div>My Component</div>;
}
```

## Config Options

```typescript
interface UsePermissionQuery {
    /**
     * The name of the API whose permissions you want to query.
     * Each browser supports a different set of values.
     */
    name: PermissionName;
    /**
     * (Push only, not supported in Firefox)
     * Indicates whether you want to show a notification for every message or be able to send silent push notifications.
     * The default is false.
     * https://developer.mozilla.org/en-US/docs/Web/API/Permissions/query
     */
    userVisibleOnly?: boolean;
    /**
     * (Midi only)
     * Indicates whether you need and/or receive system exclusive messages.
     * The default is false.
     * https://developer.mozilla.org/en-US/docs/Web/API/Permissions/query
     */
    sysex?: boolean;
    /**
     * Should query permission?
     * The default is true.
     */
    enabled?: boolean;
}
```

## Return Type

The hook returns a status object with the following type:

```typescript
interface UsePermissionStatus {
    /**
     * The name of the API whose permissions you want to query.
     * WARNING: Each browser supports a different set of values.
     */
    name: PermissionType;
    /**
     * Status of permission request
     */
    state?: PermissionState;
    /**
     * Is permission request loading?
     */
    isLoading: boolean;
    /**
     * Is permission granted?
     */
    isGranted: boolean;
    /**
     * Is permission denied?
     */
    isDenied: boolean;
    /**
     * Is permission prompt?
     */
    isPrompt: boolean;
    /**
     * Permission request error, if any
     */
    error?: unknown;
    /**
     * Is permission request error?
     */
    isError: boolean;
    /**
     * Request permission request status
     */
    reset: () => void;
}
```

You can use the `reset()` function to re-trigger the permissions request, for example after an error.
