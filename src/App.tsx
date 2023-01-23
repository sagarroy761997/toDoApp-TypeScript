import React, { ChangeEvent, useState } from 'react'
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  MenuItem,
  FormControl,
  Select,
  Menu
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import IconButton from '@mui/material/IconButton'
import AddBoxIcon from '@mui/icons-material/AddBox'

import LabelImportantIcon from '@mui/icons-material/LabelImportant'
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled'
import HourglassTopIcon from '@mui/icons-material/HourglassTop'
import ListComponent from './Components/ListComponent'
import FilterAltIcon from '@mui/icons-material/FilterAlt'

export interface listInterface {
  task: string
  description: string
  priority: number
  deadline: string
}
const getDateTime = (): string => {
  const tempDate = new Date()
  const year = tempDate.getFullYear()
  let month: string
  let theDate: string
  const value1 = tempDate.getMonth() + 1
  if (value1 > 9) {
    month = String(value1)
  } else {
    month = `0${value1}`
  }
  const value2 = tempDate.getMonth() + 1
  if (value2 > 9) {
    theDate = String(value2)
  } else {
    theDate = `0${value1}`
  }
  const date = `${year}-${month}-${theDate}`
  return date
}
function App (): JSX.Element {
  const [list, setList] = useState<listInterface[]>([])
  const [open, setOpen] = useState<boolean>(false)
  const [task, setTask] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [deadline, setDeadline] = useState<string>(getDateTime())
  const [priority, setPriority] = useState<number>(1)

  const handleClickOpen = (): void => {
    setOpen(true)
  }

  const handleTask = (x: listInterface[]): void => {
    setList(x) //
  }

  const handleClose = (): void => {
    setOpen(false)
  }

  const changeTask = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setTask(event.target.value)
  }
  const changeDescription = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setDescription(event.target.value)
  }

  const changeDeadline = (event: ChangeEvent<HTMLInputElement>): void => {
    setDeadline(event.target.value)
    console.log(typeof (event.target.value))
  }
  const changePriority = (event: any): void => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    setPriority(event.target.value)
  }
  function changeList (): void {
    if ((task.length === 0 && description.length === 0)) {
      alert('task and description should not be empty')
    } else {
      setList([
        ...list,
        {
          task,
          description,
          priority,
          deadline
        }
      ])
      setTask('')
      setDescription('')
      setDeadline(getDateTime())
      setPriority(1)
    }
  }
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open1 = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose1 = (): void => {
    setAnchorEl(null)
  }

  const sortByPriority = (): void => {
    const importantList = list.filter((e) => {
      return e.priority === 2
    })
    const normalList = list.filter((e) => {
      return e.priority === 1
    })
    const notImportantList = list.filter((e) => {
      return e.priority === 0
    })
    const sortedList = [...importantList, ...normalList, ...notImportantList]
    setList(sortedList)
  }
  const sortByDeadline = (): void => {
    setList(list.sort((n1, n2) => {
      if (n1.deadline > n2.deadline) {
        return 1
      }

      if (n1.deadline < n2.deadline) {
        return -1
      }

      return 0
    }))
  }
  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Task Management App
            </Typography>
            <div>
              <Button
                id="demo-positioned-button"
                aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                style={{ color: '#faffff' }}
              >
                {<FilterAltIcon />}
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={open1}
                onClose={handleClose1}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left'
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left'
                }}
              >
                <MenuItem
                  onClick={() => {
                    handleClose1()
                    sortByPriority()
                  }}
                >
                  Sort by priority
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose1()
                    sortByDeadline()
                  }}
                >
                  Sort by deadline
                </MenuItem>
              </Menu>
            </div>
            <Button color="inherit" onClick={handleClickOpen}>
              {<AddBoxIcon />}
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Box>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add Task</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Add task and description of the task and the Deadline of that task
              in the form below.
            </DialogContentText>
            <TextField
              className='modalInput'
              label="Add Task"
              type="text"
              fullWidth
              variant="outlined"
              onChange={changeTask}
              value={task}
            />
            <TextField
              className='modalInput'
              label="Description"
              multiline
              rows={2}
              type="text"
              fullWidth
              variant="outlined"
              onChange={changeDescription}
              value={description}
            />
            <FormControl fullWidth className='modalInput'>
              <Select
                value={priority}
                placeholder="Priority"
                onChange={changePriority}
              >
                <MenuItem value={2}>{<LabelImportantIcon />}Important</MenuItem>
                <MenuItem value={1}>{<HourglassTopIcon />}Normal</MenuItem>
                <MenuItem value={0}>
                  {<AccessTimeFilledIcon />}Not Important
                </MenuItem>
              </Select>
            </FormControl>
            <TextField
              className='modalInput'
              type="date"
              value={deadline}
              inputProps={{ min: '2022-01-01', max: '2999-05-31' }}
              onChange={changeDeadline}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              onClick={() => {
                changeList()
                handleClose()
              }}
            >
              Add Task
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
      {(list.length > 0)
        ? <ListComponent
        list={list}
        onListChange={handleTask}

      />
        : <Box className='taskBox'><Typography variant='h1' > ADD TASKS</Typography></Box>}
    </div>
  )
}

export default App
