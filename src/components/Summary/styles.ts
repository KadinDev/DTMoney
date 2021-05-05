
import styled from 'styled-components'

export const Container = styled.div `
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    max-width: 1120px;
    margin: -10rem auto 0 auto;

    div {
        background: var(--shape);
        padding: 1.5rem 2rem;
        border-radius: 0.25rem;
        color: var(--text-title);

        header {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        strong {
            /* por padrão o strong vem com display inline, por ser assim o margin-top
            não funciona, precisa mudar ele para display block */
            
            display: block;
            margin-top: 1rem;
            font-size: 2rem;
            line-height: 3rem;
            font-weight: 500;
        }

        &.highLight-background {
            background: var(--green);
            color: #FFF;
        }
    }
`