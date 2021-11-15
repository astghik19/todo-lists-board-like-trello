import React from 'react';
import { Grid } from '@mui/material';
import Item from './item';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {
    Droppable,
    Draggable,
} from 'react-beautiful-dnd';


const List = ({
  list,
  removeList,
  openAddItemModal,
  openAddUpdateItemModal,
}) => {
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
            <Droppable droppableId={list.id.toString()}>
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
                                        draggableId={`${list.id}${item.id}`.toString()}
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
            <div className="list-footer">
                <div className="add-item" onClick={() => openAddItemModal(list.id)}>
                    + Add Item
                </div>
            </div>
        </Grid>
    );
};

export default List;