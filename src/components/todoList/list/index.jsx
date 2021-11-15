import React from 'react';
import { Grid } from '@mui/material';
import Item from './item';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {
    Droppable,
    Draggable,
    DragDropContext,
} from 'react-beautiful-dnd';


const List = ({
  list,
  removeList,
  openAddItemModal,
  updateListItems,
  openAddUpdateItemModal,
}) => {
    const handleOnDragEnd = (result) => {
        if (!result.destination) return;

        const items = Array.from(list.items);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        updateListItems(list.id, { ...list, items });
    }

    return (
        <Grid item md={2} className="list">
            <div className="list-header">
                <div className="title">
                    {list.title}
                </div>
                <div className="remove" onClick={() => removeList(list.id)}>
                    <HighlightOffIcon />
                </div>
            </div>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="list-content" isCombineEnabled>
                    {(provided) => (
                        <>
                            <div className="list-content" {...provided.droppableProps} ref={provided.innerRef}>
                                {!list.items.length ? (
                                    <div className="no-item">
                                        There is no item in the list yet
                                    </div>
                                ) : (
                                    list.items.map((item, index) => (
                                        <Draggable
                                            key={item.id}
                                            draggableId={item.id.toString()}
                                            index={index}
                                        >
                                            {(provided) => (
                                                <div style={{ padding: '10px' }} onClick={() => openAddUpdateItemModal(list.id, item.id)}>
                                                    <div
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        ref={provided.innerRef}
                                                    >
                                                        <Item item={item} />
                                                    </div>
                                                    {provided.placeholder}
                                                </div>
                                            )}
                                        </Draggable>
                                    ))
                                )}
                                {provided.placeholder}
                            </div>
                        </>
                    )}
                </Droppable>
            </DragDropContext>
            <div className="list-footer">
                <div className="add-item" onClick={() => openAddItemModal(list.id)}>
                    + Add Item
                </div>
            </div>
        </Grid>
    );
};

export default List;