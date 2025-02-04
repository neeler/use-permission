import { PermissionType } from './PermissionType';

export interface UsePermissionStatus {
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
