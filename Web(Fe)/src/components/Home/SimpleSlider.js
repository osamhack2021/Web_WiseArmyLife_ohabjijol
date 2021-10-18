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

const items = [
  { id: 1, url: A },
  { id: 2, url: B },
  { id: 3, url: B }
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
              <div className="nononmo">
                <div className="sliderImg" key={item.id}>
                    <img className="phoneImage" alt="iPhone_01" src = {item.url} />
                </div>
              </div>
            );
          })}
        </StyledSlider>
      </Container>
    );
  }
}