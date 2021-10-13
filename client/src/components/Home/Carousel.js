import React, {Component} from "react";
import styled from 'styled-components';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Container = styled.div`
  overflow:hidden;
`;

const StyledSlider = styled(Slider)`
    .slick-slide div{
      outline: none;
    }
`;

const ImageContainer = styled.div`
  margin: 0 16px;
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
  { id: 1, url: imgUrl },
  { id: 2, url: imgUrlTwo },
  { id: 3, url: imgUrlThree },
 ];


export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 1,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      centerMode: false,
    };
    return (
      <Container>
        <h2> Single Item</h2>
        <StyledSlider {...settings}
        >
          {items.map(item => {
            return (
              <div key={item.id}>
                <ImageContainer>
                  <Image src={item.url} />
                </ImageContainer>
              </div>
            );
          })}
        </StyledSlider>
      </Container>
    );
  }
}