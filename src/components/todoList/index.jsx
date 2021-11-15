import React, { useState } from 'react';
import Header from '../header';
import { Grid, Button } from '@mui/material';
import AddListModal from '../../modals/addList';
import AddListItemModal from '../../modals/addListItem';
import './index.scss';
import List from './list';

const TodoList = () => {
    const [todoLists, setTodoLists] = useState([]);
    const [isAddListModalOpen, setIsAddListModalOpen] = useState(false);
    const [listIdAddingItem, setListIdAddingItem] = useState(null);
    const [isAddListItemModalOpen, setIsAddListItemModalOpen] = useState(false);
    const [updatingItem, setUpdatingItem] = useState(null);

    const onSubmitAddList = (title) => {
        setIsAddListModalOpen(false);
        setTodoLists((prev) => ([
            ...prev,
            {
                id: prev.length + 1,
                title,
                items: [],
            },
        ]));
    };

    const onSubmitAddListItem = (data, listId) => {
        const listsCopy = [...todoLists];
        const index = listsCopy.findIndex(({ id }) => id === listId);
        const list = listsCopy[index];
        if (data.id) {
            const itemIndex = list.items.findIndex(({ id }) => id === data.id);
            listsCopy[index].items[itemIndex] = data;
        } else {
            listsCopy[index].items = [
                ...list.items,
                {
                    ...data,
                    id: list.items.length + 1,
                }
            ];
        }
        setTodoLists(listsCopy);
        setIsAddListItemModalOpen(false);
        setUpdatingItem(null);
    };

    const removeList = (listId) => {
        const index = todoLists.findIndex(({ id }) => id === listId);
        const listsCopy = [...todoLists];
        listsCopy.splice(index, 1);
        setTodoLists(listsCopy);
    };

    const openAddItemModal = (listId) => {
        setListIdAddingItem(listId);
        setIsAddListItemModalOpen(true);
    };

    const openAddUpdateItemModal = (listId, itemId) => {
        const list = todoLists.find(({ id }) => id === listId);
        const item = list.items.find(({ id }) => id === itemId);
        setUpdatingItem({
            ...item,
            listId,
        });
        setIsAddListItemModalOpen(true);
    };

    const updateListItems = (listId, list) => {
        const listsCopy = [...todoLists];
        const index = listsCopy.findIndex(({ id }) => id === listId);
        listsCopy[index] = list;
        setTodoLists(listsCopy);
    };

    const closeAddListModal = () => {
        setIsAddListItemModalOpen(false);
        setUpdatingItem(null);
    };

    return (
        <div id="todo-list">
            <Header />
            <div className="content">
                <div className="top-content">
                    <Button
                        variant="outlined"
                        onClick={() => setIsAddListModalOpen(true)}
                    >
                        + Add List
                    </Button>
                </div>
                <Grid container className="main-content">
                    {todoLists.map((list) => (
                        <List
                            key={list.id}
                            list={list}
                            updateListItems={updateListItems}
                            removeList={removeList}
                            openAddItemModal={openAddItemModal}
                            openAddUpdateItemModal={openAddUpdateItemModal}
                        />
                    ))}
                </Grid>
            </div>
            <AddListModal
                open={isAddListModalOpen}
                handleClose={() => setIsAddListModalOpen(false)}
                onSubmitAddList={onSubmitAddList}
            />
            <AddListItemModal
                open={isAddListItemModalOpen}
                handleClose={closeAddListModal}
                handleSubmit={onSubmitAddListItem}
                listId={listIdAddingItem}
                updatingItem={updatingItem}
            />
        </div>
    );
};

export default TodoList;