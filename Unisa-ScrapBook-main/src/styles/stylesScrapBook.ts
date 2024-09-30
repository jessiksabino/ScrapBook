import styled from 'styled-components'

export const Container = styled.div`
    width: 100%;
    height: calc(100vh - 80px);
    max-width: 1024px;
    margin:0 auto;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
export const Content = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: left;
    gap: 15px;
    flex-direction: column;
`
export const Chat = styled.div`
    width: 100%;
    min-height: 90%;
    max-height: 90%;
    border: 1px solid #c21717;
    border-radius: 8px;
    gap: 15px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    overflow-y: scroll;
    
        @media (max-width:500px) {
            padding: 10px;
        }
`
export const SingleCard = styled.div`
    background-color: transparent;
    max-width: 100%;
    width: 100%;
    display: flex;
    border-radius: 8px;

    .messageContent{
        width: 50%;
        background-color: #fafafa;
        border-radius: 8px;
        padding: 15px;
        display:flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        overflow: hidden;

        img{
            object-fit: cover;
            max-width: 98%;
            width: auto;
            border-radius: 2px;
            max-height: 600px;
            height: auto;
            object-fit: contain!important;;
        }
        p{
            font-size: 25px;
            margin-top: 20px;
        }
        .trashCont{
            width: 100%;
            display: flex;
            justify-content: space-between;
            padding-bottom:10px;
            svg{
                cursor: pointer;
            }
            p.date{
                font-size: 15px;
                margin: 0;
                padding: 0;
                color: gray;
                font-weight: 600;
            }
        }
        p.name{
            font-size: 16px;
            color: gray;
            font-weight: 600;
        }
        
        @media (max-width:800px) {
            width: 70%;
        }
        @media (max-width:600px) {
            width: 80%;
        }
        @media (max-width:500px) {
            width: 100%;
        }
        
    }
    
`
export const Form = styled.form`
    height: 10%;
    width: 100%;
    display: flex;
    flex-direction: row;
    gap:10px;
    position: relative;
    border: 1px solid #c21717;
    border-radius: 8px;
    *{
        border-radius: 8px;
    }

    input{
        width: 65%;
        border: none;
        outline: none;
        font-size: 22px;
        color: #fafafa;
        padding: 0 10px;
        background-color: transparent;
            @media (max-width: 550px){
                font-size: 18px!important;
            }
            @media (max-width: 480px){
                font-size: 16px!important;
            }

        &::placeholder
        {
            color: #fafafa;
        }
    }
    button{
        width: 20%;
        font-size: 22px;
        font-weight: bold;
        cursor: pointer;
        background-color:transparent;
        border-left: 1px solid #c21717;
    }
    .file{
        width: 15%;
        flex-wrap: wrap;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        overflow: hidden;
        background-color: transparent;
        border-left: 1px solid #c21717;
        border-right: 1px solid #c21717;
        align-items: center;
        justify-content: center;
        flex-direction: row;
        input{
            display: none;
        }
        
        label{
            color: white;
            cursor: pointer;
            text-align: center;
        }
        p{
            color: white;
            width: 100%;
            text-align: center;
            font-size: 8px;
            @media (max-width: 550px){
                font-size: 7px!important;
            }
            @media (max-width: 480px){
                font-size: 6px!important;
            }

        }
        

    }
`

export const Progress = styled.div`
    display: block;
    width: 100%;
    height: 9px;
    position: absolute;
    top:-12px;
    border: 1px solid #c21717;
    .progress{
        height: 100%;
        background-color: #c21717;
        transition: all 0.5s linear;
    }
`
