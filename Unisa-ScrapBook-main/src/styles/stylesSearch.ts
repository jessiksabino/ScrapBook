import styled from 'styled-components'

export const Container = styled.div`
    width: 100%;
    max-width: 1024px;
    height: calc(100vh - 70px);
    margin:0 auto;
    padding: 10px 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    overflow: hidden;
`
export const Content = styled.div`
    width: 100%;
    display: flex;
    justify-content: left;
    gap: 15px;
    flex-direction: column;
    height: 100%;
`
export const SearchContent = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    height: 90px;
    input{
        width: 100%;
        border: 0;
        outline: none;
        border-radius: 4px;
        border: 1px solid #c21717;
        padding: 20px 50px;
        background-color: transparent;
        color: white;
        font-size: 17px;
        &::placeholder{
            color: white;
        }
    }
    svg{
        position: absolute;
        left: 10px;
    }
`
export const ResultsContent = styled.div`
    width: 100%;
    display: flex;
    max-height: auto;
    flex-direction: column;
    gap: 15px;
    overflow-y: scroll;
    height: calc(100% - 90px);
    
`
export const ScrapbookSingle = styled.div`
    display: flex;
    width: 100%;
    height: 100px;
    min-height: 100px;
    border: 1px solid #c21717;
    border-radius: 4px;
    flex-direction: row;
    overflow: hidden;
    cursor: pointer;

    img{
        width: auto;
        height: 100%;
        border-right: 1px solid #c21717;
        object-fit: cover;
        max-width: 100px;
        min-width: 100px;
        object-position: center;
        opacity: 0.03;

        filter: grayscale(1);
        -webkit-filter: grayscale(1);
        -moz-filter: grayscale(1);
        -o-filter: grayscale(1);
        -ms-filter: grayscale(1);

    }
    .edit{
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 25px;
        *{
            @media (max-width: 500px) {
                font-size: 18px!important;
            }
            @media (max-width: 450px) {
                font-size: 15px!important;
            }
            @media (max-width: 420px) {
                font-size: 13px!important;
            }
        }
    }
    p{
        color: white;
    }
    a{
        text-decoration: none;
    }
`
export const InfosGP = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin-left: 15px;
    justify-content: center;
    
    h2{
        color: #fff;

        @media (max-width: 500px) {
            font-size: 18px;
            line-height: 17px;
        }
        @media (max-width: 450px) {
            font-size: 15px;
            line-height: 14px;
        }
        @media (max-width: 420px) {
            font-size: 13px;
            line-height: 12px;
        }
    }
`
export const Membros = styled.ul`
    list-style: none;
    display: flex;
    flex-direction: row;
    li{
        color: #b5b5b5;
        font-size: 14px;
        margin-top: 5px;
        & + li{
            margin-left:6px;
        }

        @media (max-width: 500px) {
            font-size: 13px!important;
            line-height: 12px;
        }
        @media (max-width: 450px) {
            font-size: 11px!important;
            line-height: 10px;
        }
        @media (max-width: 420px) {
            font-size: 9px!important;
            line-height: 8px;
        }
    }
    
`

export const PainelAcess = styled.div`
    position: fixed;
    width: 100%;
    height: 100vh;
    background-color: rgba(0,0,0,0.8);
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    div.content{
        max-width: 500px;
        height: auto;
        display: flex;
        justify-content: center;
        flex-direction: column;
        background-color: #0f0f0f;
        padding: 10px 10px;
        border-radius: 8px;
        form{
            display: flex;
            width: 100%;
            justify-content: center;
            flex-direction: column;
            align-items: center;

            button{
                border: 0;
                outline: none;
                background-color: #c21717;
                color: white;
                padding: 10px 20px;
                border-radius: 4px;
                font-size: 20px;
                font-weight: 600;
                margin-top: 5px;
                cursor: pointer;
            }
        }

        svg{
                cursor: pointer;
            }

        .iconContent{
            width: 100%;
            padding-bottom: 10px;

            
        }
        p{
            font-size: 30px;
            color: white;
            width: 100%;
            text-align: center;
            margin-bottom: 20px;
        }

        input{
            outline: none;
            background-color: transparent;
            color: white;
            border: none;
            font-size: 20px;
            padding: 10px;
            &::placeholder{
                color: white;
            }
        }
        .input-wrap{
            display: flex;
            justify-content: space-between;
            align-items: center;
            border: 1px solid #c21717;
            border-radius: 4px;
            margin-bottom: 10px;
            svg{
                margin-right: 10px;
            }
            
        }
       

    }
`