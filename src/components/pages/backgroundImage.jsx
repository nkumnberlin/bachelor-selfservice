import React from 'react';
import background from '../../assets/images/backgroundImageEminem.PNG';
import { ImageList, ImageListImage, ImageListItem } from '@rmwc/image-list';
import styled from 'styled-components';

const StlyedImage = styled(ImageList)`
  display: none !important;

  @media (min-width: 840px) {
    display: block !important;
  }
`;

const CortadoLoginImage = () => (
  <StlyedImage masonry withTextProtection>
    {[`${background}`].map(src => (
      <ImageListItem key={src} style={{ marginBottom: '16px' }}>
        <ImageListImage src={src} />
      </ImageListItem>
    ))}
  </StlyedImage>
);

const CortadoImage = () => (
  <div>
    <CortadoLoginImage />
  </div>
);

export default CortadoImage;
