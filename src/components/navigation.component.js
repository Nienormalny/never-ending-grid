import classNames from "classnames";
import React, { useState } from "react";
import { Movement } from "../utils/player.movement";

const Navigation = ({playerPosition, callback}) => {
    const [initialNavigation] = useState([
        'rotate left',
        'rotate right',
        'walk',
        'light',
    ]);
    const [navigationList, setNavigationList] = useState([]);
    const [showProgram, setShowProgram] = useState(false);
    const [showMovement, setShowMovement] = useState(false);

    return <div className="navigation_container">
        <ul className={classNames("navigation_list navigation_movement", {show: showMovement})}>
            <li className="navigation_title">Instruction</li>
            {initialNavigation.map((movement, key) => <li className="navigation_click" key={key} onClick={() => {
                setNavigationList(old => [...old, movement]);
            }}>{movement}</li>)}
        </ul>
        <ul className={classNames("navigation_list navigation_program", {show: showProgram})}>
            <li className="navigation_title">Program</li>
            {navigationList.map((movement, key) => <li className="navigation_disabled" key={key}>{movement}</li>)}
        </ul>
        <button onClick={() => setShowMovement(!showMovement)} className="show_movement">Show movement</button>
        <button onClick={() => setShowProgram(!showProgram)} className="show_program">Show program</button>
        <button className="start_program" onClick={() => callback(Movement(navigationList, playerPosition))}>Start</button>
    </div>
}

export default Navigation;