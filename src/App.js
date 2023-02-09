import { ExpenseContext, ExpenseProvider } from './context/GlobalState';
import {ExpenseTable} from './components/ExpenseTable'
import {AddExpenseForm} from './components/AddExpenseForm'
import { Container} from 'react-bootstrap';
import Budget from './components/Budget';
import { useState,useEffect} from 'react';
import { LandingPage } from './components/LandingPage';
import "./App.css";
import ParticlesBg from 'particles-bg'


function App() {
  const [signIn,setSignIn] = useState(false);
  const [username,setUsername] = useState('')
  useEffect(()=> {
     setSignIn(localStorage.getItem("emailVerified"))
     setUsername(localStorage.getItem("name"))
    console.log(signIn)
  },[])

  return (
    <div>
    <ParticlesBg num={200} type="circle" bg={{
      position: "absolute",
      top:'0%',
      zIndex: -1 ,
      width: '100%',
      height: '155%'
    }} />
    <Container>
    { signIn ? 
    <ExpenseProvider>
      <Budget name ={username}/>
      <ExpenseTable />
      <AddExpenseForm />
    </ExpenseProvider>
    :
    <LandingPage/>
    }
    </Container>
    </div>
  );
}

export default App;

