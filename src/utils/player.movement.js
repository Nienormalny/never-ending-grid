export const Movement = (navigationList, playerPosition) => {
    const movementList = [];
    navigationList.forEach(el => {
        if (el === 'rotate left') {
            movementList.push({'do': 'rotate-left', 'done': false})
        } else if (el === 'rotate right') {
            movementList.push({'do': 'rotate-right', 'done': false})
        } else if (el === 'walk') {
            movementList.push({'do': 'walk', 'done': false})
        } else if (el === 'light') {
            movementList.push({'do': 'light', 'done': false})
        }
    })
    return movementList;
}