import {useEffect, useState} from 'react';
import './App.css';
import Group from "./components/Group";
import Progress from "./components/Progress";

export type CategoryItem = {
    id: string;
    name: string;
    isCompleted: boolean;
    category: string;
};

type CategoriesMap = {
    [key: string]: CategoryItem[];
};

type LocalstorageData = {
    data: CategoriesMap,
    completedItemsCount: number,
    initialItemsCount: number
}

const LOCALSTORAGE_KEY = "localstorage_key";

const convertDataToCategoriesMap = (data: any[]): CategoriesMap => {
    const newData: CategoriesMap = {};

    for (const item of data) {
        const element = {
            id: item.id,
            name: item.name,
            category: item.category,
            isCompleted: false,
        }

        if (newData[item.category]) {
            newData[item.category].push(element);
        } else {
            newData[item.category] = [ element ];
        }
    }

    return newData;
};

const App: React.FunctionComponent = () => {
    const [data, setData] = useState<CategoriesMap>({});
    const [completedItemsCount, setCompletedItemsCount] = useState(0);
    const [initialItemsCount, setInitialItemsCount] = useState(0);

    const fetchDataFromAPI = async () => {
        await fetch(`https://www.algoexpert.io/api/fe/questions`)
            .then(data => data.json())
            .then(data => {
                setInitialItemsCount(data.length);
                setData(convertDataToCategoriesMap(data));
            });
    };

    useEffect(() => {
        const localStorageData = localStorage.getItem(LOCALSTORAGE_KEY);

        if (localStorageData === null) {
            fetchDataFromAPI();
        } else {
            const parsedData = JSON.parse(localStorageData) as LocalstorageData;
            setData(parsedData.data);
            setInitialItemsCount(parsedData.initialItemsCount);
            setCompletedItemsCount(parsedData.completedItemsCount);
        }
    }, []);

    const toggleIsCheckedItem = (item: CategoryItem) => {
        let found = data[item.category].findIndex(
            (element) => item.id === element.id
        );

        if (found === -1) return;

        const newData = {...data};
        newData[item.category][found].isCompleted = !item.isCompleted;

        const newProgress = item.isCompleted ? completedItemsCount + 1 : completedItemsCount - 1

        setCompletedItemsCount(newProgress);

        setData(newData);

        const localStorageData: LocalstorageData = {
            data: newData,
            completedItemsCount: newProgress,
            initialItemsCount: initialItemsCount
        }

        localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(localStorageData));
    };

    const renderGroups = (groups: CategoriesMap) => {
        return Object.keys(groups).map((key) => {
            const completedItemsCount = groups[key].filter(item => item.isCompleted);

            return (
                <Group
                    key={key}
                    title={key}
                    elements={groups[key]}
                    completedItemsCount={completedItemsCount.length}
                    toggleIsCheckedItem={toggleIsCheckedItem}
                />
            )
        });
    };

    return (
        <div className="App">
            <Progress total={initialItemsCount} completed={completedItemsCount} />
            <div className='groups-container'>{renderGroups(data)}</div>
        </div>
    );
};

export default App;
