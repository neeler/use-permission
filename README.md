# usePermission

This React hook enables simple hook-based interaction with the browser Navigator Permissions API.

Easily check the status of a permission grant from a user for a particular API.

See MDN for detailed docs on the Permissions API: https://developer.mozilla.org/en-US/docs/Web/API/Permissions

## tldr;

```typescript
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

    return <>...</>;
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
    name: PermissionName;
    state?: PermissionState;
    isLoading: boolean;
    isGranted: boolean;
    isDenied: boolean;
    isPrompt: boolean;
    error?: unknown;
    isError: boolean;
    reset: () => void;
}
```

You can use the `reset()` function to re-trigger the permissions request, for example after an error.
