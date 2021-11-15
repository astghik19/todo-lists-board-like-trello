import React, { useState } from 'react';
import Header from '../header';
import { Grid, Button } from '@mui/material';
import AddListModal from '../../modals/addList';
import AddListItemModal from '../../modals/addListItem';
import './index.scss';
import List from './list';
import { DragDropContext } from "react-beautiful-dnd";

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
                id: Math.random().toString(),
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
                    id: Math.random().toString(),
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

    const closeAddListModal = () => {
        setIsAddListItemModalOpen(false);
        setUpdatingItem(null);
    };

    const handleOnDragEnd = (result) => {
        if (!result.destination) return;

        const listsCopy = [...todoLists];

        const currentListIndex = todoLists.findIndex(({ id }) => id === result.source.droppableId);
        const currentList = todoLists[currentListIndex];
        const currentListItems = Array.from(currentList.items);
        const [reorderedItem] = currentListItems.splice(result.source.index, 1);

        if (result.source.droppableId === result.destination.droppableId) {
            currentListItems.splice(result.destination.index, 0, reorderedItem);
            listsCopy[currentListIndex].items = currentListItems;
            setTodoLists(listsCopy);
        } else {
            const destinationListIndex = todoLists.findIndex(({ id }) => id === result.destination.droppableId);
            const destinationList = todoLists[destinationListIndex];
            const destinationListItems = Array.from(destinationList.items);

            destinationListItems.splice(result.destination.index, 0, reorderedItem);
            listsCopy[destinationListIndex].items = destinationListItems;
            listsCopy[currentListIndex].items = currentListItems;
            setTodoLists(listsCopy);
        }
    }

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
                    <DragDropContext onDragEnd={handleOnDragEnd}>
                        {todoLists.map((list) => (
                            <List
                                key={list.id}
                                list={list}
                                removeList={removeList}
                                openAddItemModal={openAddItemModal}
                                openAddUpdateItemModal={openAddUpdateItemModal}
                            />
                        ))}
                    </DragDropContext>
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