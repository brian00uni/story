import { useSetHeaderProps } from '@/models/headerContext';
import { Cancel } from '@mui/icons-material';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Paper,
  Stack,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

export default function AlarmPage() {
  const setHeaderProps = useSetHeaderProps();
  const [alarms, setAlarms] = useState([
    { id: 1, message: '알람 메세지 입니다~~~~~' },
    { id: 2, message: 'Alarm message 두번째~~~~' },
    { id: 3, message: 'Alarm message 33333333333333333333' },
    {
      id: 4,
      message:
        '알람 메세지 알람 메세지 알람 메세지 알람 메세지 알람 메세지 알람 메세지 알람 메세지 알람 메세지 입니다~~~~~',
    },
  ]);

  const removeAlarm = (id: number) => {
    setAlarms((prev) => prev.filter((alarm) => alarm.id !== id));
  };

  useEffect(() => {
    setHeaderProps({
      pageTitle: 'Alarm',
      backButton: true,
      closeButton: true,
      fnGoBack: undefined,
    });
  }, [setHeaderProps]);

  const [open, setOpen] = React.useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);
  const handleClickOpen = (id: number) => {
    setPendingDeleteId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setPendingDeleteId(null);
  };

  const handleConfirmDelete = () => {
    if (pendingDeleteId !== null) {
      removeAlarm(pendingDeleteId);
    }
    handleClose();
  };

  return (
    <Box>
      <Stack spacing={2}>
        {alarms.map((alarm) => (
          <Paper key={alarm.id} className="alarm-box" elevation={2}>
            {alarm.message}

            <IconButton className="cancel" onClick={() => handleClickOpen(alarm.id)}>
              <Cancel />
            </IconButton>
          </Paper>
        ))}
      </Stack>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'삭제?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            알람을 삭제할까요???????????????????
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={handleConfirmDelete} autoFocus>
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
