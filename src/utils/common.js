
import { NavigationActions } from 'react-navigation';

export function _navigateTo(self, routeName, data) {
    const actionToDispatch = NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName, params: data })]
    })
    self.props.navigation.dispatch(actionToDispatch)
}