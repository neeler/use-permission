# usePermission

This React hook enables simple hook-based interaction with the browser Navigator Permissions API.

Easily check the status of a permission grant from a user for a particular API.

See MDN for detailed docs on the Permissions API: https://developer.mozilla.org/en-US/docs/Web/API/Permissions

## tldr;

```
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
    } = usePermission({ name: 'microphone' });

    return <>...</>;
}
```

## Safari users

¯\_(ツ)_/¯

https://developer.mozilla.org/en-US/docs/Web/API/Permissions/query#browser_compatibility