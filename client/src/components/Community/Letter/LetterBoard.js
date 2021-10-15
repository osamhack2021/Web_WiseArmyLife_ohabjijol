import React from 'react';
import BoardItem from '../../Test/App6_BoardItem';

const LetterBoard = () => {

    const boards = [
        {
            brdno: 1,
            brdwriter: 'Lee SunSin',
            brdtitle: 'If you intend to live then you die',
            brddate: new Date()
        },
        {
            brdno: 2,
            brdwriter: 'So SiNo',
            brdtitle: 'Founder for two countries',
            brddate: new Date()
        }
    ]
    

    
    return (
        <div>
            
            <table border="1">
                    <tbody>
                    <tr align="center">
                        <td width="50">No.</td>
                        <td width="300">Title</td>
                        <td width="100">Name</td>
                        <td width="100">Date</td>
                    </tr>
                    {
                        boards.map(row =>
                            (<BoardItem key={row.brdno} row={row}  />)
                        )
                    }
                    </tbody>
                </table>
        </div>
    );
};

export default LetterBoard;