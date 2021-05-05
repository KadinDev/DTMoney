import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import totalImg from '../../assets/total.svg'
import { useTransactions } from '../../hooks/useTransactions'

import { Container } from "./styles";

export function Summary() {

    const { transactions } = useTransactions()
    
    // reduce = passar pelas transações e calcular um total
    // acc = acumulator
    const summary = transactions.reduce(( acc, transaction ) => {
        if (transaction.type === 'deposit') {
            // somar ele
            acc.deposit += transaction.amount;
            
            // se for deposito soma ao total
            acc.total += transaction.amount;
        } else {
            acc.withdraw += transaction.amount;

            // se for retirada subtrai ao total
            acc.total -= transaction.amount;
        }

        return acc;
    }, {
        deposit: 0,
        withdraw: 0,
        total: 0,
    } )

    return (
        <Container>

            <div>
                <header>
                    <p>Entradas</p>
                    <img src={incomeImg} alt="Entradas"/>
                </header>

                <strong>
                    {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    } ).format(summary.deposit) } 
                </strong>
            </div>

            <div>
                <header>
                    <p>Saídas</p>
                    <img src={outcomeImg} alt="Saídas"/>
                </header>

                <strong>
                    -
                    {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    } ).format(summary.withdraw) }
                </strong>
            </div>

            <div className="highLight-background">
                <header>
                    <p>Total</p>
                    <img src={totalImg} alt="Total"/>
                </header>

                <strong>
                    {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    } ).format(summary.total) }
                </strong>
            </div>

        </Container>
    )
}