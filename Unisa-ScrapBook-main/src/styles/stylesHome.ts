import styled from 'styled-components'
import Link from 'next/link';


export const Container = styled.div`
    width: 100%;
    max-width: 1024px;
    margin:0 auto;
    padding: 10px 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
export const Content = styled.div`
    width: 100%;
    display: flex;
    justify-content: left;
    gap: 15px;
    flex-direction: column;
`
export const ScrapbookSingle = styled.div`
    display: flex;
    width: 100%;
    height: 100px;
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
    }
    .edit{
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 25px;
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
            font-size: 20px;
            line-height: 19px;
        }
        @media (max-width: 450px) {
            font-size: 17px;
            line-height: 16px;
        }
        @media (max-width: 420px) {
            font-size: 15px;
            line-height: 14px;
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
        & + li{
            margin-left:6px;
        }
    }
    
`
export const BtnCriar = styled(Link)`
    border: 0;
    outline: none;
    background-color: #fff;
    color: #0f0f0f!important;
    padding: 13px 34px;
    font-size: 18px;
    text-decoration: none;
    font-weight: 800;
    text-transform: uppercase;
    cursor: pointer;
    margin-top:25px;
`
