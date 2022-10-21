import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import docs from './docs';
import dashboard from './dashboard';

const modalPages = [
    '/docs',
    '/dashboard',
];

const defaultLocation = { pathname: '/' };

const Options = () => (
    <div>Options</div>
);

class Root extends React.Component {
    state = {
        isMobile: false,
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    handleResize = () => {
        const isMobile = window.innerWidth < 800;

        if (this.state.isMobile !== isMobile) {
            this.setState({ isMobile });
        }
    }

    componentDidUpdate() {
        const { location } = this.props;

        if (this.shouldUpdatePreviousLocation()) {
            this.previousLocation = location;
        }
    }

    shouldUpdatePreviousLocation = () => {
        const { location } = this.props;

        if (!location) return false;

        return !modalPages.includes(location.pathname);
    }

    shouldUsePreviousLocation = () => {
        const { isMobile } = this.state;
        const { location } = this.props;

        if (!location) return false;

        return isMobile && modalPages.includes(location.pathname);
    }

    render() {
        const { isMobile } = this.state;
        const { location } = this.props;
        const usePreviousLocation = this.shouldUsePreviousLocation();
        let forcedLocation;

        if (usePreviousLocation) {
            forcedLocation = this.previousLocation || defaultLocation;
        } else {
            forcedLocation = location;
        }

        return (
            <React.Fragment>
                <Switch location={forcedLocation}>
                    <Route exact path="/docs" component={docs} />
                    <Route exact path="/dashboard" component={dashboard} />
                </Switch>
            </React.Fragment>
        );
    }
}

export default withRouter(Root);