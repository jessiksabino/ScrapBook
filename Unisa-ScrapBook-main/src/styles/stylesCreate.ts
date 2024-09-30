import styled, {keyframes} from 'styled-components'

const loop = keyframes`
    from{
        transform: rotate(0deg);
    }
    to{
        transform: rotate(360deg);
    }

`

export const Container = styled.div`
    width: 100%;
    max-width: 1024px;
    margin:0 auto;
    padding: 30px 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    h1{
        color: white;
        margin-bottom: 20px;
    }
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;

    input{
        outline: none;
        padding: 10px 20px;
        border-radius: 4px;
        border: 1px solid #c21717;
        background-color: transparent;
        color: white;

        &::placeholder{
            color: white;
        }
    }
    button{
        outline: none;
        padding: 10px 20px;
        border-radius: 4px;
        background-color: #fff;
        color: #0f0f0f;
        margin-top: 20px;
        cursor: pointer;

        &:disabled{
            svg{
                animation: ${loop} 2s infinite linear;
            }
        }
    }
    
    label{
        color: white;
        margin-top: 20px;
    }
    
`