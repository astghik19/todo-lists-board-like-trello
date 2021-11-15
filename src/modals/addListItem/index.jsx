import React, { useState, useEffect } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormHelperText,
    TextField,
} from "@mui/material";

const AddListItemModal = ({ open, handleClose, handleSubmit, listId, updatingItem }) => {
    const [data, setData] = useState({
        title: '',
        description: '',
    });
    const [formErrors, setFormErrors] = useState({
        title: false,
        description: false,
    });

    useEffect(() => {
        if (open) {
            setData({
                title: updatingItem ? updatingItem.title : '',
                description: updatingItem ? updatingItem.description : '',
            });
            setFormErrors({
                title: false,
                description: false,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const validateForm = () => {
        const errors = {
            title: data.title?.length === 0,
            description: data.description?.length === 0,
        };
        setFormErrors(errors);
        return errors.title || errors.description;
    };


    const onSubmit = () => {
        if (!validateForm()) {
            handleSubmit({ ...data, id: updatingItem?.id }, listId);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>{updatingItem ? 'Update List Item' : 'Add List Item'}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="title"
                    name="title"
                    label="Title"
                    type="text"
                    fullWidth
                    required
                    value={data.title}
                    onChange={onInputChange}
                />
                {formErrors.title && (
                    <FormHelperText>
                        Title is required
                    </FormHelperText>
                )}
            </DialogContent>
            <DialogContent>
                <TextField
                    margin="dense"
                    id="description"
                    name="description"
                    label="Description"
                    multiline
                    rows={4}
                    fullWidth
                    required
                    value={data.description}
                    onChange={onInputChange}
                />
                {formErrors.description && (
                    <FormHelperText>
                        Description is required
                    </FormHelperText>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>
                    Cancel
                </Button>
                <Button onClick={onSubmit}>
                    {updatingItem ? 'Save' : 'Add'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddListItemModal;