import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    :root {
        --background: #F0F2F5;
        --red: #E52E4D;
        --blue: #5429CC;
        --green: #33CC95;

        --blue-light: #6933FF;

        --text-title: #363F5F;
        --text-body: #969CB3;

        --shape: #FFFFFF;
    }
    
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    // font-size: 16px (desktop)
    html {
        // quando a tela for até 1080px
        @media (max-width: 1080px){
            font-size: 93.75%; // resultado = 15px
            /* usamos em %, para respeitar de acordo como o usuário
               estiver configurado seu aparelho, seja mobile ou desktop
            */
        }

        // quando for menor que 720px
        @media (max-width: 720) {
            font-size: 87.5% // resultado = 14px
        }
    }

    body {
        background: var(--background);
        -webkit-font-smoothing: antialiased; // detalhe para fonts ficarem mais nítidas
    }

    body,
    input,
    textarea,
    button {
        font-family: 'Poppins', sans-serif;
        font-weight: 400;
    }

    h1, h2, h3, h4, h5, strong {
        font-weight: 600;
    }

    button {
        cursor: pointer;
    }
    
    // tudo que estiver desabilitado na aplicação
    [disabled] {
        opacity: 0.6;
        cursor: not-allowed; // plaquinha de não permitido rs
    }


    .react-modal-overlay {
        background: rgba(0, 0, 0, 0.5);
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;

        display: flex;
        align-items: center;
        justify-content: center;

    }

    .react-modal-content {
        width: 100%;
        max-width: 576px;

        background: var(--background);
        padding: 3rem;
        position: relative;
        border-radius: 0.25rem; // == 4px


        
    }


    .react-modal-close {
        position: absolute;
        right: 1.5rem;
        top: 1.5rem;
        border: 0;
        background: transparent;;
        transition: filter 0.2s;
        
        &:hover {
            filter: brightness(0.8)
        }
    }
`
