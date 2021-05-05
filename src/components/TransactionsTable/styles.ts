
import styled from 'styled-components'

export const Container = styled.div `
    margin: 4rem auto;
    max-width: 1120px;

    table {
        width: 100%;
        border-spacing: 0 0.5rem; // tira o espaçamento das td da table, e colocar espaçamento abaixo separando uma da outra 

        th {
            color: var(--text-body);
            font-weight: 400;
            padding: 1rem 2rem;
            text-align: left;
            line-height: 1.5rem;
        }

        td {
            padding: 1rem 2rem;
            border: 0;
            background: var(--shape);
            color: var(--text-body);
            border-radius: 0.25rem;

            // quando for o primeiro td dos tds
            &:first-child {
                color: var(--text-title)
            }

            &.deposit {
                color: var(--green)
            }

            &.withdraw {
                color: var(--red)
            }
        }
    }
`