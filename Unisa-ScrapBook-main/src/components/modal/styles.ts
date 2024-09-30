import styled from 'styled-components'

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
        justify-content: center;
        margin-top: 20px;
        button.yes{
            background-color: green;
        }
        button.no{
            background-color: #c21717;
        }
        button{
            color: white;
            font-weight: bold;
            padding: 10px;
            border-radius: 8px;
            cursor: pointer;
        }
    }
`