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
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Menu
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import IconButton from '@mui/material/IconButton'
import AddBoxIcon from '@mui/icons-material/AddBox'
// import { makeStyles } from '@mui/styles'
import LabelImportantIcon from '@mui/icons-material/LabelImportant'
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled'
import HourglassTopIcon from '@mui/icons-material/HourglassTop'
import ListComponent from './Components/ListComponent'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
// const useStyles = makeStyles(() => ({
//   date: {
//     margin: '17px',
//     backgroundColor: 'black'
//   }
// }))
export interface listInterface {
  task: string
  description: string
  priority: number
  deadline: string
}

function App (): JSX.Element {
  const [list, setList] = useState<listInterface[]>([])
  const [open, setOpen] = useState<boolean>(false)
  const [task, setTask] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [deadline, setDeadline] = useState('')
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
  }
  const changePriority = (event: any): void => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    setPriority(event.target.value)
    // console.log(event.target)
  }
  //   const getDateTime = () => {
  //     let tempDate = new Date();
  //     let date = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate() +' '+ tempDate.getHours()+':'+ tempDate.getMinutes()+':'+ tempDate.getSeconds();
  //     return date;
  //  }
  // console.log(typeof(getDateTime()));

  function changeList (): void {
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
    setDeadline('')
    setPriority(1)
    // console.log(list);
  }
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open1 = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose1 = (): void => {
    setAnchorEl(null)
  }
  // const classes = useStyles()
  // console.log(classes);

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
  // const sortByDeadline = () => {
  //   for (let i = 0; i < list.length - 1; i++) {
  //     if (list[i].deadline > list[i + 1].deadline) {
  //       let temp = list[i];
  //       list[i] = list[i + 1];
  //       list[i + 1] = temp;
  //     }
  //   }
  // };
  // const sortByLogically = () => {

  //   const importantList = list.filter((e) => {
  //     return e.priority === 2;
  //   });
  //   for (let i = 0; i < importantList.length - 1; i++) {
  //     if (importantList[i].deadline > list[i + 1].deadline) {
  //       let temp = importantList[i];
  //       importantList[i] = importantList[i + 1];
  //       importantList[i + 1] = temp;
  //     }

  //   }
  //   const normalList = list.filter((e) => {
  //     return e.priority === 1;
  //   });
  //   for (let i = 0; i < normalList.length - 1; i++) {
  //     if (normalList[i].deadline > list[i + 1].deadline) {
  //       let temp = normalList[i];
  //       normalList[i] = normalList[i + 1];
  //       normalList[i + 1] = temp;
  //     }

  //   }
  //   const notImportantList = list.filter((e) => {
  //     return e.priority === 0;
  //   });
  //   for (let i = 0; i < notImportantList.length - 1; i++) {
  //     if (notImportantList[i].deadline > list[i + 1].deadline) {
  //       let temp = notImportantList[i];
  //       notImportantList[i] = notImportantList[i + 1];
  //       notImportantList[i + 1] = temp;
  //     }

  //   }
  //   let lowestImportantListDeadline:string=importantList[0].deadline;
  //   let lowestNotImportantListDeadline:string=notImportantList[0].deadline;
  //   let lowestNormalListDeadline:string=normalList[0].deadline;
  //   if(lowestImportantListDeadline>lowestNormalListDeadline){
  //     if(lowestNormalListDeadline>lowestNotImportantListDeadline){
  //       setList([...notImportantList,...normalList,...importantList]);
  //     }
  //     else{
  //       setList([...normalList,...notImportantList,...importantList]);
  //     }
  //   }else if(lowestImportantListDeadline<lowestNormalListDeadline){
  //     if(lowestNormalListDeadline>lowestNotImportantListDeadline){
  //       setList([...notImportantList,...importantList,...normalList]);
  //     }
  //     else{
  //       setList([...notImportantList,...importantList,...normalList]);
  //     }
  //   }
  // }
  // ;

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
                {/* <MenuItem
                  onClick={() => {
                    handleClose1();
                    sortByLogically();
                  }}
                >
                  Sort by Logic
                </MenuItem> */}
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
              autoFocus
              margin="dense"
              label="Add Task"
              type="text"
              fullWidth
              variant="outlined"
              onChange={changeTask}
              value={task}
            />
            <TextField
              autoFocus
              margin="dense"
              label="Description"
              multiline
              rows={4}
              type="text"
              fullWidth
              variant="outlined"
              onChange={changeDescription}
              value={description}
            />
            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select
                // defaultValue={priority}
                value={priority}
                label="Priority"
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
              type="date"
              // value={deadline}
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
      <ListComponent
        list={list}
        onListChange={handleTask}

      />
    </div>
  )
}

export default App
