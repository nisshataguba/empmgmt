"use client"
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useRouter, useParams } from 'next/navigation';
import useEmployeeStore from '@/app/components/employeeStore';

function EditEmployee({params}) {
  const router = useRouter();
  const { id } = params
  const [profileImage, setProfileImage] = useState(null);


  const employees = useEmployeeStore((state) => state.employees);
  const updateEmployees = useEmployeeStore((state) => state.updateEmployees);

  const employee = employees.find((e) => e.id === parseInt(id)) || {
    employee_name: '',
    employee_salary: 0,
    employee_age: 0,
  };

  const [name, setName] = useState(employee.employee_name);
  const [salary, setSalary] = useState(employee.employee_salary);
  const [age, setAge] = useState(employee.employee_age);

  const handleSalaryKeyPress = (e) => {
    const key = e.key;
    if (!/^\d$/.test(key) && key !== 'Backspace') {
      e.preventDefault();
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedEmployee = {
      id: employee.id,
      employee_name: name,
      employee_salary: salary,
      employee_age: age,
    };

     const updatedEmployees = employees.map((e) =>
      e.id === updatedEmployee.id ? updatedEmployee : e
    );

     updateEmployees(updatedEmployees);

     router.push('/view');
  };

  return (
    <div className="text-center">
      <h1>Edit Employee</h1>
      <Container maxWidth="lg">
        <Card>
          <CardContent>
            <Box mt={2}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <TextField
                      label="Employee Name"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Employee Salary"
                      name="salary"
                      value={salary}
                      onKeyPress={handleSalaryKeyPress}
                      onChange={(e) => setSalary(e.target.value)}
                      type="number"
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Employee Age"
                      name="age"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      type="number"
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" variant="outlined">
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
  );
}

export default EditEmployee;
