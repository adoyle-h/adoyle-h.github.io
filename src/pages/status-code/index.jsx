import React from 'react';

export default ({match}) => <div>
    <img alt="status code description" src={`https://http.cat/${match.params.code}.jpg`} />
</div>;
