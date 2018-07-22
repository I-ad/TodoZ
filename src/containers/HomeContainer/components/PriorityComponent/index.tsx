// import * as PropTypes from 'prop-types';
import * as React from 'react';

interface IProps {
  value: string;
  error: string;
  isTouched: boolean;
  isSubmitted: boolean;

  onChange(e: any): void;
}

class PriorityComponent extends React.Component<IProps> {
  public shouldComponentUpdate(nextProps: Readonly<IProps>): boolean {
    return nextProps.value !== this.props.value || nextProps.isSubmitted !== this.props.isSubmitted;
  }

  public render(): JSX.Element {
    const { value, onChange, error, isSubmitted, isTouched } = this.props;
    return (
      <React.Fragment>
        <label>Priority</label>
        <input name="priority" type="radio" value="low" onChange={onChange} checked={value === 'low'} /> low
        <input name="priority" type="radio" value="mid" onChange={onChange} checked={value === 'mid'} /> mid
        <input name="priority" type="radio" value="high" onChange={onChange} checked={value === 'high'} /> high
        <p>{(isSubmitted || isTouched) && error}</p>
      </React.Fragment>
    );
  }
}

export default PriorityComponent;
