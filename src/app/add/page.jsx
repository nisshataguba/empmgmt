"use client"
import React, { useState } from 'react'

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import axios from 'axios';
import { useRouter } from 'next/navigation'; 
import Alert from '@mui/material/Alert';


function AddEmployee() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [salary, setSalary] = useState('');
  const [age, setAge] = useState('');

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [msg, setMessage] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();

     const newEmployee = {
      name: name,
      salary: salary,
      age:age,
    }; 
    try {  
      const response = await axios.post(
        'https://dummy.restapiexample.com/api/v1/create',
        newEmployee
      );
      console.log(response.status)
      if (response.status === 200) {
         console.log(response)
        setShowSuccessAlert(true) 
        router.push('/view');
      }
    } catch (error) {
      console.error('Error adding employee:', error);
      setShowErrorAlert(true)
      setMessage(error)
     }
  };


  return (
    <div className='text-center'>
        <h1>Add Employee</h1>
        <Container maxWidth="lg" >
          <Card>
          {showSuccessAlert && (
            <Alert severity="success" onClose={() => setShowSuccessAlert(false)}>
              Success Insert
            </Alert>
          )}

          {showErrorAlert && (
            <Alert severity="error" onClose={() => setShowErrorAlert(false)}>
              Failed Insert  - ({msg})
            </Alert>
          )}

            <CardContent>
            <Box mt={2}c>
              <form onSubmit={handleSubmit} >
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <TextField
                      label="Employee Name"
                      name="name"
                      value={name} onChange={(e) => setName(e.target.value)}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Employee Salary"
                      name="salary"
                      value={salary} onChange={(e) => setSalary(e.target.value)}
                      type="number"
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Employee Age"
                      name="age"
                      value={age} onChange={(e) => setAge(e.target.value)} 
                      type="number"
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" variant="outlined" >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Box>
            </CardContent>
          </Card>
      </Container>
    </div>
  )
}

export default AddEmployee