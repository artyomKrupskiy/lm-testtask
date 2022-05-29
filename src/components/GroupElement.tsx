import React from "react";
import {CategoryItem} from "../App";

interface IProps {
    item: CategoryItem,
    toggleIsCheckedItem: (item: CategoryItem) => void
}

const GroupElement: React.FunctionComponent<IProps> = ({item, toggleIsCheckedItem}) => {
    return (
        <div className='group-item' onClick={() => toggleIsCheckedItem(item)}>
            {item.isCompleted ? <div className='circle green'></div> : <div className='circle gray'></div>}{item.name}
        </div>
    );
}

export default GroupElement;
