export interface UsePermissionStatus {
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
