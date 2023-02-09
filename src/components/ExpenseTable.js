import React,{useContext,useState} from 'react'
import { ExpenseContext } from '../context/GlobalState';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { deleteDoc,doc } from 'firebase/firestore';
import { db } from '../firebase-config';

export const ExpenseTable = () => {
    const { expenses,setExpenses,currentExpense,displayAmount,setDisplayAmount } = useContext(ExpenseContext);
    const [selectedCategory, setSelectedCategory] = useState("All");

    const [show, setShow] = useState(false);
    const [selectedNote, setSelectedNote] = useState('');
    const handleClose = () => setShow(false);
    const handleShow = (note) => {
       setSelectedNote(note);
       setShow(true);
    };

    const deleteExpense = async (id) => {
      const userDoc = doc(db,"expenses",id)
      await deleteDoc(userDoc)
    }

    const handleDelete = (id) => {
      setExpenses(expenses.filter((expense) => expense.id !== id))
      deleteExpense(id)
    }

    const handleCategorySelection = (event) => {
      setSelectedCategory(event.target.value);
    };
    let dummy = 0
    if(selectedCategory === "All")
      setDisplayAmount(currentExpense)
    else{
      expenses.forEach((expense,index) => {
        if(expense.Category === selectedCategory){
          dummy = dummy + expense.Amount
        }
      });
      setDisplayAmount(dummy)
    }
    const categories = ["Food", "Transportation", "Entertainment", "Shopping", "Rent", "Utilities", "Health", "Insurance", "Travel", "Other"];
  
    return (
    <div className="my-4 mx-5 w-75">
      <h4 style={{color:'#182c54'}}>Choose Category to filter</h4>
      <Form.Select onChange={handleCategorySelection} className="w-25 mb-4" aria-label="Default select example">
      <option value="All">All</option>
        {categories.map((category) => (
          <option key={category} value={category}>{category}</option>
        ))}
      </Form.Select>
      <h5 className="my-2">Amount Spent : ${displayAmount}</h5>
      <Table style={{background:'#f5f7f2',color:'#02233b',border:'2px solid black',borderRadius:'5px'}} className="my-1" responsive striped bordered hover>
        <thead>
          <tr>
            <th>Category</th>
            <th>Amount</th>
            <th>Entity</th>
            <th>Notes</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {expenses.filter((expense) => selectedCategory === "All" || expense.Category === selectedCategory)
          .map((expense) => (
            <tr key={expense.id} style={{}}>
              <td>{expense.Category}</td>
              <td>${expense.Amount}</td>
              <td>{expense.Entity}</td>
              <td>
              <Button variant="primary" onClick={() => handleShow(expense.Notes)}>Show note</Button>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                  <Modal.Title>See Note</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>{selectedNote}</Modal.Body>
                  <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  </Modal.Footer>
                </Modal>
              </td>
              <td>
              <Button onClick={() => handleDelete(expense.id)} style={{backgroundColor:'red',marginLeft:'2em'}}>X</Button>
              </td>
            </tr>
            ))}
        </tbody>
      </Table>
    </div>
    );
  }
