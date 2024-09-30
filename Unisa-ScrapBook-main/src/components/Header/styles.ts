import styled from 'styled-components'

export const Header = styled.header`
    width: 100%;
    margin: 0 auto;
    height: 70px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #c21717;
`
export const Container = styled.div`
    width: 100%;
    max-width: 1024px;
    margin: 0 auto;
    padding: 0 18px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    a{
        text-decoration: none;
    }

`
export const Title = styled.h1`
    color: #fff;
    display: flex;
    span{
        color:#c21717;
        font-size: 20px;
        display: flex;
        align-items: center;
        margin-left: 5px;
    }

`
export const Infos = styled.div`
    display: flex;
    align-items: center;
    p{
        color: #fff;
        font-size: 18px;
        @media (max-width:390px) {
            display: none;
        }
    }
    img{
      width:35px;  
      cursor: pointer;
      margin-left: 10px;
    }
    button{
        background-color: transparent;
        border: 0;
        outline: none;
        padding: 10px;
        margin-left: 10px;
        cursor: pointer;
        text-transform: uppercase;
    }
`