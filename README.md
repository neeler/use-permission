# usePermission

This React hook enables simple hook-based interaction with the browser Navigator Permissions API.

Easily check the status of a permission grant from a user for a particular API.

See MDN for detailed docs on the Permissions API: https://developer.mozilla.org/en-US/docs/Web/API/Permissions

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
