import { useState, useEffect } from 'react';

/**
 * @typedef Permission
 * @property {'granted'|'denied'|'prompt'} state
 * @property {boolean} isLoading
 * @property {boolean} isGranted
 * @property {boolean} isDenied
 * @property {boolean} isPrompt
 * @property {Error} error
 * @property {boolean} isError
 */

/**
 * @param {string} name - The name of the API whose permissions you want to query.
 * @param {boolean} [userVisibleOnly=false] - https://developer.mozilla.org/en-US/docs/Web/API/Permissions/query
 * @param {boolean} [sysex=false] - https://developer.mozilla.org/en-US/docs/Web/API/Permissions/query
 * @param {boolean} [enabled=true] - Should query permission?
 * @return {Permission}
 */
export function usePermission({
    name,
    userVisibleOnly = false,
    sysex = false,
    enabled = true,
}) {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [state, setState] = useState();

    useEffect(() => {
        if (!(name && enabled)) return;

        if (!navigator?.permissions?.query) {
            setIsLoading(false);
            setError(new Error('navigator.permissions.query is not available'));
        }

        let didCancel = false;
        (async function getPermissionStatus() {
            setIsLoading(true);
            try {
                const permissionStatus = await navigator.permissions.query({
                    name,
                    userVisibleOnly,
                    sysex,
                });
                permissionStatus.onchange = function updatePermissionStatus() {
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
    }, [name, userVisibleOnly, sysex, enabled]);

    return {
        isLoading,
        state,
        isGranted: state === 'granted',
        isDenied: state === 'denied',
        isPrompt: state === 'prompt',
        error,
        isError: Boolean(error),
    };
}
