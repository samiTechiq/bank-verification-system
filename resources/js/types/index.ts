import '@inertiajs/inertia';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    url: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface Flash {
    success?: string;
    error?: string;
    info?: string;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Rep {
    id: string;
    name: string;
    status: string;
    user: User;
    created_at: string;
    updated_at: string;
}

export interface Transaction {
    data: {
        id: number;
        date: string;
        time: string;
        receipt_number: string;
        name: string;
        amount: number;
        rep: Rep;
        user: User;
    }[];
    links: Links[];
}

export interface TransactionData {
    id: number;
    date: string;
    time: string;
    receipt_number: string;
    name: string;
    amount: number;
    rep: Rep;
    user: User;
}
export interface Links {
    url: string | null;
    label: string;
    active: boolean;
}
