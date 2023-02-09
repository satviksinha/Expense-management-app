import React,{useState,useEffect} from 'react'
import {db} from "../firebase-config"
import {collection,getDocs} from "firebase/firestore"

export const ExpenseContext = React.createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [currentExpense,setCurrentExpense] = useState(216);
  const [displayAmount,setDisplayAmount] = useState(currentExpense);
  const expensesCollectionRef = collection(db,"expenses")


  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  useEffect(() => {
    const getExpenses = async () => {
      const data = await getDocs(expensesCollectionRef);
      //console.log(data)
      setExpenses(data.docs.map((doc) => ({...doc.data(),id:doc.id})))
      //console.log(expenses)
    }
    getExpenses()
  },[])
  useEffect(()=>{
    let dummy = Math.abs(0)
      expenses.forEach(expense=>{
          dummy = dummy + parseInt(expense.Amount)
      })
      //console.log(dummy)
      setCurrentExpense(dummy)
  },[expenses])
  //console.log(expenses)

  return (
    <ExpenseContext.Provider value={{expenses,setExpenses,addExpense,currentExpense,setCurrentExpense,displayAmount,setDisplayAmount }}>
      {children}
    </ExpenseContext.Provider>
  );
}