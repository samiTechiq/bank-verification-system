import Container from '@/components/container';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Rep } from '@/types';
import { Head } from '@inertiajs/react';
import CreateDialog from './create-dialog';
import RepsTable from './reps-table';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Reprentatives',
        href: '/reps',
    },
];

const Index = ({ reps }: { reps: Rep[] }) => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Representatives" />
            <Container>
                <div className="flex">
                    <CreateDialog />
                </div>
                <RepsTable reps={reps} />
            </Container>
        </AppLayout>
    );
};

export default Index;
