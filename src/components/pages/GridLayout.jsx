import React from 'react';
import PropTypes from 'prop-types';
import { Grid, GridCell, GridInner } from '@rmwc/grid';
import CortadoPhoneImage from './backgroundImage';

const SplitLayout = ({ component }) => (
  <Grid>
    <GridCell desktop={6} tablet={8}>
      <CortadoPhoneImage />
    </GridCell>
    <GridCell desktop={6} tablet={8} phone={4} align={'middle'}>
      <GridInner align={'left'}>
        <GridCell desktop={3} tablet={2} phone={1} />
        <GridCell desktop={6} tablet={4} phone={2}>
          {component}
        </GridCell>
        <GridCell desktop={3} tablet={2} phone={1} />
      </GridInner>
    </GridCell>
  </Grid>
);

export default SplitLayout;

SplitLayout.propTypes = {
  component: PropTypes.object.isRequired
};
