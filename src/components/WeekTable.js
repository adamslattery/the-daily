import { useState, useRef } from "react";
import Editable from "./Editable";

const WeekTable = ({ item, listId, updateItem }) => {
    const [task, setTask] = useState("");
    const inputRef = useRef();


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
                <div>Ricky</div>
                <div>
                    <Editable
                        text={task}
                        placeholder=""
                        childRef={inputRef}
                        type="input">
                        <input
                            ref={inputRef}
                            type="text"
                            name="task"
                            placeholder=""
                            value={task}
                            onChange={e => setTask(e.target.value)}
                        />
                    </Editable>
                </div>
                <div>
                    <Editable
                        text={task}
                        placeholder=""
                        childRef={inputRef}
                        type="input">
                        <input
                            ref={inputRef}
                            type="text"
                            name="task"
                            placeholder=""
                            value={task}
                            onChange={e => setTask(e.target.value)}
                        />
                    </Editable>
                </div>
                <div>
                    <Editable
                        text={task}
                        placeholder=""
                        childRef={inputRef}
                        type="input">
                        <input
                            ref={inputRef}
                            type="text"
                            name="task"
                            placeholder=""
                            value={task}
                            onChange={e => setTask(e.target.value)}
                        />
                    </Editable>
                </div>
                <div>
                    <Editable
                        text={task}
                        placeholder=""
                        childRef={inputRef}
                        type="input">
                        <input
                            ref={inputRef}
                            type="text"
                            name="task"
                            placeholder=""
                            value={task}
                            onChange={e => setTask(e.target.value)}
                        />
                    </Editable>
                </div>
                <div>
                    <Editable
                        text={task}
                        placeholder=""
                        childRef={inputRef}
                        type="input">
                        <input
                            ref={inputRef}
                            type="text"
                            name="task"
                            placeholder=""
                            value={task}
                            onChange={e => setTask(e.target.value)}
                        />
                    </Editable>
                </div>
                <div>Simon</div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div>Simon</div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div>Logan</div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div>Adam</div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div>Queue</div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}

export default WeekTable;