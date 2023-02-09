import React,{ useContext,useState } from "react";
import { ExpenseContext } from "../context/GlobalState";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Modal } from "react-bootstrap";
import { addDoc,collection } from "firebase/firestore";
import { db } from "../firebase-config";


export const AddExpenseForm = () => {
    const { addExpense } = useContext(ExpenseContext);
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState(0);
    const [item, setItem] = useState('');
    const [note,setNote] = useState('');
    const { expenses,setCurrentExpense} = useContext(ExpenseContext);
    const expensesCollectionRef = collection(db,"expenses")

    const handleSubmit = (e) => {
      e.preventDefault();
      addExpense({
        id: expenses.length + 1,
        Category:category,
        Amount :amount,
        Entity: item,
        Notes: note,
      });
      const createExpense = async () => {
        await addDoc(expensesCollectionRef,{
          Category:category,
          Amount :amount,
          Entity: item,
          Notes: note
        });
      }
      createExpense();
      setCurrentExpense(prevState => prevState+Math.abs(amount));
      setCategory('');
      setAmount(0);
      setItem('');
      setNote('');
    };
    const [show, setShow] = useState(false);
    const handleClose = () => {
      setShow(false);
      handleSubmit();
    }
     const handleShow = () => setShow(true);

    const categories = ["Food", "Transportation", "Entertainment", "Shopping", "Rent", "Utilities", "Health", "Insurance", "Travel", "Other"];
  
    return (
      <div className="mx-4">
      <Button className="mx-4" variant="primary" onClick={() => handleShow()}>Add Expense</Button>
      <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
      <Modal.Title>Add Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form className="w-75 mx-5" onSubmit={handleSubmit}>
      <Form.Group>
      <Form.Label><strong>Category</strong></Form.Label>
      <Form.Select onChange={(e) => setCategory(e.target.value)} aria-label="Category">
        <option>Category</option>
        {categories.map((category) => (
          <option key={category} value={category}>{category}</option>
        ))}
      </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="amount">
        <Form.Label><strong>Amount</strong></Form.Label>
        <Form.Control value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="item">
        <Form.Label><strong>Entity</strong> </Form.Label>
        <Form.Control value={item} onChange={(e) => setItem(e.target.value)} placeholder="Item" />
      </Form.Group>

      <InputGroup>
        <InputGroup.Text><strong>Add Notes</strong></InputGroup.Text>
        <Form.Control value={note} onChange={(e) => setNote(e.target.value)} as="textarea" aria-label="Add Notes" />
      </InputGroup>
      <br />

      <Button variant="primary" type="submit" onClick={handleClose}>
        AddExpense
      </Button>
    </Form>
      </Modal.Body>
    </Modal>
    </div>
    );
  }