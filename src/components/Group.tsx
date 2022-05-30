import React from "react";
import {CategoryItem} from "../App";
import GroupElement from "./GroupElement";

interface IProps {
    title: string,
    elements: CategoryItem[],
    completedItemsCount: number,
    toggleIsCheckedItem: (item: CategoryItem) => void
}

const Group: React.FunctionComponent<IProps> = ({title, elements, completedItemsCount, toggleIsCheckedItem}) => {
    return (
        <div className='group'>
            <h3 className='group-title'>{title} - {completedItemsCount}/{elements.length}</h3>

            {elements.map((item) => {
                return (
                    <GroupElement key={item.id} item={item} toggleIsCheckedItem={toggleIsCheckedItem}/>
                );
            })}
        </div>
    );
}

export default Group;
