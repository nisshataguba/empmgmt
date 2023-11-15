
"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import { Avatar } from '@mui/material';
import Alert from '@mui/material/Alert'; 
import Link from 'next/link';
import useEmployeeStore from '../components/employeeStore';
import Button from '@mui/material/Button';

function stringAvatar(name) {
  return {
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

function ViewEmployees() {
  const router = useRouter();
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [msg, setMessage] = useState('');
  const employees = useEmployeeStore((state) => state.employees);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);


  useEffect(() => {
     axios
      .get('https://dummy.restapiexample.com/api/v1/employees')
      .then((response) => {
        useEmployeeStore.setState({ employees: response.data.data });
       })
      .catch((error) => {
        console.error('Error fetching employees:', error); 
      });
  }, []);
 
  const handleDelete = async (employeeId) => {
    try {
      const response = await axios.delete(
        `https://dummy.restapiexample.com/api/v1/delete/${employeeId}` 
      );
      if (response.status === 200) {
         console.log(response)
        setShowSuccessAlert(true)
        const updatedEmployees = employees.filter((employee) => employee.id !== employeeId);
        useEmployeeStore.setState({ employees: updatedEmployees });
        // useEmployeeStore.setState({ employees: updatedEmployees }); 
      }
    } catch (error) {
      console.error('Error deleting employee:', error); 
      }
  };
 

  return (
    <div className='mt-5'>
       <Container maxWidth="lg">
        <Card>
          {showErrorAlert && (
            <Alert severity="error" onClose={() => setShowErrorAlert(false)}>
              {msg}
            </Alert>
          )}
            {showSuccessAlert && (
            <Alert severity="success" onClose={() => setShowSuccessAlert(false)}>
              Success Deleted
            </Alert>
          )}
          <CardContent>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Salary</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>{employee.id}</TableCell>
                    <TableCell>
                    {employee.employee_name.length > 25
                        ? `${employee.employee_name.substring(0, 25)}...`
                        : employee.employee_name}
                    </TableCell>
                    <TableCell>{employee.employee_salary}</TableCell>
                    <TableCell>{employee.employee_age}</TableCell>
                    <TableCell>
                      {employee.profile_image}
                      <Avatar {...stringAvatar(employee.employee_name)} />
                    </TableCell>
                    <TableCell>
                      <Link href={`/edit/${employee.id}`}><Button className='mr-4' variant="outlined"> Edit</Button></Link>
                      <Button variant="outlined" onClick={() => handleDelete(employee.id)}>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}

export default ViewEmployees;
