import { useEffect, useState, useRef } from "react";
import ApiFetch from "../ApiFetch";
import Despatch from "../Despatch";
import Editable from "./Editable";

const WeekTable = ({ item, listId, updateItem }) => {
    const [data, setData] = useState("");
    const inputRef = useRef();


    const GetApiData = async () => {
        const { data, isLoading, error } = await ApiFetch(`http://localhost:9000/weeks`)
        setData(data);
        console.log(data);
    };

    useEffect(() => {
        GetApiData();
    }, []);

    return (
        <div className="week">
            <div>Weekday</div>
            <div className="week1">
                <div className="heading"></div>
                <div>Monday</div>
                <div>Tuesday</div>
                <div>Wednesday</div>
                <div>Thursday</div>
                <div>Friday</div>
                {data && data.map((user, index) => {
                    <>
                        <div>Ricky</div>
                        <div>
                            <Editable
                                text={user.monday}
                                placeholder=""
                                childRef={inputRef}
                                type="input">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    name={user.id}
                                    placeholder=""
                                    value={user.monday}
                                    onChange={e => setData(e.target.value)}
                                />
                            </Editable>
                        </div>
                    </>
                })}

            </div>
        </div >
    );
}

export default WeekTable;