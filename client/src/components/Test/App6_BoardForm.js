import React from 'react';

const BoardForm = () => {
    return (
        <div>
            <form>
                <input placeholder="title" />
                <input placeholder="name"/>
                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default BoardForm;