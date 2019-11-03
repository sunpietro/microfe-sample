import * as React from 'react';
import PropTypes from 'prop-types';

const ExampleComponent = ({ name = 'Piotr', onHelloEvt }) => {
    const ref = React.createRef();

    return (
        <div className="exampleComponent" ref={ref}>
            <img src="/images/react.png" alt="React Logo" className="logo" />
            <p>
                Hello <strong>{name}</strong> from your friendly React
                component.
            </p>
            <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                    ref.current.dispatchEvent(
                        new CustomEvent(onHelloEvt, {
                            bubbles: true,
                            cancelable: false,
                            composed: true,
                            detail: {},
                        })
                    );
                }}
            >
                Say hello
            </button>
        </div>
    );
};

ExampleComponent.propTypes = {
    name: PropTypes.string,
    onHelloEvt: PropTypes.string,
};

export { ExampleComponent };
