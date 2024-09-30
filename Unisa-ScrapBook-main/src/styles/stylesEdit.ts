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
        display: flex;
        align-items: center;
        svg{
            cursor: pointer;
            margin-left: 10px;
        }
        @media (max-width: 550px) {
            svg{
                min-width: 20px;
                min-height: 20px;
                max-width: 25px;
                min-height: 25px;
            }        
        }
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
    div{ 
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        img{
            max-width: 35%;
            height: auto;
            object-fit: contain;
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

export const ListaUsers = styled.ul`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    list-style: none;
    gap: 10px;
    margin-top: 15px;

    li{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
        background-color: rgba(255,255,255,0.1);
        color: white;
        border-radius: 8px;
        
        svg{
            cursor: pointer;
            transition: color 0.2s;
            margin-left: 10px;
            &:hover{
                color: #c21717;
            }
        }
        @media (max-width: 550px) {
            svg{
                min-width: 15px;
                min-height: 15px;
                max-width: 23px;
                min-height: 23px;
            }        
        }
    }
`
export const BackModal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,0.8)
`
export const Modal = styled.div`
    max-width: 450px;
    height: auto;
    display: flex;
    justify-content: center;
    flex-direction: column;
    background-color: #0f0f0f;
    padding: 30px 10px;
    border-radius: 8px;

    h2{
        color: #fafafa;
        text-align: center;
    }
    div{
        width: 100%;
        display: flex;
        gap: 10px;

        button.yes{
            background-color: green;
        }
        button.no{
            background-color: #c21717;
        }
        button{
            color: white;
            font-weight: bold;
        }
    }
`