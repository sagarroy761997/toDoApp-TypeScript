import React from 'react'
import {
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Button
} from '@mui/material'
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded'
import LabelImportantIcon from '@mui/icons-material/LabelImportant'
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled'
import HourglassTopIcon from '@mui/icons-material/HourglassTop'

import { listInterface } from '../App'

interface propInterface {
  list: listInterface[]
  onListChange: (x: listInterface[]) => void

}

const ListComponent = (props: propInterface): JSX.Element => {
  const deleteData = (value: listInterface): void => {
    const filterList: listInterface[] = props.list.filter(
      (element: listInterface) => {
        return element !== value
      }
    )
    props.onListChange(filterList)
  }
  // console.log(props.list);
  return (
    <div>

      <TableContainer >
        <Table sx={{ minWidth: 650, marginTop: 3 }} aria-label="simple table">
          <TableHead >
            <TableRow style={{ backgroundColor: '#ede7f6' }}>
              <TableCell style={{ textAlign: 'center', fontWeight: 'bolder' }}>Priority</TableCell>
              <TableCell style={{ textAlign: 'center', fontWeight: 'bolder' }}>Task</TableCell>
              <TableCell style={{ textAlign: 'center', fontWeight: 'bolder' }}>Description</TableCell>

              <TableCell style={{ textAlign: 'center', fontWeight: 'bolder' }}>Deadline</TableCell>
              <TableCell style={{ textAlign: 'center', fontWeight: 'bolder' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.list.map((row: listInterface, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}

              >
                <TableCell component="th" scope="row" style={{ textAlign: 'center' }}>
                  {(() => {
                    switch (row.priority) {
                      case 2:
                        return <LabelImportantIcon />
                      case 1:
                        return <HourglassTopIcon />
                      case 0:
                        return <AccessTimeFilledIcon />
                    }
                  })()}
                </TableCell >
                <TableCell style={{ textAlign: 'center' }}>
                  {row.task}
                </TableCell>
                <TableCell style={{ textAlign: 'center' }}>
                  {row.description}
                </TableCell>

                <TableCell style={{ textAlign: 'center' }}>
                  {row.deadline}
                </TableCell>
                <TableCell style={{ textAlign: 'center' }}>
                  <Button
                    onClick={() => {
                      deleteData(row)
                    }}
                  >
                    {<DeleteForeverRoundedIcon />}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default ListComponent
