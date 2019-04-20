const assert = (val, message) => {
    if (!val) {
        if (!message) {
            // eslint-disable-next-line no-param-reassign
            message = `${JSON.stringify(val)} == true`;
        }
        throw new Error(`AssertionError: ${message}`);
    }
};

export default assert;
