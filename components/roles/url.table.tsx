'use client'

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Trash2 } from "lucide-react";
import { Button } from '@mui/material';
import { getCookie } from 'cookies-next';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

interface IURL {
    id:number,
    url:string,
    description:string
}
export default function UrlTable(props:any) {//CustomizedTables
    const urls:IURL[] = props.urls
    const handleDeleteButton = async (id:number) => {
        const access_token = getCookie('jwt')
        const deleteUrl = await fetch(`http://localhost:3001/api/role/delete/${id}`, {
            method:'DELETE',
            headers: {
              'authorization': `Bearer ${access_token}`
            }
        })
        props.handleRerende()
        
    }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }}aria-label="customized table">
        <TableHead >
          <TableRow >
            <StyledTableCell >Id</StyledTableCell>
            <StyledTableCell align="center">URL</StyledTableCell>
            <StyledTableCell align="center">Description</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {urls.map((row,index) => (
            <StyledTableRow key={row.url}>
              <StyledTableCell component="th" scope="row">
                {row.id}
              </StyledTableCell>
              <StyledTableCell align="center">{row.url}</StyledTableCell>
              <StyledTableCell align="center">{row.description}</StyledTableCell>
              <StyledTableCell align="center"><Button onClick={() => handleDeleteButton(row.id)}><Trash2/></Button></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}