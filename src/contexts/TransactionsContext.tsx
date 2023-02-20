import { Children, cloneElement, createContext, ReactNode, useEffect, useState } from 'react'
import { auth, db } from '../config/firebase-config'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { collection, doc, getDocs, query, where, addDoc, setDoc, getDoc, deleteDoc } from 'firebase/firestore'
import { v4 as uuidv4, v4 } from "uuid"
import { useNavigate, useLocation } from 'react-router-dom'
import { async } from '@firebase/util'

interface Transaction {
  income: number
  total: number
  id: number
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
  createdAt: string
}

interface CreateTransactionsInput {
  description: string
  price: number
  cartegory: string
  type: 'income' | 'outcome'
}

interface TransactionContextType {
  transactions: Transaction[]
  fetchTransactions: (query?: string) => Promise<void>
  createTransactios: (data: CreateTransactionsInput) => Promise<void>
  removeTransactions: (id: number) => Promise<void>;
  logout: () => Promise<void>
}

interface TransactiosProviderProps {
  children: ReactNode
}

export const TransactionContext = createContext({} as TransactionContextType)

export function TransactionsProvider({ children }: TransactiosProviderProps) {
  const [transactions, setTransactions] = useState<any>([])
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const auth = getAuth()
  onAuthStateChanged(auth, (user: any) => {
    if (user != null) {
      localStorage.setItem("userEmail", user.email)
    } else {
      localStorage.removeItem("userEmail")

    }
  })
  const userTransactions = collection(db, "userTransactions")
  const docReferencia = doc(userTransactions, `${localStorage.getItem("userEmail")}`)
  const collectionsUser = collection(docReferencia, "transactions")
  let filterData
  let data
  async function fetchTransactions(queryParse?: string) {


    if (queryParse) {
      let queryParseConvert = convertAllTolowCase(queryParse)
      let qPrice = query(collectionsUser, where("price", "==", Number(queryParse)))
      let qType = query(collectionsUser, where("type", "==", queryParse.toLowerCase()))
      let qCartegory = query(collectionsUser, where("cartegory", "==", queryParseConvert.obj.data))
      let qDescription = query(collectionsUser, where("description", "==", queryParseConvert.obj.data))

      const dataPrice = await getDocs(qPrice)
      const filterDatePrice = dataPrice.docs.map((map) => ({ ...map.data() }))

      const dataType = await getDocs(qType)
      const filterDataType = dataType.docs.map((map) => ({ ...map.data() }))


      const dataCartegory = await getDocs(qCartegory)
      const filterDataCartegory: any = dataCartegory.docs.map((map) => ({ ...map.data() }))

      const dataDescription = await getDocs(qDescription)
      const filterDataDescriptiom = dataDescription.docs.map((map) => ({ ...map.data() }))

      if (filterDatePrice.length > 0) {
        return setTransactions(filterDatePrice)
      }
      else if (filterDataType.length > 0) {
        return setTransactions(filterDataType)
      }
      else if (filterDataCartegory.length > 0) {
        return setTransactions(filterDataCartegory)
      }
      else if (filterDataDescriptiom.length > 0) {
        return setTransactions(filterDataDescriptiom)
      }
      else {
        alert("Não encontrei nenhum dado!")
      }
    }


    try {

      if (localStorage.getItem("userEmail")) {
        data = await getDocs(collectionsUser)
        filterData = data.docs.map((map) => ({ ...map.data() }))
        setTransactions(filterData)
      }
    } catch (error) {
      console.log(error)
    }
  }

  function convertAllTolowCase(data:string){
    data = data.toLowerCase();
    data = data.charAt(0).toUpperCase() + data.slice(1);
    
    let obj = {data}
    return {obj}
  }

  function convertLowCase(description:string, cartegory:string) {


    description = description.toLowerCase();
    description = description.charAt(0).toUpperCase() + description.slice(1);
    
    cartegory = cartegory.toLowerCase();
    cartegory = cartegory.charAt(0).toUpperCase() + cartegory.slice(1);
    
    const obj = {
      description,
      cartegory
    }

    return obj
  }

  async function createTransactios(data: CreateTransactionsInput) {
    let { description, price, cartegory, type } = data
    let userId = v4()

    let email = localStorage.getItem("userEmail")

    let obj = convertLowCase(description,cartegory)


    console.log(obj)
    if (email != null) {

      await setDoc(doc(collectionsUser, userId), {
        createdAt: new Date().toISOString(),
        description: obj.description,
        price,
        id: userId,
        cartegory: obj.cartegory,
        type,
      })
    }

    await fetchTransactions()
  }


  async function removeTransactions(id: any) {
    console.log(id)
    const documentId = String(id);
    const documentRef = doc(collectionsUser, documentId);

    await deleteDoc(documentRef)
    const updatedTransactions = transactions.filter(
      (transaction: { id: number; }) => transaction.id !== id,
    )
    setTransactions(updatedTransactions)

  }

  function refresh() {
    filterData = []
    data = {}
  }


  useEffect(() => {
    fetchTransactions()
  }, [])

  async function logout() {
    try {
      let data = await signOut(auth)
      navigate("/login")
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchTransactions()
  }, [currentPath])


  return (
    <TransactionContext.Provider
      value={{
        transactions,
        fetchTransactions,
        createTransactios,
        removeTransactions,
        logout,
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}
