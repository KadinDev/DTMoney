// createContext me permite compartilhar conteúdo entre os components

// após criado usa-se assim:
// import { useContext } from 'react'
// import { TransactionsContext } from '../../TransactionsContext' - esse componente aqui abaixo

// e -> const data = useContext(TransactionsContext)


import { createContext, useState, useEffect, ReactNode, useContext } from 'react'
import { api } from '../services/api'


interface Transaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
}


// interface para a function createTransaction
/* pode fazer assim:
    interface TransactionInput {
        title: string;
        amount: number;
        type: string;
        category: string;
    }
*/

// interface para a function createTransaction
// ou assim:
/* TransactionInput vai herdar todos os campos de Transaction menos o id e o createdAt
   pois estou Omit(Omitindo) ambos
*/
type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>


interface TransactionsProviderProps {
    children: ReactNode; // ReactNode aceita qualquer conteúdo válido pelo React
}


interface TransactionsContextData {
    transactions: Transaction[]; // var devolver um array de transaction

    // função createTransaction, ela vai receber por params uma transaction
    // do tipo transactionInput, e vai devolver uma void 

    // como toda function async retorna uma Promise, coloca por volta do void aqui
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData 
    // modo para "enganar" o javascript
    // digo que o objeto tem sim o formato TransactionsContextData
);


/*
    esse {children} me faz permitir passar conteúdo para dentro do
    TransactionsContext.Provider, que está sendo exibido no App.tsx
    dentro do TransactionsContext.Provider eu passo o {children}
    o conteúdo que estou passando para dentro dele é o do App.tsx
*/
export function TransactionsProvider( {children} : TransactionsProviderProps) {
    // meu estado armazena um array de transactions / useState<Transaction[]         
    const [transactions, setTransactions] = useState<Transaction[] > ([])

    useEffect( () => {
        api.get('transactions')
        .then( response => setTransactions(response.data.transactions) )//salvando no estado setTransactions
    }, []);


    // coloca como assíncrona, para funcionar no index do TransactionModal
    // agora essa se torna uma função assíncrona
    async function createTransaction(transactionInput: TransactionInput) {
        // guardando valores digitados dos inputs
        const response = await api.post('/transactions', {
            ... transactionInput,
            createdAt: new Date(),
        } )
        const { transaction } = response.data
        
        setTransactions([
            ... transactions, // aqui são as informações que já estão lá dentro
            transaction // e aqui adiciono uma nova informação juntando com as que já estão
        ])
    }

    return (
        <TransactionsContext.Provider value={ {transactions, createTransaction } }>
            {children}
        </TransactionsContext.Provider>
    )
}

export function useTransactions() {
    const context = useContext(TransactionsContext)

    return context;
}



/*
    criando nosso próprio hooks.
    foi criada a função:

    export function useTransactions() {
    const context = useContext(TransactionsContext)

    return context;
    
    ----------------------------

    agora foi colocado no index.tsx do:
    
    - NewTransactionModal
    - Summary
    - TransactionTable
    
    mudado a const {createTransaction} = useContext(TransactionsContext), para:
    const { createTransaction } = useTransactions()

    e importa ele: import { useTransactions } from '../../hooks/useTransactions';

    ==============
    e no App.tsx
    import { TransactionsProvider } from './hooks/useTransactions'

}
*/