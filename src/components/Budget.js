import React, { useContext, useState } from 'react'
import { Button,Stack } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { ExpenseContext } from '../context/GlobalState';
import Alert from 'react-bootstrap/Alert';

export default function Budget({name}) {
    const [show,setShow] = useState(false);
    const [alert,setAlert] = useState(false);
    const [budget,setBudget] = useState(1000);
    const handleShow = () => {
        setShow(true);
    }
    const handleClose = () => setShow(false);
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    const {displayAmount} = useContext(ExpenseContext)
    const percentage = Math.min(Math.round((displayAmount/budget)*100),100);
  return (
    <div>
    <div className=" my-4 mx-4">
    <h3 className="mx-4">Welcome {name}</h3>
    </div>
    <Stack style={{display:'flex',justifyContent:'space-between'}} direction="horizontal" gap="2" className="mx-4 my-4 mb-4">
    <div style={{display:'flex',justifyContent:'space-between'}}>
    <h2 className='mx-4'>Budget : ${budget}</h2>
    <Button variant="primary" onClick={() => handleShow()}>Set Budget</Button>
    </div>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
    <h4>Percentage of Budget Spent</h4>
    <div className="mx-4" style={{width:'100px'}}>
    <CircularProgressbar value={percentage} text={`${percentage}%`} />
    </div>
    </div>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        <Modal.Title>See Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form className="w-75 mx-5" onSubmit={handleSubmit}>
                <Form.Group>
                <Form.Label><strong>Add/Modify Budget</strong></Form.Label>
                <Form.Control value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="Budget" />
                </Form.Group>
                <br></br>
                <Button variant="primary" type="submit" onClick={handleClose}>
                Set Budget
                </Button>
            </Form>
        </Modal.Body>
    </Modal>
    </Stack>
    </div>
  )
}
