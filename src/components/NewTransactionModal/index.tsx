import { FormEvent, useState } from 'react';

import Modal from 'react-modal'
import { useTransactions } from '../../hooks/useTransactions';

import { api } from '../../services/api';

import closeImg from '../../assets/close.svg'
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'

import { Container, TransactionTypeContainer, RadioBox } from './style'

interface newTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal( {isOpen, onRequestClose}: newTransactionModalProps){
    
    const { createTransaction } = useTransactions();
    
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('');

    const [type, setType] = useState('');


    async function handleCreateNewTransaction(event: FormEvent) {
        event.preventDefault() //preventDefault = prevenir o funcionamento padrão(não fecha o form quando clica no button)
        
        // agora chama aqui passando os dados
        // await = aguardar a criação acontecer
        await createTransaction({
            title,
            amount,
            category,
            type
        })

        // limpando os inputs do Modal
        setTitle('')
        setAmount(0)
        setCategory('')
        setType('')

        // fechar Modal
        // agora vai aguardar createTransaction executar, dando tudo certo fechará o modal
        onRequestClose()
    }
    
    return(
        <Modal 
          isOpen={isOpen}
          onRequestClose={onRequestClose}
          
          overlayClassName={'react-modal-overlay'} //mudando class do modal para estilizar como quiser
          className="react-modal-content" //mudando class do modal para estilizar como quiser
        >
            <button 
                type="button" 
                onClick={onRequestClose} 
                className="react-modal-close"
            >
                <img src={closeImg} alt="Fechar modal"/>
            </button>

            <Container onSubmit={handleCreateNewTransaction}>

                <h2>Cadastrar Transação</h2>

                <input 
                    placeholder="Título"
                    value={title}
                    
                    // dessa forma tem acesso ao valor digitado no input
                    onChange={ event => setTitle(event.target.value) }
                />

                <input 
                    type="number"
                    placeholder="Valor"
                    value={amount}
                    onChange={ event => setAmount(Number(event.target.value))} // convertendo em Numero, pois vem como string.
                />

                <TransactionTypeContainer>

                    <RadioBox
                        type='button'                       
                        onClick={ () => { setType('deposit') } }
                        isActive={type === 'deposit'}
                        activeColor='green'
                    >
                        <img src={incomeImg} alt="Entrada"/>
                        <span>Entrada</span>
                    </RadioBox>

                    <RadioBox
                        type='button'
                        onClick={ () => { setType('withdraw') } }
                        isActive={type === 'withdraw'}
                        activeColor='red'
                    >
                        <img src={outcomeImg} alt="Saída"/>
                        <span>Saída</span>
                    </RadioBox>

                </TransactionTypeContainer>

                <input 
                    placeholder="Categoria"
                    value={category}
                    onChange={ event => setCategory(event.target.value)}
                />

                <button type="submit">
                    Cadastrar
                </button>
                
            </Container>
        </Modal>
    )
}