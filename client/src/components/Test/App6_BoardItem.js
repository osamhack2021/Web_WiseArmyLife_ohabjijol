import React, { Component } from 'react';

class BoardRow extends Component {
    handleRemove = () => {
        const { row, onRemove } = this.props;
        onRemove(row.brdno);
    }    
    
    handleSelectRow = () => {
        const { row, onSelectRow } = this.props;
        onSelectRow(row);
    }    
    
    render() {
        return(
            <div>
                <input />
                <input />
                <button>글쓰기</button>
            </div>
        );
    }
}

export default BoardRow;

