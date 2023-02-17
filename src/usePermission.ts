import { useState, useEffect, useCallback } from 'react';
import { UsePermissionStatus } from './UsePermissionStatus';

export interface UsePermissionQuery {
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

export function usePermission({
    name,
    userVisibleOnly = false,
    sysex = false,
    enabled = true,
}: UsePermissionQuery): UsePermissionStatus {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<unknown>(undefined);
    const [state, setState] = useState<PermissionState | undefined>();

    const requestPermission = useCallback(
        ({ name, userVisibleOnly, sysex, enabled }: UsePermissionQuery) => {
            if (!(name && enabled)) {
                return undefined;
            }
            if (navigator?.permissions?.query) {
                let didCancel = false;
                (async function getPermissionStatus() {
                    setIsLoading(true);
                    try {
                        const permissionStatus =
                            await navigator.permissions.query({
                                name,
                                // @ts-ignore - This is not supported in Firefox.
                                userVisibleOnly,
                                sysex,
                            });
                        permissionStatus.onchange =
                            function updatePermissionStatus() {
                                if (!didCancel) {
                                    setState(this.state);
                                }
                            };
                        if (!didCancel) {
                            setState(permissionStatus.state);
                        }
                    } catch (error) {
                        if (!didCancel) {
                            setError(error);
                        }
                    }
                    if (!didCancel) {
                        setIsLoading(false);
                    }
                })();
                return () => {
                    didCancel = true;
                };
            } else {
                setIsLoading(false);
                setError(
                    new Error('navigator.permissions.query is not available'),
                );
                return undefined;
            }
        },
        [],
    );

    useEffect(
        () => requestPermission({ name, userVisibleOnly, sysex, enabled }),
        [name, userVisibleOnly, sysex, enabled],
    );

    const reset = useCallback(() => {
        requestPermission({ name, userVisibleOnly, sysex, enabled });
    }, [name, userVisibleOnly, sysex, enabled]);

    return {
        name,
        isLoading,
        state,
        isGranted: state === 'granted',
        isDenied: state === 'denied',
        isPrompt: state === 'prompt',
        error,
        isError: Boolean(error),
        reset,
    };
}
