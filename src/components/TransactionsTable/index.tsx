import { Container } from "./styles";

import { useTransactions } from '../../hooks/useTransactions';

export function TransactionsTable(){

    const { transactions } = useTransactions()


    return (
        <Container>
            <table>
                <thead>

                    <tr>
                        <th>Título</th>
                        <th>Valor</th>
                        <th>Categoria</th>
                        <th>Data</th>
                    </tr>

                </thead>

                <tbody>
                
                    {transactions.map(transaction => (
                        
                        <tr key={transaction.id} >

                            <td>{transaction.title}</td>

                            <td className={transaction.type}> 
                                {new Intl.NumberFormat('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL'
                                } ).format(transaction.amount) } 
                            </td>

                            <td> {transaction.category} </td>
                            
                            <td>
                                {new Intl.DateTimeFormat('pt-BR').format(
                                    new Date(transaction.createdAt)
                                ) }
                            </td>
                        </tr>
                        
                    ))}

                </tbody>
            </table>
        </Container>
    )
}

/*
    para cada uma das transaction ...

    {transactions.map(transaction => (
                        
        <tr key={transaction.id} > key = cara uma terá uma key única, no caso o id
            <td>{transaction.title}</td>
            <td className={transaction.type}> {transaction.amount} </td>
            <td> {transaction.category} </td>
            <td> {transaction.createdAt} </td>
        </tr>
        
    ))}
*/