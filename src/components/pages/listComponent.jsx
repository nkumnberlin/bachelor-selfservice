import React from 'react';
import PropTypes from 'prop-types';
import {
  ListItem,
  ListItemText,
  ListItemPrimaryText,
  ListItemSecondaryText,
  ListItemGraphic,
  ListItemMeta
} from '@rmwc/list';
import styled from 'styled-components';

const Outline = styled.hr`
  border-color: rgba(0, 0, 0, 0.12);
  margin-left: 4.5rem;
`;

const ListComponent = ({ icon, primaryLabel, secondaryLabel, metaIcon, toggleDrawer }) => {
  const isFunction = typeof toggleDrawer === 'function';
  return (
    <>
      <ListItem {...(isFunction && { onClick: toggleDrawer })}>
        <ListItemGraphic icon={icon} />
        <ListItemText>
          <ListItemPrimaryText>{primaryLabel}</ListItemPrimaryText>
          <ListItemSecondaryText>{secondaryLabel}</ListItemSecondaryText>
        </ListItemText>
        <ListItemMeta icon={metaIcon} />
      </ListItem>
      <Outline />
    </>
  );
};

export default ListComponent;

ListComponent.propTypes = {
  icon: PropTypes.string.isRequired,
  primaryLabel: PropTypes.string.isRequired,
  secondaryLabel: PropTypes.string.isRequired,
  metaIcon: PropTypes.string.isRequired,
  toggleDrawer: PropTypes.func.isRequired
};
