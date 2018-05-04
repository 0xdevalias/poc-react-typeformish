import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {Radio, RadioGroup, Checkbox, Text, TextArea, NestedField, withFormApi} from 'react-form';

function FormGroup(props) {
  var formGroupClass = classNames({
    "form-group": true,
    [`col-md-${props.cols}`]: "cols" in props
  });

  return (
    <div className={formGroupClass}>
      {props.children}
    </div>
  )
}

FormGroup.propTypes = {
  cols: PropTypes.number.isRequired
}

FormGroup.defaultProps = {
  cols: 12
}

class ShortText extends Component {
  constructor(props) {
    super(props);

    this.helpID = this.props.field + "-help";
  }

  render() {
    return (
      <FormGroup cols={this.props.cols}>
        <label htmlFor={this.props.field}>{this.props.title}</label>
        <Text field={this.props.field} id={this.props.field} className="form-control" aria-describedby={this.helpID}
              placeholder={this.props.placeholder} />
        <small id={this.helpID} className="form-text text-muted">
          {this.props.helpText}
        </small>
      </FormGroup>
    )
  }
}

ShortText.propTypes = {
  field: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,

  placeholder: PropTypes.string,
  helpText: PropTypes.string,

  cols: PropTypes.number,
}

class LongText extends Component {
  render() {
    return (
      <FormGroup cols={this.props.cols}>
        <label htmlFor={this.props.field}>{this.props.title}</label>
        <TextArea className="form-control" field={this.props.field} id={this.props.field} rows={this.props.rows} placeholder={this.props.placeholder} />

        <small id={this.helpID} className="form-text text-muted">
          {this.props.helpText}
        </small>
      </FormGroup>
    )
  }
}

LongText.propTypes = {
  field: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,

  placeholder: PropTypes.string,
  helpText: PropTypes.string,

  cols: PropTypes.number,
  rows: PropTypes.number,
}

// TODO: How can we unset the value of nested children when hidden? Do we want to?
class YesNo extends Component {
  constructor(props) {
    super(props);

    this.yesID = this.props.field + "-yes";
    this.noID = this.props.field + "-no";
    this.helpID = this.props.field + "-help";

    this.renderChildren.bind(this);
  }

  DivWithAPI = withFormApi(React.div)

  renderChildren(formApi) {
    if (!("children" in this.props)) return null;
    // if (!"field" in this.props) return null;

    const values = formApi.getFormState().values;
    const field = this.props.field;

    if (field in values && values[field]) {
      if (typeof this.props.children === 'function') {
        return this.props.children(values[field])
      } else {
        return this.props.children;
      }
    }
    return null;
  }

  render() {
    return (
      <React.Fragment>
        <FormGroup cols={this.props.cols}>
          <label>{this.props.title}</label>

          <RadioGroup field={this.props.field}>
            <div className="form-check">
              <Radio className="form-check-input" value={true} id={this.yesID}/>
              <label className="form-check-label" htmlFor={this.yesID}>{this.props.yesLabel}</label>
            </div>

            <div className="form-check">
              <Radio className="form-check-input" value={false} id={this.noID}/>
              <label className="form-check-label" htmlFor={this.noID}>{this.props.noLabel}</label>
            </div>
          </RadioGroup>

          <small id={this.helpID} className="form-text text-muted">
            {this.props.helpText}
          </small>
        </FormGroup>
        <this.DivWithAPI>
          { formApi => this.renderChildren(formApi) }
        </this.DivWithAPI>
      </React.Fragment>
    )
  }
}

YesNo.propTypes = {
  title: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,

  children: PropTypes.func,

  helpText: PropTypes.string,
  yesLabel : PropTypes.string,
  noLabel : PropTypes.string,

  cols: PropTypes.number,
}

YesNo.defaultProps = {
  yesLabel: "Yes",
  noLabel: "No",
}

class MultipleChoice extends Component {
  showCheckboxes() {
    const choices = this.props.choices;

    var checkboxes = [];
    for (var i = 0; i < choices.length; i++) {
      const checkID = this.props.field + "-" + choices[i].field;

      var checkbox = (
        <div className="form-check">
          <Checkbox className="form-check-input" field={choices[i].field} id={checkID} />
          <label className="form-check-label" htmlFor={checkID}>{choices[i].label}</label>
        </div>
      );

      checkboxes.push(checkbox);
    }

    return checkboxes.length > 0 ? checkboxes : "FAIL";
  }

  render() {
    return (
      <FormGroup cols={this.props.cols}>
        <NestedField field={this.props.field}>
          <label>{this.props.title}</label>

          {this.showCheckboxes()}

          <small id={this.helpID} className="form-text text-muted">
            {this.props.helpText}
          </small>
        </NestedField>
      </FormGroup>
    )
  }
}

MultipleChoice.propTypes = {
  title: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
  choices: PropTypes.object.isRequired,

  helpText: PropTypes.string,

  cols: PropTypes.number,
}

class Block extends Component {
  render() {
    return (
      <FormGroup cols={this.props.cols}>
        <NestedField field={this.props.field}>
          <label>{this.props.title}</label>

          {this.props.children}
        </NestedField>
      </FormGroup>
    )
  }
}

Block.propTypes = {
  title: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,

  cols: PropTypes.number,
}

export {FormGroup, ShortText, LongText, YesNo, MultipleChoice, Block};