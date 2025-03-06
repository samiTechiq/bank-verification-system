export interface FlashProps {
    success?: string;
    error?: string;
    info?: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
        permissions: string[];
    };
    flash: FlashProps;
};
