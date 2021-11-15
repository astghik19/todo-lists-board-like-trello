import React from 'react';

const Item = ({ item }) => {
    return (
        <div className="list-item">
            <div className="title">
                {item.title}
            </div>
            <div className="description">
                {item.description}
            </div>
        </div>
    );
};

export default Item;