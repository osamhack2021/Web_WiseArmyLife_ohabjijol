import React, {Component} from "react";
import styled from 'styled-components';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './SimpleSlider.css'
import A from './A.png'
import B from './B.png'
import C from './C.png'
const Container = styled.div`
  overflow:hidden;
`;

const StyledSlider = styled(Slider)`
    .slick-slide div{
      outline: none;
    }
`;



const Image = styled.img`
max-width:100%;
max-height:100%;
width:980px;
height:300px;
`;

const imgUrl = require('./A.png');
const imgUrlTwo = require('./B.png');
const imgUrlThree = require('./C.png');

const items = [
  { id: 1, url: A },
  { id: 2, url: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" },
  { id: 3, url: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" },
 ];


export default class SimpleSlider extends Component {
  render() {
    const settings = {
      autoplay: true,
      dots: true
      
    };
    return (
      <Container>
        <StyledSlider {...settings}
        >
          {items.map(item => {
            return (
              <div className="sliderImg" key={item.id}>
                  <img className="phoneImage" alt="iPhone_01" src = {item.url} />
              </div>
            );
          })}
        </StyledSlider>
      </Container>
    );
  }
}