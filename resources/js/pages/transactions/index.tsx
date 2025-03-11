import Container from '@/components/container';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Rep, Transaction } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { AlertCircle } from 'lucide-react';
import CreateDialog from './create-transaction-dialog';
import { SearchDialog } from './search-dialog';
import TransactionsTable from './transactions-table';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Transactions',
        href: '/transactions',
    },
];

interface Props {
    reps: Rep[];
    transactions: Transaction;
    message: string;
}

const Index = ({ reps, transactions, message }: Props) => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Transactions" />
            <Container>
                <div className="flex items-center gap-x-2">
                    <CreateDialog reps={reps} />
                    <SearchDialog reps={reps} />
                    <Link className="rounded-lg bg-amber-700 px-6 py-2 text-sm text-white" href={route('transactions.index')}>
                        Reset
                    </Link>
                </div>
                {message && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{message}</AlertDescription>
                    </Alert>
                )}
                <TransactionsTable reps={reps} transactions={transactions} />
            </Container>
        </AppLayout>
    );
};

export default Index;
