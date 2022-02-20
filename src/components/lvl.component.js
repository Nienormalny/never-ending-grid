import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import Navigation from './navigation.component';
import Player from './player.component';

const Level = ({gridNumber, checkpoints, onFinish}) => {
    const gridSum = gridNumber * gridNumber;
    const [checkpointsArray, setCheckpointsArray] = useState([]);
    const [gridArr, setGridArr] = useState([]);
    const [playerPosition, setPlayerPosition] = useState(null);
    const [styledMovement, setStyledMovement] = useState({
        transform: 'rotate(0)'
    });
    const [actualLook, setActualLook] = useState(0);
    const [indexInterval, setIndexInterval] = useState(0);
    const [programList, setProgramList] = useState(null);
    const interval = useRef(null);

    const getRandomPosition = () => {
        const getRandom = Math.floor(Math.random() * gridArr.length);
        if (checkpointsArray.includes(getRandom)) {
            getRandomPosition()
        } else if (!checkpointsArray.includes(getRandom)) {
            setPlayerPosition(getRandom);
        }
    }

    useEffect(() => {
        if (actualLook < -360) {
            actualLook(-90)
        } else if (actualLook > 360) {
            actualLook(90)
        } else {
            setStyledMovement(old => ({...old, 'transform': `rotate(${actualLook}deg)`}));
        }
    }, [actualLook])

    useEffect(() => {
        if (programList && programList.length >= indexInterval) {
            const currentPlayerPosition = {top: document.querySelector('.player').offsetTop, left: document.querySelector('.player').offsetLeft}
            let list = programList;
            if (programList[indexInterval - 1].do === 'rotate-left' && !programList[indexInterval - 1].done) {
                setActualLook(old => old - 90);
            } else if (programList[indexInterval - 1].do === 'rotate-right' && !programList[indexInterval - 1].done) {
                setActualLook(old => old + 90);
            } else if (programList[indexInterval - 1].do === 'walk' && !programList[indexInterval - 1].done) {
                if (actualLook === 90 || actualLook === -270) {
                    setStyledMovement(old => ({...old, 'left': currentPlayerPosition.left - 62}));
                } else if (actualLook === -90 || actualLook === 270) {
                    setStyledMovement(old => ({...old, 'left': currentPlayerPosition.left + 62}));
                } else if (actualLook === 0 || actualLook === 360 || actualLook === -360) {
                    setStyledMovement(old => ({...old, 'top': currentPlayerPosition.top + 62}));
                } else if (actualLook === 180 || actualLook === -180) {
                    setStyledMovement(old => ({...old, 'top': currentPlayerPosition.top - 62}));
                }
            } else if (programList[indexInterval - 1].do === 'light' && !programList[indexInterval - 1].done) {
                document.querySelectorAll('.grid').forEach(el => {
                    // console.log(el.offsetTop, currentPlayerPosition.top - 16)
                    if (el.offsetTop === currentPlayerPosition.top - 16 && currentPlayerPosition.left - 16 === el.offsetLeft) {
                        if (el.classList.contains('gird_checkpoint')) {
                            el.classList.add('activated_light');
                            setTimeout(() => {
                                if (Array.from(document.querySelectorAll('.activated_light')).length === checkpointsArray.length) {
                                    onFinish(gridNumber + 1, checkpoints + 1);
                                }
                            }, 1000)
                        } else {
                            el.classList.add('error_light')
                        }
                    }
                })
            }
            list[indexInterval - 1].done = true;
            setProgramList(list)
        } else {
            clearInterval(interval.current)
        }
    }, [indexInterval]);

    const handleMovement = movementList => {
        if (!programList) {
            setProgramList(movementList);
        }
        interval.current = setInterval(() => {
            setIndexInterval(old => old + 1);
        }, 500);
    }

    useEffect(() => {
        if (!checkpointsArray.length) {
            for (let i = 0; i < gridSum; i++) {
                setGridArr(old => [...old, i]);
            }
        }
    }, []);

    useEffect(() => {
        if (gridArr.length) {
            const getRandomRoom = () => {
                const getRandom = Math.floor(Math.random() * gridArr.length);
                if (checkpointsArray.includes(getRandom)) {
                    return getRandomRoom()
                } else if (!checkpointsArray.includes(getRandom)) {
                    return getRandom;
                }
            }
            const randomIndexes = [];
            for (let i = 0; i < checkpoints; i++) {
                randomIndexes.push(getRandomRoom());
            }
            randomIndexes.length === checkpoints && setCheckpointsArray(randomIndexes);
        }
    }, [gridArr]);

    useEffect(() => {
        if (checkpointsArray.length === checkpoints && !playerPosition) {
            getRandomPosition()
        }
        console.log(checkpointsArray)
    }, [checkpointsArray]);

    useEffect(() => {
        const gridElement = document.querySelectorAll('.grid')[playerPosition];
        if (gridElement) {
            setStyledMovement(old => ({
                ...old,
                left: gridElement.offsetLeft + 16,
                top: gridElement.offsetTop + 16
            }));
        }
    }, [playerPosition])

    return <section id="lvl_container">
        <div className="scrolled_element">
            <div className="grid_container" style={{width: (gridSum * 62 / gridNumber)}}>
                {gridArr.map((el, key) => {
                    return <div className={classNames("grid", {'gird_checkpoint': checkpointsArray.includes(key)})} key={key}/>
                })}
                <Player style={styledMovement}/>
            </div>
        </div>
        <Navigation playerPosition={playerPosition} callback={movementList => handleMovement(movementList)}/>
    </section>
}

export default Level;