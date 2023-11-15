"use client"
import React from 'react'
import {  AppBar, Box, Container, Grid, Toolbar, Typography } from '@mui/material'
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList'; 
import Link from 'next/link';


export default function MainNavigation() { 
 
  return (    
        <div>  
            <Box sx={{ width: '100%', typography: 'body1' }} 
            className="bg-blue-500 text-black"> 
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
               
                    <Link href="/add"><Tab label="Add Employee"/></Link>
                    <Link href="/edit"><Tab label="Edit Employee"/></Link>
                    <Link href="/view"><Tab label="View Employee"/></Link>
              
                </Box>  
            </Box>
        </div> 
  )
}
 