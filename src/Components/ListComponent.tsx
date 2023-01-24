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
        <Table className='table' aria-label="simple table">
          <TableHead >
            <TableRow className='tableRow'>
              <TableCell className='tableHeaderCell'>Priority</TableCell>
              <TableCell className='tableHeaderCell'>Task</TableCell>
              <TableCell className='tableHeaderCell'>Description</TableCell>

              <TableCell className='tableHeaderCell'>Deadline</TableCell>
              <TableCell className='tableHeaderCell'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.list.map((row: listInterface, index) => (
              <TableRow
                key={index}
              >
                <TableCell className="tableCell">
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
                <TableCell className="tableCell">
                  {row.task}
                </TableCell>
                <TableCell className="tableCell">
                  {row.description}
                </TableCell>

                <TableCell className="tableCell">
                  {row.deadline}
                </TableCell>
                <TableCell className="tableCell">
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
