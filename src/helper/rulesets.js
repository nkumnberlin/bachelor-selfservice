const LostModeRuleset = (currentActions, device) => {
  const actions = currentActions;
  const { enablelostmode, disablelostmode } = actions;
  if (!device.lostmodeenabled && enablelostmode.visible && disablelostmode.visible) {
    disablelostmode.visible = false;
    enablelostmode.visible = true;
    actions.requestlocation.status = 0;
  } else if (device.lostmodeenabled && enablelostmode.visible && disablelostmode.visible) {
    disablelostmode.visible = true;
    enablelostmode.visible = false;
    actions.requestlocation.status = 0;
  }
  return actions;
};

const RequestLocationRuleset = (actions, location) => {
  const action = actions;
  if (action.requestlocation.visible) {
    const showLocation =
      location && action.disablelostmode.visible && action.requestlocation.visible;
    action.requestlocation.visible = showLocation || 'disabled';
  }
  return action;
};

export { LostModeRuleset, RequestLocationRuleset };
