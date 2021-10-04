import React from 'react';
import './Assess.css'
import './ss.css'
const Normal = () => {

    return (
        <div>
            <h2 className="basicTitle">병기본평가 +</h2>
            <span className="basicList" >
                <span className="margin270"></span>
                <input id="scale0" class="scale" name="scale" type="radio" value="0" />
                <label for="scale0" class="button">사격</label>
                <input id="scale1" class="scale" name="scale" type="radio" value="1" />
                <label for="scale1" class="button">정신전력평가</label>
                <input id="scale2" class="scale" name="scale" type="radio" value="2" />
                <label for="scale2" class="button">체력</label>
                <input id="scale3" class="scale" name="scale" type="radio" value="3" />
                <label for="scale3" class="button">화생방</label>
                <input id="scale4" class="scale" name="scale" type="radio" value="4" />
                <label for="scale4" class="button">각개전투</label>
                <input id="scale5" class="scale" name="scale" type="radio" value="5" />
                <label for="scale5" class="button">주특기</label>
            </span>
            <div>
                
            </div>
        </div>
    );
};

export default Normal;