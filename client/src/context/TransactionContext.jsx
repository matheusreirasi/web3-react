import React, { useEffect, useState } from "react";
import {ethers} from "ethers"

import {contractABI, contractAddress} from "../utils/constants"

export const TransactionContext = React.createContext()

const {ethereum} = window

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer)

    console.log({
        provider, signer, transactionContract
    })
}

export const TransactionProvider = ({children}) => {
    const [currentAccount, setCurrentAccount] = useState()
    const [formData, setFormData] = useState({addressTo:"", amount:"", keyword:"", message:""})

    const handleChange = (e, name) => {
        setFormData((prevState) => ({...prevState, [name]: e.target.value}))
    }

    const isMetamaskInstalled = async () => {
        try{
            if (!ethereum) return alert ("No Metamask found. Please install it!")
    
            const accounts = await ethereum.request({method: "eth_accounts"})
    
            if (accounts.length) {
                console.log(accounts[0])
                setCurrentAccount(accounts[0])
    
                //getAllTransactions()
            } else {
                console.log("No accounts found")
            }
        } catch (err) {
            console.error(err.message)

            throw new Error("No ethereum object")
        }

    }

    const connectWallet = async () => {
        try{
            if (!ethereum) return alert ("No Metamask found. Please install it!")

            const accounts = await ethereum.request({method:"eth_requestAccounts"})

            setCurrentAccount(accounts[0])

        } catch(err) {
            console.error(err.message)

            throw new Error("No Ethereum object")
        }
    }

    const sendTransaction = async () => {
        try {
            if (!ethereum) return alert ("No Metamask found. Please install it!")

            const {addressTo, amount, keyword, message} = formData
            getEthereumContract()

        } catch(err) {
            console.log(err.message)
            throw new Error("No Ethereum object")
        }
    }

    useEffect(() => {
        isMetamaskInstalled()
    }, [])


    return (
        <TransactionContext.Provider value={{connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction}}>
            {children}
        </TransactionContext.Provider>
    )
}