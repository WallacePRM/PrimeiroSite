const sortAsc = (a, b) => {

    if (a > b)
        return 1;

    if (a < b)
        return -1;

    return 0;
};

const sortDesc = (a, b) => {

    if (a > b)
        return -1;

    if (a < b)
        return 1;

    return 0;
};