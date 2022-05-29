import React from "react";

interface IProps {
    total: number,
    completed: number
}

const Progress: React.FunctionComponent<IProps> = ({total, completed}) => {
    const progress = (completed / total) * 100;
    let fontStyle = 'blue-font';

    if (progress > 60) fontStyle = 'white-font';

    if (progress < 60 && progress > 50) fontStyle = 'gray-font';

    return (
        <div className='progress-bar'>
            <h3>{`${completed}  Questions  Completed out of ${total}`}</h3>
            <div className='common-completed-items-count'>
                <div className='done' style={{width: `${progress.toFixed(1)}%` }}></div>
                <div className={`progress-in-percents ${fontStyle}`}>{`${progress.toFixed(1)}%`}</div>
            </div>
        </div>
    );
}

export default Progress;
