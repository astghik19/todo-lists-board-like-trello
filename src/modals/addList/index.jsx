import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    FormHelperText,
    Button
} from '@mui/material';

const AddListModal = ({ open, handleClose, onSubmitAddList }) => {
    const [title, setTitle] = useState('');
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        setTitle('');
        setHasError(false);
    }, [open]);

    const handleSubmit = () => {
        if (title?.length === 0) {
            setHasError(true);

            return false;
        }

        onSubmitAddList(title);
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>Add New List</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="title"
                    label="Title"
                    type="text"
                    fullWidth
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                {hasError && (
                    <FormHelperText>
                        Title is required
                    </FormHelperText>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>
                    Cancel
                </Button>
                <Button onClick={handleSubmit}>
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddListModal;