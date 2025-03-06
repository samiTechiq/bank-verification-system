import Paginate from '@/components/paginate';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Rep, Transaction } from '@/types';
import EditTransactionDialog from './edit-transaction-dialog';

interface Props {
    reps: Rep[];
    transactions: Transaction;
}
const TransactionsTable = ({ reps, transactions }: Props) => {
    return (
        <>
            <Card>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Time</TableHead>
                                <TableHead>Receipt No</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Rep</TableHead>
                                <TableHead>Created by</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {transactions.data.map((transaction) => (
                                <TableRow key={transaction.id}>
                                    <TableCell className="font-medium">{transaction.date}</TableCell>
                                    <TableCell>{transaction.time}</TableCell>
                                    <TableCell>{transaction.receipt_number ?? 'Not Provided'}</TableCell>
                                    <TableCell>{transaction.name ?? 'Not Provided'}</TableCell>
                                    <TableCell>{transaction.amount}</TableCell>
                                    <TableCell>{transaction.rep.name}</TableCell>
                                    <TableCell>{transaction.user.name}</TableCell>
                                    <TableCell className="text-right">
                                        <EditTransactionDialog reps={reps} transaction={transaction} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Paginate links={transactions.links} />
                </CardContent>
            </Card>
        </>
    );
};

export default TransactionsTable;
