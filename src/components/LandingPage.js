import React from 'react'
import { Button } from 'react-bootstrap'
import {signInWithGoogle} from "../firebase-config"

export  const LandingPage = () => {
  return (
    <div style={{display:'flex',justifyContent:'space-around',height:'90vh',alignItems:'center'}} className="my-4">
    <div >
    <h1 className="mb-2">Expense Management System</h1>
    <div >
    <Button onClick={signInWithGoogle}>Sign In With Google</Button>
    </div>
    </div>
    </div>
  )
}
